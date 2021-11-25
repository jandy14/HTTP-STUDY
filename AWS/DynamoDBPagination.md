# DynamoDB Pagination

이 글은 해당 주제로 고민하는 사람들을 위해 작성된 글이라 이미 기본지식이 있다는 가정하에 작성되었다.

AWS DynamoDB(이하 다이나모)로 페이징 기능을 구현해야하는 이슈가 있어 찾아보고 내용을 정리해본다.

결론부터 말하면 `제한적`으로만 구현가능하다.

# 인덱스
다이나모의 데이터에 접근하기 위해서는 인덱스가 필요하다.

3가지 인덱스가 존재한다.

- primary key
- local secondary index
- global secondary index

### primary key (기본키)
기본키는 테이블 생성때 필수적으로 생성해야하는 인덱스이며, 유일한 값을 가진다.

기본키는 데이터가 어느 파티션에 결정하는 파티션키(hash key)와 어떻게 정렬기준이 되는 정렬키(range key)로 만들어 진다.

정렬키는 선택사항이라 아래 두가지 경우가 생긴다.

1. 파티션키만 사용하는 기본키
2. 파티션키 + 정렬키를 사용하는 복합 기본키

1번의 경우는 기본키는 유일값이여야 하기 때문에 파티션키가 중복되면 안되지만,
2번의 경우는 파티션키가 중복이여도 상관없다. 하지만 그럴 경우 정렬키는 서로 달라야 한다.

설정된 이후에는 `변경이 불가능`하다.

### local secondary index (LSI, 로컬 보조 인덱스)
인덱스는 파티션키 + 정렬키의 조합인데 LSI는 파티션키가 기본키의 파티션키로 설정된 인덱스다.

기본키와 달리 중복여부는 상관없다.

테이블 생성 때, 설정 가능하며 `변경이 불가능`하다.

최대 5개까지 허용한다.

### global secondary index (GSI, 글로벌 보조 인덱스)
GSI는 어떤 항목이라도 파티션키,정렬키로 설정가능하며, 테이블 생성 이후에도 생성, 삭제가 가능하다.

기본키와 달리 중복여부는 상관없다.

# 요청

하나의 인덱스를 기준으로 스캔 또는 쿼리가 가능하다.

다이나모로 스캔을 하거나 쿼리를 하는 경우 아래 조건을 걸어줄 수 있다.

- KeyConditionExpression : key값 체크 (파티션키는 동일여부만 확인가능하고, 정렬키는 대소비교까지 가능하다.)
- Limit : 가져올 데이터 갯수 제한 (정확히는 확인할 갯수를 의미한다.)
- FilterExpression : 가져오려는 값 필터링
- ExclusiveStartKey : `시작위치 설정`
- 그 외 (필자는 여기까지만 사용해보았다.)

저 중에서 `Limit`와 `ExclusiveStartKey`를 이용해서 페이징을 `제한적으로 구현` 가능하다.

# 응답
응답은 다음 처리순서를 가진다.

1. 파티션키를 이용한 파티션 확인
2. 정렬키를 이용한 탐색 시작위치 확인
3. Limit를 최대값으로 스캔시작
4. 필터를 통한 결과값 필터링

응답은 이런 값을 가진다.

- scannedCount : 스캔한 갯수
- Count : 스캔 내용중 필터까지 통과한 갯수
- Items : 결과값
- LastEvaluatedKey : 스캔한 마지막 위치 (없으면 끝까지 읽은거다.)

# 살펴볼 사항

## Count과 scannedCount

limit값은 scannedCount에 관여하는 값이다. 실제 필요한 Count값은 결과로만 알 수 있다. (== 필터링을 사용할 때 원하는 값만 가져올 수 없다.)

## LastEvaluatedKey

한 페이지당 10개씩 보는 페이지가 있을때,

1페이지 다음에 5페이지로 넘어가려고 하면 41번째부터 시작은 불가능하고 1번째부터 40번째까지 읽어서 LastEvaluatedKey를 찾은 후, ExclusiveStartKey를 설정해서 10개를 읽어야한다.

이것도 필터링이 있는 경우에는 적용하기 매우 애매하다.

# 스캔 vs 쿼리
![메소드 선택 알고리즘](https://dynobase-assets.s3-us-west-2.amazonaws.com/scan-vs-query.png)

# 참고 자료
- 요청, 응답 파라미터
    - https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/API_Query_v20111205.html
- 페이징이 안된다. 근데 RDB도 안되는거다.
    - https://dulki.tistory.com/126
- 다이나모 기본키
    - https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html#HowItWorks.CoreComponents.PrimaryKey
- 다이나모 기본키, 보조인덱스
    - https://haereeroo.tistory.com/31
- 다이나모 쿼리 파라미터
    - https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-KeyConditionExpression
- 스캔을 할까 쿼리를 할까
    - https://dynobase.dev/dynamodb-scan-vs-query/