import { useLayoutEffect, useMemo, useRef } from "react";

type Fn<ARGS extends any[], R> = (...args: ARGS) => R;

/**
 * Use this hook for all functions that you're going to pass into other components and for onXXX event handlers.
 * This hook allows preventing rerender of a child component just because callback was changed
 *
 * ```ts
 * const [value, setValue] = useState('')
 * const onChange = useEvent((e) => {
 *   if (e.target.value.trim() != value) {
 *     setValue(e.target.value.trim())
 *   }
 * })
 *
 * <Input onChange={onChange} />
 * ```
 */
export function useEvent<A extends any[], R>(fn: Fn<A, R>): Fn<A, R> {
  let ref = useRef<Fn<A, R>>(fn);
  useLayoutEffect(() => {
    ref.current = fn;
  });
  return useMemo(
    () =>
      (...args: A): R => {
        const { current } = ref;
        return current(...args);
      },
    [],
  );
}
