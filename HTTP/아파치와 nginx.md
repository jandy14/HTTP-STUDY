# apache와 nginx
둘 다 대표적으로 사용되는 웹 서버이다. 점유율을 아파치가 훨씬 우세하지만 nginx의 점유율도 꾸준히 상승 중이다.

## apache
아파치는 대표적으로 사용되는 웹서버이다.

아파치는 다중 사용자를 처리하기 위해서 MPM(multi processing module)이라는 방식으로 요청을 처리한다.

MPM은 prefork, worker, event(2.4버전부터)방식이 존재하며, 아파치 설정을 통해 정할 수 있다.

### prefork
미리 자식 프로세스를 만들어 두며, 최대 1024개까지 가능하다.

하나의 자식프로세스당 하나의 스레드를 가지며(프로세스당 하나의 연결을 처리한다.), 메모리를 공유하지 않아 안전하다.?

일반적으로 싱글 코어에서 좋은 성능을 낸다.
### worker
자식 프로세스당 최대 64개의 스레드(스레드당 하나의 연결을 처리한다.)까지 처리한다. 스레드끼리는 메모리를 공유한다.

prefork에 비해 메모리 사용량이 적어 사용자가 많을 때 유리하다.

일반적으로 멀티 코어에서 좋은 성능을 낸다.

### event
2.4.x버전부터 지원하는 방식이며 nginx가 다중처리를 하는 방식이다.

아파치는 worker기반으로 event 방식을 구현하였으며, 기존에 keep-alive로 인해서 프로세스(또는 스레드)가 대기상태가 되고, 메모리를 차지하는 문제를 해결하기 위해서 만들어졌다.

event방식은 리스닝 소켓과 다른 소켓을 관리하는 스레드를 따로 두는 방식을 사용한다. 이 스레드에서 이벤트가 생기면 worker스레드에 전달해 worker스레드가 처리한다.

![apache의 mpm](https://taes-k.github.io/images//posts/2019-03-08-server-nginx-event-driven/nginx-event-driven_1.png)

## nginx
보안과 가벼움이 강점인 웹서버이다.

MPM으로 event driven방식을 이용해 적은 메모리로 사용가능하다.

요청이 들어오면 요청을 이벤트로 만들어주는 reactor와 이벤트를 각 worker로 넘겨줄 handler로 이루어져 있다.

![nginx의 구조](https://taes-k.github.io/images//posts/2019-03-08-server-nginx-event-driven/nginx-event-driven_2.png)

I/O가 처리가 많으면 시스템 큐에 요청이 쌓이게되어 성능이 저하될 수 있다고 한다.

# 참고 자료
MPM의 방식 
https://bkjeon1614.tistory.com/23

MPM의 방식
https://megaidc.net/board_kRVd58/17022

아파치와 nginx
https://taes-k.github.io/2019/03/08/server-nginx-event-driven/
