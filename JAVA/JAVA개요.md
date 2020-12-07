# Java
java를 썬 마이크로시스템즈의 `제임스 고슬링`과 연구원들이 개발한 객체 지향적 프로그래밍 언어이다.

`Write Once, Run Everywhere`라는 표어는 썬 마이크로시스템즈에서  자바의 이점을 표현하기 위해 만들었다. java는 플랫폼에 독립적이라 같은 코드를 JVM만 있다면 다른 운영체제에도 실행시킬 수 있다.

이러한 점이 웹 어플리케이션의 특성과 맞아떨어져 폭발적인 인기를 끌게 되었다.

썬 마이크로시스템즈가 오라클(Oracle))에 인수되어 자바에 대한 권리와 유지보수를 오라클에서 맡고 있다.

# Java의 특징
## 플랫폼 독립성
자바는 한번 작성한 코드는 어디서든 동일하게 작동한다.(약간의 예외는 있다고 한다.)

이를 가능하게 하는것이 JVM(자바 가상 머신)이다. 

자바 코드는 컴파일을 통해 바이트코드라는 파일로 변환되고 JVM은 바이트코드를 읽어 실행시켜 준다. JVM은 운영체제에 따라 바이트코드를 기계어로 변형시켜 실행시킨다.

이러한 원리때문에 JVM은 플랫폼에 종속적이나 자바는 플랫폼에 독립적일 수 있다.
## 메모리 자동 관리
자바는 메모리를 자동으로 관리하기 때문에 메모리 해제에 대해서 신경쓰지 않는다.

메모리를 관리하는 GC(Garbage Collector)가 있다.

GC의 원리는 보충 필요

GC로 인해서 개발자가 원치 않는 타이밍에 퍼포먼스가 떨어지거나 잠시 멈추는 STW(Stop The World)문제가 있어 메모리 할당과 관리에 신경을 써줘야 한다.

## 객체 지향적 언어이다.
요즘엔 객체지향문법을 제공하지 않는 언어는 거의 없다.

## SE,EE,ME,FX
- Standard Edition : 표준 에디션으로 자바의 핵심기능이 JDK로 제공된다.
- Enterprise Edition : SE위에 탑재된 플랫폼으로 실무에 사용되는 기능이 제공된다.
- Micro Edition : 경량화된 버전으로 임베디드 기기에 구동되기 위한 환경을 제공한다.
- FX : 가볍고 예쁜 GUI를 제공하는 에디션이다. 하드웨어 가속을 지원한다.

## JDK, JRE
- JDK (Java Development Kit)
    - 자바로 개발을 하기 위한 API가 들어있다. (예전에는 JDK안에 JRE가 포함되어 있었으나 지금은 분리되었다.)
- JRE (Java Runtime Environment)
    - 자바를 실행시키기 위한 파일들이 들어있다.

## OpenJDK, OracleJDK
오라클이 자바의 소유권을 가지면서 생긴 이슈에 관한 이야기이다.

[링크](https://jsonobject.tistory.com/395)
# 참고 자료
Java
https://ko.wikipedia.org/wiki/%EC%9E%90%EB%B0%94_(%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D_%EC%96%B8%EC%96%B4)

se, ee, me, fx<br>
https://themach.tistory.com/88

https://j4bez.tistory.com/13

OpenJDK, OracleJDK
https://jsonobject.tistory.com/395
