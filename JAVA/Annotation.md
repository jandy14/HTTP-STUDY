# Annotation
어노테이션은 JDK5부터 제공되는 기능으로 소스코드에 추가적인 정보를 제공하는 메타데이터다.

다음은 사용 예시다.
```java
@Controller
public class HelloWorldController {
    
    @RequestMapping(value="/helloworld", method=RequestMethod.GET)

    public ModelAndView example() {
        return new ModelAndView("helloworld", "message", "Hello World");
    }
}
```

@Controller, @RequestMapping이 어노테이션이다. 만드는 법과 사용법을 알아보자.

## 만드는 법
어노테이션은 값의 갯수에 따라 마커어노테이션(값 0개), 싱글 밸류 어노테이션(값 1개), 멀티 밸류 어노테이션(값 2개 이상)을 나눈다.(왜 나누지...)

```java
public @interface MultiValueAnnotation {
    int id();
    String name() default "user”; //미지정시 기본 값으로 user가 지정된다
    String[] roles() default {"anonymous"};
}
```

@interface로 만들어 줄 수 있다. 적용법은 다음과 같다.

```java
@MultiValueAnnotation(id = 2, name = "Hello", roles = {"admin", "users"})
public class UsingMultiValueAnnotation {

    @MultiValueAnnotation(id = 10) //name = user, roles = {“anonymous’}로 지정된다
    public void testMethod() {
    }
}
```
### 메타 어노테이션
어노테이션 제작에 사용되는 어노테이션이 있다.

https://advenoh.tistory.com/21 에 좀 더 자세한 내용이 있다.

## 사용법



# 참고 자료
어노테이션
https://advenoh.tistory.com/21