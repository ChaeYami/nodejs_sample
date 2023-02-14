const http = require('http');
const fs = require('fs');
const url = require('url');

function templateHTML(title, list, body){
  return`
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    <a href = "/create">create</a>
    ${body}
  </body>
  </html>
  `;
}

function templateList(filelist){

  var list = '<ul>';
  for (var i = 0; i<filelist.length ; i++){
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
  }
  list = list +'</ul>';
  return list;
}

const app = http.createServer(function(request,response){
  const _url = request.url;
  const queryData = new URL('http://localhost:3000' + _url).searchParams;
  const pathname = new URL('http://localhost:3000' + _url).pathname;


  if(pathname === '/'){    //경로가 루트라면
    if(queryData.get('id')===null){ //id값이 없다면 
      
      fs.readdir('./data', function(error,filelist){
        let title = 'Welcome!';
        var description = 'Hello, Node.js';
            //let 쓰면 Identifier 'description' has already been declared 에러 뜸
        const list = templateList(filelist);
        const template = templateHTML(title, list,`<h2>${title}</h2>${description}`);
        response.writeHead(200);
        response.end(template);
      })
    } else { //경로가 있다면
      fs.readdir('./data',function(error,filelist){
        fs.readFile(`data/${queryData.get('id')}`,'utf-8',function(err,description){
          let title = queryData.get('id');
          var list = templateList(filelist);
          const template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
          response.writeHead(200);
          response.end(template);
        });
      })
    }
    
  } else if(pathname === '/create'){
    fs.readdir('./data', function(error,filelist){
        let title = 'WEB - create';
        const list = templateList(filelist);
        const template = templateHTML(title, list,
          `<form action="http://localhost:3000/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
              <textarea name="description" placeholder ="description"></textarea>
          </p>
          <p>
              <input type="submit">
          </p>
          </form>`
          );
        response.writeHead(200);
        response.end(template);
      })

  } else if(pathname === '/create_process'){
    response.writeHead(200);
    response.end("success");
  }else{
    response.writeHead(404); 
    response.end("Not found");
  }

});
app.listen(3000);