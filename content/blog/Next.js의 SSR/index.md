---
title: Next.js의 SSR
date: "2022-06-19T15:32:45.284Z"
description: "Next.js에서 사용하는 서버 사이드 렌더링에 대해서 알아봅니다."
---

`Next.js`는 사전 렌더링이 가능하다는 특장점을 갖고 있는 리액트 프레임워크이다.

React로 개발을 해봤다면 useEffect Hooks를 써봤을 것이다. 이 useEffect Hook에서 의존성 배열(dependency array)에 빈 대괄호를 넣을 경우 최초 렌더링 시에만 1회 실행된다. 그렇지만 이 경우 비어있는 배열에 바로 값이 저장되는 형태가 아닌, 최초 렌더링 시에는 비어있는 형태로 렌더링이 되었다가 useEffect가 실행되면서 내부 함수가 실행되는 과정 이후 한 번의 렌더링이 더 있은 후에야 해당 useEffect가 적용이 되는 형태이기 때문에 안좋은 사용자 경험(예를 들면 페이지 접속 시 깜빡인다든가)을 제공한다.

예를 들어 아래의 컴포넌트가 있다고 해보자.

> SampleComponent.tsx (CRA 기반)

```tsx
import React, { useState, useEffect } from "react"

type DummyDataType = {
  id: number
  title: string
}

const SampleComponent = () => {
  const DUMMY_DATA = [
    {
      id: 1,
      title: "first data",
    },
    {
      id: 2,
      title: "second data",
    },
  ]

  const [sampleState, setSampleState] = useState<Array<DummyDataType>>([])
  useEffect(() => {
    setSampleState(DUMMY_DATA)
  }, [])

  return (
    <>
      {sampleState.map(data => (
        <h1 key={data.id}>{data.title}</h1>
      ))}
    </>
  )
}

export default SampleComponent
```

최초 렌더링 시 `sampleState`는 비어있는 배열의 형태를 가지며 그 이후 `useEffect`를 통해 값이 채워지게 된다. 그 다음 두 번째 렌더링을 통해 그 렌더링된 값이 보여지는 형태이다. 이 과정에서 화면에 깜빡임이 생길 수 있고, 이는 안좋은 사용자 경험을 제공하게 되는 것이다.

이러한 문제를 Next.js에서 제공하는 사전 렌더링 기능으로 해결할 수 있다. 렌더링 이전에 미리 값을 지정해두어 최초 렌더링 시 바로 값이 보이게끔 하는 것이다.

이러한 사전 렌더링(pre-rendering)을 위한 data fetching을 할 수 있는 기능으로 `getStaticProps`와 `getServerSideProps`가 있다. 두개가 제공하는 기능이 다르므로 어떤 상황에서는 어떤 것을 쓰는 게 더 좋을지 알아보자.

## 1. getStaticProps(SSG: Static Site Generation)

`getStaticProps`는 최초 빌드 시에 딱 한 번만 호출이 된다. 그 말인 즉슨, 최초 빌드 시 빌드되는 값이 추후에 수정될 일이 없는 경우에 사용하기 좋다는 것이다. 이러한 케이스의 예시로는 모든 정적인 페이지의 폼에 해당한다.

위 예시에 적용해보겠다.

> SampleComponent.tsx (Next.js 기반)

```tsx
type DummyDataProps = {
  id: number
  title: string
}

const DUMMY_DATA = [
  {
    id: 1,
    title: "first data",
  },
  {
    id: 2,
    title: "second data",
  },
]

const SampleComponent = (data: Array<DummyDataProps>) => {
  return (
    <>
      {data.map(data => (
        <h1 key={data.id}>{data.title}</h1>
      ))}
    </>
  )
}

export async function getStaticProps() {
  return {
    data: DUMMY_DATA,
    // revalidate: 10,
  }
}

export default SampleComponent
```

위와 같은 static generation을 사용했을 때는 빈 배열을 지정하고 최초 렌더링 시 그 배열에 값을 저장하는 형태가 전혀 필요없다. 따라서 Hooks들을 전부 지워줘도 된다. 아래 사진처럼 잘 나온다.

`getStaticProps` 적용
물론 이 `getStaticProps`의 경우에도 요청이 들어올 때마다 주기적으로 업데이트할 수 있도록 return문 내부 파라미터로 `revalidate`를 넣을 수 있다. 위 코드블럭에서 주석처리한 부분을 적용한다면 10초마다 주기적으로 업데이트하게 된다.

후술할 `getServerSideProps`보다 호출 시 data fetching을 하지 않으므로 성능면에서 더 좋다.

## 2. getServerSideProps(SSR: Server Side Rendering)

`getServerSideProps`는 `getStaticProps`와 다르게 요청이 들어올 때마다 호출되며, 그 때마다 사전 렌더링을 진행한다.

이 경우, 요청 시마다 다시 호출되므로 빌드 이후 자주 바뀌게 될 동적 데이터가 들어갈 때 더 사용하기 좋다.

마찬가지로 위 예시에 적용해보겠다.

```tsx
type DummyDataProps = {
  id: number
  title: string
}

const DUMMY_DATA = [
  {
    id: 1,
    title: "first data",
  },
  {
    id: 2,
    title: "second data",
  },
]

const SampleComponent = (data: Array<DummyDataProps>) => {
  return (
    <>
      {data.map((data: DummyDataProps) => (
        <h1 key={data.id}>{data.title}</h1>
      ))}
    </>
  )
}

export async function getServerSideProps(context) {
  const req = context.req
  const res = context.res

  return {
    data: DUMMY_DATA,
  }
}

export default SampleComponent
```

이 경우도 마찬가지로 잘 렌더링된다. 다만 서버쪽에서 렌더링하는 것이므로 파라미터로 context를 받아 서버의 요청 및 응답을 저장하는 req, res 변수를 저장해둬야 한다.

따로 revalitdate로 주기를 정하지 않는 이상 다시 업데이트하지 않는 `getStaticProps`에 비해 요청이 들어올 때마다 호출하기 때문에 `getServerSideProps`는 `getStaticProps`에 비해 성능상으로는 안 좋지만 내용을 언제든지 수정할 수 있다는 특장점이 있다.

상황에 따라 다르므로 더 적절한 것을 선택하면 될 것 같다.
