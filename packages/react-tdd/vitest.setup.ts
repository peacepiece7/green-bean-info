// tsconfig.json의 types : ["@testing-library/jest-dom"]인식이 안되는 문제
// https://github.com/testing-library/jest-dom/issues/515
import '@testing-library/jest-dom'
import '@testing-library/cypress'
import '@testing-library/cypress/add-commands'
