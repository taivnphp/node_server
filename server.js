var express    = require('express');
var bodyParser = require('body-parser');
var hellomodule = require('./hello.js');
//console.log(hellomodule);
function sum(a,b){
	return a+b;
}

var c = sum(1,3);

console.log('Sum of 1 and 3 is ' + c);
var app = express();
app.listen(3000); // START SERVER

var mysql      = require('mysql');
var mysqlConnection = mysql.createConnection({
	'host' : 'localhost',
	'user' : 'root',
	'password' : 'root',
	'database' : 'node_db'
});

/* TEST CONNECTION*/
mysqlConnection.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

mysqlConnection.query('SELECT * FROM User',function(err,rows){
  if(err) throw err;

  console.log('Data received from Db:\n');
  console.log(rows);
});

mysqlConnection.end();
/**/

var urlencodedParser = bodyParser.urlencoded({ extended: false });


//EJS Configuration

app.set('view engine', 'ejs');
app.set('views', './views');

/* ROUTES */
app.get('/', function (req, res) {
  res.send('Hello World!');

});

app.get('/index',function(req , res){
	//using EJS
	res.render('home');
});

app.get('/about', function (req, res) {  
  res.send("<font color='green'>About</font>");
});

app.post('/hello', urlencodedParser, function (req, res) {  
  res.send("<font color='green'>Posting Hello </font>" + req.body.username);
  console.log(req);
});

//GET PARAMS
app.get('/news/:id', function(req, res) {
	var id = req.params.id;
	res.send('Server response : ' + id);
});


app.get('/detail', function(req, res) {
	var str = " abc def ";
	//str = $.trim(str);
	//res.send(str);
	var detailJson = {
		'name' :  'Taivn',
		'email' : 'taivn@elinext.com',
		'food' : ['das','dasd','dasdas d']
	};

	res.render('detail', detailJson);
});

//POST PARAMS