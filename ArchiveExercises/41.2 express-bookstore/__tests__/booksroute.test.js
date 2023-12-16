const app = require("../app")
const db = require("../db")
const request = require("supertest");


beforeEach(async () => {
    await db.query(`
    INSERT INTO 
    books (isbn, amazon_url, author, language, pages, publisher, title, year)
    VALUES(
        'isbn411234557',
        'a.co/something',
        'The Author',
        'All',
        123,
        'Amazon the Publisher',
        'Amazon the Book', 123)
      RETURNING isbn`, []);
})

const FirstBookData = {
	isbn: "isbn411234557",
	amazon_url: "a.co/something",
	author: "The Author",
	language: "All",
	pages: 123,
	publisher: "Amazon the Publisher",
	title: "Amazon the Book",
	year: 123
}

const SecondBookData = {
	isbn: "isbn41123frog",
	amazon_url: "a.co/asdf",
	author: "irrelevant",
	language: "something",
	pages: 456,
	publisher: "a publisher",
	title: "some title",
	year: 456
}

describe(`GET /books`, () => {
  it(`Gets all books`, async () => {
    const response = await request(app).get(`/books`)
    expect(response.body[0]).toEqual(FirstBookData)
  })
})

describe(`GET /books/:isbn`, () => {
  it(`Gets a specific book`, async () => {
    const response = await request(app).get(`/books/isbn411234557`)
    expect(response.body).toEqual(FirstBookData)
  })
  it(`Will return a 404 if unknown book ISBN`, async () => {
    const response = await request(app).get(`/books/never`)
    expect(response.statusCode).toBe(404)
  })
})

describe(`POST /books`, () => {
  it(`Creates a book`, async () => {
    const response = await request(app).post(`/books`).send(SecondBookData)
    const response2 = await request(app).get(`/books/${SecondBookData.isbn}`)
    expect(response.body).toEqual(response2.body)
  })
  it(`Doesn't allow duplicate ISBNs`, async () => {
    const response = await request(app).post(`/books`).send(SecondBookData)
    const response2 = await request(app).post(`/books`).send(SecondBookData)
    expect(response2.statusCode).toBe(500)
  })
  it(`Doesn't allow bad schemas`, async () => {
    const response = await request(app).post(`/books`).send({junkmail: true})
    expect(response.statusCode).toBe(400)
  })
})

describe(`PUT /books/:isbn`, () => {
  it(`Updates a book`, async () => {
    const response = await request(app).put(`/books/${FirstBookData.isbn}`).send({amazon_url: "a.co/newurl"})
    const response2 = await request(app).get(`/books/${FirstBookData.isbn}`)
    expect(response2.body.amazon_url).toEqual("a.co/newurl")
  })
  it(`Allows a non-response`, async () => {
    const response = await request(app).put(`/books/${FirstBookData.isbn}`).send({})
    expect(response.statusCode).toBe(200)
  })
  it(`Ignores bad schemas`, async () => {
    const response = await request(app).put(`/books/${FirstBookData.isbn}`).send({junkmail: true})
    const response2 = await request(app).get(`/books/${FirstBookData.isbn}`)
    expect(response2.body).toEqual(FirstBookData)
  })
  it(`Returns 404 when finding no book`, async () => {
    const response = await request(app).put(`/books/catdog`).send(FirstBookData)
    expect(response.statusCode).toBe(404)
  })
})

describe(`DELETE /books/:isbn`, () => {
  it(`Allows us to delete books`, async () => {
    const response = await request(app).delete(`/books/${FirstBookData.isbn}`)
    const response2 = await request(app).get(`/books/${FirstBookData.isbn}`)
    expect(response2.statusCode).toBe(404)
  })
  it(`Does nothing when we request to delete a non-existent book`, async () => {
    const response = await request(app).delete(`/books/catdog`)
    expect(response.statusCode).toBe(404)
  })
  
})

afterEach(async () => {
  await db.query(`DELETE FROM BOOKS`)
})

afterAll(async () => {
  await db.end()
})