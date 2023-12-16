"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const JobController = require("./job.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

const newJobData = { title: "created job", salary: 2525, equity: 0.08, companyHandle: "c1" }
const updateJobData = { salary: 2444 }
const searchConfigA = { hasEquity: true }
const searchConfigB = { hasEquity: false, minSalary: 3000 }
/************************************** create */

describe("create", function () {

  test("works", async function () {
    let job = await JobController.create(newJobData);
    expect(job.title).toEqual(newJobData.title);

    const result = await db.query(
      `SELECT title
           FROM jobs
           WHERE id = $1`, [job.id]);
    expect(result.rows[0].title).toEqual(job.title);
  });
});

describe("search all with filters", () => {
  test("functions with no params", async () => {
    const results = await JobController.findAllByOptions({})
    expect(results).toBeTruthy()
  })

  test("functions with 1 param", async () => {
    const results = await JobController.findAllByOptions(searchConfigA)
    const getJob = await JobController.get(results[0].id)
    expect(results).toEqual([getJob])
  })

  test("functions with 2 params", async () => {
    const results = await JobController.findAllByOptions(searchConfigB)
    expect(results.length).toEqual(1)
  })

  test("prevents SQL injections and bad input", async () => {
    const searchConfigCustom = {
      minSalary: 2500,
      maxEmployees: 3, //intentionally leaving bad field
      title: "C OR 1=1" //this should become just "C OR" instead of returning everything
    }
    const results = await JobController.findAllByOptions(searchConfigCustom)
    expect(results).toEqual([])
  })
})

describe("findAll", function () {
  test("works: no filter", async function () {
    let jobs = await JobController.findAll();
    expect(jobs.length).toEqual(3)
  })
})

describe("get", function () {
  test("works", async function () {
    const createdJob = await JobController.create(newJobData)
    const job = await JobController.get(createdJob.id);
    expect(job.title).toEqual(createdJob.title);
  })

  test("resists bad parse", async function () {
    try {
      await JobController.get("nope");
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  })

  test("returns NotFoundError on random id", async function () {
    try {
      await JobController.get(123445);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  })
})

describe("update", function () {

  test("works", async function () {
    const createdJob = await JobController.create(newJobData)
    let job = await JobController.update(createdJob.id, updateJobData);
    expect(job.salary).toEqual(updateJobData.salary);
  });

  test("not found if no such job", async function () {
    try {
      await JobController.update("nope", updateJobData);
      fail();
    } catch (err) {
      console.log(err)
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

});

describe("remove", function () {
  test("works", async function () {
    const createdJob = await JobController.create(newJobData)
    
    await JobController.remove(createdJob.id);
    const res = await db.query(
        "SELECT title FROM jobs WHERE id=$1", [createdJob.id]);
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such job", async function () {
    try {
      await JobController.remove(123);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
