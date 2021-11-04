console.log(1);
console.log(2);
console.log(3);
console.log('A');
console.log('Z');
console.log('B');
console.log(1);
console.log(2);
console.log(3);
console.log('F');
console.log('C');
console.log('P');
console.log('J');
console.log(1);
console.log(2);
console.log(3);
console.log('U');
console.log('A');
console.log('Z');
console.log('J');
console.log('I');
console.log(1);
console.log(2);
console.log(3);
 
//반복되는 코드를 아래와 같이 변경

f123();
console.log('A');
console.log('Z');
console.log('B');
f123();
console.log('F');
console.log('C');
console.log('P');
console.log('J');
f123();
console.log('U');
console.log('A');
console.log('Z');
console.log('J');
console.log('I');
f123();
 
function f123(){
  console.log(1);
  console.log(2);
  console.log(3);
}
//function 함수명(변수명){실행코드}