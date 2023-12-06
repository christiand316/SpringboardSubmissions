const pg = require("pg")

const pool = new pg.Pool({
    connectionString: "postgres://postgres:toby@localhost:5432/biztime"
})

 const query = async (text, params, callback) => {
    try {
        const result = await pool.query(text, params)
        return result
    } catch (error) {
     console.error(error)   
    }
}


module.exports = query;