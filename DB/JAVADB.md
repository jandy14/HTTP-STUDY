# JDBC
Java DataBase Connectivity

자바 언어로 RDBMS에 접근하고 SQL문을 처리하기 위해 사용되는 표준 SQL `인터페이스` API다. SE에 기본으로 포함되어 있다.

인터페이스기 때문에 인터페이스를 구현한 구현체가 필요한데 이를 `JDBC 드라이버`라고 한다.

각 DBMS들은 JDBC 드라이버를 구현해 배포하고 있다.

그래서 실제로 JAVA앱을 통해 DB에 접속하려면 다음과 같은 과정을 거치게 된다.
1. 이용자가 JAVA프로그램에 명령을 내림
1. JAVA프로그램은 JDBC인터페이스를 호출함
1. JDBC에 로드된 드라이버가 DBMS에 접근 및 쿼리요청
1. DBMS가 쿼리 결과 반환

JDBC를 사용하게 되면 다음과 같은 주요 객체를 사용하게 된다.
- DriverManager : JDBC드라이버를 가지고 있으며, DB와 연결을 하게 해준다. (Connection 생성)
- Connection : DB와의 연결을 관리하는 객체다. 질의를 할 수 있게 Statement를 생성해 준다.
- Statement
    - Statement : 쿼리를 보내고 결과를 받을 수 있게 해주는 객체
    - PreparedStatement : 가독성을 높이고, 쿼리 실행계획이 재사용되고, SQL인젝션을 방지한 Statement (객체가 생성될 때, 전송되어 DBMS에서 컴파일되고 캐싱해둔다. 호출시 캐싱해둔 쿼리에 변수값만 채운다.(SP?))

# DBCP
DataBase Connection Pool

JAVA앱에서 JDBC를 통해 DB로 접근해 데이터를 얻기 위해서는 다음과 같은 과정을 거치게 된다.
1. JDBC 드라이버 로드
1. DriverManager를 통해 Connection 객체 생성
1. Connection 객체를 통해 Statement 객체 생성
1. Statement를 통해 질의문 전송
1. 완료되면 리소스들을 close로 반환

위 과정은 매 쿼리를 실행시마다 거치게 되는데 이를 최적화하기 위한것이 DBCP다.

DBCP는 미리 Connection을 생성해 Object Pool을 이용해 관리한다.

## Object Pool
객체를 미리 생성해두고 요청하면 Idle객체를 반환해주고, 반환하면 객체를 Idle상태로 만들어 객체의 생성과 소멸을 방지하는 방식이다.

객체를 pool에서 관리하면 다음과 같은 이점이 있다.
- 객체 생성 비용 감소
- 메모리 단편화 방지
- `GC 방지`

## 종류
- Commons DBCP : 아파치에서 만든 DBCP. JDBC버전에 유의해서 사용해야한다.
- HikariCP : 스프링부트 2.0부터 디폴트로 설정된 JDBC Connection Pool

# ORM
Object-Relational Mapping

OOP의 객체와 RDB의 레코드를 매핑시켜줘 개발자가 OOP에 집중할 수 있게 한다.(패러다임)

ORM 프레임워크는 객체와 RDB를 연결해주고 자동으로 쿼리를 생성해준다. 그래서 사용자는 ORM 프레임워크가 제공하는 쿼리 기능만 사용할 수 있다.

장점
- DBMS에 독립적이다.
- 쿼리를 신경쓰지 않아 OOP에 집중할 수 있다.(SQL을 알아야 더 잘 사용할 수 있다.)

단점
- DBMS의 고유기능은 사용하지 못한다.(이식성이 높아지긴 한다.)
- 프로젝트의 복잡성이 높아질 수록 설계가 힘들어진다.

# JPA
Java Persistence API

자바 정의한 ORM 기술 표준. `인터페이스 모음`이다.

Hibernate는 JPA를 구현한 오픈소스

# MyBatis
MyBatis는 ORM은 아니다.

MyBatis는 SQL Mapper다.

ORM은 데이터베이스의 데이터와 객체를 연결하지만 SQL Mapper는 SQL을 미리 작성하고 객체를 SQL에 값으로 넣어준다.

MyBatis는 결과값을 객체와 매핑해 값을 채워주지만 SQL을 직접관리한다는 점에서 ORM과는 차이가 있다.

이런 차이로 인해 MyBatis는 DBMS에 종속적이다.(변경이 힘들다.)

# 참고 자료

JDBC
https://opentutorials.org/module/3569/21222

PreparedStatement
https://opentutorials.org/module/3569/21377

PreparedStatement와 Statement의 차이점
https://wscbear.wordpress.com/2015/07/22/assessment/

DBCP
https://kchanguk.tistory.com/14

Commons DBCP
https://d2.naver.com/helloworld/5102792

ORM<br>
https://gmlwjd9405.github.io/2019/02/01/orm.html

http://www.incodom.kr/ORM

JPA와 MyBatis
https://dreaming-soohyun.tistory.com/entry/JPA%EC%99%80-MyBatis%EC%9D%98-%EC%B0%A8%EC%9D%B4-ORM%EA%B3%BC-SQL-Mapper

JPA
https://gmlwjd9405.github.io/2019/08/04/what-is-jpa.html
