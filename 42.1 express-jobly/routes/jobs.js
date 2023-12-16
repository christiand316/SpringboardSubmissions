"use strict";
const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn, ensureAdmin } = require("../middleware/auth");

const JobController = require("../models/job")

const jobNewSchema = require("../schemas/jobNew.json");
const jobUpdateSchema = require("../schemas/jobUpdate.json");

const router = new express.Router();

router.post("/", ensureLoggedIn, ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, jobNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      console.log("this was triggered due to bad schema")
      throw new BadRequestError(errs);
    }

    const job = await JobController.create(req.body);
    return res.status(201).json(job);
  } catch (err) {
    return next(err);
  }
})


router.get("/", async function (req, res, next) {
  try {
    const searchConfig = {
      minSalary: req.query.minSalary,
      maxEmployees: req.query.maxEmployees,
      nameLike: req.query.nameLike
    }
    const jobs = await JobController.findAllByOptions(searchConfig);
    return res.json(jobs);
  } catch (err) {
    return next(err);
  }
});


router.get("/:jobId", async function (req, res, next) {
  try {
    console.log("FRIZZLE FRAZZLE")
    console.log(req.params.jobId)
    const job = await JobController.get(req.params.jobId);
    console.log("FRIZZLE FRAZZLING")
    console.log(job)
    return res.json(job);
  } catch (err) {
    return next(err);
  }
});

router.patch("/:jobId", ensureLoggedIn, ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, jobUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const job = await JobController.update(req.params.jobId, req.body);
    return res.json(job);
  } catch (err) {
    return next(err);
  }
})

router.delete("/:jobId", ensureLoggedIn, ensureAdmin, async function (req, res, next) {
  try {
    await JobController.remove(req.params.jobId);
    return res.json({ deleted: req.params.jobId });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
