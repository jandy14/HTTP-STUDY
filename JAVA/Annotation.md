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
    String name() default "user"; //미지정시 기본 값으로 user가 지정된다
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
어노테이션 정보를 얻기 위해서는 리플렉션이라는 기능이 필요하다.

리플렉션은 구체적인 클래스 타입을 알지 못해도, 그 클래스의 메소드,타입,변수들에 접근할 수 있도록 해주는 JavaAPI다.

이를 이용해서 클래스에 사용된 어노테이션 정보도 알아낼 수 있다.
```java
//어노테이션 구현
@Retention(RetentionPolicy.RUNTIME) // 이 어노테이션은 런타임에도 정보를 가지고 있음
@Target(ElementType.METHOD) // 이 어노테이션은 메소드에만 사용 가능
public @interface MyAnnotation {
    String name();
    String value() default "기본 값";
}

//어노테이션 적용
public class TheClass {
    @MyAnnotation(name = "doThisMethod", value = "Hello World")
    public void doThis() {
    }

    @MyAnnotation(name = "doThatMethod")
    public void doThat() {
    }
}

public class MethodAnnotationExecutor {
    public static void main(String[] args) throws NoSuchMethodException {
        Method method = TheClass.class.getMethod("doThis"); //자바 리플렉션 getMethod로 메서드 doThis를 얻어온다
        Annotation[] annotations = method.getDeclaredAnnotations(); //메서드에 선언된 어노테이션 객체를 얻어온다


        for (Annotation annotation : annotations) {
            if (annotation instanceof MyAnnotation) {
                MyAnnotation myAnnotation = (MyAnnotation) annotation;
                System.out.println("name: " + myAnnotation.name()); //어노테이션에 지정한 값을 프린트한다

                System.out.println("value: " + myAnnotation.value());
            }
        }

        Annotation annotation = TheClass.class.getMethod("doThat") 
                            .getAnnotation(MyAnnotation.class); //메서드 doThat에 선언된 MyAnnotation의 어노테이션 객체를 얻어온다


        if (annotation instanceof MyAnnotation) {
            MyAnnotation myAnnotation = (MyAnnotation) annotation;
            System.out.println("name: " + myAnnotation.name());
            System.out.println("value: " + myAnnotation.value());
        }
    }
}
```

# 참고 자료
어노테이션
https://advenoh.tistory.com/21

리플렉션
https://brunch.co.kr/@kd4/8