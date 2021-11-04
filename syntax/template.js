var name = 'dogon';
var letter = 'Dear'+name+'\n\n dklfknlfdsl'+name;
// String literals 변수를 정의해준 뒤 +변수명 삽입 사이사이에 들어간다면 '를 넣어서 분리

var letter = `Dear ${name}dklfknlfdsl${name}`;
// Template literals 변수를 정의해준 뒤 ${변수명} 삽입
console.log(letter);