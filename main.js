var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

//필요한 모듈들을 require() 요청
 
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    //url을 분석하는 코드
    //동적 웹페이지 구성을 위해 href에 담긴 querystring을 포함하여 경로를 읽어올 수 있도록 url.parse() 메소드에 request.url을 통해 추출한 querydata를 이용
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        fs.readdir('./data', function(error, filelist){// /data에서 파일을 읽고, filelist는 data 디렉토리 안의 값.
          var title = 'Welcome';
          var description = 'Hello, Node.js';//pathname이 /'(home)일 경우 title로 Welcome, description으로 Hello, Node.js를 출력
          var list = template.list(filelist);
          var html = template.HTML(title, list,//filelist는 data 디렉토리 안의 값이고 그것을 template.list의 입력값으로 주면 그 filelist 값을 받아서 template.js에서 정보를 만든 후에 그 값을 리턴.
            `<h2>${title}</h2>${description}`,//body 부분
            `<a href="/create">create</a>`//control 부분
          );
          response.writeHead(200);
          response.end(html);
        });
      } else {
        fs.readdir('./data', function(error, filelist){
          var filteredId = path.parse(queryData.id).base;
          fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
            var title = queryData.id;
            var sanitizedTitle = sanitizeHtml(title);// sanitizeHtml은 일종의 보안 모듈 title과 description에 <script> 같은 위험한 것을 작성 했을 때 자동으로 지워준다.
            var sanitizedDescription = sanitizeHtml(description, {
              allowedTags:['h1']//지워지는 대상에서 <h1> 태그는 예외로 두고 싶을 때 사용하는 코드다.
            });
            var list = template.list(filelist);
            var html = template.HTML(sanitizedTitle, list,
              `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
              ` <a href="/create">create</a>
                <a href="/update?id=${sanitizedTitle}">update</a>
                <form action="delete_process" method="post">
                  <input type="hidden" name="id" value="${sanitizedTitle}">
                  <input type="submit" value="delete">
                </form>`
            );//화면에 create, update, delete 버튼 구현
            response.writeHead(200);
            response.end(html);
          });
        });
      }
    } else if(pathname === '/create'){//else if는 if가 거짓일 경우에 else로 가기전에 한번 더 참 거짓을 판별하고 실행할 코드를 작성하는 곳.
      fs.readdir('./data', function(error, filelist){
        var title = 'WEB - create';
        var list = template.list(filelist);
        var html = template.HTML(title, list, `
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
        `, '');
        response.writeHead(200);
        response.end(html);
      });
    } else if(pathname === '/create_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var title = post.title;
          var description = post.description;
          fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
          })//사용자가 create 버튼을 누르고, title과 description에 내용을 작성하면 /create_process로 post 방식(쿼리 스트링을 노출하지 않는 방식)으로 보내고 data 디렉토리에 추가되는 코드
      });
    } else if(pathname === '/update'){
      fs.readdir('./data', function(error, filelist){
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
          var title = queryData.id;
          var list = template.list(filelist);
          var html = template.HTML(title, list,
            `
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${title}">
              <p><input type="text" name="title" placeholder="title" value="${title}"></p>
              <p>
                <textarea name="description" placeholder="description">${description}</textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
          );
          response.writeHead(200);
          response.end(html);
        });
      });
    } else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var id = post.id;
          var title = post.title;
          var description = post.description;
          fs.rename(`data/${id}`, `data/${title}`, function(error){
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
              response.writeHead(302, {Location: `/?id=${title}`});
              response.end();
            })
          });
      });//사용자가 update 버튼을 누르고 미리 작성돼 있는 이전 내용을 불러오고 title과 description의 내용을 수정하면 /update_process로 post 방식(쿼리 스트링을 노출하지 않는 방식)으로 보내고 data 디렉토리가 갱신되는 코드
    } else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var id = post.id;
          var filteredId = path.parse(id).base;
          fs.unlink(`data/${filteredId}`, function(error){//fs.unlink(path, callback)을 써서 파일을 지우고 홈으로 보내는 코드
            response.writeHead(302, {Location: `/`});
            response.end();
          })
      });
    } else {
      response.writeHead(404);
      response.end('Not found');
    }//
});
app.listen(3000);
//요청에 대해서 응답할 수 있도록 http 서버를 구동시키는 API