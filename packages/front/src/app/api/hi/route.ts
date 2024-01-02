import { NextResponse } from 'next/server'

export async function GET() {
  await new Promise((res) => setTimeout(res, 1000))
  return NextResponse.json({ foo: 'hello world!' })
}
