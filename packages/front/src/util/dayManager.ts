import dayjs, { ConfigType } from 'dayjs'

const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD'
const DEFAULT_TIME_FORMAT = 'HH:mm:ss'
const DEFAULT_ROUTER_FORMAT = 'YYYY/MM/DD'
/**
 * @note dayjs를 사용하여 날짜를 관리하는 클래스 입니다. {@link https://day.js.org/}를 참고해주세요.
 */
class DayManger {
  /**
   * @description YYYY-MM-DD 형식에 현재 시간을 붙여서 반환합니다.
   * @example
   * `${DEFAULT_DATE_FORMAT}:${DEFAULT_TIME_FORMAT}` 형식으로 반환됩니다.
   */
  dayToISOString(date: ConfigType): string {
    const preFix = dayjs(date).format(DEFAULT_DATE_FORMAT)
    const postFix = dayjs(Date.now()).format(DEFAULT_TIME_FORMAT)
    return dayjs(`${preFix}:${postFix}`).toISOString()
  }

  /**
   * @description YYYY/MM/DD 형식으로 반환합니다.
   */
  dayToRouterFormat(date: ConfigType) {
    return dayjs(date).format(DEFAULT_ROUTER_FORMAT)
  }

  /**
   * @description YYYY-MM-DD 형식으로 반환합니다.
   */
  dayToDefaultFormat(date: ConfigType) {
    return dayjs(date).format(DEFAULT_DATE_FORMAT)
  }

  dayToDateObject(date: string) {
    return dayjs(date).toDate()
  }
}

const dayManager = new DayManger()

export { dayManager }
