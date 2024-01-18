# 📝 My-Wallet

소비 습관을 기록하는 프로젝트입니다.

pnpm을 사용한 모노레포로 구성되어 있습니다.

[배포 링크](https://my-wallet-front-lilac.vercel.app/)

## 기술 스택
- Web application : Next.js(v14), Typescript, React-query, Recoil, React-hook-form, Chart.js, React-calendar, Dayjs, NextAuth.js, Sanity(CMS)  
- Testing : Cypress, Testing-library, Jest  
- Deploy : Vercel

## 작업 공간(workspace)

- greenbean-pack : 커스텀 훅이나 프로젝트에서 사용되는 모듈로 npm 레지스트리에 배포되어 있습니다.
- front : 프론트엔드 저장소입니다.
- admin : 관리자 페이지 저장소입니다.

## 설치 및 실행

```bash
git clone https://github.com/peacepiece7/my-wallet.git
nvm use
pnpm i
# 프론트엔드 애플리케이션 실행
pnpm fe run dev

# 테스트 및 린팅
pnpm run test:all
pnpm run e2e:all
pnpm run typecheck:all
pnpm run lint:all
```
## 아키텍처

![아키텍쳐 및 소개 자료](https://github.com/peacepiece7/my-wallet/assets/73880776/ceaba427-4ca9-4a57-81ce-fbefc0562839)

## CI/CD 파이프라인

![아키텍쳐 및 소개 자료](https://github.com/peacepiece7/my-wallet/assets/73880776/eac9715b-e2c2-4751-8a55-990714338551)


## NPM 모듈 배포 흐름
![아키텍쳐 및 소개 자료](https://github.com/peacepiece7/my-wallet/assets/73880776/aa609662-d619-4029-b838-3ff82c79140c)

## 미리 보기
### 렌딩 페이지

|빈 화면|Mock 데이터 추가|데이터 추가 Form|
|:-----:|:-----:|:-----:|
|<img src="https://github.com/peacepiece7/my-wallet/assets/73880776/684edaae-3319-487f-9c6d-b2a795ea025a" width=600/>|<img src="https://github.com/peacepiece7/my-wallet/assets/73880776/c9dd329c-c189-48f4-87d9-75044a87ee6b" width=600/>|<img src="https://github.com/peacepiece7/my-wallet/assets/73880776/747bfa4a-d73d-43fb-adc8-9226fe89cf26" width=600/>|

### 켈린더 페이지

|켈린더|소비내역 Form|
|:-----:|:-----:|
|<img src="https://github.com/peacepiece7/my-wallet/assets/73880776/87820e57-7dc6-4e09-b9b3-e18837d89273" width=600/>|<img src="https://github.com/peacepiece7/my-wallet/assets/73880776/fa3d7ad1-1362-4377-8f6d-4211b85af0c8" width=600/>|

### 분석 페이지

|카테고리별 지출 비율|연간 지출 비용|일변 지출 비용|
|:-----:|:-----:|:-----:|
|<img src="https://github.com/peacepiece7/my-wallet/assets/73880776/133d7ac9-8236-456d-a608-fa1ca9507346" width=600/>|<img src="https://github.com/peacepiece7/my-wallet/assets/73880776/1801cbaf-5cdf-46a0-ac1a-84e6f6abc5ad" width=600/>|<img src="https://github.com/peacepiece7/my-wallet/assets/73880776/0baa4f85-335d-44c9-9536-aeaecb04a278" width=600/>|

