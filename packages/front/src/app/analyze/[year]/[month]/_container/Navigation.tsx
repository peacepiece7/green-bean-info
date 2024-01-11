import { dayState } from '@/store/dayState'
import { useRecoilValue } from 'recoil'
import { dayManager } from '@/util/dayManager'
import styled from 'styled-components'
import { COLOR, SPACE, TEXT } from '@/styles/common'
import Link from 'next/link'
import { DatePicker } from '@/components/DatePicker'
import { useRouter } from 'next/navigation'

export function Navigation() {
  const { year, month } = useRecoilValue(dayState)
  const router = useRouter()

  return (
    <div>
      <Container>
        <LinkWrapper
          href={`/analyze/${dayManager.subtractDateWith(`${year}-${month}`, 'year').formatRouterDate(null, 'YYYY/MM')}`}
        >
          {'≪'}
        </LinkWrapper>
        <LinkWrapper
          href={`/analyze/${dayManager
            .subtractDateWith(`${year}-${month}`, 'month')
            .formatRouterDate(null, 'YYYY/MM')}`}
        >
          {'<'}
        </LinkWrapper>
        <Title>
          {year}년 {month}월 소비 패턴
        </Title>
        <LinkWrapper
          href={`/analyze/${dayManager.addDateWith(`${year}-${month}`, 'month').formatRouterDate(null, 'YYYY/MM')}`}
        >
          {'>'}
        </LinkWrapper>
        <LinkWrapper
          href={`/analyze/${dayManager.addDateWith(`${year}-${month}`, 'year').formatRouterDate(null, 'YYYY/MM')}`}
        >
          {'≫'}
        </LinkWrapper>
      </Container>
      <InputWrapper>
        <p>직접 변경하기</p>
        <DatePicker
          selected={new Date(`${year}-${month}`)}
          onChange={(date) => router.push(`/analyze/${dayManager.formatRouterDate(date, 'YYYY/MM')}`)}
        />
      </InputWrapper>
    </div>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${SPACE['12']};
`
const Title = styled.h1`
  font-size: ${TEXT.size['3xl']};
  text-align: center;
`

const InputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1150px;
  margin: ${SPACE['8']} auto 0 auto;
  padding-right: ${SPACE['4']};
  justify-content: end;
  align-items: center;
  font-size: ${TEXT.size['xl']};

  p {
    margin-right: ${SPACE['4']};
  }
`

const LinkWrapper = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 3rem;
  max-height: 3rem;
  font-size: ${TEXT.size['xl']};
  color: ${COLOR.white};
  text-decoration: none;
  background-color: ${COLOR.focusLight};
  transition: background-color 0.2s ease-in-out;
  margin: 0 ${SPACE['4']};
  border-radius: 0.4rem;
  &:hover {
    background-color: ${COLOR.tertiary};
  }
`
