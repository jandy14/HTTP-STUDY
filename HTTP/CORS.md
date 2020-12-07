# CORS란
Cross Origin Resource Sharing

출처가 다른 리소스를 사용하지 않는 SOP를 완화하기 위해 출처가 다른 리소스를 허용할 수 있게 만드는 장치. 서버에서 헤더에 내용을 추가해 허용하게 해준다.

사전에 알아야 할 내용에 대해 알아보자
- XMLHttpRequest
- ajax
- Same-Origin Policy
- 관련 헤더
# XMLHttpRequest
페이지의 갱신없이 서버와 통신하고 페이지의 내용을 변경하기 위한 request

AJAX 프로그래밍에 주로 사용된다.

이름이 XML,HTTP지만 여러 프로토콜과 여러 포맷의 데이터를 지원한다.

경우에 따라 서버와의 통신을 위해서 `EventSource`를 이용한 `SSE`를 이용하거나 `웹소켓`을 고려해 볼 수 있다.

## SSE
Server-Sent Event

서버에서 클라이언트의 요청없이 데이터를 전송하는 방식

단방향 통신이다.

SSE를 이용하기 위해서는 클라이언트측에 EventSource를 이용한 별도의 코딩이 필요하다.

## 웹소켓
서버와 클라이언트간의 양방향 통신 세션을 생성하는 기술

클라이언트의 폴링없이 이벤트 중심 응답을 받는 것이 가능하다.

서버측의 웹소켓 API는 Node.js의 Socket.io가 유명하다.
### Socket.io
Node.js에 구현된 웹소켓API로 웹소켓을 지원하지 않는 클라이언트는 내부적으로 폴링을 사용하게해 구현에서 따로 신경쓸 필요가 없다.

# AJAX
Asynchoronous JavaScript And XML

AJAX는 자바스크립트를 통해 비동기적으로 서버와 XML을 주고받는 기술 그 자체를 의미한다.

XMLHttpRequest를 이용해 페이지 전부를 갱신하지 않고 일부만 갱신할 수 있게 해준다. 속도향상과 빠른 페이지 표시(틀만 보여주고 AJAX를 통해 받은 데이터를 점점 채우는 방식으로 반응시간을 줄일 수 있다.)에 이점이 있다.

히스토리 관리가 안된다거나 연속적인 데이터 요청에 서버에 부하가 증가할 수 있다.
# Same Origin Policy
보안을 위해 동일한 출처의 리소스만 허용하는 정책이다. 모든 브라우저에 적용되어 있고 이로인해 다른 출처의 리소스는 서로 접근할 수 없다.

SOP가 없다면 어떤 문제가 있는지 예시로 알아보자
1. 클라이언트가 (피싱에 의해) 악의적인 서버(이하 서버E)로 요청을 보낸다.
1. 서버E는 클라이언트의 메일 정보를 얻기위해 스크립트가 포함된 응답을 보낸다.
1. 스크립트는 클라이언트에서 실행되고,
로그인 되어있던 사용자의 메일 서비스에 요청을 보낸다.
1. 메일 서버는 세션이 포함된 클라이언트의 요청에 응답을 보낸다.
1. 응답을 받은 스크립트는 서버E에 내용을 전달한다.

SOP로 인해서 4에서 받은 응답을 브라우저가 차단해 버린다.

서버E에서 받은 리소스가 메일 서버에서 받은 리소스에 접근하려 했기 때문이다.

하지만 시대가 변함에 따라 구조가 복잡해지고 구조가 나눠지게 됨에 따라 SOP로 인해서 문제가 발생하게 되었는데 이를 해결하기 위해 만들어진 것이 `CORS`다
# 다시 CORS란
리소스(주로 AJAX)가 다른 출처의 리소스를 사용하기 위해 요청을 보내고 다른 서버가 리소스를 응답해 주는 것은 보안상에 큰 허점이 생긴다. 이를 막기 위해 동일한 출처만 허용하는 정책(SOP)을 만들었지만 서버의 구조가 복잡해짐에 따라 SOP를 우회할 방법이 필요했고 이를 위해 만들어진 것이 CORS(교차 출처 리소스 공유)이다.

