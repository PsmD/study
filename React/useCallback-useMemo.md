# useMemo

메모리제이션된 값을 반환한다라는 문장이 핵심. 예를 들어 하위 컴포넌트는 상위 컴포넌트로부터 a와 b라는 두 개의 props를 전달 받는다. 하위 컴포넌트에서는 a와 b를 전달 받으면 서로 다른 함수로 각각의 값을 가공(또는 계산)한 새로운 값을 보여주는 역할을 한다. 하위 컴포넌트는 props로 넘겨 받는 인자가 하나라도 변경될 때마다 렌더링되는데, props.a 만 변경 되었을 때 이전과 같은 값인 props.b도 다시 함수를 호출해서 재계산해야 할까? 그냥 이전에 계산된 값을 쓰면 된다.

예제: https://codesandbox.io/s/upbeat-margulis-v8k51?file=/src/Info.js

App 컴포넌트의 입력창에서 color값만 바꾸어도 getColorKor, getMovieGenreKor 두 함수가 모두 실행되고 movie 값만 바꾸어도 마찬가지로 두 함수가 모두 실행된다. useMemo를 import 해서 Info 컴포넌트의 코드에서 colorKor과 movieGenroKor을 계산하는 부분을 아래와 같이 바꿔보면.

```
import React, { useMemo } from "react";

const colorKor = useMemo(() => getColorKor(color), [color]);
const movieGenreKor = useMemo(() => getMovieGenreKor(movie), [movie]);
```

useMemo를 사용하면 의존성 배열에 넘겨준 값이 변경되었을 때만 메모리제이션된 값을 다시 계산한다.

color값이 바뀔 때는 getColorKor함수만, movie값이 바뀔 때는 getMovieGenreKor함수만 호출되는 것을 확인할 수 있다. 지금 처럼 재계산하는 함수가 아주 간단하다면 성능상의 차이는 아주 미미하겠지만 만약 재계산하는 로직이 복잡하다면 불필요하게 비싼 계산을 하는 것을 막을 수 있다.

<br/>

# useCallback

메모리제이션된 함수를 반환한다라는 문장이 핵심이다. useMemo를 설명하고 있는 같은 예제에서 App.js의 onChangeHandler 함수는 내부의 color, movie 상태값이 변경될 때마다 재선언된다. 하지만 onChangeHandler 함수는 파라미터로 전달받은 이벤트 객체(e)의 target.id 값에 따라 setState를 실행해주기만 하면 되기 때문에, 첫 마운트 될 때 한 번만 선언하고 재사용하면 된다.

```
// App.js

import React, { useState, useCallback } from "react";

const onChangeHandler = useCallback(e => {
    if (e.target.id === "color") setColor(e.target.value);
    else setMovie(e.target.value);
  }, []);
```

App.js에서 useCallback을 import 하고 onChangeHandler함수의 선언부를 위와 같이 바꿨다. 첫 마운트 될 때만 메모리에 할당되었는지 아닌지 확인하기는 어렵겠지만 위와 같이 사용한다.

하지만, 비싼 계산이 아니라면 useMemo사용을 권장하지 않는 것처럼 이정도 수준의 함수 재선언을 막기 위해 useCallback을 사용하는 것도 크게 의미있어 보이지는 않는다. 다시 공식 문서를 꼼꼼히 읽어보면…

`This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. shouldComponentUpdate).`

와 같은 말이 나온다. 만약 하위 컴포넌트가 React.memo() 같은 것으로 최적화 되어 있고 그 하위 컴포넌트에게 callback 함수를 props로 넘길 때, 상위 컴포넌트에서 useCallback 으로 함수를 선언하는 것이 유용하다라는 의미이다. 함수가 매번 재선언되면 하위 컴포넌트는 넘겨 받은 함수가 달라졌다고 인식하기 때문이다.

React.memo()로 함수형 컴포넌트 자체를 감싸면 넘겨 받는 props가 변경되지 않았을 때는 상위 컴포넌트가 메모리제이션된 함수형 컴포넌트(이전에 렌더링된 결과)를 사용하게 된다.

함수는 오로지 자기 자신만이 동일하기 때문에 상위 컴포넌트에서 callback 함수를 (같은 함수이더라도) 재선언한다면 props로 callback 함수를 넘겨 받는 하위 컴포넌트 입장에서는 props가 변경 되었다고 인식한다.
