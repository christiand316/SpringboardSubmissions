const pg = require("pg")

const pool = new pg.Pool({
    connectionString: "postgres://zzz"
})

 const query = async (text, params = []) => {
    try {
        const result = await pool.query(text, params)
        return result
    } catch (error) {
     console.error(error)   
    }
}


module.exports = {query, pool};