# IoC (Inversion of Control)
IoC는 객체의 생성과 삭제(생명 주기)를 개발자가 아닌 컨테이너가 관리하는 것을 말한다. (객체 생명 주기 관리(Control)의 주체가 개발자에서 컨테이너로 변화(역전, Inversion)됐다.)

스프링에서는 이를 처리하는 컨테이너를 스프링 컨테이너, IoC 컨테이너로 부른다.

IoC 컨테이너는 스프링 코어에 해당하는 부분으로 스프링을 사용하면 필수적으로 사용하게 된다.

IoC 컨테이너는 빈 팩토리(Bean Factory)라는 것을 통해서 객체를 어떻게 만들지 설명한 지시서를 읽고 객체에 필요한 다른 객체를 생성하고 연결시켜 주는 일을 하는데 이를 DI작업이라고 한다.

빈 팩토리를 상속받은 앱 컨텍스트(ApplicationContext)라는 인터페이스가 있다. 개발에 필요한 추가적인 기능을 제공한다. 빈 팩토리보다 이쪽을 사용하게 된다.

## DI(Dependency Injection)
DI(Dependency Injection)는 특별한 것이 아니라 객체내에서 객체를 생성하지 않고 외부에서 객체를 생성하고 전달하는 것을 의미한다.

변화에 강해지기 위해서 사용하는 것이기 때문에 전달되는 객체는 인터페이스로 구현되어있을 경우가 높다.(인터페이스가 아니면 의미가 떨어진다.)

DI로 인해서 생기는 장점은 다음과 같다.
- 객체관의 의존성이 낮아진다.(어떤 클래스에 변화가 있을 때, 기존 클래스를 변경할 필요가 없어진다. 따라서 컴파일양도 줄어든다.)
- 의존성이 낮으면 재사용성이 높아진다.
- 단위 테스트가 쉬워진다.

## IoC 컨테이너 예시
IoC컨테이너의 DI작업 예시를 보자.

기본 코드 (메소드의 구현은 생략한다.)
```java
//시험 점수 클래스
public class NewlecExam {
    public int math;
    public int kor;
    public int eng;
    public int com;
    public int Total() {}
    public float Avg() {}
}
//시험 점수 출력 클래스
public class InlineExamConsole {
    public NewlecExam exam;
    public InlineExamConsole() {
        exam = new NewlecExm();
    }
    public void Print() {}
}
```
위 방법은 문제가 있다. 새로운 시험에 NewlecExam이 아닌 새로운 클래스엔 전혀 대응을 할 수가 없다.(다시 작성해야 한다.) 그래서 사용하는 것이 인터페이스다.
```java
public interface Exam {
    public int Total();
    public float Avg();
}
//시험 점수 클래스
public class NewlecExam implements Exam {
    public int math;
    public int kor;
    public int eng;
    public int com;
    @Override
    public int Total() {}
    @Override
    public float Avg() {}
}
//시험 점수 출력 클래스
public class InlineExamConsole {
    public Exam exam;
    public InlineExamConsole() {
        exam = new NewlecExam();
    }
    public void Print() {}
}
```
위 방식은 새로운 Exam이 생겨도 생성자의 내용만 바꿔주면 된다. 하지만 그것도 별로다.(뭔가 변할 때, 다른 쪽도 바꿔줘야하는거 자체가 문제다.)
```java
public interface Exam {
    public int Total();
    public float Avg();
}
//시험 점수 클래스
public class NewlecExam implements Exam {
    public int math;
    public int kor;
    public int eng;
    public int com;
    @Override
    public int Total() {}
    @Override
    public float Avg() {}
}
public interface ExamConsole {
    public void Print();
}
//시험 점수 출력 클래스
public class InlineExamConsole interface ExamConsole{
    public Exam exam;
    public InlineExamConsole(Exam exam) {
        this.exam = exam;
    }
    public void SetExam(Exam exam) {this.exam = exam;}
    @Override
    public void Print() {}
}
```
생성자에 Exam을 파라미터로 받음으로써 객체 내에서 생성과 관련된 내용이 사라지고 그로인해 InlineExamConsole은 Exam이 무엇이 되었든 고칠 필요가 없어졌다.(하는 김에 ExamConsole 인터페이스도 만들어줬다. setter도 만들었다.)

이런 식으로 내부가 아닌 외부에서 의존성 객체를 생성해 전달(주입)하는 방법을 DI(의존성 주입)라고 한다.

그럼 이제 Exam이 변해도 어떤 코드도 고칠 필요가 없을까?

그건 절대 아니다. 위치가 변했을 뿐 ExamConsole에 어떤 Exam을 넣어 줄지는 적어줘야하고 그 부분은 수정해야한다.

그렇다면 이 구조가 가지는 의미는 무엇인가

가장 큰 의미는 InlineExamConsole은 이제 수정할 필요가 없다는 것이다.(Exam객체가 변하는거 때문에 수정할 필요는 없다. 인터페이스가 변하는건 다른 문제다.)

그것이 가지는 의미는 뭘까

