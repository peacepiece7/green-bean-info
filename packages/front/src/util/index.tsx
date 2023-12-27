'use client'

import dayjs from 'dayjs'

/**
 * @description
 * Date 클레스에서 이해할 수 있는 시간 포멧을 ISOString으로 변환합니다.
 */
export const dateToISOString = (date: string) => {
  const postfix = dayjs(Date.now()).format('hh:mm:ss')
  const prefix = dayjs(date).format('YYYY-MM-DD')
  return dayjs(`${prefix}:${postfix}`).toISOString()
}
