install
===
>expo 사용 중일 경우
```
expo install react-native-screens >react-native-safe-area-context
```
>React Native 프로젝트 일 경우
```
npm install react-native-screens react-native-safe-area-context
```
>Mac을 사용 중이고 iOS용으로 개발 중인 경우 추가 실행
```
npx pod-install ios
```
>react-native-screens패키지가 Android 기기에서 제대로 작동하려면 하나의 추가 구성 단계가 필요. MainActivity클래스 본문에 다음 코드를 추가
```
@Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(null);
}
``` 
-----------
React Navigation에서 지원하는 네비게이션의 종류
---
1. _Stack Navigation_
2. _Tab Navigation_
3. _Drawer Navigation_
-----------
<br/>

Stack Navigation
===
>React Navigation의 가장 일반적인 내비게이터, Stack Navigater는 앱이 화면 간에 전환하고 탐색 기록을 관리할 수 있는 방법을 제공.     
웹 브라우저에서 작동하는 방식과 React Navigation에서 작동하는 방식의 주요 차이점은 React Navigation의 기본 스택 내비게이터가 스택의 경로 사이를 탐색할 때 Android 및 iOS에서 기대할 수 있는 제스처와 애니메이션을 제공한다는 것.

</br>

**@ 사용 전에 아래 코드 실행하고**

```
npm install @react-navigation/native-stack
```

```
ex)

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
```

>Button을 만들어 Detail 페이지로 가고 싶다면 navigation props안의 navigate('') 함수를 이용.


```
ex)

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}
```
*navigate는 먼저 동일한 route 객체가 있는지 확인해서 있으면 해당 route로 이동하고, 없으면 route를 스택에 새로 쌓음.
push는 무조건 route를 스택에 새로 쌓음.*

**∴ 지나온 루트를 순차적으로 기록하기 위해선 push를 쓰는 것이 나음**

*그 밖에도 그 전 스택으로 돌아가는 goBack(),    
스택의 가장 첫번째 화면으로 돌아가는 popToTop() 등이 있다.*

-----------
<br/>

Tab Navigation
===
>모바일 앱에서 가장 일반적인 탐색 스타일. 화면 하단 또는 헤더 아래 상단(또는 헤더 대신)에 있는 탭.

</br>

**@ 사용 전에 아래 코드 실행하고**


```
npm install @react-navigation/bottom-tabs
```

```
ex)

import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

>탭끼리 이동하고 싶다면,

```
ex)

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}
```
>여러가지 옵션을 이용해서 커스텀도 가능하다. 문서 참조
-----------
<br/>

Drawer Navigation
===
>일반적인 탐색 패턴은 화면 간 탐색을 위해 왼쪽(때로는 오른쪽)에서 서랍을 사용.

</br>

**@ 사용 전에 아래 코드 실행하고**


```
npm install @react-navigation/drawer
```

```
ex)

import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
```
>그 밖에도 서랍을 열고 닫으려면,
```
navigation.openDrawer();
navigation.closeDrawer();
```

>서랍을 토글하려면,

```
navigation.toggleDrawer();
```

>탐색 상태 를 업데이트하기 위해 객체를 보내려면,

```
navigation.dispatch(DrawerActions.openDrawer());
navigation.dispatch(DrawerActions.closeDrawer());
navigation.dispatch(DrawerActions.toggleDrawer());
```
>서랍이 열려 있는지 닫혀 있는지 확인하려면,
```
import { useDrawerStatus } from '@react-navigation/drawer';

// ...

const isDrawerOpen = useDrawerStatus() === 'open';
```