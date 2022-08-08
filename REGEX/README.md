# Regular Expression

본 글은 정규표현식에 대한 약간의 지식이 있다는 전제하에 쓰여졌다.

본 글에 나오는 정규식은 Javascript를 기준으로 작성되었다.

환경에 따라 정규식은 약간의 차이가 있을 수 있다.

## 개요
정규 표현식(Regular Expression) 또는 정규식은 특정한 규칙을 가진 문자열들을 표현하기 위한 표현식이다.

여러 텍스트 에디터 및 프로그래밍 언어에서 지원하며 문자열 찾기 및 치환 기능을 더욱 유용하게 만들어 준다.

본 글에선 정규표현식의 전반적인 기능과 그 예시에 대해 소개한다.

시작하기 전에 몇 가지 문제를 보자.

문제를 풀어볼 땐 어떤 방식을 사용하든 상관없다. (정규표현식을 사용하지 않아도 된다!)

그저 정규표현식으로 이런 것도 가능하다는 것을 알리거나 독자의 방식과 정규표현식을 사용한 방식을 비교해보는 계기를 주기 위함이니 가볍게 보도록 하자.

> 아래 텍스트에서 a가 아닌 문자는 모두 *로 치환하기
<details><summary>텍스트 보기</summary>

```
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```
<details><summary>해답 보기</summary>

search text : `/[^a]/gm` 또는 `/[^a ]/gm` 또는 `/[^a\W]/gm`

replace text : `*`
</details>

</details>
<br>

> 아래 텍스트에서 전화번호 찾기
<details><summary>텍스트 보기</summary>

```
000-0000-000 000-00-0000 000-00000-000 000-0000-00 00-000-000 0000-000-0000-0000 000-000-000 000-000-0000
0000-000-0000 000-0-00-0000 000--0000-0000 000-00-0000
000-000-000 000-000-0000 000-0000-0000 000-0000-0000
000-0-0000 0000-0000-0000 000-0000-00000 000-0000-0000
```
<details><summary>해답 보기</summary>

search text : `/0{3}-0{3,4}-0{4}/gm`

</details>
</details>
<br>

> 첫글자와 끝문자를 제외하고 모두 *로 치환하기
<details><summary>텍스트 보기</summary>

```
nickname
potato
jandy14
잔디깎이
```

<details><summary>해답 보기</summary>

search text
- `/\B.\B/g` (영어와 숫자만 가능)
- `(?<=[A-Za-z0-9가-힣]).(?=[A-Za-z0-9가-힣])` (한국어까지 가능)
- `(?<=\S).(?=\S)` (공백문제 제외 모두 가능)

replace text : `*`
</details>
</details>
<br>

> 소문자,대문자,숫자로 이루어져있고 적어도 각각하나 이상 포함된 8자리 이상의 문자열인지 확인하기
<details><summary>텍스트 보기</summary>

```
slkg3vq98
ejWsfo3
tutyshEBhs
EWTHAEDB43
bwel34HDFGF4
```
<details><summary>해답 보기</summary>

search text : `^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}`
</details>
</details>
<br>

> \$표시가 끝에 있는 숫자에만 3자리로 끊어서 쉼표 넣어주기 `(4000$ -> 4,000$)`
<details><summary>텍스트 보기</summary>

```
333$
2725%
37258$
28345883
10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000$
```

<details><summary>해답 보기</summary>

search text : `/(\d)(?=(?:\d{3})+(?!\d)\$)/g`

replace text
- `$1,`
- `$&,`

</details>
</details>
<br>

> 아래 csv 형식을 더 아래 마크다운 표로 바꾸기
<details><summary>텍스트 보기</summary>

csv
```
name,type,comment
id,int(11),primary key
value,varchar(50),
registerDate,datetime,
status,char(1),status of this item
```
마크다운 테이블
```
|name|type|comment|
|-|-|-|
|id|int(11)|primary key|
|value|varchar(50)||
|registerDate|datetime||
|status|char(1)|status of this item|
```

<details><summary>해답 보기</summary>

정규표현식으로만 풀려고 시도한 독자는 꽤 고민했을지도 모르겠다.

필자는 아래와 같은 방식으로 해결했다.

우선 텍스트를 아래처럼 수정한다.
```
name,type,comment
-,-,-
id,int(11),primary key
value,varchar(50),
registerDate,datetime,
status,char(1),status of this item
```

그 다음 아래 정규식으로 치환한다.

search text : `/(.*),(.*),(.*)/g`

replace text
- `|$1|$2|$3|`

</details>
</details>
<br>
그 외 심심풀이

- 정규식 퍼즐
    - http://jimbly.github.io/regex-crossword/

## 목차

목차는 [regexr.com](https://regexr.com)의 reference의 항목을 따랐다.

본인만의 실습환경이 있다면 사용해도 무방하고 위 링크의 사이트에서 실습해도 좋다.

1. [문자 (Character classes)](./1_문자.md)
1. [앵커 (Anchors)](./2_앵커.md)
1. [이스케이프 문자 (Escaped characters)](./3_이스케이프문자.md)
1. [수량자 & 교체 구문 (Quantifiers & Alternation)](./4_수량자와교체구문.md)
1. [그룹 & 참조 (Groups & References)](./5_그룹과참조.md)
1. [전후방탐색 (Lookaround)](./6_전후방탐색.md)
1. [치환 (Substitution)](./7_치환.md)
1. [플래그 (Flags)](./8_플래그.md)

## 참고 자료
- 위키 백과
  - https://ko.wikipedia.org/wiki/%EC%A0%95%EA%B7%9C_%ED%91%9C%ED%98%84%EC%8B%9D
- regex-crossword
  - http://jimbly.github.io/regex-crossword/