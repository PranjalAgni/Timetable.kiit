const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const port = 5000 || process.env.PORT;

app.use(cors());
app.use(express.json());
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '/dist')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  console.log('request hit...');
  res.sendFile(path.join(__dirname, 'dist/demo.html'));
});
app.listen(port, function() {
  console.log('Server running on port ', port);
});
