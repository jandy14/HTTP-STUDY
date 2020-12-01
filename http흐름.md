# http란
- hypertext transer protocol
- 하이퍼택스트를 요청하고 받기 위한 프로토콜이다.
- 클라이언트는 요청(request)을 보내고 서버는 요청에 따른 응답(response)을 보낸다.

# http의 전반적인 흐름
http를 통해서 클라이언트가 서버와 어떻게 통신을 하게되는지에 대한 간략한 흐름을 알아보자!

1. DNS를 통해 접근하고자 하는 도메인의 IP를 알아낸다.
1. 알아낸 IP와 접근할 포트를 이용해 웹서버와 연결합니다.
1. 연결을 통해 http request를 보냅니다.
1. 웹서버는 request를 받아 처리를 한 뒤 처리내용을 response 합니다.
1. 클라이언트는 받은 response를 알아서 처리합니다.
1. 서버와의 연결은 지속하거나 종료합니다.

# DNS는 어떻게 도메인네임으로 IP를 찾을까
이용자는 도메인네임으로 여기저기 서버에 접근한다. 하지만 실제로 연결은 IP를 알아야만 가능하다. 도메인네임을 통해 IP를 알아내려면 DNS에게 물어봐야한다. DNS는 어떻게 도메인네임의 IP를 알아내는 것일까. 그 전반적인 흐름을 알아보자.

1. 클라이언트가 내부에 저장된 DNS의 IP로 요청(도메인네임을 이용해 IP찾기)을 보낸다.
1. DNS는 TLDNS에게 도메인네임을 전달해 IP를 받고자 시도한다.
1. TLDNS는 다른 하위 레벨 DNS의 IP를 주며 여기서 알아보라고 한다.
1. DNS는 "새로운 DNS"에 다시 요청을 보낸다.
1. "새로운 DNS"는 다른 DNS의 IP를 주며 여기서 알아보라고 한다.
1. 최하위 서브도메인 DNS를 알아낼 때까지 4~5번을 반복한다.
1. 최종적으로 DNS는 도메인네임에 해당하는 IP를 얻게 된다.
1. 클라이언트에게 IP를 전달한다.

# http는 버전별로 무엇이 달라졌을까
http의 원리를 이해하기 위해 http의 역사를 알아보자.

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
- 파이프라이닝 추가?
- 캐시 제어 메커니즘 추가?
- **성능향상을 위해 연결을 끊지 않고 여러번의 파일을 받음** (1.0은 파일당 새로운 연결을 만들었음)
## http/2.0
- 텍스트에서 바이너리로 (최적화, 사용자는 읽을 수 없어짐)
## http/3.0
- quic을 통한 통신

# request와 response는 어떻게 구성되어 있을까

## request의 구조
request의 구조는 크게 세가지로 나누어져 있다.
- start line
- header
- body
### start line
request의 첫 줄에 해당하고 세가지 정보가 적혀있다.
- 메서드
- 요청 타겟
- http버전
```
ex) POST /contact_form.php HTTP/1.1
```
### header
start line 다음줄부터 시작되며 서버에 여러가지 정보를 제공한다.

key: value의 형태로 CRLF로 구분되어 있다.

```
ex)
Host: developer.mozilla.org
Content-Length: 64
Content-Type: application/x-www-form-urlencoded
```
### body
body는 요청에 필요한 내용을 담고 있으며, 경우에 따라 내용이 없을 수 있다.

header와의 구분은 빈 라인을 통해서 이루어진다.
```
name=Joe%20User&request=Send%20me%20one%20of%20your%20catalogue
```
### 전체 예시
```
POST /contact_form.php HTTP/1.1
Host: developer.mozilla.org
Content-Length: 64
Content-Type: application/x-www-form-urlencoded

name=Joe%20User&request=Send%20me%20one%20of%20your%20catalogue
```
## response
response는 request에 대한 결과물이다. 이 또한 request와 같이 3개의 구역으로 나뉘어 진다.
### start line
프로토콜, 상태코드, 상태코드의 의미로 이루어져 있다.
```
ex) HTTP/1.1 200 OK
```
### header
response와 같이 클라이언트에 전달한 추가적인 정보를 가지고 있다.
```
Date: Sat, 09 Oct 2010 14:28:02 GMT
Server: Apache
Last-Modified: Tue, 01 Dec 2009 20:18:22 GMT
ETag: "51142bc1-7449-479b075b2891b"
Accept-Ranges: bytes
Content-Length: 29769
Content-Type: text/html
```
### body
여기 적힌 내용의 해석은 'Content-Type'을 통해 알 수 있다.
```
<!DOCTYPE html...(생략)
```
### 전체 예시
```
HTTP/1.1 200 OK
Date: Sat, 09 Oct 2010 14:28:02 GMT
Server: Apache
Last-Modified: Tue, 01 Dec 2009 20:18:22 GMT
ETag: "51142bc1-7449-479b075b2891b"
Accept-Ranges: bytes
Content-Length: 29769
Content-Type: text/html

<!DOCTYPE html... (here comes the 29769 bytes of the requested web page)
```

더 자세한 내용은 [http구조](./http구조.md)

# 받은 html은 어떻게 처리할까
렌더링 엔진이 html과 css를 통해 화면에 보여주고, js해석기로 페이지를 제어한다.

자세한 내용은 [브라우저의 원리](./브라우저의%20원리.md)

# https의 흐름
https는 http에 보안이 추가된 방식이다.

기존의 tcp위에 구현된 http가 아닌, tcp와 tls(ssl)위에 구현된 http이다.

자세한 내용은 [https의 원리](./https의%20원리.md)

# 용어
TLDNS = Top Level Domain Name Server

# 조금 더 알아볼 것
- MIME type
- header 내용

# 참고자료
http의 전반적인 흐름
https://blog.fakecoding.com/archives/about-https-flow/

http의 전형적인 흐름
https://developer.mozilla.org/ko/docs/Web/HTTP/Session

http버전별 차이
https://falsy.me/http%EC%9D%98-%EB%B2%84%EC%A0%84-%EB%B3%84-%EC%B0%A8%EC%9D%B4%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B3%A0-ubuntu-nginx%EC%97%90-http-2%EB%A5%BC-%EC%A0%81%EC%9A%A9%ED%95%B4/

http의 잔화
https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP

http의 구조
https://velog.io/@teddybearjung/HTTP-%EA%B5%AC%EC%A1%B0-%EB%B0%8F-%ED%95%B5%EC%8B%AC-%EC%9A%94%EC%86%8C
