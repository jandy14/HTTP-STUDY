# GraphQL 실습하기
이 글은 이전 장에 이어서 GraphQL(이하 gql)의 요소에 대해서 알아보고 gql 스키마를 작성해보도록 하자.

# GraphQL 요소
이전 장에서 작성한 코드를 기준으로 살펴보자.

``` javascript
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
  },
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

## type 반환

위에 `info`보다 좀 더 복잡하고 실용적인 `Query`를 몇가지 작성하면서 gql에 대해 익숙해져 보자.

그전에 스키마를 별도의 파일로 분리하도록 하자.

src 디렉토리 안에 `schema.graphql`이라는 파일을 생성하자.

파일 안에 `typeDefs`의 내용을 넣어주자.

``` graphql
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

`index.js`에 `typeDefs`에는 다음과 같이 적어준다.
``` javascript
import fs from 'fs'
import path from 'path'

const typeDefs = fs.readFileSync(
  path.join(__dirname, './src/schema.graphql'),
  'utf8'
)
```

스키마를 추가해주면 그에 맞게 리졸버도 추가를 해야한다.

``` javascript
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
  },
  // 2
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },
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
``` graphql
# schema.graphql
type Link {
  id: ID!
  url: String!
  description: String
  urlLength: Int!
  shortDescription: String
}
```

``` javascript
// resolvers에 추가
Link: {
  id: (parent) => parent.id,
  description: (parent) => parent.description,
  url: (parent) => parent.url,
  urlLength: (parent) => parent.url.length,
  shortDescription: (parent) => parent.description.substring(0,5),
},
```
request
``` graphql
query {
  feed {
    urlLength
    shortDescription
  }
}
```
feed의 반환값 `linkValue`에는 `urlLength`나 `shortDescription`값이 없지만 리졸버를 통해 필드값을 정의할 수 있다.

사실 `id`,`url`,`description`같이 단순히 `parent`값에서 동명의 필드값을 반환하는 리졸버는 생략 가능하다. 그래서 다음과 같이 적어줄 수 있다.

``` javascript
Link: {
  urlLength: (parent) => parent.url.length,
  shortDescription: (parent) => parent.description.substring(0,5),
},
```
처음부터 이 사실을 알려주지 않은건 모든 필드 값들이 리졸버를 통해서 정의된다는 사실을 말하고 싶었기 때문이다.

## 리스트 타입
모든 타입들은 리스트 타입을 가진다.

이전 예제를 변형해 리스트를 반환해보자.
``` graphql
# schema.graphql
type Query {
  info: String!
  feed: [Link!]! # 1
}
```
``` javascript
// index.js
// 2
let linkValues = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