CORS를 위해서는 서버에서 해당서버를 허용한다는 헤더를 붙여주고, 브라우저는 헤더를 확인하고 허용해 준다.
## 동일 출처
동일한 출처는 프로토콜, 도메인, 포트가 일치하는 것을 말한다. 셋 중 하나라도 같지 않으면 다른  출처로 취급한다.

IE는 포트를 출처에 넣지 않았으며, 이는 비표준이다.
## Preflight Request
실제 요청을 보내기 전에 서버가 현재 출처를 허용하는지 확인하기 위해 전송하는 `사전요청` (GET, HEAD일때는 하지 않는다. POST는 제한적)

GET, HEAD는 리소스를 요청만 하기 때문에 Preflight없이 바로 요청을 보낸다.

POST는 Content-type이 셋 중 하나일 경우 Preflight를 보내지 않는다.
- application/x-www-form-urlencoded
- multipart/form-data
- text/plain

OPTION 메소드로 보내며 Origin을 넣어 요청을 보내면 서버는 Access-Control-Allow-Origin을 헤더에 넣어 응답한다.

아래는 통신 예제이다.

![Preflight](https://mdn.mozillademos.org/files/17214/simple-req-updated.png)

### Preflight를 보내는 이유?
잘 모르겠다. 보충 필요

## CORS 관련 헤더
### 응답 헤더
- Access-Control-Allow-Origin : 이 서버에서 허용하는 출처가 적혀있다.
    - Access-Control-Allow-Origin: www.naver.com
    - Access-Control-Allow-Origin: *
- Access-Control-Allow-Methods : 이 서버에서 허용하는 메소드 리스트(Allow 헤더와는 다르게 CORS에서만 적용된다.)
    - Access-Control-Allow-Methods: GET, POST
- Access-Control-Allow-Headers : preflight request의 응답으로 사용되며, 요청에 허용하는 헤더를 표시
    - Access-Control-Allow-Headers: header-name, header-name
### 요청 헤더
- Origin : 요청을 보내는 리소스의 출처
- Access-Control-Request-Method : 요청에 사용하려는 메소드 (preflight request에 사용)
- Access-Control-Request-Headers : 요청에 사용하려는 헤더 (preflight request에 사용)

자세한 내용은 [링크](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS#HTTP_%EC%9D%91%EB%8B%B5_%ED%97%A4%EB%8D%94)

CORS가 적용된 통신 예제이다.

![Prefilght full-scenario](https://mdn.mozillademos.org/files/16753/preflight_correct.png)

# SOP을 우회하는 방법
- JSONP를 이용
    - HTML내에 script는 SOP대상이 아니라는 점을 이용한 우회
    - 내용 보충 필요
- 클라이언트 앞에 프록시 서버 두기
    - 프록시 서버가 요청을 먼저 받고 헤더에 Access-Control-Allow-Origin을 붙여주는 방법
- 서버에서 CORS를 위해 Access-Control-Allow-Origin 헤더 추가
    - 정상적인 방법

# 용어
- 폴링 : 클라이언트가 서버의 변경사항을 전달받기 위해 주기적으로 서버에 요청을 보내는 것

# 참고 자료
CORS, XMLHttpRequest, SSE, WebSocket
https://developer.mozilla.org/ko/docs/Web/HTTP/CORS

https://developer.mozilla.org/ko/docs/Web/API/XMLHttpRequest

https://developer.mozilla.org/ko/docs/Web/API/EventSource

https://developer.mozilla.org/ko/docs/WebSockets

SSE란
https://hamait.tistory.com/792

Ajax란
https://coding-factory.tistory.com/143

Same Origin Policy
https://developer.mozilla.org/ko/docs/Web/Security/Same-origin_policy
