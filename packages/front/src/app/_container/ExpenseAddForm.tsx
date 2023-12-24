'use client'

export default function ExpenseAddForm() {
  return (
    <div>
      <h2>
        EXPENSE ADD FORM
        <p>1. 날짜 </p>
        <p>2. 카테고리 (자동 완성 기능) </p>
        <p>3. 금액 </p>
        <p>4. 내용</p>
      </h2>
      <div>
        <input type='date' placeholder='날짜' />
        <input type='text' placeholder='카테고리' />
        <input type='text' placeholder='금액' />
      </div>
      <textarea placeholder='내용' rows={4} />
      <input type='submit'></input>
    </div>
  )
}
