# 테스트 코드 비밀

1. 한번 작성된 테스트 코드는 영원히 **유지보수** 해야 한다.
2. 내부 구현 사항을 테스트하면 안된다.
   - 변수나 내부 구현 사항까지 자세하게 테스트하면 안됨
3. 재사용성을 높여야한다.
   - 테스트 유틸리티
4. 배포용 코드와 철저히 분리되어야 함
5. 테스트 코드를 통한 문서화
   - 테스트 코드는 문서화에 가까움

# 테스트 코드 구조

```
1. before (beforeEach, beforeAll)
2. a Test
3. After (afterEach, afterAll)
```

```
a Test

1. 준비 (Arrange, Given) => 준비 과정 재사용 고려하기
2. 실행 (Act, When) => 의도적으로 실패하기
3. 검증 (Assert, Than) => 가장 마지막에 검증하기, 하나의 테스트코드에서 검사는 최대한 적게
```

```js
it('should ...', async () => {
  // Given
  const productionService = new ProductService()
  // When
  const items = await productionService.getItems()
  // Then
  expect(items).toHaveLength(2)
})
```

# FIRST 원칙

## Fast

- 테스트는 빨라야 한다.
- File, DB, Network I/O를 피해야 한다.

## Isolated (Independent)

- 테스트는 독립적이어야 한다.
- 테스트는 서로 의존하면 안된다.

## Repeatable

- 실행할 때마다 동일한 결과를 유지해야한다.
- 다른 테스트 코드, 외부 환경에 따라 결과가 달라지면 안된다.

## Self-Validating

- 테스트는 스스로 검증해야 한다.
- 테스트 결과는 성공 또는 실패로 나와야 한다.
- 자동화를 통한 검증 단계(CI/CD)

## Timely

- 사용자에게 배포되기 전에 테스트 코드를 작성해야한다.

# 테스트의 범위

Right-BICEP 원칙

모든 요구 사항이 정상 동작하는지 확인

모든 결과가 정확한지 확인

## Boundary conditions

- 모든 코너 케이스에 대해 테스트하기
- null, 특스 문자, 잘못된 이메일, 작은 숫자, 큰 숫자, 중복, 순서 등 엣지 케이스

feat. CORRECT 원칙

## Inverse relationships

- 역관계를 적용해서 결과값 확인
- 5 + 5 => 10일 경우 10 - 5 => 5

## Cross check

- 점화식을 이용해서 결과값 확인
- 같은 기능의 A, B 알고리즘의 결과값이 같은지 확인
- 같은 기능의 A, B 라이브러리의 결과값이 같은자 확인

## Error conditions

- 불행한 경로에 대해 우아한 처리
- 네트워크 에러, 메모리 부족, DB 중지 등

## performance characteristics

- 성능 확인은 테스트를 통해 적확한 수치로 확인

# CORECT 원칙 (테스트 커버리지)

## Conformance

특정 포멧 준수하기  
ex) 이메일 포멧, 전화번호 포멧

## Ordering

순서 조건 확인하기  
ex) 순서가 중요한 경우

## Range

숫자의 범위  
ex) 제한된 범위보다 작거나 큰 경우

## Reference

외부 의존성 유뮤, 특정한 조건의 유뮤

ex) if문, switch문 등 ~조건일 때

## Existence

값이 존재하지 않을 떄 동작 확인

ex) null, undefined, NaN, 0, '' 등

## Cardinality

0-1-n 법칙에 따라 검증

ex) 0, 1, n 개 있을 때

## Time

상대, 절대, 동시에 일어나는 이들

ex) 지역 지간, 순서가 맞지 않은 경우, 소비 시간
