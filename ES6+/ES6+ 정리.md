# Javascript ES6+에서 바뀐 문법 정리

### 바뀐 사항

1. const, let
2. 템플릿 문자열
3. 객체 리터럴
4. 화살표 함수
5. 구조분해 할당
6. 클래스
7. 프로미스  
8. async/await
---


1. const

ES6+ 부터는 var를 let과 const가 대체한다. var는 함수 스코프를 가지는 반면 const와 let은 블록 스코프 {}범위 를 가지는 차이가 있다. 함수 스코프 대신 블록 스코프를 사용함으로써 호이스팅 문제가 해결된다.
```
const a = 0;
a = 1;  // Uncaught TypeError

let b = 0;
b = 1; // 1
```
const c; // Uncaught Syntax Error
const : 선언과 동시에 값을 할당하며, 수정할 수 없다. 상수 선언.

let : 다른 값을 할당하는 상황에서 사용.

[Etc] 자바스크립트를 사용할 때 한번 초기화 한 변수에 다른 값을 할당하는 경우가 적어서 다른 값을 할당해야하는 상황이 생겼을때 let을 사용한다.

2. 템플릿 문자열

백틱으로 감싸면 문자열 안에 변수를 넣어 사용할 수 있다.

ES6 이전 코드
```
var num1 = 1;
var num2 = 2;
var result = 3;
var string1 = num1 + ' 더하기 ' + num2 + ' 는 \'' + result + '\' 입니다.';
console.log(string1);    // 1 더하기 2는 '3' 입니다.
```
ES6 이후 코드
```
const num1 = 1;
const num2 = 2;
const result = 3;
const string1 = `${num1} 더하기 ${num2}는 '${result}' 입니다.`;
console.log(string1);
```

3. 객체 리터럴
```
var sayNode = function(){
    console.log('Node');
}
var es = 'ES';
var oldObject = {
    sayJS: function(){
        console.log('JS');
    },
    sayNode: sayNode,
};
oldObject[es + 6] = 'Fantastic';
oldObject.sayNode();    // Node
oldObject.sayJS();      // JS
console.log(oldObject.ES6); // Fantastic
var newObject = {
    sayJS(){
        console.log('JS');
    },
    sayNode,
    [es + 6]: 'Fantastic',
};
newObject.sayNode();
newObject.sayJS();
console.log(newObject.ES6);
// 위와 동일하다.
```
코딩 시 편의를 위해 만들어진 문법으로

sayJS와 같은 객체의 메서드에 함수를 연결할 때 콜론과 function을 붙이지 않아도 된다.
sayNode: sayNode 처럼 속성명과 변수명이 동일한 경우 한번만 써도 되게 바뀌었다.
객체의 속성명을 동적으로 생성할 때 이전에는 리터럴 바깥에서 지정해야했는데 ES2015+에서는 객체 리터럴 안에 선언해도 된다.

4. 화살표 함수
```
// add1, 2, 3은 동일한 함수

function add1(x, y){
    return x + y;
}

const add2 = (x, y) => {
    return x + y;
}

const add3 = (x, y) => (x + y);

// not1, not2는 동일한 함수

function not1(x){
    return !x;
}

const not2 = x => !x;
```
function선언 대신 =>기호로 함수를 선언하며, 변수에 대입하면 나중에 재사용할 수 있다. 화살표 함수 내부에 return문만 있을 경우 return문을 생략하여 반환할 식을 바로 적을 수 있다.

기존 function과 다른 점은 this 바인딩 방식이며
```
// 기존방식
var relationship1 = {
    name: 'kim',
    friends: ['lee', 'park', 'han'],
    logFriends : function(){
        var that = this;    // relationship1을 가리키는 this를 저장
        this.friends.forEach(function(friend){
            console.log(that.name, friend);
        });
    },
};
relationship1.logFriends();
```
```
// 화살표함수
const relationship2 = {
    name: 'kim',
    friends: ['lee', 'park', 'han'],
    logFriends(){
        this.friends.forEach(friend => {
            console.log(this.name, friend);
        });
    },
}
relationship2.logFriends();
```
위와 같이 사용할떄 relationship1은 각자 다른 함수 스코프를 갖기때문에 변수 that에 따로 저장하여 간접적으로 접근하는 반면, relationship2 내의 화살표 함수는 상위 스코프의 this를 그대로 물려받을 수 있다.

5. 구조분해 할당
```
var candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy: function(){
        this.status.count--;
        return this.status.count;
    },
};
// 이전문법
var getCandy = candyMachine.getCandy;
var count = candyMachine.status.count;
```
```
// candyMachine 객체안의 속성을 찾아 매칭
const { getCandy, status: {count} } = candyMachine;
```
위와 같은 문법으로 candyMachine 객체 안의 속성을 사용할 수 있다.

