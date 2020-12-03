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

## URL의 구조
path는 url일수도 경로만 나타낼 수도 있다. url의 구조를 설명해둔 사이트를 [링크](https://victorydntmd.tistory.com/287)해 둔다.

# http version
request의 http 버전을 나타낸다. 메세지의 구조를 알려주고 응답 메세지에 써야 할 http버전을 알려준다.

버전별 차이에 대해서는 [밑에](#http-버전별-변화) 자세히 서술한다.

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

# header
start line 다음 라인부터 공백 라인까지 라인별로 key:value의 구조로 되어있다.

다음은 http 주요 헤더이다.
## 공통 헤더
요청/응답 모두에 사용되는 헤더
- Connection tcp연결은 지속할지 끊을지 알려준다.
    - Connection: close;
    - Connection: Keep-Alive;
- Date 메세지가 생성된 시간을 알려준다. 포맷이 정해져 있다.
    - Date: Thu, 22 Jan 2015 04:20:18 GMT
    - Cache-Control 캐시 관련 헤더에서 설명
    - Pragma HTTP/1.0 캐시와의 하위 호환성을 위해 사용
## 엔티티 관련 헤더
전달되는 리소스(개체)의 정보에 관한 헤더
- Content-Type (공통) 리소스의 유형과 인코딩 방식을 알려준다. MIME type
    - Content-Type: text/html; charset-latin-1
- Content-Language (공통) 해당 리소스와 가장 잘 어울리는 언어
- Content-Encoding (공통) 데이터의 인코딩 방식
    - Content-Encoding: gzip, deflate
- Content-Location (공통) 해당 리소스의 실제 위치
- Content-Disposition (응답) 리소스를 어떻게 처리할지
    - Content-Disposition: inline;
    - Content-Disposition: attachment; filename='filename.csv'
    - inline은 화면에 표시 attachment는 다운로드
- Content-Security-Policy (응답) 다른 외부 파일들을 불러올 때, 허용할 것과 하지않을 것을 명시
- Location (응답) 리소스가 리다이렉션 됐을 때, 이동한 위치
    - 302와 같은 응답일 경우 Location값을 기준으로 이동한다.
- Last-Modified (응답) 리소스 마지막 갱신 날짜
- Transfer-Encoding (응답) 동적으로 생성되어 Body의 길이를 모르는 경우에 조금씩 전송이 가능

## 요청 헤더
요청에만 사용되는 헤더
- Host 요청하는 호스트의 IP와 포트
- User-Agent 클라이언트 소프트웨어(브라우저, OS) 명칭과 버전
- From 클라이언트 사용자 메일 주소 (이건왜?)
- Cookie 클라이언트에 저장된 쿠키 정보
- Referer 직전에 머물던 웹 링크 주소
- If-Modified-Since 제시한 날짜 이후에 변경된 리소스 취득 요청
- Authorization 인증토큰(jwt, basic등)을 서버로 전송할 때, "토큰 종류 + 값" 으로 전송
- Origin 서버로 POST요청을 보낼 때, 요청이 어느 곳에서 시작됐는지
- Accept 클라이언트가 원하는 리소르 타입
- Accept-Charset 클라이언트가 원하는 문자셋
- Accept-Encoding 클라이언트가 원하는 인코딩 방식
- Accept-Language 클라이언트가 원하는 언어
- Range 범위 요청때 사용, 요청할 범위를 지정
요청 예시
```
GET /home.html HTTP/1.1
Host: developer.mozilla.org
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/ *;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: https://developer.mozilla.org/testpage.html
Connection: keep-alive
Upgrade-Insecure-Requests: 1
If-Modified-Since: Mon, 18 Jul 2016 02:36:04 GMT
If-None-Match: "c561c68d0ba92bbeb8b0fff2a9199f722e3a621a"
Cache-Control: max-age=0
```
```
POST /myform.html HTTP/1.1
Host: developer.mozilla.org
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
Content-Length: 128

(후략)
```
## 응답 헤더
응답에만 사용되는 헤더
- Server 서버 소프트웨어 정보
- Accept-Range 서버가 범위 요청을 지원하는지, 범위의 단위는 무엇인지
- Set-Cookie 서버에서 클라이언트에게 쿠키 정보를 설정
- Expires 리소스가 지정된 날짜까지 캐시로써 유효함
- Allow 서버가 처리가능한 메소드 리스트
예시
```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Connection: Keep-Alive
Content-Encoding: gzip
Content-Type: text/html; charset=utf-8
Date: Mon, 18 Jul 2016 16:06:00 GMT
Etag: "c561c68d0ba92bbeb8b0f612a9199f722e3a621a"
Keep-Alive: timeout=5, max=997
Last-Modified: Mon, 18 Jul 2016 02:36:04 GMT
Server: Apache
Set-Cookie: mykey=myvalue; expires=Mon, 17-Jul-2017 16:06:00 GMT; Max-Age=31449600; Path=/; secure
Transfer-Encoding: chunked
Vary: Cookie, Accept-Encoding
X-Backend-Server: developer2.webapp.scl3.mozilla.com
X-Cache-Info: not cacheable; meta data too large
X-kuma-revision: 1085259
x-frame-options: DENY

(후략)
```
## 캐시 관련 헤더
- Cache-Control (공통,값은 좀 다름) 캐시를 어떻게 처리할지
    - no-store : 아무것도 캐싱하지 않는다.
    - no-cache : 캐시를 사용하기 전에 서버에 사용해도 되는지 물어본다.
    - public(응답) : 중개 서버에 저장해도 됨
    - private(응답) : 사용자 환경에만 저장됨
    - max-age={second} : 캐시의 유효 시간
- Expires (응답) 리소스가 지정된 날짜까지 캐시로써 유효함. max-age가 있다면 이 헤더는 무시됨.
- Age (응답) max-age 시간 내에서 얼마나 시간이 흘렀느지 알려줌.
- ETag (응답) http컨텐츠가 바뀌었는지를 검사할 때 사용(해싱값?)
- If-None-Match (요청) ETag가 변했는지 확인 요청
## 쿠키 관련 헤더
- Cookie (요청) 서버가 Set-Cookie로 클라이언트에 남김 쿠키 정보
- Set-Cookie (응답) 서버측에서 클라이언트에 쿠키 정보를 남길 때 사용
    -Set-Cookie: attribute=value; [option]
    - Expires 쿠키 만료 날짜
    - Max-Age 쿠키의 수명 (다른건가?)
    - Secure https에서만 쿠키가 전송됨
    - HttpOnly 자바스크립트에선 쿠키 접근 금지
    - Domain 해당 도메인과 일치하는 요청에만 쿠키가 전송됨
    - Path 해당 경로와 일치하는 요청에만 쿠키가 전송됨
    - Set-Cookie: zerocho=babo; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly

# http 버전별 변화
http 버전별로 를 이해하기 위해 http의 역사를 알아보자.

## http/0.9
html전송만을 위해 만들어졌습니다. 매우 간단하고 확장성이 없습니다.
- 0.9는 나중에 붙여진 버전(원래는 버전이 없었음)
- get 메소드만 지원
- http 헤더가 없어 html외에 다른 유형의 파일은 전송 불가
- 오류 코드가 없어 파일 내부에 설명을 포함해 전달
## http/1.0
- 상태코드 추가 (성공실패 여부 확인)
- 해더가 추가되고 'Content-Type'의 추가로 다른 유형의 파일도 전송 가능
- post, head 메서드 추가
## http/1.1
- http의 첫번째 표준
- options, put, delete, trace 메서드 추가
- 헤더값 추가
- 파이프라이닝(응답을 받기 전에 요청을 계속 보내는 기술) 추가
- 캐시 제어 메커니즘 추가
- **성능향상을 위해 연결을 끊지 않고 여러번의 파일을 받음** (1.0은 파일당 새로운 연결을 만들었음)
## http/1.1의 문제점
- 파이프라이닝은 순차적으로 응답을 해주기 때문에 뒤에 요청의 처리가 끝이나도 앞에 요청의 처리가 끝나지 않으면 대기해야하는 문제(HOL Blocking, Head Of Line Blocking)가 있었다.
- 이 때문에 서버에선 파이프라이닝을 막고, 브라우저에서 병렬처리를 위해 여러 연결을 만들어 개선했다.
- 같은 헤더를 여러번 보내 요청마다 중복되는 내용이 많았다.
## http/2.0
- 텍스트에서 바이너리로 (내용의 압축, 사용자는 읽을 수 없어짐)
- 메세지를 header프레임과 data프레임으로 분리
- 서버가 순서없이 프레임을 전송하면 클라이언트가 프레임 헤더값을 통해 다시 조립(멀티플렉싱)
- 요청이 들어오면 서버가 요청된 리소스외에 필요하게될 리소스를 미리 응답해줌(서버 푸시)
- 기존에 보낸 헤더를 저장해뒀다가 index만 전송해서 중복내용을 줄임. 변경사항이 있으면 변경사항만 index와 함께 전송
- 내부에서 일어나는 일이므로 사용자(서버 개발자, 이용자)는 프로토콜 변경에 따른 추가 작업 없음 (브라우저와 웹서버가 할 일)
## http/3.0
- udp(quic)위에 만들어진 http
- tcp가 순차적으로 데이터를 보내기 때문에 http/2.0도 HOLB문제가 존재함. 이를 해결하기 위해서 quic위에서 http프로토콜을 실행
- 3way handshaking이 없어 굉장히 적은 레이턴시를 가짐. 추가적인 요청시 기존 키를 가지고 있다가 재사용하기 때문에 연결과정이 아예 없음
- 키를 통해 연결하는 것이므로 `IP`가 변해도 연결이 유지됨(다시 핸드쉐이크할 필요없음)
# 용어
- 범위 요청
    - 요청하는 리소스의 모든 부분이 아닌 일부분만 요청하는 것
# 참고 자료
URI URL 그리고 URL구조
https://victorydntmd.tistory.com/287

http 상태 코드
https://developer.mozilla.org/ko/docs/Web/HTTP/Status

http 상태 코드
https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C

주요 http 상태 코드
https://sjh836.tistory.com/81

http 헤더
https://developer.mozilla.org/ko/docs/Web/HTTP/Headers

주요 http 헤더
https://gmlwjd9405.github.io/2019/01/28/http-header-types.html

주요 http 헤더
http://rangken.github.io/blog/2015/http-headers/

http 메세지
https://developer.mozilla.org/ko/docs/Web/HTTP/Messages

http 버전별 변화
https://americanopeople.tistory.com/115

http 버전별 변화
https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP

http 버전별 변화
https://falsy.me/http%EC%9D%98-%EB%B2%84%EC%A0%84-%EB%B3%84-%EC%B0%A8%EC%9D%B4%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B3%A0-ubuntu-nginx%EC%97%90-http-2%EB%A5%BC-%EC%A0%81%EC%9A%A9%ED%95%B4/

http/3.0
https://evan-moon.github.io/2019/10/08/what-is-http3/