# Jest

https://jestjs.io/docs/getting-started

## 설치

```bash
cd unit-basic
npm init -yes
npm install jest --global
npm install jest --save-dev
npm install @types/jest --save-dev
# typescript를 사용할 경우
npm install ts-jest --save-dev
```

jest --init
√ Would you like to use Jest when running "test" script in "package.json"? ... yes
√ Would you like to use Typescript for the configuration file? ... no
√ Choose the test environment that will be used for testing » node
√ Do you want Jest to add coverage reports? ... yes
√ Which provider should be used to instrument code for coverage? » v8
√ Automatically clear mock calls, instances, contexts and results before every test? ... yes

```

## CLI

`jest --watchAll` : 모든 테스트

`jest --watch` : 변경된 파일만 테스트, git에 올라간 파일만 테스트

`jest --coverage` : 커버리지 확인

## API

### Matchers

https://jestjs.io/docs/using-matchers#common-matchers

객체, 불리언, 숫자, 문자 등 다양한 타입에 대한 테스트 API 제공

to ~ 형태로 제공됨 Matcher는 굳이 외우기보다 이렇게 비교하는 기능 있을까? 싶으면 다 있음

대략 아래와 같은 느낌으로 제공됨

- `toBe` : 값이 정확히 일치

`expect(2 + 2).toBe(4)`

- `toEqual` : 객체의 경우 값이 같은지 확인
-

```

const data = {one: 1};
data['two'] = 2;
expect(data).toEqual({one: 1, two: 2});

```

- `not` : 반대로 테스트
- `toBeNull` : null인지 확인
- `toBeUndeined` <=> `toBeDefined` : undefined인지 확인
- `toBeTruthy` <=> `toBeFalsy` : truthy, falsy인지 확인

`expect(n).not.toBeUndefined();`

- `toBeGreaterThan` : 큰지 확인
- `toBeGreaterThanOrEqual` : 크거나 같은지 확인
- `toBeLessThan` : 작은지 확인
- `toBeLessThanOrEqual` : 작거나 같은지 확인

- `toMatch` : 정규식과 매칭되는지 확인

`expect('Christoph').toMatch(/stop/);`

- `toContain` : 배열에 특정 요소가 있는지 확인

```

expect(shoppingList).toContain('milk');
expect(new Set(shoppingList)).toContain('milk');

```

- toThrow : 에러 throw

`expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');`

## Jest 정리

1. 함수 단위의 테스트 코드를 작성해야함
2. 비동기 코드의 경우 네트워크같은 사이드 이펙트가 테스트 코드에 영향을 주어선 안됨
3. 행동 또는 결과를 테스트 해야함

Stub는 주로 행동을 테스트할 때 사용

Mock은 주로 결과를 테스트할 때 사용
```
