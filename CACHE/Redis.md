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

예전의 마스터는 복구되면 슬레이브로써 다시 작동한다.

### Replication
읽기 요청을 분산하고 장애시 데이터 복구를 위해 Master-Slave 구조를 사용하는데 마스터에 있는 데이터를 복제해 슬레이브로 옮기는 작업을 Replication이라고 한다.

## Redis Cluster
레디스 클러스터는 데이터를 나누어 관리(샤딩)가 가능하다.

레디스 클러스터는 16384개(2^14)의 해시 슬롯에 데이터를 저장하며, 슬롯은 여러 마스터 노드에 분배된다.

마스터 노드들은 각각 담당할 해시슬롯을 부여받는다.
```
ex)
master1 = 0-5500
master2 = 5501-11000
master3 = 11001-16383
```

마스터 노드가 추가될 시에는 기존 노드들이 해시 슬롯을 나눠주는데 이때 시스템의 정지는 없다. 노드를 제거할 때에도 해당 노드가 맡고 있던 슬롯을 다른 노드들에게 나눠주고 제거한다.

데이터는 키를 CRC-16으로 해싱한 후 mod 16384 값으로 해시 슬롯을 정해, 해당 슬롯에 값을 저장한다.

`HASH_SLOT = CRC16(key) mod 16384`

마스터 노드가 장애로 죽어버리면 데이터가 사라져버리기 때문에 1개 이상의 복제 노드를 각 마스터 노드마다 만들어 가용성을 높인다. 마스터가 죽었다고 판단되면 복제 노드를 마스터로 승격한다.(failover)

노드에 이상이 생겼는지는 특정 프로세스가 확인하는 것이 아닌 모든 노드들이 서로는 확인하는 방식을 이용한다.(HeartBeat)

마스터 노드가 복제본에 내용을 전달하고 ACK를 받지 않아 혼잡한 장애시에는 일관성을 보장하지는 않는다.

### 왜 슬롯이 2의 14승개일까?
[Redis github issue](https://github.com/redis/redis/issues/2576)를 참고하였다.

결론부터 얘기하면 그 정도가 적절해서다.

우선 레디스 클러스터는 최대 1000대의 노드를 사용하는 것을 기준으로 제작되었다.

클러스터는 서로간의 장애여부를 판단하기 위해 Heartbeat 패킷을 주고 받는데 이 패킷에는 노드의 모든 설정 내용이 들어있다.(이를 통해 노드의 설정을 업데이트하기도 한다.) 이 말은 노드가 현재 관리하고 있는 슬롯이 무엇인지까지 들어있다는 얘기다.

이 슬롯 내용을 저장하기 위해서 레디스 클러스터는 노드에 현재 슬롯을 비트맵 방식으로 저장한다.
```
//만약 16개의 슬롯이라면
1000100001000101
// 0번, 2번, 6번, 11번, 15번
```
16384개의 슬롯을 저장하기 위해서는 2K바이트가 필요한데 이는 패킷의 크기로도 적당하면서 1000개의 노드가 나누어 가지기에도 적절한 양이다.

[Redis Cluster Code](https://github.com/redis/redis/blob/ac441c741379dd4002f664c81047e8412cb793d0/src/cluster.h#L117)

클러스터 노드 구조체에 슬롯의 정보가 담겨있다.
# 용어
- 고가용성(HA,High Availability) : 장기적으로 운영가능(고장안남)
- SPOF(Single Point Of Failure) : 고장나면 시스템 전체가 고장나는 한 점
- 다운 타임(Down Time) : 서비스가 작동하지 못하는 시간
# 참고 자료
Redis
https://brunch.co.kr/@jehovah/20

Set vs Hash
https://devspark.tistory.com/entry/HSET-vs-SET

Sentinel & Cluster
https://www.letmecompile.com/redis-cluster-sentinel-overview/

Redis Cluster
https://medium.com/garimoo/redis-documentation-2-%EB%A0%88%EB%94%94%EC%8A%A4-%ED%81%B4%EB%9F%AC%EC%8A%A4%ED%84%B0-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-911ba145e63

Sentinel & Cluster 동작 방식
https://brunch.co.kr/@springboot/218

Redis Cluster slot<br>
https://github.com/redis/redis/issues/2576

Redis Cluster HeartBeat
http://www.redisgate.com/redis/cluster/cluster_heartbeat.php

Redis Cluster Code https://github.com/redis/redis/blob/ac441c741379dd4002f664c81047e8412cb793d0/src/cluster.h#L117
