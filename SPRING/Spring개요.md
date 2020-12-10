# 개요
깔끔하게 정리하고 싶었으나 본인도 아직 완벽한 이해를 한 것이 아니기에 단편적인 지식들은 묶지 않고 따로 적었다.

사용법이 아니라 개념을 이해하기 위해 정리한 내용이다.

# 스프링 프레임워크
스프링 프레임워크(이하 스프링)는 J2EE(javaEE)의 무겁고 느린 엔터프라이즈 프레임워크의 기능을 제공하면서 경량화된 프레임워크다.

스프링은 자바 어플리케이션을 만들기 위한 오픈소스 프레임워크다. 동적인 웹을 만드는데 많이 사용된다.

스프링은 여러 기술을 제공하지만 모듈화되어있어 선택적으로 사용할 수 있다.

스프링은 발전되고 확장됨에 따라 많은 기능을 추가하고 개선해 나갔다. 하지만 핵심적인 내용은 변화하지 않았다.

스프링의 가장 핵심적인 내용은 다음과 같다.
- DI (Dependency Injection)
- IoC (Inversion of Control)
- AOP (Aspect Oriented Programming)

각각에 대해 알아보자. (DI는 IoC와 밀접한 내용이므로 같이 다룬다.)

## IoC (Inversion of Control)
자세한 내용은 [링크](./IoC.md)

## AOP (Aspect Oriented Programming)
자세한 내용은 [링크](./AOP.md)

# Maven, Gradle
Maven과 Gradle은 자바 프로젝트 관리 도구이다.

라이브러리(의존성이 있는 라이브러리까지) 관리와 빌드 세팅과 같은 부분은 설정파일을 통해 관리해준다.

## Maven
아파치 Ant라는 관리 도구의 단점을 해소하고 새로운 기능을 추가해 만든 관리 도구이다.

pom(project object model)이라는 xml을 통해 빌드 설정을 정한다.

## Gradle
Ant와 Maven의 장점을 모아 만든 관리 도구이다.

빌드 세팅을 Groovy(java와 흡사한 스크립트 언어)라는 스크립트로 작성해 편리하다.

멀티 프로젝트를 관리하기에도 좋다.

빌드가 Maven보다 빠르다.

# 스프링 프레임워크의 전체적인 진행
다음은 스프링의 요청 처리과정에 대한 이미지다.

![스프링처리과정](https://t1.daumcdn.net/cfile/tistory/996CA6455B90B6CC4E)

![스프링처리과정2](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F9918FD385B5F3BA634)

![스프링처리과정3](https://media.vlpt.us/images/dnjscksdn98/post/9be17568-4801-44fb-af85-7f81f6ef6c55/spring_mvc_flow.png)

여러 개의 이미지를 링크한 이유는 서로 비교하면서 공통점은 무엇인지 어디가 차이가 나는지 보기 위함이다. 지금처럼 이해도가 낮을 때, 인터넷의 자료를 하나만 참고하면 잘못된 지식을 얻을 수 있기 때문에 이런 검증과정이 필요하다.

# 스프링 프레임워크의 주요 모듈
스프링에서 자주 사용되는 모듈 중 다음을 알아보자.
- webMVC

## webMVC
자세한 내용은 [링크](./MVC.md)

# Spring Boot
스프링 부트는 스프링 프로젝트를 아주 간편하게 설정할 수 있는 스프링 프레임워크의 서브 프로젝트다.

스프링 부트가 무슨 일을 하는지 알아보자.
- 단독실행가능한 스프링 앱을 생성한다.
- 적은 설정으로 빠르게 스프링을 시작하고 실행할 수 있다.
- 웹 컨테이너(WAS->tomcat)를 내장하고 있어 최소한의 설정으로 웹 앱을 만들 수 있다.

스프링은 설정파일을 작성하는데 어렵고 많아 시간이 많이 걸렸다. 이를 해결하기 위해 나온 것이 스프링 부트다.

그 외에도 비기능적인 기능(내장 서버, 보안, 측정, 상태 점검, 외부 설정)을 기본적으로 제공한다.

https://start.spring.io/ 에서 스프링 부트 프로젝트를 생성하고 받을 수 있다.

본인도 다운받아 실행해 보니 작동한다. 로컬 웹서버에 접속이 된다.(원래는 이거하는게 어려웠다는 건가?)

아직 스프링을 사용하는 법을 몰라 뭔가를 만들어보지는 못했다.

# 스프링은 왜이리 많이 쓰는걸까
[링크](https://seolin.tistory.com/119)

# 참고 자료
스프링 동영상 강의 재생목록
https://www.youtube.com/watch?v=XtXHIDnzS9c&list=PLq8wAnVUcTFUHYMzoV2RoFoY2HDTKru3T

스프링 프레임워크
https://ko.wikipedia.org/wiki/%EC%8A%A4%ED%94%84%EB%A7%81_%ED%94%84%EB%A0%88%EC%9E%84%EC%9B%8C%ED%81%AC

스프링을 배워야 할까
https://seolin.tistory.com/119

Maven, Gradle<br>
https://hyojun123.github.io/2019/04/18/gradleAndMaven/

https://okky.tistory.com/179

https://bkim.tistory.com/13

스프링의 처리 구조<br>
https://steady-snail.tistory.com/66

https://intro0517.tistory.com/151

Spring Boot
https://goddaehee.tistory.com/238
