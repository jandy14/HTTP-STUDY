# MVC (Model-View-Controller)

MVC는 어플리케이션을 구성하는 요소를 관리하기 위한 디자인 패턴이다.

MVC패턴은 앱을 구성하는 요소를 세가지로 나눈다.

- Model : 페이지에 적용되야할 데이터
- View : 사용자에게 보이는 페이지
- Controller : Model을 생성해 View와 결합하는 로직

요청의 흐름을 보면서 이해해 보도록 하자.

![스프링처리과정](https://t1.daumcdn.net/cfile/tistory/996CA6455B90B6CC4E)

1. 클라이언트가 url을 통해 정보를 요청한다.
1. DispatcherServlet은 HandlerMapping을 이용해 해당 url을 처리하는 Controller를 찾아 처리를 요청한다.
1. 해당 Controller는 요청을 받아 응답에 필요한 Model을 생성한다.
1. Model을 준비한 Conroller는 적용해야할 View와 생성한 Model을 DispatcherServlet에 보낸다.
1. Dispatcherservlet은 View를 찾아 Model을 적용시키고 클라이언트에 응답을 보낸다.

Model을 생성하는 과정에서 DB에 접근해야하는 경우도 있으며, 이를 위해 DAO 모듈을 사용한다.

# MVC는 왜 쓰는가
어플리케이션의 구성요소를 3가지로 나누었다.

언제나 그렇듯 프로그래밍은 어떤 요소를 성공적으로 나누게 되면 다음과 같은 장점이 생긴다. (사실은 구조를 나누면 생기는 장점보단 나누는 목적이다.)

- 유연성 확장성
- 재사용성
- 유지 보수 용이

MVC도 마찬가지다.

그 외에도 디자이너와 개발자의 협업이 용이하다고 한다. 구조가 분리되어 있으니 그럴 수 있겠다.

하지만 단점도 존재한다. (본인은 아직 이해안되는 부분이다.)

- Model과 View의 완벽한 분리가 어렵다.(의존성을 가진다.)
- 프로젝트가 커짐에 따라 구조가 복잡해진다. (의존성으로 인해)

# 참고 자료
스프링의 흐름
https://intro0517.tistory.com/151

MVC 장단점
https://server-engineer.tistory.com/167