const express = require('express');
const app = express();
const redis = require('redis');
const client = redis.createClient({ host: 'redis', port: 6379 });

app.get('/', (req, res) => {
  res.send(`
    <h1>Vote App</h1>
    <form action="/vote" method="post">
      <button name="vote" value="cats">Cats</button>
      <button name="vote" value="dogs">Dogs</button>
    </form>
  `);
});

app.post('/vote', express.urlencoded({extended:true}), (req, res) => {
  const vote = req.body.vote;
  client.incr(vote);
  res.send(`<h2>Thanks for voting ${vote}!</h2><a href="/">Back</a>`);
});

app.listen(3000, () => console.log('Vote app running on port 3000'));
