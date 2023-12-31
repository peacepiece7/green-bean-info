# 프로젝트 소개

소비 습관을 기록하는 프로젝트입니다.

pnpm을 사용한 모노레포로 구성되어 있습니다.

## 프로젝트 구성

- greenbean-pack : 커스텀 훅이나 프로젝트에서 사용되는 모듈로 npm 레지스트리에 배포되어 있습니다.
- front : 프론트엔드 저장소입니다.
- admin : 관리자 페이지 저장소입니다.
- scripts : 스크립트가 있습니다.

## 설치 및 실행

실행 전 환경 변수 설징이 필요합니다.

```bash
git clone https://github.com/peacepiece7/my-wallet.git
nvm use
pnpm i
# 프론트엔드 실행
pnpm fe run dev

# 관리자 페이지 실행
pnpm admin run dev

# 테스트 및 린팅
pnpm run test:all
pnpm run e2e:all
pnpm run typecheck:all
pnpm run lint:all
```
