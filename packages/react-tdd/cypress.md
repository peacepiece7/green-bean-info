# cypress

사용자 관점에서의 테스트를 위한 e2e 테스트 프레임워크

`pnpm -w -D cypress`

스크립트는 약어로 만들기 (cypress 충돌 방지)

```json
{
  "scripts": {
    "cy:open": "cypress open"
  }
}
```

tsconfing.json은 inlineSourceMap: true 여야함.

`./cypress/tsconfig.json` 생성하고 `/tsconfig.e2e.json` extend하기

```json
{
  "extends": "../../../tsconfig.e2e.json"
}
```

## 타입 오류 나면 설치 하기

https://github.com/cypress-io/eslint-plugin-cypress

## 테스트시 클레스 네임 임의로 만들어주기

`cy.get('.header-title')` 이렇게 선택하면 tc가 부서지기 쉬움

https://testing-library.com/docs/cypress-testing-library/intro/

## 설치

`npm install --save-dev cypress @testing-library/cypress`
