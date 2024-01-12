import Link from 'next/link'
import { NextPage } from 'next'

const NotFound: NextPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontSize: '2rem'
      }}
    >
      <div>이 페이지는 존재하지 않습니다.</div>
      <Link href="/">{`홈으로 돌아가기 >`}</Link>
    </div>
  )
}

export default NotFound
