# GraphQL 시작하기
이 글에서는 GraphQL을 체험해보기 위한 분들을 위한 글이며 아래와 같은 내용을 포함하고 있다.

- GraphQL에 대한 간단한 개요
- 실습 환경 세팅
- GraphQL을 이용한 api 작성 및 실습
    - 내용 조회하기
    - 내용 생성 및 수정

본 실습은 https://www.howtographql.com/graphql-js/0-introduction/ 을 기반으로 작성되었다.

# 개요
GraphQL(이하 gql)은 페이스북(meta)에서 개발한  프론트와 서버(백엔드)간에 사용되는 쿼리언어다.

gql은 다음과 같은 특징이 있다.

- 요청을 request body를 통해 쿼리로 하기때문에 하나의 엔드포인트로 모든 요청을 받는다. 또한 하나의 요청에 여러 쿼리를 보낼 수 있다.(단, 조회와 수정을 동시에 할 순 없다.)
- 전달받은 객체에서 필요한 필드만 선택해서 받을 수 있다.

위 특징으로 인해 다음과 같은 이점을 얻을 수 있다.

- API콜을 줄일 수 있으며, 반환하는 필드를 프론트에서 필요한 값만 요청하기 때문에 REST에 비해서 트래픽을 줄일 수 있다.
- 같은 내용을 다른 형태로 반환하는 API를 여러번 만들 필요가 없다.

단점도 물론 존재한다.

- 프론트에서 요청한대로 반환하기 때문에 요청에 대한 제약이 없으면 성능이슈로 이어질 수 있다.
- 구조상의 문제로 `N+1 문제`라는 것이 존재한다.

# 실습 환경 세팅

## Node.js 설치
각 운영체제에 맞은 node를 설치하면 된다.

https://nodejs.org/ko/download/

설치 확인은 아래 커맨드로 가능하다.

```
npm -v
node -v
```

필자는 `node v14.15.3`, `npm 8.1.0`에서 실습했다.

## Node.js 프로젝트 세팅
우선 작업을 진행할 디렉토리를 생성하고 프로젝트 초기 세팅을 해준다.
```
mkdir hello-node-graphql
cd hello-node-graphql
npm init -y
```
현재 디렉토리(hello-node-graphql)에 package.json이 생성된다.

그리고 필요한 패키지를 설치한다.
```
npm install apollo-server@^2 graphql
```

주의: `apollo-server` 뒤에 붙은 `@^2`는 패키지의 메이저 버전을 명시하는 것이며, 참고한 자료가 2버전을 기준으로 작성되어서 본 실습에서도 이를 따른다. (현재는 3버전이 메이저 버전이며, 약간의 기능차이가 있지만 이번 실습에서는 호환가능하다.)

설치가 끝나면 `package.json`에 dependencies항목에 프로젝트에 설치된 항목이 갱신되며 `node_modules`라는 디렉토리에 실제 패지키를 확인할 수 있다.

해당 package.json을 복사해 다른 곳에 생성한 후 `npm install` 명령을 실행하면 필요한 패키지 설치를 한번에 할 수 있다.

# 참고 자료
- how to graphql
    - https://www.howtographql.com/