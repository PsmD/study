# useRef란?
useRef는 특정 DOM을 가리킬 때 사용하는 Hook함수이다. useRef를 사용하는 예로는 대상에 대한 포커스 설정, 특정 엘리먼트의 크기나 색상을 변경할 때 사용하게 되는데, ref 자체의 뜻을 설명하자면 ref는 Javascript의 getElementById() 처럼 컴포넌트의 어떤 부분을 선택할 수 있게 해주는 방법이다. 

DOM에 접근 할 수 있도록 하는 기능을 가진 hook이라고 보면 되고, 리액트에 있는 모든 컴포넌트는 reference element(래퍼런스 엘리먼트)를 가지고 있어서 어떤 컴포넌트에 ref={변수명}을 넣어준다면, 리액트에서 해당 컴포넌트를 참조하게 된다.

## useRef 사용방법
```
import React, {useRef} from 'react';
```

먼저 React에서 제공해주는 hook이기 때문에 컴포넌트 최상단에 react와 같이 import를 해준다.

컴포넌트 내 상단에 useRef()를 선언
```
const here = useRef();
```
DOM에 접근 할 태그 및 컴포넌트에 ref를 선언
```
 <input ref={here} placeholder="how are you" />
3초 뒤에 input창에 포커싱 되는 코드를 작성해 보았습니다.
import React, { useRef } from "react";

const App = () => {
  // 1. Ref객체 만들기
  const here = useRef();
  2. focus( ) DOM API 호출
  setTimeout(() => here.current.focus(), 3000);
  return (
    <div>
      <h1>Hello</h1>
      // 2. 원하는 곳에 ref 값으로 설정하기
      <input ref={here} placeholder="how are you" />
    </div>
  );
};

export default App;
```
useRef() 를 사용해 Ref 객체 만들기

해당 객체를 활용한 작업 설정 .current.focus()
만든 Ref객체를 선택하고 싶은 DOM에 ref 값으로 설정 -> Ref객체의 .current값은 선택한 DOM을 가리키게 되고,
useRef()에 파라미터를 넣어주면, 이 값이 .current의 기본값이 된다.

## Etc
useRef 특정 DOM을 선택하는 용도 이외에도 Component 안에서 조회 및 수정이 가능한 변수를 관리하는 용도로도 사용된다.

하지만 useRef 이용해서 변수를 업데이트 하게 되면 해당 Component가 리렌더링 되지 않기 때문에 리렌더링을 원한다면 callback ref를 사용해야 한다.

굳이 리렌더링이 필요없는 변수를 다룰때는 useRef를 사용하는 것이 효율적이다.

### useRef를 통해 관리되는 변수가 주로 쓰이는 곳

1. setTimeout, setInterval을 통해 만들어진 id
2. scroll의 위치
3. 배열에 새 항목이 추가 될 때 필요한 고유 key 값
4. 외부 라이브러리를 사용하여 생성된 인스턴스

