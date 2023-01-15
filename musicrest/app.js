const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const connection = (require('./routes/connection')).connectionCommon;


const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
})

// Querries for User

app.get('/user', async (_, res) => {
  let sql = `SELECT * FROM user`;
  const u_results = await connection(sql, res);
  console.log(u_results);
  res.render('index', { u_results })
});

app.post('/user', (req, res) => {
  const data = req.body;
  let sql = `INSERT INTO user(u_name, u_email) VALUES ("${data.name}", "${data.email}")`;
  connection(sql, res);
})

app.put('/user/:id', (req, res) => {
  const id = req.params.id;
  const data = req.query;
  let sql = `UPDATE user SET u_name="${data.name}", u_email = "${data.email}" WHERE u_id = ${id}`
  connection(sql, res);

})

app.delete('/user/:id', (req, res) => {
  const id = req.params.id;
  let sql = `DELETE from user WHERE u_id = ${id}`;
  connection(sql, res);
})


//Querries for artist

app.get('/artists', (_, res) => {
  let sql = `SELECT * from artist`;
  connection(sql, res);
})

app.post('/artists', (req, res) => {
  const data = req.body;
  let sql = `INSERT INTO artist(a_name, a_dob, a_bio) VALUES ("${data.name}", "${data.dob}", "${data.bio}")`;
  connection(sql, res);
})

app.put('/artsits/:id', (req, res) => {
  const id = req.params.id;
  const data = req.query;
  let sql = `UPDATE artist SET a_name="${data.name}", u_dob = "${data.dob}", u_bio = "${data.bio}" WHERE u_id = ${id}`
  connection(sql, res);
})

app.delete('/artists/:id', (req, res) => {
  const id = req.params.id;
  let sql = `DELETE from artist WHERE a_id = ${id}`;
  connection(sql, res);
})

// Querries for songs

app.get('/songs', async (_, res) => {
  let sql = `SELECT * from songs`;
  const s_result = await connection(sql, res);
  res.render('index', { s_result });
})

app.get('/add_songs', async (_, res) => {
  res.render('songs/add_songs');
});

app.post('/a_songs', async (req, res) => {
  const data = req.body;
  let sql = `INSERT INTO songs(s_name, s_dor, s_cover) VALUES ("${data.name}", "${data.date_of_release}", "${data.cover_image}")`;
  await connection(sql, res);
  console.log(sql);
  res.redirect('index');
})

app.put('/songs/:id', (req, res) => {
  const id = req.params.id;
  const data = req.query;
  let sql = `UPDATE songs SET s_name="${data.name}", s_dor = "${data.dor}", s_cover = "${data.cover}" WHERE u_id = ${id}`
  connection(sql, res);
})

app.delete('/songs/:id', (req, res) => {
  const id = req.params.id;
  let sql = `DELETE from songs WHERE u_id = ${id}`;
  connection(sql, res);
})




app.listen(3000, () => {
  console.log('Running on 3000...');
});