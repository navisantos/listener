const express = require("express");
var xmlparser = require("express-xml-bodyparser");
var fs = require("fs");
var cors = require("cors");
var envelopeid;


const app = express();

app.use(cors());
app.use(xmlparser());
app.use(express.static("public"));

function savelog(data){
  var fileURL = './public/data/'+envelopeid+'.json';
  fs.writeFile(fileURL, data, function (err) {
  if (err) throw err;  
  }
)}

app.post("/", function(request, response) {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.end("recebido");
  envelopeid=request.body.docusignenvelopeinformation.envelopestatus[0].envelopeid[0];
  savelog(JSON.stringify(request.body, null, 4));
});

app.get("/", function(req,res){
  res.sendFile(__dirname + "/views/index.html");
})

app.get("/download/:id", function(req,res){
  res.download("public/data/"+req.params.id+".json"); 
})

app.get("/table",function(req,res){
    var i=0, r1, r2, r3, r4,envstatus=new Object();
    var tabela = new Array();
    var files = fs.readdirSync('./public/data/');
    files.forEach(file => {
    var arq = fs.readFileSync("./public/data/"+file);
    var obj=JSON.parse(arq);
    envstatus = obj.docusignenvelopeinformation.envelopestatus[0];
    r1 = envstatus.envelopeid[0];
    r2 = envstatus.status[0];
    r3 = envstatus.created[0];
    r4 = envstatus.subject[0];
    tabela.push({ID:r1,Status:r2,Criação:r3,Assunto:r4});
      i++;
  });
  res.send(tabela);
  
})

const listener = app.listen(process.env.PORT);