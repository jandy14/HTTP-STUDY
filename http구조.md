이 글은 [http흐름](./http흐름.md)의 내용에서 파생되는 내용입니다.

# http의 구조
http 메세지의 자세한 구조에 대해서 알아보자.

- start line
    - method
    - path
    - http version
    - status code
- header
- body

# Method
- `GET` : 서버측으로부터 데이터를 얻기위해 사용하는 메소드 (가져오다)
- `POST` : 서버측에 데이터를 보내기 위해 사용하는 메소드 (게시하다)
- `PUT` : 서버측에 데이터를 생성하기 위해 사용하는 메소드 (집어넣다)
- `DELETE` : 서버측에 데이터를 삭제하기 위해 사용하는 메소드 (제거하다)
- `HEAD` : GET과 같지만 body가 없는 response를 받음
- `OPTIONS` : 서버가 어떤 메소드를 지원하는지 확인하기 위한 메소드
- `TRACE` : 클라이언트가 보낸 패킷의 내용이 어떻게 변조되어 서버에 도착했는지 확인할 때 사용(보안상의 이유로 서버에서 반응안해줄 가능성이 높음)
- `CONNECT` : 클라이언트가 프록시를 통해서 서버와 SSL연결을 맺을 때 사용된다.
- `PATCH` : 자원의 부분적이 교체 PUT은 자원 전체를 교체한다 (수정하다)

(connect은 좀 더 추가적인 공부가 필요하다.)

# path
리소스의 경로이며 URL(Uniform Resource Locator)이라고 부른다.

URL은 URI의 일종이다. URI는 웹 서버가 리소르를 고유하게 식별할 수 있도록 하는 것을 말한다.

# http version
request의 http 버전을 나타낸다.

# status code
response의 결과에 따라 status code가 달라진다.


status code 다음과 같이 정해져 있다.
- 1XX (정보)
- 2XX (성공)
    - 200 OK 메서드에 따라 의미가 조금 다르지만 정상적으로 처리됨
    - 201 Created 요청이 성공적이며 그 결과로 새로운 리소스가 생성됨
    - 202 Accepted 요청은 수신됨. 처리는 어떻게 될지 모름
    - 204 No Content 요청은 성공적이지만 보내줄 컨텐츠는 없음
- 3XX (리다이렉션)
    - 301 Moved Permanently 리소스가 영구적으로 옮겨짐. 앞으로는 새 URL로 접근하시오.
    - 302 Found 리소스가 일시적으로 옮겨짐. 다음에도 현재 URL로 접근하시오.
    - 303 See Other 요청한 리소스를 다른 URI에서 GET 요청으로 얻어야 할 때, 서버가 클라이언트에 보내는 응답
- 4XX (클라이언트 에러)
    - 400 Bad Request 잘못된 문법으로 서버가 이해하지 못함
    - 401 Unauthorized 인증이 필요함 (서버는 클라이언트가 누구인지 모름)
    - 403 Forbidden 해당 리소스에 접근할 권한이 없음 (서버는 클라이언트가 누구인지 앎)
    - 404 Not Found 존재한지 않는 리소스 URI
    - 418 I'm a teapot 서버는 커피를 찻 주전자에 끓이는 것을 거부함
- 5XX (서버 에러)
    - 500 Internal Server Error 서버가 요청처리 도중 예상치 않은 상황에 놓임
    - 503 Service Unavailable 서버가 요청을 처리할 수 없는 상황임(과부하 등)
    

전체 상태 코드는 [링크](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)에서 확인 가능하다.

## URL의 구조
path는 url에서 도메인과 포트 뒤에 오는 정보이다. url의 구조를 설명해둔 사이트를 [링크](https://victorydntmd.tistory.com/287)해 둔다.

# 참고 자료
URI URL 그리고 URL구조
https://victorydntmd.tistory.com/287

http 상태 코드
https://developer.mozilla.org/ko/docs/Web/HTTP/Status

http 상태 코드
https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C

주요 http 상태 코드
https://sjh836.tistory.com/81