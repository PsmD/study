var members = ['egoing', 'k8805', 'hoya']; //members에는 []안의 내용이 있다는 것을 선언
console.log(members[1]); // k8805 출력, 0부터 출발하기 때문에 2번째 내용이 출력
var i = 0;
while(i < members.length){
  console.log('array loop', members[i]);
  i = i + 1;
}
 
var roles = {
  'programmer':'egoing',
  'designer' : 'k8805',
  'manager' : 'hoya'
}
console.log(roles.designer); //k8805
console.log(roles['designer']); //k8805
 
for(var n in roles){
  console.log('object => ', n, 'value => ', roles[n]);
}