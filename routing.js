// https://www.nodeacademy.it/cose-ejs-template-engine-express-js/
var express = require('express');
var app = express();

var myfunctions = require('myfunctions');
var url = require('url');
var querystring = require('querystring');

// Per includere la cartella dove sono raccolti gli stili css
app.use(express.static("./public"));

app.set('view engine', 'ejs');

app.get('/home',function(req,res){
  res.render("home.ejs");
});
app.get('/',function(req,res){
  res.render("home.ejs");
});

app.get('/count/:number', function(req, res) {
  var names = ['Roberto', 'Giacomo', 'Davide'];
  res.render('page.ejs', {counter: req.params.number, names: names});
});

app.get('/visual', function(req, res) {
  res.render('visualrec.ejs');
});

app.get("/visualresult",function(req,res){
  var page = url.parse(req.url).pathname;
  var getParams = querystring.parse(url.parse(req.url).query);
  //Statico dopo implementeremo la scelta dinamica dell'immagine
  var images_url= getParams.imageurl;
  // "https://raw.githubusercontent.com/watson-developer-cloud/visual-recognition-nodejs/master/public/images/samples/1.jpg";
  var owners = ["IBM"];
  var threshold = 0.2;

  var params = {
    url: images_url,
    owners: owners,
    threshold: threshold
  };

  myfunctions.callVisualRecognitionClassify(params);
  res.render('visualrecresult.ejs',{imageurl: images_url});
});

// Event handler appena parte la chiamata verso Visual Recognition service

// app.get('/', function(req, res) {
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Sei nella Reception. Posso aiutarti?');
// });
//
// app.get('/basement', function(req, res) {
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Sei nella cantina dei vini. Le bottiglie sono mie!');
// });
//
// app.get('/floor/:floornum/bedroom', function(req, res) {
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Sei nella camera da letto al piano n^' + req.params.floornum);
// });
//
app.use(function(req, res, next){
  res.setHeader('Content-Type', 'text/plain');
  res.send(404, 'La pagina non esiste amico!');
});


app.listen(8080);