배열에 대해서도 다음과 같이 할당할 수 있다.
```
var array = ['nodejs', {}, 10, true];
var node = array[0];
var obj = array[1];
var bool = array{3};
const array = ['nodejs', {}, 10, tarue];
const [node, obj, , bool] = array;
```
 
위 처럼, 배열의 위치에 따라 변수명을 할당해줄 수 있다. 구조분해 할당 문법 또한 코드 줄 수를 상당히 줄여준다.

6. 클래스

프로토타입 기반 문법을 클래스로 바꾼 것이라 보면 된다.
```
var Human = function(type){
    this.type = type || 'human';
}
Human.isHuman = function(human){
    return human instanceof Human;
}
Human.prototype.breathe = function(){
    alert('h-a-a-a-m');
}
var Kim = function(type, firstName, lastName){
    Human.apply(this, arguments);
    this.firstName = firstName;
    this.lastName = lastName;
}
Kim.prototype = Object.create(Human.prototype);
Kim.prototype.constructor = Kim;    // 상속하는 부분
Kim.prototype.SayName = function(){
    alert(this.firstName + ' ' + this.lastName);
};
var oldKim = new Kim('human','SY','Kim');
Human.istHuman(oldKim); // true
```
Human 생성자 함수가 있고, Kim 생성자 함수가 상속하는 구조이며 위와 같은 코드는 아래와 같이 클래스 기반으로 바꿀 수 있다.


```
class Human{
    constructor(type = 'human'){
        this.type = type;
    }
    static isHuman(human){
        retrun human instanceof Human;
    }
    breath(){
        alert('h-a-a-a-m');
    }
}

class Kim extends Human{
    constructor(type, firstName, lastName){
        super(type);
        this.firstName = firstName;
        this.lastName = lastName;
    }
    sayName(){
        super.breath();
        alert(`${this.firstName} ${this.lastName}`);
    }
}

const newKim = new Kim('human', 'SY', 'Kim');
Human.isHuman(newKim);  // true
```

 
class 안으로 그룹화 시킬 수 있으며, extends 키워드로 클래스 문법으로 바뀌었지만 프로토타입 기반으로 동작한다.

7. 프로미스

ES2015 부터는 자바스크립트와 노드의 API들이 콜백 대신 프로미스(Promise) 기반으로 재구성 된다. 매우 중요하므로 반드시 숙지해야한다.
```
const condition = true; // true면 resolve, false면 reject
const promise = new Promise((resolve, reject) => {
    if(condition){
        resolve('성공');
    }else{
        reject('실패');
    }
});
// ...
promise
    .then((message) => {
        console.log(message);   // 성공(resolve)한 경우 실행
    })
    .catch((error) => {
        console.error(error);   // 실패(reject) 시 실행
    })
    .finally(() => {    // 끝나고 무조건 실행
        console.log('무조건');
    });
```
콜백을 쓰는 패턴 바꾸기
```
function findAndSaveUser(Users){
    Users.findOne({}, (err, user) => {  // 첫번째 콜백
        if(err){
            return console.error(err);
        }
        user.name = 'kim';
        user.save((err) => {    // 두번째 콜백
            return console.error(err);
        });
        Users.findOne({gender: 'f'}, (err, user) = {    // 세번째 콜백
            // ...
        });
    });
}
function findAndSaverUser(Users){
    Users.findOne({})
        .then((user) => {
            user.name = 'kim';
            return user.save();
        })
        .then((user) => {
            return Users.findOne({gender: 'f'});
        })
        .then((user) => {
            // ...
        })
        .catch(err => {
            console log(err);
        })
}
```
위 처럼 각 콜백함수에 따라 따로 에러처리할 필요가 없으며 코드의 깊이가 깊어지지않는다.

8. async/awaitPermalink

ES2017에서 추가되었고, 노드에서는 7.6부터 지원된다. 비동기 위주 프로그래밍 시 많은 도움이된다.

asynce/await는 프로미스를 사용한 코드를 한 번 더 깔끔하게 줄여준다. 7번에서 줄인 프로미스 코드는


 ```
async function findAndSaverUser(Users){
    try {
    let user = await Users.findOne({});
    user.name = 'kim';
    user = await user.save();
    user = await Users.findOne({gender: 'f'});
    // ...
    } catch (error){
        console.log(error);
    }
}
```
위와 같이 async function을 통해 줄일 수 있으며 await을 붙여 프로미스가 resolve될 때까지 기다린 다음 user 변수를 초기화한다. 그리고 reject 시 예외를 처리하기 위해서 추가로 try/catch문으로 로직을 감싼다.

화살표 함수도 async와 같이 사용할 수 있다.
```
const findAndSaverUser = async (Users) => {
    // ...
}
```