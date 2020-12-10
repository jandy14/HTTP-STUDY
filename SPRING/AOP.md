# AOP (Aspect Oriented Programming)
관점 지향 프로그래밍이라고 해석된다.

AOP를 사용하는 이유는 명확하다.

다음과 같은 코드의 중복 때문이다.

```java
class A {
    method a() {
        로직A
        method a의 메인 로직
        로직B
    }
    method b() {
        로직A
        method b의 메인 로직
        로직B
    }
}
class B {
    method c() {
        로직A
        method c의 메인 로직
        로직B
    }
}
```
이 문제를 해결하기 위해 사용하는 디자인 패턴이 데코레이터 패턴이다.

라고 생각했는데 스프링 AOP에서는 프록시 패턴으로 구현되어 있다고 한다.(본인은 아직 둘의 정확한 차이를 이해 못하고 있다.)

## 프록시 패턴
간단한 예시로 알아보자
![구조도](https://media.vlpt.us/images/ljinsk3/post/b03ae4eb-80c9-4619-908c-42bdf965e66e/proxy.jpeg)

```java
public class ProxyImage implements Image {
    private String path;
    private RealImage image;
    
    public ProxyImage(String path) {
        this.path = path;
    }
    
    public void draw() {
        if (image == null) {
            image = new RealImage(path); // 최초 접근 시 객체 생성
        }
        image.draw(); // RealImage 객체에 위임
    }
}
```
혹시 헷갈릴까 예시 하나 더
```java
public class ProxyInternet implements Internet 
{ 
    private Internet internet = new RealInternet(); 
    private static List<String> bannedSites; 
      
    static
    { 
        bannedSites = new ArrayList<String>(); 
        bannedSites.add("abc.com"); 
        bannedSites.add("def.com"); 
        bannedSites.add("ijk.com"); 
        bannedSites.add("lnm.com"); 
    } 
      
    @Override
    public void connectTo(String serverhost) throws Exception 
    { 
        if(bannedSites.contains(serverhost.toLowerCase())) 
        { 
            throw new Exception("Access Denied"); 
        } 
          
        internet.connectTo(serverhost); 
    } 
}
```

프록시는 실제 객체에 대한 접근 제어나 추가적인 기능을 위해 사용한다.

## 데코레이터 패턴
내용 보충 필요

# 다시 AOP
AOP에는 주요 용어가 있는데 다음과 같다.

- Aspect : 부가적인 기능인 Advice와 어디에 적용할지 결정하는 Pointcup을 합친 개념
- Advice : 부가적으로 수행할 기능(적용되는 위치에 따라 4가지로 나뉜다.)
- Joinpoint : Advice를 할 수 있는 부분(스프링에서는 인터페이스 메소드에 해당) 
- Pointcut : 실제로 Advice가 적용될 메서드를 선별하는 정규표현식
- Weaving : Advice를 기존 기능에 적용하는 과정

![스프링AOP](https://t1.daumcdn.net/cfile/tistory/252B0C3E5819788E36)

스프링에서는 이 기능을 사용하기 위해 두가지 방법을 제공한다. 하나는 xml을 통한 방법이고 다른 하나는 어노테이션을 통한 방법이다.

스프링 AOP를 통해서 다음과 같은 작업을 처리한다.

- 메소드 성능 테스트(유닛 테스트)
- 트랜잭션 처리
- 예외 반환

# 참고 자료
AOP
https://atoz-develop.tistory.com/entry/Spring-%EC%8A%A4%ED%94%84%EB%A7%81-AOP-%EA%B0%9C%EB%85%90-%EC%9D%B4%ED%95%B4-%EB%B0%8F-%EC%A0%81%EC%9A%A9-%EB%B0%A9%EB%B2%95

디자인 패턴 Proxy
https://velog.io/@ljinsk3/07-2.-%EC%A3%BC%EC%9A%94-%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B42-Decorator-Proxy-Adapter-Observer

proxy 예제
https://www.geeksforgeeks.org/proxy-design-pattern/

AOP 용어
https://shlee0882.tistory.com/206

AOP 그림
https://private.tistory.com/43