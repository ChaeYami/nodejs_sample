const http = require('http');
const fs = require('fs');
const url = require('url');


const app = http.createServer(function(request,response){
  const _url = request.url;
  const queryData = new URL('http://localhost:3000' + _url).searchParams;
  const pathname = new URL('http://localhost:3000' + _url).pathname;


  if(pathname === '/'){    //경로가 루트라면
    if(queryData.get('id')===null){ //id값이 없다면 
      
      fs.readFile(`data/${queryData.get('id')}`,'utf-8',function(err,description){
        let title = 'Welcome';
        var description = 'Hello, Node.js';
            //let 쓰면 Identifier 'description' has already been declared 에러 뜸
        const template = `<!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <ul style="list-style: none;">
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ul>
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        `;
        response.writeHead(200);
        response.end(template);
       })

    } else{
      fs.readFile(`data/${queryData.get('id')}`,'utf-8',function(err,description){
        let title = queryData.get('id');
        const template = `<!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <ul style="list-style: none;">
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ul>
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        `;
        response.writeHead(200);
        response.end(template);
    })
    }
    
  } else{
    response.writeHead(404); 
    response.end("Not found");
  }

});
app.listen(3000);