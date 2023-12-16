"use strict";

const request = require("supertest");

const db = require("../db");
const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token_admin,
} = require("./_testCommon");
const Job = require("../models/job");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /jobs */

const newJob1 = { title: "new job", salary: 3535, equity: 0.12, companyHandle: "c2" }
const newJob2 = { title: "new job 2", salary: 12312, equity: 0.52, companyHandle: "c2" }

describe("POST /jobs", function () {

  test("passes for admins", async function () {
    const resp = await request(app)
        .post("/jobs")
        .send(newJob1)
        .set("authorization", `Bearer ${u2Token_admin}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body.title).toEqual(
      newJob1.title
    );
  });
  test("fails for users", async function () {
    const resp = await request(app)
        .post("/jobs")
        .send(newJob1)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(403);
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
        .post("/jobs")
        .send({
          title: "okay"
        })
        .set("authorization", `Bearer ${u2Token_admin}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
        .post("/jobs")
        .send({
          ...newJob1,
          salary: "not-a-number",
        })
        .set("authorization", `Bearer ${u2Token_admin}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /jobs */

describe("GET /jobs", function () {
  test("ok for anon", async function () {
    const resp = await request(app).get("/jobs");
    expect(resp.statusCode).toBe(200)
  });
});

/************************************** GET /jobs/:jobId */

describe("GET /jobs/:jobId", function () {
  test("works for anon", async function () {
    const newJob = await Job.create(newJob2)
    console.log(newJob)
    const test = `/jobs/${newJob.id}`
    const resp = await request(app).get(`/jobs/${newJob.id}`);
    expect(resp.body).toEqual(newJob);
  });

  test("not found for no such job", async function () {
    const resp = await request(app).get(`/jobs/123112`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** PATCH /jobs/:jobId */

describe("PATCH /jobs/:jobId", function () {
  test("DOES NOT works for non-admins", async function () {
    const newJob = await Job.create(newJob2)
    const resp = await request(app)
        .patch(`/jobs/${newJob2.id}`)
        .send({
          salary: 2
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(403);
  });

  test("works for admins", async function () {
    const newJob = await Job.create(newJob2)

    const resp = await request(app)
        .patch(`/jobs/${newJob.id}`)
        .send({
          salary: 2,
        })
        .set("authorization", `Bearer ${u2Token_admin}`);
    expect(resp.body.salary).toEqual(2);
  });

  test("unauth for anon", async function () {
    const newJob = await Job.create(newJob2)

    const resp = await request(app)
        .patch(`/jobs/${newJob.id}`)
        .send({
          salary: 2,
        });
    expect(resp.statusCode).toEqual(401);
  });

  test("not found on no such job", async function () {
    const resp = await request(app)
        .patch(`/jobs/asdf`)
        .send({
          salary: 2
        })
        .set("authorization", `Bearer ${u2Token_admin}`);
    expect(resp.statusCode).toEqual(404);
  });

  test("bad request on handle change attempt", async function () {
    const newJob = await Job.create(newJob2)

    const resp = await request(app)
        .patch(`/jobs/${newJob.id}`)
        .send({
          id: 5,
        })
        .set("authorization", `Bearer ${u2Token_admin}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** DELETE /job/:jobId */

describe("DELETE /job/:jobId", function () {
  test("works for admins", async function () {
    const newJob = await Job.create(newJob2)

    const resp = await request(app)
        .delete(`/jobs/${newJob.id}`)
        .set("authorization", `Bearer ${u2Token_admin}`);
    expect(resp.statusCode).toEqual(200)
  });

  test("fails for non-admins", async function () {
    const newJob = await Job.create(newJob2)

    const resp = await request(app)
        .delete(`/jobs/${newJob.id}`)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(403);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .delete(`/jobs/c1`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found for no such jobs", async function () {
    const resp = await request(app)
        .delete(`/jobs/123456`)
        .set("authorization", `Bearer ${u2Token_admin}`);
    expect(resp.statusCode).toEqual(404);
  });
});
