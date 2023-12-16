"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

// CREATE TABLE jobs (
//   id SERIAL PRIMARY KEY,
//   title TEXT NOT NULL,
//   salary INTEGER CHECK (salary >= 0),
//   equity NUMERIC CHECK (equity <= 1.0),
//   company_handle VARCHAR(25) NOT NULL
//     REFERENCES companies ON DELETE CASCADE
// );

class JobController {
  /** Create a job (from data), update db, return new job data.
   *
   * data should be { title, salary, equity, companyHandle }
   *
   * Returns { title, salary, equity, companyHandle }
   *
   * Throws BadRequestError if job company handle does not exist.
   * */

  static async create({ title, salary, equity, companyHandle }) {

    const checkIfHandleExists = await db.query(`SELECT handle FROM companies WHERE handle = $1`, [companyHandle])
    if (!checkIfHandleExists.rows[0]) throw new BadRequestError(`Company handle does not exist`)

    const result = await db.query(
      `INSERT INTO jobs
           (title, salary, equity, company_handle)
           VALUES ($1, $2, $3, $4)
           RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
      [
        title,
        salary,
        equity,
        companyHandle,
      ],
    );
    const job = result.rows[0];

    return job;
  }

  /** Find all jobs.
   *
   * Returns [{ title, salary, equity, companyHandle }, ...]
   * */

  static async findAll() {
    const jobsRes = await db.query(
      `SELECT id,
                  title,
                  salary,
                  equity,
                  company_handle AS "companyHandle"
           FROM jobs ORDER BY salary`);
    return jobsRes.rows;
  }



  // Allows users to search via a searchConfig object via query's params
  // Use it by calling findAllOptions(req.query)
  // Extend by adding additional filtering rules on the series of if statements
  // to check if field exists

  // title: req.query.title,
  // minSalary: req.query.minSalary,
  // hasEquity: req.query.hasEquity
  // companyHandle: req.query.companyHandle

  //returns [{ id, title, salary, equity, companyHandle }, ...]
  static sanitizeString(unsanitized) {
    return unsanitized.replace(/[^a-zA-Z0-9\s]/g, '')
  }

  static async findAllByOptions(searchConfig) {
    let WHERE_COMMANDS = []

    if (searchConfig.minSalary !== undefined) {
      WHERE_COMMANDS.push(`salary >= ${searchConfig.minSalary}`)
    }
    if (searchConfig.hasEquity !== undefined) {
      WHERE_COMMANDS.push(`equity > 0.05`)
    }
    if (searchConfig.title !== undefined) {
      const sanitizedName = this.sanitizeString(searchConfig.title)
      WHERE_COMMANDS.push(`title ILIKE '${sanitizedName}%'`)
    }
    if (searchConfig.companyHandle !== undefined) {
      const sanitizedName = this.sanitizeString(searchConfig.companyHandle)
      WHERE_COMMANDS.push(`company_handle = '${sanitizedName}%'`)
    }
    if(WHERE_COMMANDS.length >= 1) {
      const WHERE_STRING = "WHERE " + WHERE_COMMANDS.join(" AND ")
      const companiesRes = await db.query(
        `SELECT id, title, salary, equity, company_handle AS "companyHandle" FROM jobs ${WHERE_STRING}`);
      return companiesRes.rows
    }
    else {
      return await this.findAll()
    }
    
  }

  /** Given a job id, return data about job.
   *
   * Returns { id, title, salary, equity, companyHandle }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const castedId = parseInt(id)
    if (isNaN(castedId)) throw new BadRequestError(`Number wasn't provided as such`)
    const jobRes = await db.query(
      `SELECT id, title, salary, equity, company_handle AS "companyHandle" FROM jobs WHERE id = $1`,
      [castedId]);

    const job = jobRes.rows[0];

    if (!job) throw new NotFoundError(`No job: ${castedId}`);

    return job;
  }

  /** Update job  data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: { title, salary, equity, company_handle }
   *
   * Returns { id, title, salary, equity, company_handle }
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const castedId = parseInt(id)
    if (isNaN(castedId)) throw new NotFoundError(`Number wasn't provided as such`)
    const { setCols, values } = sqlForPartialUpdate(
      data,
      {
        companyHandle: "company_handle",
      });
    const handleVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE jobs 
                      SET ${setCols} 
                      WHERE id = ${handleVarIdx} 
                      RETURNING id, 
                                title, 
                                salary, 
                                equity,
                                company_handle AS "companyHandle"`;
    const result = await db.query(querySql, [...values, id]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${id}`);

    return job;
  }

  /** Delete given job from database; returns undefined.
   *
   * Throws NotFoundError if job not found.
   **/

  static async remove(id) {
    const result = await db.query(
      `DELETE
           FROM jobs
           WHERE id = $1
           RETURNING id`,
      [id]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${id}`);
  }
}



module.exports = JobController;
