export function SSRCalendarSkeleton({ year, month }: { year: string; month: string }) {
  return (
    <div className="react-calendar">
      <div className="react-calendar__navigation">
        <button
          aria-label=""
          className="react-calendar__navigation__arrow react-calendar__navigation__prev2-button"
          type="button"
        >
          «
        </button>
        <button
          aria-label=""
          className="react-calendar__navigation__arrow react-calendar__navigation__prev-button"
          type="button"
        >
          ‹
        </button>
        <button
          aria-label=""
          className="react-calendar__navigation__label"
          type="button"
          style={{
            flexGrow: '1'
          }}
        >
          <span className="react-calendar__navigation__label__labelText react-calendar__navigation__label__labelText--from">
            {year}년 {month}월
          </span>
        </button>
        <button
          aria-label=""
          className="react-calendar__navigation__arrow react-calendar__navigation__next-button"
          type="button"
        >
          ›
        </button>
        <button
          aria-label=""
          className="react-calendar__navigation__arrow react-calendar__navigation__next2-button"
          type="button"
        >
          »
        </button>
      </div>
      <div className="react-calendar__viewContainer">
        <div className="react-calendar__month-view">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end'
            }}
          >
            <div
              style={{
                flexGrow: '1',
                width: '100%'
              }}
            >
              <div
                className="react-calendar__month-view__weekdays"
                style={{
                  display: 'flex',
                  flexWrap: 'nowrap'
                }}
              >
                <div
                  className="react-calendar__month-view__weekdays__weekday"
                  style={{
                    flex: '0 0 14.2857%',
                    overflow: 'hidden',
                    marginInlineEnd: '0px'
                  }}
                >
                  <abbr aria-label="월요일" title="월요일">
                    월
                  </abbr>
                </div>
                <div
                  className="react-calendar__month-view__weekdays__weekday"
                  style={{
                    flex: '0 0 14.2857%',
                    overflow: 'hidden',
                    marginInlineEnd: '0px'
                  }}
                >
                  <abbr aria-label="화요일" title="화요일">
                    화
                  </abbr>
                </div>
                <div
                  className="react-calendar__month-view__weekdays__weekday"
                  style={{
                    flex: '0 0 14.2857%',
                    overflow: 'hidden',
                    marginInlineEnd: '0px'
                  }}
                >
                  <abbr aria-label="수요일" title="수요일">
                    수
                  </abbr>
                </div>
                <div
                  className="react-calendar__month-view__weekdays__weekday"
                  style={{
                    flex: '0 0 14.2857%',
                    overflow: 'hidden',
                    marginInlineEnd: '0px'
                  }}
                >
                  <abbr aria-label="목요일" title="목요일">
                    목
                  </abbr>
                </div>
                <div
                  className="react-calendar__month-view__weekdays__weekday"
                  style={{
                    flex: '0 0 14.2857%',
                    overflow: 'hidden',
                    marginInlineEnd: '0px'
                  }}
                >
                  <abbr aria-label="금요일" title="금요일">
                    금
                  </abbr>
                </div>
                <div
                  className="react-calendar__month-view__weekdays__weekday react-calendar__month-view__weekdays__weekday--weekend"
                  style={{
                    flex: '0 0 14.2857%',
                    overflow: 'hidden',
                    marginInlineEnd: '0px'
                  }}
                >
                  <abbr aria-label="토요일" title="토요일">
                    토
                  </abbr>
                </div>
                <div
                  className="react-calendar__month-view__weekdays__weekday react-calendar__month-view__weekdays__weekday--current react-calendar__month-view__weekdays__weekday--weekend"
                  style={{
                    flex: '0 0 14.2857%',
                    overflow: 'hidden',
                    marginInlineEnd: '0px'
                  }}
                >
                  <abbr aria-label="일요일" title="일요일">
                    일
                  </abbr>
                </div>
              </div>
              <div
                className="react-calendar__month-view__days"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap'
                }}
              >
                {Array.from(Array(31).keys()).map((day) => {
                  return (
                    <button
                      key={day}
                      className="react-calendar__tile react-calendar__month-view__days__day react-calendar__month-view__days__day--neighboringMonth"
                      type="button"
                      style={{
                        flex: '0 0 14.2857%',
                        overflow: 'hidden',
                        marginInlineEnd: '0px'
                      }}
                    >
                      <abbr aria-label="2022년 7월 1일">{'.'}</abbr>
                    </button>
                  )
                })}
                {/* <button
                  className="react-calendar__tile react-calendar__month-view__days__day react-calendar__month-view__days__day--weekend"
                  type="button"
                  style={{
                    flex: '0 0 14.2857%',
                    overflow: 'hidden',
                    marginInlineEnd: '0px'
                  }}
                >
                  <abbr aria-label="2022년 6월 30일">30</abbr>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
