import { useCallback, useState } from 'react'

function useInput<S>(init: S, validator?: (state: S) => boolean) {
  const [state, setState] = useState(init)
  const onChange = useCallback(
    (value: S) => {
      if (typeof validator !== 'function') return
      const willUpdate = validator(value)
      if (willUpdate) setState(value)
    },
    [validator]
  )
  return [state, setState, onChange]
}

export { useInput }
