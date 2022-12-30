const http = require('http');
const fs = require('fs');
const url = require('url');


const app = http.createServer(function(request,response){
const _url = request.url;
const queryData = new URL('http://localhost:3000' + _url).searchParams;
    // console.log(queryData.get('id'));
let title = queryData.get('id'); //if문에서 바꿔서 사용하기 때문에 let 

if(_url == '/'){
    title = "Welcome";
}
if(_url == '/favicon.ico'){
    response.writeHead(404);
    response.end();
return;
}
response.writeHead(200);
fs.readFile(`data/${queryData.get('id')}`,'utf-8',function(err,description){
  const template = `<!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    <ul>
      <li><a href="/?id=HTML">HTML</a></li>
      <li><a href="/?id=CSS">CSS</a></li>
      <li><a href="/?id=JavaScript">JavaScript</a></li>
    </ul>
    <h2>${title}</h2>
    <p>${description}</p>
  </body>
  </html>
  `
  response.end(template);
})




});
app.listen(3000);