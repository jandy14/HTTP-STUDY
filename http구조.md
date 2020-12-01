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
- GET : 서버측으로부터 데이터를 얻기위해 사용하는 메소드 (가져오다)
- POST : 서버측에 데이터를 보내기 위해 사용하는 메소드 (게시하다)
- PUT : 서버측에 데이터를 생성하기 위해 사용하는 메소드 (집어넣다)
- DELETE : 서버측에 데이터를 삭제하기 위해 사용하는 메소드 (제거하다)
- HEAD : GET과 같지만 body가 없는 response를 받음
- OPTIONS : 서버가 어떤 메소드를 지원하는지 확인하기 위한 메소드
- TRACE : 클라이언트가 보낸 패킷의 내용이 어떻게 변조되어 서버에 도착했는지 확인할 때 사용(보안상의 이유로 서버에서 반응안해줄 가능성이 높음)
- CONNECT : 클라이언트가 프록시를 통해서 서버와 SSL연결을 맺을 때 사용된다.
- PATCH : 자원의 부분적이 교체 PUT은 자원 전체를 교체한다 (수정하다)

(connect은 좀 더 추가적인 공부가 필요하다.)

# path
리소스의 경로이며 URL(Uniform Resource Locator)이라고 부른다.

URL은 URI의 일종이다. URI는 웹 서버가 리소르를 고유하게 식별할 수 있도록 하는 것을 말한다.

## URL의 구조
path는 url과 약간의 차이가 있지만 url의 구조를 설명해둔 사이트를 [링크](https://victorydntmd.tistory.com/287)해 둔다.

# 참고 자료
URI URL 그리고 URL구조
https://victorydntmd.tistory.com/287