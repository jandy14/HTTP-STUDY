# 생략된 내용
- 데이터 베이스의 장점과 특징

# 데이터 베이스
데이터 베이스는 체계화된 데이터의 집합이다.

데이터를 통합하고 관리하기 위해 만들어졌다.

데이터 베이스를 관리하는 시스템을 DBMS(DataBase Management System)라고 부른다.

가장 많이 사용되는 데이터베이스 모델은 관계형 데이터 모델이고 이런 형태로 데이터를 관리하는 시스템을 RDBMS(Relational DBMS)라고 한다.

최근에는 관계형 모델에서 벗어나 좀 더 솔루션에 효율적인 모델을 사용하기도 하는데 이러한 모델들을 `비관계형` 또는 `NoSQL`이라고 한다.

# RDBMS
RDBMS는 가장 많이 쓰이는 데이터 관리 시스템이다.

RDBMS는 크게 2가지로 이루어져 있다.

- 서버 엔진 : 클라이언트가 쿼리를 요청했을 때, 쿼리 파싱과 스토리지 엔진에 데이터를 요청하는 작업을 수행
- 스토리지 엔진 : 물리적 저장장치에서 데이터를 읽어오는 작업을 수행

스토리지 엔진은 여러 종류가 있고 종류마다 지원하는 기능에 차이가 있다. mysql에서는 자체적으로 여러 스토리지 엔진을 내장하고 있으며, 사용자가 선택할 수 있다.

## 스토리지 엔진 별 차이
mysql내에는 8가지 정도의 스토리지 엔진이 내장되어 있으며, 그 중 몇 가지를 살펴보자.

- InnoDB
    - mysql에서 기본적으로 설정되어 있는 엔진으로 트랜잭션을 지원하고 비정상 종료시 데이터 복구 기능을 제공한다.
    - 데이터 갱신이 로우 락(row lock)으로 되어 있다.
- MyISAM
    - InnoDB이전에 기본 세팅되던 엔진이다.
    - update나 delete한 적이 없는 테이블에 대해 insert(추가)를 빠르게 처리할 수 있다.
    - 트랜잭션과 비정상 종료시 복구 기능이 없고 테이블 락(table lock)으로 인해 갱신이 많은 용도로는 성능이 떨어진다.

- Maria
    - MyISAM의 후속으로 개발되고 있는 엔진이다.
    - 트랜잭션과 비정상 종료시 복구 기능을 추가했다.

더 자세한 내용은 [링크](https://dev.mysql.com/doc/refman/8.0/en/storage-engines.html)

## 트랜잭션과 Lock
트랜잭션(transaction)은 DBMS에서 처리하는 하나의 작업(쿼리의 묶음)을 의미한다.

Lock은 트랜젝션의 ACID원칙과 동시성을 지원하기 위해 Lock을 지원한다.

자세한 내용은 [링크](./트랜잭션.md)

## 정규화 (Normalization)
데이터의 중복을 최소화하고 데이터를 구조화 하는 작업.

자세한 내용은 [링크](./정규화.md)

## 무결성
무결성은 데이터가 결함없는 상태를 의미한다.

RDBMS에서는 무결성을 지키기 위해 데이터베이스에 여러 제약조건을 걸 수 있다.

- 개체 무결성 : 모든 테이블은 기본키를 가져야 하며, 기본키는 고유한 값이며, 빈 값을 허용하지 않는다.
- 참조 무결성 : 두 테이블 간의 일관성을 말하며, 외래키값으로 존재하지 않는 값을 사용할 수 없다.
- 도메인 무결성 : 해당 컬럼의 값으로 허용한 값 이 외에 값은 들어올 수 없다.

## SQL
구조화된 질의 언어(Structured Query Language)

RDB에 데이터를 조작하고 열람하기 위해서 사용하는 언어이다.

자세한 내용은 추가 예정

## SP (Stored Procedure)
저장 프로시저는 함수처럼 사용할 수 있게 미리 컴파일한 쿼리 집합이다.

저장 프로시저를 이용하면 다음과 같은 장점이 있다.

- 최초 컴파일시 최적화돼 호출시 과정을 생략할 수 있다.(비용 감소)
- 전달할 내용이 줄어들어 네트워크 트래픽이 감소한다.
- 개발언어에 비의존적이다.
- 제어문을 통해 절차적 기능 구현이 가능하다.
- SP만 수정하면 서버 재시작없이 적용시킬 수 있다.

로직을 WAS가 아닌 DBMS에서 처리를 하기 때문에 DBMS를 잘 알아야 하며, 디버깅과 유지보수가 어려워진다. 때문에 대규모가 아니면 손해일 수 있다.

# NoSQL
비 관계형 데이터 베이스 모두를 일컫는 단어다.

자세한 내용은 추가 예정

# 참고 자료
데이터 베이스
https://ko.wikipedia.org/wiki/%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4

스토리지 엔진
http://asuraiv.blogspot.com/2017/07/mysql-storage-engine.html

스토리지 엔진 비교
https://12bme.tistory.com/95

mysql 내장 스토리지 엔진
https://dev.mysql.com/doc/refman/8.0/en/storage-engines.html

무결성
https://untitledtblog.tistory.com/123

참조 무결성
https://ko.wikipedia.org/wiki/%EC%B0%B8%EC%A1%B0_%EB%AC%B4%EA%B2%B0%EC%84%B1

SP
https://greatepig.tistory.com/12

SP의 장단점<br>
https://graduation.tistory.com/444

https://okky.kr/article/396251

SP는 왜 쓰나요?
https://okky.kr/article/357441
