import { dayManager } from '@/util/dayManager'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh'
      }}
    >
      <h2
        style={{
          fontSize: '5rem'
        }}
      >
        <p>죄송합니다.</p>
        <p>해당 날짜 정보를 찾지 못했습니다.</p>
      </h2>
      <Link
        style={{
          fontSize: '2rem',
          marginTop: '1rem',
          textDecoration: 'none'
        }}
        href="/"
      >
        {'홈 화면으로 되돌아가기 >'}
      </Link>
      <Link
        style={{
          fontSize: '2rem',
          marginTop: '1rem',
          textDecoration: 'none'
        }}
        href={`/calendar/${dayManager.formatRouterDate(Date.now())}`}
      >
        {'금일 캘린더로 되돌아가기 >'}
      </Link>
    </div>
  )
}
