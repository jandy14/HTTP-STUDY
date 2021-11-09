# GraphQL 실습하기
이 글은 이전 장에 이어서 GraphQL(이하 gql)의 요소에 대해서 알아보고 gql 스키마를 작성해보도록 하자.

# GraphQL 요소
이전장에서 작성한 코드를 기준으로 살펴보자.

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

위 코드에는 `Query`라는 타입이 정의되어 있는데, `Query`에는 `info`라는 필드가 하나 있고, `info`는 `String!`이라는 타입이다. String 뒤에 붙은 `!`마크는 null이 될 수 없음(non-nullable)을 의미한다.

### 2. resolvers
`resolvers`에 적힌 내용은 위의 `typeDefs`에서 정의한 내용을 어떻게 찾는지 알려준다.

위 `typeDefs`에서 `info`는 `String!`을 가진다고 되어 있는데 어떤 값을 가지는지에 대한 정의가 `resolvers`에 함수로 정의된다.

위 `resolvers`에선 `info`의 값을 `() => "info api 입니다."`로 정해, `info`를 요청하면 해당 함수를 호출해 반환해준다.

### 3. ApolloServer
스키마(`typeDefs`)와 리졸버(`resolvers`)를 ApolloServer에 전달해주고, 서버를 실행시키면 이전 장에서 실습한 화면이 뜨게 된다.

서버에는 스키마와 리졸버 외에도 지정해줄 수 있는 값이 있어 앞으로 실습하면서 추가해 나가도록 하자.

뒤에서 자세히 다룰 내용이지만 gql은 `요청에 대한 반환 타입을 정의하는 스키마`와 `해당 내용을 어떻게 찾는지 정의하는 리졸버`가 핵심이다.

# 새로운 Query 추가
위에 `info`보다 좀 더 복잡하고 실용적인 `Query`를 작성해 보자.

추가하기 이전에 스키마를 별도의 파일로 분리하도록 하자.

src 디렉토리 안에 `schema.graphql`이라는 파일을 생성하자.

파일 안에 `typeDefs`의 내용을 넣어주자.

```
type Query {
    info: String!
}
```
