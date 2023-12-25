'use client'
import dayjs from 'dayjs'
import AutoComplete from './AutoComplete'
import { Item } from '@/hooks/useAutocomplete'
import { useState } from 'react'
export default function ExpenseAddForm() {
  const [items, setItems] = useState([
    { key: '1', value: '식비', label: '식비' },
    { key: '2', value: '교통비', label: '교통비' },
    { key: '43', value: '문화생활', label: '문화생활' },
    { key: 'ac', value: '기타', label: '기타' },
  ])

  const handleOnChange = (item: Item) => {
    setItems((prev) => {
      return prev.map((prevItem) => {
        if (prevItem.key === item.key) {
          return { ...prevItem, selected: true }
        }
        return { ...prevItem, selected: false }
      })
    })
  }

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
        <input
          type='date'
          placeholder='날짜'
          defaultValue={dayjs(Date.now()).format('YYYY-MM-DD')}
        />
        <AutoComplete
          items={items}
          onSubmit={(item) => console.log(item)}
          onChange={handleOnChange}
        />
        <input type='text' placeholder='금액' />
      </div>
      <textarea placeholder='내용' rows={4} />
      <input type='submit'></input>
    </div>
  )
}

{
  /* <ReactAutocomplete
items={[
  { id: 'foo', label: 'foo' },
  { id: 'bar', label: 'bar' },
  { id: 'baz', label: 'baz' },
]}
shouldItemRender={(item, value) =>
  item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
}
getItemValue={(item) => item.label}
renderItem={(item, highlighted) => (
  <div
    key={item.id}
    style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
  >
    {item.label}
  </div>
)}
value={value}
onChange={(e) => setValue(e.target.value)}
onSelect={(value) => setValue(value)}
/> */
}
