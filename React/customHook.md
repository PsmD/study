# custom hook 이란?

말 그대로 개발자가 스스로 커스텀 한 훅을 말한다. useState,useEffect 등은 이미 내장되어 있는 훅으로 바로 사용 가능하지만, 커스텀 혹은 개발자의 입맛에 따라 만들어 사용이 가능하다. 보통 중복되는 코드를 하나의 로직으로 묶어 언제나 쉽게 import 하여 사용할 수 있게 하기 위해 사용한다.

## custom hook은 언제 사용하는가

주로 자주 사용되는 커스텀 혹은 유저의 input을 관리 할때, fetch를 요청할 때 사용한다. 앞에 언급했듯이 코드와 로직의 반복을 최소화하고 재사용성을 높이기 위함. 변경사항이 있을 시 커스텀 훅에서만 변경하면 되기에 수정할 때 효율적이다.

## 사용 예시

### 커스텀 훅을 사용할 땐 앞에 use를 붙여야 한다.

```
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (initialUrl: string) => {
    const [url, setUrl] = useState(initialUrl);
    const [value, setValue] = useState('');

    useEffect(()=> {
        fetchData();
    }, [url]);

    const fetchData = () => axios.get(url).then(({data}) => setValue(data));

    return [value];
};

export defalut useFetch;
```
### 과정

1. initialUrl은 useState의 url이 받는다.
2. useEffect 실행
3. useEffect 내에 존재하는 fetchData 실행, 비동기로 value가 data를 받는다.

### 다른 곳에서 사용할 때는
```
import useFetch from '.../useFetch.tsx';

const App = () => {
    const [value] = useFetch('...');

    return <div>{value}</div>;
}

export default App;
```

이렇게 사용하면 value를 받아오는 대로 value가 표시된다.
그 이유는 리액트에서 컴포넌트는 상태 혹은 props가 변하면 다시 렌더링 하기 때문.