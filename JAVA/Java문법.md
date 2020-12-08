# 기초 문법
기본적인 문법은 C와 비슷한 부분이 많다. OOP관련 부분도 C#과 비슷하다.

## 변수
### Built-in type
기초 자료형은 힙영역에 할당되지 않고 스택에 저장되며 '='연산시에 복사가 일어난다.
- byte : 1바이트 정수
- short : 2바이트 정수
- int : 4바이트 정수
- long : 8바이트 정수
- float : 4바이트 실수(부동소수점)
- double : 8바이트 실수(부동소수점)
- char : 2바이트 문자(유니코드)
- boolean : 1바이트 논리(true, false)

### Reference type
레퍼런스 자료형은 클래스, 배열로 만들어진 변수이며 '='연산시 참조가 일어난다.

레퍼런스 자료형은 변수를 선언하는 것으로는 데이터가 생성되지 않고, new를 통해서 객체를 만들면 데이터의 참조값(주소값)을 저장하는 용도이다.

배열은 new를 사용하지 않고 선언할 수 있다.
```java
String[] nameArr = {"잔디","제이지","죠르디"}
/* same code */
// String[] nameArr = new String[3];
// nameArr[0] = "잔디";
// nameArr[1] = "제이지";
// nameArr[2] = "죠르디";
```