const resolvers = {
  Query: {
    info: () => `info api 입니다.`,
    // 3
    feed: () => linkValues,
  },
  Link: {
    urlLength: (parent) => parent.url.length,
    shortDescription: (parent) => parent.description.substring(0,5),
  },
}
```
1. 타입에 대괄호를 씌움으로써 리스트타입임을 나타낸다.
    - `!`표시를 두군데 할 수 있는데 위치에 따라서 의미가 조금 다르다.
    - [Link] : 리스트가 null일 수 있으며, 리스트 안에 요소도 null 일 수 있다.
    - [Link!] : 리스트가 null일 수 있지만, 리스트 안에 요소는 null일 수 없다.
    - [Link]! : 리스트가 null일 순 없지만, 리스트 안에 요소는 null일 수 있다.
    - [Link!]! : 리스트가 null일 수 없고, 리스트 안에 요소도 null일 수 없다.
    - 간단히 하면 안쪽에 !가 있으면 요소가 null이 될 수 없고, 바깥쪽에 !가 있으면 리스트 자체가 null이 될 수 없다.
2. 용도에 맞게 변수명을 복수형으로 변경하고 값도 리스트로 변경하였다.
3. 변경된 변수명을 적용하였다.

쿼리는 동일하다.
``` graphql
query {
  feed {
    id
    url
    description
    urlLength
    shortDescription
  }
}
```
다음과 같은 값을 얻을 수 있다.
``` json
{
  "data": {
    "feed": [
      {
        "id": "link-0",
        "url": "www.howtographql.com",
        "description": "Fullstack tutorial for GraphQL",
        "urlLength": 20,
        "shortDescription": "Fulls"
      }
    ]
  }
}
```
`linkValues`에 값을 추가하면 응답도 추가되는 것을 확인할 수 있다.

스키마에서 리스트 타입을 가지면, 리졸버가 반환한 리스트의 각 요소마다 다시 리졸버가 호출된다. (리졸버가 리스트를 반환하지 않으면 당연히 에러가 난다.)

## Mutation
`mutation`은 내부적으로 `거의` 차이가 없다. `query`는 데이터를 조회하고 `mutation`은 데이터를 변경한다는 개념적인 차이만 있을 뿐이다.

중요한 기술적인 차이가 한가지있다.

요청할 때, 아래처럼 여러 요청을 한번에 할 수 있는데,
``` graphql
# info와 feed를 한번에 요청했다.
query {
  info
  feed {
    id
  }
}
```
`query`는 요청을 병렬로 동시에 처리하지만 `mutation`은 순차적으로 처리해 경쟁상태를 방지한다.

`linkValues`에 값을 추가하는 `mutation`을 작성해보자.

``` graphql
# schema.graphql
type Mutation {
  # 1
  addLink(id: ID, url: String, desc: String) : Link
}
```
``` javascript
// resolvers
const resolvers = {
  Query: {
    info: () => `info api 입니다.`,
    feed: () => linkValues,
  },
  // Mutation resolver 추가
  Mutation: {
    addLink: (parent, args) => {
      if (!args.id || !args.url || !args.desc) {
        return null
      }
      const item = {
        id: args.id,
        url: args.url,
        description: args.desc,
      }
      linkValues.push(item)
      return item
    },
  },
  Link: {
    urlLength: (parent) => parent.url.length,
    shortDescription: (parent) => parent.description.substring(0,5),
  },
}
```
1. 새로운 타입 Mutation을 추가했다. Query와 마찬가지로 특수한 타입으로 요청의 시작점으로 사용할 수 있다.
   - `addLink`에는 세가지 파라미터가 있는데 요청때 전달해야할 값이다.
2. 스키마에 맞게 리졸버를 추가했다. 새로운 파라미터인 `args`를 사용했는데 `args`는 스키마에 정의한 파라미터 값들이 담겨있는 변수다.
    - 위 코드처럼 스키마에 적은 이름을 통해 전달받은 값에 접근 가능하다.

파라미터가 있는 요청은 다음과 같이 가능하다.
``` graphql
mutation {
  addLink(id: "link-1", url: "www.www.www", desc: "wwwdesc") {
    id
    url
    description
    urlLength
    shortDescription
  }
}
```
아폴로에서 제공하는 IDE에는 요청과 파라미터가 나누어져 있는데 결과는 동일하다.
``` json
{
  "data": {
    "addLink": {
      "id": "link-1",
      "url": "www.www.www",
      "description": "wwwdesc",
      "urlLength": 11,
      "shortDescription": "wwwde"
    }
  }
}
```
`feed`를 통해 값이 변경된 것도 확인할 수 있다.

# 나머지 리졸버 파라미터
## context
현재는 linkValues를 글로벌로 선언해 리졸버에서 접근하고 있지만 리졸버가 커짐에 따라 파일을 나누게 되면 문제가 생긴다.

그래서 gql서버는 `context`를 제공한다.

다음과 같이 사용한다.
``` javascript
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context 추가
  context: {
    linkValues: linkValues
  },
})
```
추가해준 `context`는 리졸버의 파라미터로 접근 가능하다.
``` javascript
// resolvers
Mutation: {
  addLink: (parent, args, context) => {
    if (!args.id || !args.url || !args.desc) {
      return null
    }
    const item = {
      id: args.id,
      url: args.url,
      description: args.desc,
    }
    // context를 통해 linkValues에 접근
    context.linkValues.push(item)
    return item
  },
}
```
context를 이용해 리졸버가 DB 커넥션이나 요청 헤더등을 얻을 수 있다.

## info
`info`는 리졸버의 파라미터이며 필드명이나 이전 리졸버등 현재 실행 상태에 대한 정보를 얻을 수 있다.

# 복습
GraphQL에 중요한 개념은 전부 다룬 것 같다.

위 예제가 아닌 다른 예시를 참고하며, 복습해보자.

## 스키마
``` graphql
type Query {
  stores: [Store!]
  store(id: ID!): Store
  product(id: ID!): Product
}
type Mutation {
  store(title: String!, description: String): Store
  product(storeId: ID!, title: String!, price: Int!): Product
}
type Store {
  id: ID!
  title: String!
  description: String
  products: [Product!]
}
type Product {
  id: ID!
  title: String!
  price: Int!
  store: Store!
}
```
## context
``` javascript
context: {
  stores: [],
  products: []
}
```
## 리졸버
Query
``` javascript
Query: {
  stores: (parent, args, context, info) => context.stores,
  store: (parent, args, context, info) => {
    return context.stores.find(element => element.id === args.id)
  },
  product: (parent, args, context, info) => {
    return context.products.find(element => element.id === args.id)
  }
}
```
Mutation
``` javascript
Mutation: {
  store: (parent, args, context, info) => {
    const item = {
      id: context.stores.length,
      title: args.title,
      description: args.description,
    }
    context.stores.push(item)
    return item
  },
  product: (parent, args, context, info) => {
    const item = {
      id: context.products.length,
      title: args.title,
      price: args.price,
      storeId: args.storeId,
    }
    context.products.push(item)
    return item
  }
}
```
Store
``` javascript
Store: {
  products: (parent, args, context, info) => {
    return context.products.filter(element => element.storeId === parent.id)
  }
}
```
Product
``` javascript
Product: {
  store: (parent, args, context, info) => {
    return context.stores.find(element => element.id === parent.storeId)
  }
}
```

## 부연 설명
혼동할 수 있는 요소에 대해 설명한다.

----
스키마에는 `Store` 타입이 정의되어 있고, 서버에는 가게 정보를 저장하는 `context.stores`가 정의되어 있다.

`Store`는 `id`, `title`, `description`, `products` 필드를 가지고 있지만 `context.stores`에 저장하는 값은 `id`, `title`, `description` 뿐이다.

`products`는 리졸버에 정의한 것처럼 `context.products`에 있는 값 중 `storeId`가 동일한 값을 가져와 반환하는 것이다.

----
----
쿼리를 보내려고 하면 다음같은 상황이 생길 것이다.
```
query {
  stores {
    id
    products {
      title
      store {
        id
        title
        products {
          ....
        }
      }
    }
  }
}
```
`stores`에서 얻을 수 있는 `Store`의 필드값에는 `products`가 있는데 `Product`의 필드값에는 `store`가 존재한다.

두 필드는 서로의 타입을 반환하므로 순환된다.

악의적인 사용자가 계속 순환하는 요청을 보내도 정확히 막을 수 없다.

이는 스키마를 정의할 때, 고려해야하는 상황이다.

요청 쿼리 깊이 제한하는 옵션도 존재한다.

----
----
위 예제에서 설명의 편의를 위해 `Query`에 다음 필드를 추가하자.
``` graphql
Query {
  stores: [Store!]
  store(id: ID!): Store
  product(id: ID!): Product
  # 모든 product를 보여주는 products 추가
  products: [Product!]!
}
```
``` javascript
//resolver query에 추가
products: (parent, args, context, info) => context.products,
```

아래 쿼리를 호출해보자.
``` graphql
query {
  products {
    store {
      id
    }
  }
}
```

위 쿼리에 응답하기 위해서 gql은 각 요소마다 `storeId`값으로 `context.stores`를 확인해 `store`를 찾는 리졸버가 호출된다.

만약 데이터가 DB에 저장되어 있더라면 요소마다 한번씩 값을 찾기 위해 리졸버가 DB를 호출하게 될 것이다. 게다가 중복되는 값이 많은 `storeId`와 같은 값이면 더욱 비효율적이게 된다.

이 문제는 `N+1 문제`로 알려져있고, 이를 해결하기 위해 캐싱이나 배치와 같은 방법으로 해결하기도 한다.

----

# 마무리
GraphQL에 대한 기본적인 개념에 대해 알아보고 실습해보았다.

실습을 통해 GraphQL에 대한 이해와 흥미가 생겼다면 좋겠다.

본 실습에서 다룬 내용 외에 스키마에는 `input`, `enum`, `scalar`와 같은 타입도 존재하고,

`Query`, `Mutation`외에 websocket을 이용한 `Subscription`이라는 특수 타입도 존재한다.

이미지 전송같은 기능을 구현하기 위해 미들웨어를 추가할 수도 있다.

GraphQL에 더욱 흥미가 생긴다면 위와 같은 키워드를 찾아보는 것도 좋겠다.



# 참고 자료
- how to graphql
    - https://www.howtographql.com/
- graphql docs
    - https://graphql.org/learn/