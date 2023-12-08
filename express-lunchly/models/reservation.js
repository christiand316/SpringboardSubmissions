/** Reservation for Lunchly */

const moment = require("moment");

const db = require("../db");


/** A reservation for a party */

class Reservation {
  constructor({id, customerId, numGuests, startAt, notes}) {
    this.id = id;
    this.customerId = customerId;
    this.numGuests = numGuests;
    this.startAt = startAt;
    this.notes = notes;
  }

  /** formatter for startAt */

  getformattedStartAt() {
    return moment(this.startAt).format('MMMM Do YYYY, h:mm a');
  }

  /** given a customer id, find their reservations. */

  static async getReservationsForCustomer(customerId) {
    const results = await db.query(
          `SELECT id, 
           customer_id AS "customerId", 
           num_guests AS "numGuests", 
           start_at AS "startAt", 
           notes AS "notes"
         FROM reservations 
         WHERE customer_id = $1`,
        [customerId]
    );

    return results.rows.map(row => new Reservation(row));
  }
  async save() {
    if (!this.id) {
      if (!this.startAt) {this.startAt = new Date()}
      console.log(this.startAt)
      const result = await db.query(`INSERT INTO reservations (customer_id, num_guests, start_at, notes)
      VALUES ($1, $2, $3, $4) 
      RETURNING id`, [this.customerId, this.numGuests, this.startAt, this.notes])
      console.log(result)
      this.id = result.rows[0].id
      console.log(this.id)
    }
    else {
      if (!this.startAt) {this.startAt = new Date()}
      await db.query(`UPDATE reservations SET customer_id=$2, num_guests=$3, start_at=$4, notes=$5
      WHERE id=$1`, [this.id, this.customerId, this.numGuests, this.startAt, this.notes])
    }
  }
}


module.exports = Reservation;
