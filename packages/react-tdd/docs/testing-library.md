# 설치

`pnpm i -w -D @testing-library/jest-dom @testing-library/react @/testing-library/user-event jest-environment-jsdom jest-preview react-test-renderer @types/react-test-renderer`

### @testing-library/jest-dom

- `toBeInTheDocument` 같은게 들어있음
- jest.setup.js에 import 해줘야함

### @testing-library/react

- react component 테스트 도구

이런식으로 쓰임

```js
import { render, screen, waitFor } from '@testing-library/react'

// ...
expect(screen.getByDisplayValue('bts')).toBeInTheDocument()
```

### @/testing-library/user-event

- 사용자 이벤트를 테스트하기 위한 도구

이런식으로 쓰임

```js
const component = renderer.create(
  withRouter(<Route path='/' element={<SearchHeader />} />)
)
```

### jest-environment-jsdom

- jest 실행 환경을 jsdom으로 설정

### jest-preview

- jest 환경을 jsdom으로 설정

### react-test-renderer

- react component를 테스트하기 위한 도구
- @types/react-test-renderer
