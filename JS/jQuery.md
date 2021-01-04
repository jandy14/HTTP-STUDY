# jQuery
자바스크립트 웹 라이브러리

자바스크립트 web API를 보다 편하게 사용할 수 있게 해준다.

```
web API는 브라우저가 데이터에 접근할 수 있게 도와주는 내장 API다. 
```

jQuery가 많이 쓰인 이유는 기능이 강력해서가 아니라 사용하기 간편해서다.

요즘엔 jQuery는 하락세고 ES6를 사용하는 추세라고 한다. 하지만 아직 많은 프로젝트에서 사용되고 있고, 기존 프로젝트들이 jQuery로 되어있는 상황이 많다고 한다.

# 문법

```javascript
$("선택자").동작함수();
```
위 내용이 jQuery의 거의 모든 것이라고 할 수 있다.

선택자에 대해서는 직접 알아보자.(css에서 나온 문법이다.)

실제로는 다음과 같이 사용된다.
```javascript
$("button").on("click", function() {
    $("li:has(span)").text("<span>요소를 가지고 있는 아이템이에요!");
});
```

다양한 방법으로 이벤트 핸들러를 연결할 수 있다.

```javascript
//id가 btn인 요소에 클릭 이벤트 핸들러를 등록
$("#btn").click(function(event) { /* 코드 */ });
$("#btn").bind("click", function(event) { /* 코드 */ });
$("#btn").on("click", function(event) { /* 코드 */ });
$("body").on({click: function(event) { /* 코드 */ }}, "#btn");
$("body").on("click", "#btn", function(event) { /* 코드 */ });
```

여러 애니메이션 효과들을 사용할 수 있다.

## 이벤트 위임 (event delegation)
jQuery문법 중 다음 둘은 조금 다르게 작동한다.
```javascript
//ul안에 있는 a에 클릭 이벤트 핸들러를 등록
$("ul a").on("click", function(event) { /* 코드 */ }); // 1번
$("ul").on("click", "a", function(event) { /* 코드 */ }); // 2번
```
- 1번 코드는 현재 있는 "ul a"요소들에 이벤트 핸들러가 등록된다.
- 2번 코드는 ul에 a요소들이 추가 돼도 이벤트 핸들러가 등록된다.
----
이벤트 위임은 부모 요소에서 자식 요소의 이벤트까지 관리하는 것이다.

위 예시에서 1번은 ul안에 a 요소 모두에 이벤트 핸들러가 등록되고, 2번은 ul에 이벤트 핸들러가 등록된다.

위임이 가능한 이유는 이벤트가 위의 요소로 전파되는 현상(`이벤트 버블링`)이 있기 때문이다.

이벤트 위임을 사용하면 다음과 같은 장점이 생긴다.
- 동적으로 생성된 요소들에 이벤트 핸들러를 따로 등록하지 않아도 된다.
- 이벤트가 부모 요소에서만 등록되기 때문에 이벤트 핸들러가 적게 생성된다.

# $
jQuery는 $라는 문자로 시작된다. 필자는 이거 때문에 jQuery가 낯설고 라이브러리가 아닌 새로운 언어처럼 느껴졌었는데 사실 $는 JS에서 변수명으로 사용할 수 있는 특수 문자 중 하나일 뿐이다.
```
JS에서 변수명으로 사용가능한 특수 문자는 _(언더바), $(달러)이며, 변수명의 제일 첫글자에 사용될 수 있다.

-(하이픈)은 올 수 없으며, 숫자는 사용 가능하지만 변수명 첫 글자로는 사용할 수 없다.
```

# 참고 자료
- web API
    - https://developer.mozilla.org/ko/docs/Web/API
    - https://www.w3schools.com/js/js_api_intro.asp
- jQuery
    - http://www.tcpschool.com/jquery/intro
- JS 변수명
    - https://dasima.xyz/javascript-variable-making-rule/
- Native JS 이벤트 위임
    - https://ko.javascript.info/event-delegation