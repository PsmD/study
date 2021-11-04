var number = [1,400,12,34];
var i = 0;
var total = 0;
while(i < number.length){
  total = total + number[i];
  i = i + 1;
}
//number 배열 안의 숫자를 0번째부터 끝까지 더하여 변수 total 값으로 출력 total : 447
console.log(`total : ${total}`);