### String
자바에서 문자열은 특별 취급받는 `클래스`이다. 예시를 보자
```java
String s1 = "Hello";              // String literal
String s2 = "Hello";              // String literal
String s3 = s1;                   // same reference
String s4 = new String("Hello");  // String object
String s5 = new String("Hello");  // String object
```
```java
s1 == s1;        // true, same pointer
s1 == s2;        // true, s1 and s1 share storage in common pool
s1 == s3;        // true, s3 is assigned same pointer as s1
s1.equals(s3);   // true, same contents
s1 == s4;        // false, different pointers
s1.equals(s4);   // true, same contents
s4 == s5;        // false, different pointers in heap
s4.equals(s5);   // true, same contents
```
![javaisweird](https://www3.ntu.edu.sg/home/ehchua/programming/java/images/OOP_StringLliteralVsObject.png)

자바는 연산자 오버라이딩을 지원하지 않지만 String은 +연산을 지원한다.

## 연산자
일반적으로 같다.

==연산자는 내용이 아닌 같은 객체인지 비교하는 연산자이다.

Object(최상위 클래스)의 equals메소드도 ==연산자와 같다.

`String은 equals를 오버라이딩했기 때문에 기능이 다르다!!`

## 반복문
C와 같다

for each문이 존재한다. (5.0부터 지원하는 기능)
```java
for(String name: nameArr)
{
    //do something with name
}
```
## 상속과 인터페이스
상속과 인터페이스는 공통점이 많고 어떤 것을 사용해야할지에 대한 얘기는 생략하고 문법만 적는다.

인터페이스의 멤버 변수는 모두 public static final의 속성을 갖는다.

```java
package org.opentutorials.javatutorials.abstractclass.example2;
abstract class A{
    public abstract int b();
    public void d(){
        System.out.println("world");
    }
}
class B extends A{
    public int b(){return 1;}
}
public class AbstractDemo {
    public static void main(String[] args) {
        B obj = new B();
        System.out.println(obj.b());
    }
}
```
```java
public interface Walkable {
  void walk();
}
public interface Flyable {
  void fly();
}
public interface Moveable extends Walkable, Flyable {
}
public class Bat implements Moveable {
  @Override
  public void walk() {
    // ...
  }
  @Override
  public void fly() {
    // ...
  }
}
```

인터페이스 메소드도 구현을 할 수 있다. (8버전부터)
## 접근 제한자
자바는 4가지의 접근제한자를 가진다.
- public : 접근 제한 없음. 모두 허용
- protected : 동일 패키지내 클래스와 상속받은 클래스만 접근 허용
- default(표시안함) : 동일 패키지내 클래스만 접근 허용
- private : 현재 객체 내에서만 접근 허용

접근 제한자는 다음 요소에만 적용할 수 있다.
- 클래스 (public, default만)
- 멤버 변수, 메소드, 생성자
## final
변경과 상속을 금지시키는 키워드이다. 클래스, 메소드, 변수에 적용할 수 있다.

- final 클래스 : 상속 불가
- final 메소드 : 오버라이딩 불가
- final 변수 : 값 변경 불가
## 패키지
패키지는 클래스가 관리되고 있는 디렉토리와 동일하다.

자바는 클래스별로 파일을 생성한다.

클래스의 패키지는 파일 위에 `package` 키워드와 함께 적어준다.

다른 패키지의 클래스를 사용하기 위해서는 `import` 키워드를 사용한다.

```java
package org.opentutorials.javatutorials.packages.example2;
import org.opentutorials.javatutorials.packages.example1.*;
 
public class C {
    public static void main(String[] args) {
        A a = new A();
    }
}
```
`*` 는 와일드 카드로 패키지 내에 모든 클래스를 가져온다. `*` 대신 특정 클래스의 이름을 적어 그 클래스만 사용할 수도 있다.

클래스가 중복되어 모호한 경우가 있다면 아래와 같이 우회할 수도 있다.
```java
package org.opentutorials.javatutorials.packages.example3;
import org.opentutorials.javatutorials.packages.example1.*; // B class
import org.opentutorials.javatutorials.packages.example2.*; // B class
 
public class D {
    public static void main(String[] args) {
        org.opentutorials.javatutorials.packages.example2.B b = new org.opentutorials.javatutorials.packages.example2.B();
    }
}
```

## 예외 처리
코드
```java
class A{
    private int[] arr = new int[3];
    A(){
        arr[0]=0;
        arr[1]=10;
        arr[2]=20;
    }
    public void z(int first, int second){
        try {
            System.out.println(arr[first] / arr[second]);
        } catch(ArrayIndexOutOfBoundsException e){
            System.out.println("ArrayIndexOutOfBoundsException");
        } catch(ArithmeticException e){
            System.out.println("ArithmeticException");
        } catch(Exception e){
            System.out.println("Exception");
        } finally {
            System.out.println("finally");
        }
    }
}
 
public class ExceptionDemo1 {
    public static void main(String[] args) {
        A a = new A();
        a.z(10, 0);
        a.z(1, 0);
        a.z(2, 1);
    }
}
```
결과
```
ArrayIndexOutOfBoundsException
finally
ArithmeticException
finally
2
finally
```

throws 다음에 오는 예외들은 사용자에게 처리를 위임한다.
```java
import java.io.*;
class B{
    void run() throws IOException, FileNotFoundException{
        BufferedReader bReader = null;
        String input = null;
        bReader = new BufferedReader(new FileReader("out.txt"));
        input = bReader.readLine();
        System.out.println(input);
    }
}
class C{
    void run(){
        B b = new B();
        try {
            b.run();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

throw는 예외를 발생시킨다.

```java
class E{
    void throwArithmeticException(){
        throw new ArithmeticException();
    }
    void throwIOException1(){
        try {
            throw new IOException();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    void throwIOException2() throws IOException{
        throw new IOException();
    }
}
```

IOException은 try-catch나 throws가 필요하다.

하지만 ArithmeticException은 처리를 하지 않아도 컴파일된다.

그 이유를 알아보자.

### Throwable
자바에는 Throwable이라는 클래스가 있고 다음과 같은 상속 구조를 갖는다.

![Throwable](https://t1.daumcdn.net/cfile/tistory/99AB903359999E5D30)

- Error는 코드가 아닌 JVM이 발생시킨 것으로 개발자가 직접적으로 처리할 수 있는 부분이 없다.
- Exception 코드에서 예외를 필수적으로 처리해줘야만 컴파일된다.
- RuntimeException은 예외를 처리하지 않아도 컴파일이 가능하다.(실행도중 예외가 발생하면 프로그램은 죽는다.)

IOException은 Exception을 상속받은 예외이고, ArithmeticException은 RuntimeException을 상속받은 예외이다.

Checked Exception과 Unchecked Exception이라고도 한다.

### 커스텀 예외
```java
class DivideException extends RuntimeException {
    DivideException(){
        super();
    }
    DivideException(String message){
        super(message);
    }
}
```
만약 Exception을 상속받아 예외를 만들고 throw시킨다면, try-catck나 throws를 적어주지 않으면 컴파일시 에러가 발생한다.

## Object
모든 클래스는 Object를 상속받는다. Object에는 다음과 같은 메소드가 있다.

- toString() : 객체를 String으로 반환
- equals(Object obj) : obj가 객체와 동일 객체인지 반별
- clone() : 해당 객체와 같은 값을 가지는 객체 생성 반환
- hashCode() : 객체의 해시코드값(int) 반환
- getClass() : 해당 객체의 클래스 객체 반환 (Class라는 클래스가 있다!)

외에도 더 있지만 여기까지만 알아본다.

## 제네릭
C++에서의 템플릿. 일반화 프로그래밍을 지원하기 위한 문법이다.

적용할 수 있는 요소는 클래스와 메소드이다.

문법을 살펴보자.
```java
class Person<T, S>{
    public T info;
    public S id;
    Person(T info, S id){ 
        this.info = info;
        this.id = id;
    }
    public <U> void printInfo(U info){
        System.out.println(info);
    }
}
```
extends로 자식 클래스 타입만 사용하도록 제한할 수 있다.

아래 예제는 Info의 자식 클래스만 타입으로 사용가능하다.
```java
class Person<T extends Info>{
    public T info;
    Person(T info){ this.info = info; }
}
```

super로 부모 클래스 타입만 사용하도록 제한할 수 있다.(언제 쓰려나)

사용법은 extends와 동일

제네릭은 생략이 가능하다. 아래 두 줄은 동일한 작업을 한다.
```java
Person<Info, Integer> p1 = new Person<Info, Integer>(e, i);
Person p2 = new Person(e, i);
```

## 콜렉션
![콜렉션구조도](https://s3.ap-northeast-2.amazonaws.com/opentutorials-user-file/module/516/2160.png)

기본적인 내용은 넘어가고 각각의 특징만 보도록 하자. (사용법은 쓸 때 알아보자. Iterator 통해서 접근하는 듯)

### set
중복없이 자료를 저장하는 자료구조

- HashSet : 해싱을 이용해서 자료를 관리한다. 순서 보장 안됨, 삽입/삭제 O(1)
- LinkedHashSet : 해싱과 링크드리스트를 이용해 자료를 관리한다. 입력 순서 보장, 삽입/삭제 O(1) 순서를 기억할 리스트가 추가되기 때문에 메모리 사용이 늘어나고, 삽입/삭제에 약간의 로직이 추가되어 HashSet보다는 (아주) 조금 느리다.

- TreeSet : 트리(레드-블랙)를 이용해서 자료를 관리한다. 자료는 정렬된다. 삽입, 삭제 O(log(n))

### List
설명 생략

- ArrayList : 배열로 구현된 리스트. 용량(capacity)이 차면 자동으로 추가로 용량을 확보한다.
- Vector : 동기화 기능이 추가된 ArrayList. 멀티스레드에서도 안전!
- LinkedList : 연결리스트.

### Map
Map은 Set에 key:value형태로 저장하는 자료구조이다.

- HashMap : HashSet과 동일
- HashTable : 동기화 기능이 있는 HashMap
- LinkedHashMap : LinkedHashSet과 동일
- TreeMap : TreeSet과 동일

## enum
자바에서 enum은 클래스로 관리된다.

예제를 먼저 보고 문법에 대해 알아보자.

```java
enum Fruit{
    APPLE("red"), PEACH("pink"), BANANA("yellow");
    private String color;
    Fruit(String color){
        System.out.println("Call Constructor "+this);
        this.color = color;
    }
    String getColor(){
        return this.color;
    }
}

enum Company{
    GOOGLE, APPLE, ORACLE;
}

public class ConstantDemo {
     
    public static void main(String[] args) {
        Fruit type = Fruit.APPLE;
        switch(type){
            case APPLE:
                System.out.println(57+" kcal, "+Fruit.APPLE.getColor());
                break;
            case PEACH:
                System.out.println(34+" kcal"+Fruit.PEACH.getColor());
                break;
            case BANANA:
                System.out.println(93+" kcal"+Fruit.BANANA.getColor());
                break;
        }
    }
}
```

- 생성자는 private만 가능하다.
- 생성자의 매개변수는 다음과 같이 넣어준다. (많이 특이하다.)
    - `APPLE("red"), PEACH("pink"), BANANA("yellow");`
- 멤버 변수도 사용가능하다. 접근제한자는 자유.
- values()라는 메소드를 통해 열거값 모두를 얻을 수 있다.

# 그냥 넘어가지만 중요한 내용
언어에서 중요한 내용이지만 다른 언어(C, C++, C#, Python)들과 많이 중복되는 내용이라 생략한 내용

- 제어문
- 반복문
- 연산자
- static
- 오버라이딩
- 오버로딩
- 클래스와 인스턴스
- 추상 (abstract)
- 다형성
- 동적 바인딩

# 용어
- 용량 : capacity. 데이터의 양이 아닌 실제로 확보하고 있는 공간의 양

# 참고 자료
java문법
https://opentutorials.org/course/1223/6062

built-in type
https://introcs.cs.princeton.edu/java/12types/

java string
https://www3.ntu.edu.sg/home/ehchua/programming/java/J3d_String.html

interface
https://velog.io/@codemcd/%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4Interface

접근 제한자<br>
https://jwprogramming.tistory.com/149

https://gyrfalcon.tistory.com/entry/JAVA-%EC%A0%91%EA%B7%BC-%EC%A0%9C%ED%95%9C%EC%9E%90

예외
https://shnoble.tistory.com/82

Set
https://velog.io/@gillog/HashSet

LinkedHashSet
https://docs.oracle.com/javase/7/docs/api/java/util/LinkedHashSet.html

LinkedHashSet의 삽입/삭제의 시간 복잡도
https://stackoverflow.com/questions/18467777/hashset-and-linkedhashset

List
https://blog.naver.com/PostView.nhn?blogId=heartflow89&logNo=220991199432&parentCategoryNo=&categoryNo=28&viewDate=&isShowPopularPosts=false&from=postView