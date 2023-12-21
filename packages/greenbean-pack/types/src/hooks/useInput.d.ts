declare function useInput<S>(
  init: S,
  validator?: (state: S) => boolean,
): (S | ((value: S) => void))[];
export { useInput };
