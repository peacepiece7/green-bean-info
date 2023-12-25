'use client'
import dayjs from 'dayjs'
import AutoComplete from './AutoComplete'
import { useCategoryQuery } from '@/hooks/useCategoryQuery'
import { useState } from 'react'
import { User } from '@/model'

interface ExpenseAddFormProps {
  user: User
}
export default function ExpenseAddForm({ user }: ExpenseAddFormProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const { data: items, isLoading } = useCategoryQuery(searchQuery, user.id)

  console.log('items :', items)
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
          onChange={(e) => setSearchQuery(e)}
          isLoading={isLoading}
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
