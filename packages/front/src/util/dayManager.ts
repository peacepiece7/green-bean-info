import dayjs, { ConfigType, UnitTypeLong } from 'dayjs'

const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD'
const DEFAULT_ROUTER_FORMAT = 'YYYY/MM/DD'
/**
 * @note dayjs를 사용하여 날짜를 관리하는 클래스 입니다. {@link https://day.js.org/}를 참고해주세요.
 */
class DayManger {
  date: Date | string = ''

  /**
   * @description 기본값 YYYY/MM/DD 형식으로 반환합니다.
   */
  formatRouterDate(date?: ConfigType, format?: string) {
    this.date = dayjs(date ?? this.date).format(format ? format : DEFAULT_ROUTER_FORMAT)
    return this.date
  }

  /**
   * @description 기본값 YYYY-MM-DD 형식으로 반환합니다.
   */
  formatDate(date?: ConfigType, format?: string) {
    this.date = dayjs(date ?? this.date).format(format ? format : DEFAULT_DATE_FORMAT)
    return this.date
  }

  /**
   * @description 문자열을 Date 객체로 반환합니다.
   */
  dayToDateObject(date?: string) {
    this.date = dayjs(date ?? this.date).toDate()
    return this.date
  }

  lastDateOfMonth(date?: ConfigType) {
    this.date = dayjs(date ?? this.date)
      .endOf('month')
      .toDate()
    return this.date
  }

  // * 요기 아래 부터는 단독으로 사용하지 않는 메서드입니다.
  /**
   * @description 내일 날짜를 this.date에 할당합니다.
   * @return this
   */
  addDateWith(date: ConfigType, format: Extract<UnitTypeLong, 'year' | 'month' | 'day'>) {
    this.date = dayjs(date ?? this.date)
      .add(1, format)
      .toDate()
    return this
  }
  /**
   * @description 이전 날짜를 this.date에 할당합니다.
   * @return this
   */
  subtractDateWith(date: ConfigType, format: Extract<UnitTypeLong, 'year' | 'month' | 'day'>) {
    this.date = dayjs(date ?? this.date)
      .subtract(1, format)
      .toDate()
    return this
  }
}

const dayManager = new DayManger()

export { dayManager }
