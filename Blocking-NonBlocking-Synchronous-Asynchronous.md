# 개요
Blocking,NonBlocking,Synchronous,Asynchronous에 대해 알아본다.

# Blocking, NonBlocking
어떤 일을 처리할 때, 다른 일이 중지되고 처리될 때까지 기다리는가.

기다린다면 Blocking, 기다리지 않는다면 NonBlocking.

# Synchronous, Asynchronous
어떤 일을 처리할 때, 일이 끝나고 직접 처리하는가 맡기는가.

직접 처리한다면 Synchronous, 처리를 맡긴다면 Asynchronous.

# 4가지 경우
경우에 따라 다음 4가지 경우로 나뉘게 된다.
- Blocking-Synchronous
- Blocking-Asynchronous
- NonBlocking-Synchronous
- NonBlocking-Asynchronous
## Blocking-Synchronous
함수를 호출하면 리턴을 받을 때까지 기다리고 결과를 직접 받아 처리하게 된다.

자주 볼 수 있는 상황으로 read, write같은 함수를 사용할 때이다.
## Blocking-Asynchronous
작업을 진행하면 프로세스가 대기상태가 되지만 직접 리턴받지 않고 콜백에 의해서 처리된다.

의도하는 상황은 아니고 NonBlocking-Async라도 처리과정에서 Blocking이 포함되어 있으면 이런 현상이 나타난다(고 한다).

`IO 멀티플렉싱에 대한 내용`
## NonBlocking-Synchronous
다른 작업을 진행하시만 수시로 결과가 나왔는지 확인하고 결과가 나오면 직접 처리한다.

```java
Future ft = asyncFileChannel.read(~~~);

while(!ft.isDone()) {
    // isDone()은 asyncChannle.read() 작업이 완료되지 않았다면 false를 바로 리턴해준다.
    // isDone()은 물어보면 대답을 해줄 뿐 작업 완료를 스스로 신경쓰지 않고,
    // isDone()을 호출하는 쪽에서 계속 isDone()을 호출하면서 작업 완료를 신경쓴다.
    // asyncChannle.read()이 완료되지 않아도 여기에서 다른 작업 수행 가능 
}

// 작업이 완료되면 작업 결과에 따른 다른 작업 처리
```
## NonBlocking-Asynchronous
작업이 요청을 하고 프로세스는 바로 다른 작업을 하고, 작업이 완료되면 콜백 함수가 호출되는 형식이다.

Event-Driven이나 비동기 입출력(AIO)가 여기에 해당한다.
# 참고 자료
Blocking-NonBlocking-Synchronous-Asynchronous
https://homoefficio.github.io/2017/02/19/Blocking-NonBlocking-Synchronous-Asynchronous/

비동기 입출력
https://www.joinc.co.kr/w/Site/Network_Programing/AdvancedComm/AIO