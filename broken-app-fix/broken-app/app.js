const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json())

app.post('/', async function (req, res) {
  try {
    const promises = req.body.developers.map(dev => { return axios.get(`https://api.github.com/users/${dev}`)})

    const output = []

    await Promise.all(promises).then(result => result.forEach(res => output.push({
      name: res.data.name,
      bio: res.data.bio
    }))).catch(error => { throw error })

    res.json(output)

  } catch (error) {
    res.json(`Failed to get request.`)
  }
});

app.listen(3000);
