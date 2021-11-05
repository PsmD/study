  //반복되는 코드를 객체를 이용하여 template 기능 정리
  //사용할 때는 template.HTML or list 로 사용하면 된다.
module.exports = {
    HTML:function(title, list, body, control){// ()안의 내용은 동작에 필요한 매개변수
      return `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${control}
        ${body}
      </body>
      </html>
      `;
    },list:function(filelist){
      var list = '<ul>';
      var i = 0;
      while(i < filelist.length){
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        i = i + 1;
      }
      list = list+'</ul>';
      //      <ul>
      //        <li><a href="/?id=HTML">HTML</a></li>
      //        <li><a href="/?id=CSS">CSS</a></li>
      //        <li><a href="/?id=JavaScript">JavaScript</a></li>
      //      </ul>
      // 위 코드를 정리
      return list;
    }//filelist는 동작에 필요한 매개 변수, <ul> 태그는 순서가 없는 HTML 리스트(list)를 정의할 때 사용. <ul> 요소에 속하는 각 아이템은 <li> 요소를 사용하여 나타낸다.
    // i가 하나씩 증가하면서 /data의 파일 개수보다 작을 때 까지 {} 안의 코드를 실행하며, 실행이 끝나면 <ul>을 닫고 list를 return 한다
  }
  // 밑에다가 module.exports = template; 를 쓰고, 위의 module.exports 를 var template 으로 바꿔도 똑같다.