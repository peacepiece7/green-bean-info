const MONTHLY_LABLES = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'octover',
  'november',
  'december'
]

const BAR_OPTIONS = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    }
  }
}

const LINE_OPTIONS = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    }
  }
}

const COLORS = {
  border: {
    pink: 'rgba(255, 99, 132)',
    sky: 'rgba(54, 162, 235)',
    daisy: 'rgba(255, 206, 86)',
    marin: 'rgba(75, 192, 192)',
    purple: 'rgba(153, 102, 255)',
    orange: 'rgba(255, 159, 64)',
    melon: 'rgba(58, 255, 140)'
  },
  bg: {
    pink: 'rgba(255, 99, 132, 0.4)',
    sky: 'rgba(54, 162, 235, 0.4)',
    daisy: 'rgba(255, 206, 86, 0.4)',
    marin: 'rgba(75, 192, 192, 0.4)',
    purple: 'rgba(153, 102, 255, 0.4)',
    orange: 'rgba(255, 159, 64, 0.4)',
    melon: 'rgba(58, 255, 140, 0.4)'
  }
} as const

export const ANNUAL_EXPENSES = {
  labels: MONTHLY_LABLES,
  options: BAR_OPTIONS,
  bg: {
    color: [COLORS['bg']['pink']]
  }
}

export const DAILY_EXPENSES = {
  options: LINE_OPTIONS,
  border: {
    color: [COLORS['border']['pink']]
  },
  bg: {
    color: [COLORS['bg']['pink']]
  }
}

export const MONTHLY_EXPENSES = {
  border: {
    color: Object.values(COLORS['border'])
  },
  bg: {
    color: Object.values(COLORS['bg'])
  }
}