의존성의 감소라는 의미를 가진다. Exam객체가 변함에 따라 InlineExamConsole이 변하지 않아도 된다는 의미이고, 그로 인해 리컴파일량이 줄어들고 InlineExamConsole자체의 재사용성도 올라간다. (코드의 관리도 용이해진다고 생각한다. Exam객체를 변경하고 싶은데, 내부에서 Exam을 생성하는 객체가 있다면 언제 전부 찾고 있겠는가)

그리고 스프링은 이 작업을 코드에서 하는 것이 아닌 IoC 컨테이너에게 맡긴다.

위 예시를 기준으로 예시를 들어보자.

(적당히 개념적인 내용만 적은 파일이다. 실제 내용과 차이가 있다.)
```java
public class Program {
    public static void main(String[] args) {
        //세팅파일.xml을 읽고 객체 생성
        ApplicationContext context = 
            new ClassPathXmlApplicationContext("세팅파일.xml");
        //생성된 ExamConsole반환
        ExamConsole console = context.getBean("consoleObj");
    }
}
```
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans">
    <!-- examObj라는 NewlecExam생성 -->
    <bean id="examObj" class="spring.패키지.이름.NewlecExam"/>
    <!-- consoleObj라는 InlineExamConsole생성-->
    <bean id="consoleObj" class="spring.패키지.이름.InlineExamConsole">
        <!-- SetExam이라는 setter가 있어야
        property로 exam에 값을 넣어줄 수 있다. -->
        <property name="exam" ref="examObj"/>
    </bean>
</beans>
```
참고로 위 방식은 스프링에서도 구식이라고 한다. 요즘은 어노테이션을 통해 객체의 생성을 지시한다고 한다.

위 예시는 아래 내용과 같은 내용이다.
```java
public class Program {
    public static void main(String[] args) {
        Exam exam = new NewlecExam();
        ExamConsole console = new InlineExamConsole(exam);
    }
}
```
오히려 더 복잡해졌다!

하지만 중요한 구조의 차이가 생겼다. 객체의 생성을 코드에서 하는 것이 아닌 컨테이너에게 지시서(xml파일)를 주고 시켰다는 것이다.(DI를 개발자가 아닌 컨테이너가 해준다.)(IoC) 이것은 어떤 의미를 가지는 것일까.

## IoC컨테이너를 사용하는 이유
새로운 인터페이스 구현에 코드 수정이 필요없어 진다는 점이 가장 눈에 띈다.

여러 자료들에 따르면 다음과 같은 이점이 있다고 한다.
- 비즈니스 로직과 객체 관리의 분리
- 구현체들 간에 변경이 용이
- 유지/관리의 용이 (안해본 사람은 모른다고까지 말하는 사람도 있었다.)

알 듯하지만 아직은 진심으로 와닿지는 않는다. 이 부분은 실제 프로젝트를 한 뒤, 다시 생각해봐야 할 듯 하다.

## DI 방법과 순환 참조
스프링에서는 DI를 위해 3가지 방법을 제공한다.

* Field Injection (필드 주입)
* Setter Based Injection (수정자 주입)
* Construction Based Injection (생성자 주입)

각각 코드로 나타내면 다음과 같다.
```java
// Field Injection
@Autowired
private CourseService courseService;

// Setter Based Injection
@Autowired
public void setCourseService(CourseService courseService) {
    this.courseService = courseService;
}

//Construction Based Injection
@Autowired
public StudentServiceImpl(CourseService courseService) {
    this.courseService = courseService;
}
```
이 중에서 스프링은 생성자 주입을 권장하고 있다.

이유는 순환참조가 있는지 앱 실행도중이 아닌 앱 시작시에 알 수 있기 때문이다.
```
Bean의 필드에 다른 Bean이 있는 것을 참조라고 하는데, 이 참조에 순환이 생기는 것을 `순환참조`라 한다.
```
순환 호출과 같은 문제를 막기 위해서 순환 참조를 하지않는 것이 좋은데, 수정자 주입이나 필드 주입은 빈을 모두 생성하고 실행되기 때문에 순환 참조가 있는지 알아내지 못하지만 생성자 주입은 객체 생성과 동시에 필드를 채우기 때문에 순환 참조를 찾아낼 수 있다.

그리고 보너스로 필드에 final 키워드를 사용할 수 있게 된다.

# 참고 자료
IoC 컨테이너
- https://gunju-ko.github.io/toby-spring/2019/03/25/IoC-%EC%BB%A8%ED%85%8C%EC%9D%B4%EB%84%88%EC%99%80-DI.html

DI란
- https://velog.io/@wlsdud2194/what-is-di

IoC의 장점
- https://weicomes.tistory.com/451
- https://vandbt.tistory.com/43
- https://starkying.tistory.com/entry/IoC-DI

DI 방법과 순환 참조
- https://yaboong.github.io/spring/2019/08/29/why-field-injection-is-bad/
- https://madplay.github.io/post/why-constructor-injection-is-better-than-field-injection
