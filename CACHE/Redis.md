# Redis
Remote Dictionary Server

key-value형식의 in-memory방식의 데이터 베이스다.

데이터의 유효기간을 정할 수 있어 캐시서버로도 많이 사용된다.

다양한 데이터 형식을 지원한다.
- Strings : 문자열
- Lists : Array형식
- Sets : 집합
- Sorted Sets : 정렬된 집합 (리더보드에 유용)
- Hashes : 복잡한 데이터

## Set vs Hash
레디스에서의 셋과 해쉬의 차이를 알아보자.

셋은 키와 밸류의 구조로 되어 있다. 해쉬는 밸류의 내용이 {nickname: 'John', age:35}이런 식으로 복합적으로 구성되어 있다.

셋은 키값을 그냥 사용하는데에 반해 해쉬는 키값을 해싱하는 과정이 추가된다.

# In-Memory
데이터를 보조저장장치가 아닌 주저장장치에 모두 저장하는 방식이다.

데이터를 찾기 위해 디스크에 접근할 일이 없어 매우 빠른 성능을 보여준다.

프로세스가 종료되면 모든 데이터가 사라지기 때문에 주기적으로 데이터를 디스크에 저장하는 등의 안전장치가 존재한다.

# Redis의 특징
위 특징외에 redis의 추가적인 특징을 알아보자.

레디스는 싱글스레드로 동작한다. 여러 프로세스를 켜두고 사용하기 유용하다?

## 운영 방식
Redis는 단일 인스턴스만으로도 운영이 가능하지만, failover(HA)나 머신의 물리적 한계를 늘리기 위해서 Sentinel이나 Cluster등의 운영 모드를 사용한다.

## Redis Sentinel
Master-Slave 구조(마스터는 하나지만 슬레이브는 여러개 가능)로 되어있고 프로세스들이 잘 작동하는지 모니터링하는 Sentinel 프로세스가 실행된다.

일반적으로 마스터에서는 쓰기/읽기를 모두 지원하지만, 슬레이브는 읽기만 지원한다.

안정적인 운영을 위해서는 Sentinel 프로세스를 여러개 실행시키며(물리적으로 떨어져 있어도 상관없음), 각 프로세스는 Redis인스턴스를 모니터링 하다 과반수 이상이 장애가 생겼다고 투표하면 장애라고 판단하고 복구한다.

마스터에 장애가 발생했다고 판단되면, 슬레이브 중 하나를 마스터로 만들어 장애를 복구한다.(failover)

### Replication
읽기 요청을 분산하고 장애시 데이터 복구를 위해 Master-Slave 구조를 사용하는데 마스터에 있는 데이터를 복제해 슬레이브로 옮기는 작업을 Replication이라고 한다.

## Redis Cluster

# 용어
- 고가용성(HA,High Availability) : 장기적으로 운영가능(고장안남)
- SPOF(Single Point Of Failure) : 고장나면 시스템 전체가 고장나는 한 점

# 참고 자료
Redis
https://brunch.co.kr/@jehovah/20

Set vs Hash
https://devspark.tistory.com/entry/HSET-vs-SET