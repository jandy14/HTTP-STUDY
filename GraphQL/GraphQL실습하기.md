# GraphQL 실습하기
이 글은 이전 장에 이어서 GraphQL(이하 gql)의 요소에 대해서 알아보고 gql 스키마를 작성해보도록 하자.

# GraphQL 요소
이전 장에서 작성한 코드를 기준으로 살펴보자.

```
const { ApolloServer } = require('apollo-server');

// 1
const typeDefs = `
  type Query {
    info: String!
  }
`

// 2
const resolvers = {
  Query: {
    info: () => `info api 입니다.`
  }
}

// 3
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );
```
### 1. typeDefs
`typeDefs`에 적힌 내용은 gql서버에 요청할 수 있는 스키마에 대한 정의다.

위 코드에는 `Query`라는 타입이 정의되어 있는데, `Query`에는 `info`라는 필드가 하나 있고, `info`는 `String!`이라는 타입으로 정의되어 있다. String 뒤에 붙은 `!`마크는 null이 될 수 없음(non-nullable)을 의미한다.

### 2. resolvers
`resolvers`에 적힌 내용은 위의 `typeDefs`에서 정의한 내용을 어떻게 찾는지 알려준다.

위 `typeDefs`에서 `info`는 `String!`을 가진다고 되어 있는데 어떤 값을 가지는지에 대한 정의가 `resolvers`에 함수로 정의된다.

위 `resolvers`에선 `info`를 `() => "info api 입니다."`로 정의했으므로, `info`를 요청하면 해당 함수를 호출해 반환해준다.

### 3. ApolloServer
스키마(`typeDefs`)와 리졸버(`resolvers`)를 ApolloServer에 전달해주고, 서버를 실행시키면 이전 장에서 실습한 화면이 뜨게 된다.

서버에는 스키마와 리졸버 외에도 지정해줄 수 있는 값이 있어 앞으로 실습하면서 추가해 나가도록 하자.

뒤에서 계속 다룰 내용이지만 gql은 `요청에 대한 반환 타입을 정의하는 스키마`와 `해당 내용을 어떻게 찾는지 정의하는 리졸버`가 핵심이다.

# 새로운 Query 추가
위에 `info`보다 좀 더 복잡하고 실용적인 `Query`를 몇가지 작성하면서 gql에 대해 익숙해져 보자.

그전에 스키마를 별도의 파일로 분리하도록 하자.

src 디렉토리 안에 `schema.graphql`이라는 파일을 생성하자.

파일 안에 `typeDefs`의 내용을 넣어주자.

```
type Query {
  info: String!
  feed: Link!
}

type Link {
  id: ID!
  url: String!
  description: String
}
```

`Link`라는 새로운 타입이 정의되었고, `Query`에는 `Link`타입을 가지는 `feed`라는 필드가 추가되었다.

타입을 정의하는건 간단하다. 타입에 들어가는 필드와 필드의 타입만 알려주면 된다.

위 `Link`는 `id`, `url` 그리고 `description`으로 이루어진 타입이다.

`ID`타입은 `String`과 본질적으론 같지만 식별자로써 사용되는걸 알리기 위해 사용한다.

스키마를 추가해주면 그에 맞게 리졸버도 추가를 해야한다.

```
let linkValue = {
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}

const resolvers = {
  Query: {
    info: () => `info api 입니다.`,
    // 1
    feed: () => linkValue,
  }
  // 2
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  }
}
```

1. `Query`에 새로운 리졸버 `feed`를 추가했다. `feed`는 `linkValue`를 반환하는 함수를 리졸버로 정의했다.
2. 새로운 타입인 `Link`의 필드에 대해서도 리졸버를 정의해야 한다. 리졸버는 사실 4개의 파라미터를 가질 수 있는데, 지금 사용된 `parent`는 `이전의 리졸버가 반환한 값`이다. 호출 순서를 살펴 보자.

우선 프론트에서 다음과 같이 요청을 보낸다.
```
query {
  feed {
    id
    url
    description
  }
}
```
`feed`값을 알고 싶으며, `feed`(`Link`타입)가 가지는 여러 필드 중 `id`, `url` 그리고 `description`값을 요청한다는 의미다.

서버는 `feed`의 값을 구하기 위해 `feed`에 정의된 리졸버(`() => linkValue`)를 호출해 `linkValue`를 반환한다.

`feed`의 타입은 기본 타입(`String`같은 스칼라 타입)이 아닌 여러 필드를 가질 수 있는 사용자정의 타입인 `Link`이기 때문에 요청을 할때도 어느 필드값을 알고 싶은지 정해서 요청을 하고, 응답을 할때도 `feed`의 반환값을 그대로 사용하는 것이 아니라 `Link`의 각 필드값을 구하기 위해서 각 필드의 리졸버를 다시 호출한다. 이때 이전 리졸버의 반환값을 `parent`를 통해서 얻을 수 있다.

`parent`값을 통해서 구할 수 있으면 되기 때문에 아래와 같이 활용도 가능하다.
```
// schema.graphql
type Link {
  id: ID!
  url: String!
  description: String
  urlLength: Int!
  shortDescription: String
}
// resolvers
Link: {
  id: (parent) => parent.id,
  description: (parent) => parent.description,
  url: (parent) => parent.url,
  urlLength: (parent) => parent.url.length,
  shortDescription: (parent) => parent.description.substring(0,5),
}
// request
query {
  feed {
    urlLength
    shortDescription
  }
}
```
feed의 반환값 `linkValue`에는 `urlLength`나 `shortDescription`값이 없지만 리졸버를 통해 필드값을 정의할 수 있다.

사실 `id`,`url`,`description`같이 단순히 `parent`값에서 동명의 필드값을 반환하는 리졸버는 생략 가능하다. 그래서 다음과 같이 적어줄 수 있다.

```
Link: {
  urlLength: (parent) => parent.url.length,
  shortDescription: (parent) => parent.description.substring(0,5),
}
```
처음부터 이 사실을 알려주지 않은건 모든 필드 값들이 리졸버를 통해서 정의된다는 사실을 말하고 싶었기 때문이다.



스칼라 타입 내용 정리
리스트 타입
뮤테이션
리졸버 파라미터
//정리중

- [Link] : 리스트가 null일 수 있으며, 리스트 안에 요소도 null 일 수 있다.
- [Link!] : 리스트가 null일 수 있지만, 리스트 안에 요소는 null일 수 없다.
- [Link]! : 리스트가 null일 순 없지만, 리스트 안에 요소는 null일 수 있다.
- [Link!]! : 리스트가 null일 수 없고, 리스트 안에 요소도 null일 수 없다.

간단히 하면 안쪽에 !가 있으면 요소가 null이 될 수 없고, 바깥쪽에 !가 있으면 리스트 자체가 null이 될 수 없다.
