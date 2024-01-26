import {useRef, useState} from 'react';

type Comparator<T> = (prev: T, current: T) => boolean;

interface UseExternalState<T> {
    initial?: T;
    external: T;
    comparator?: Comparator<T>;
    onChange?: (newState: T) => void;
}

export type SetState<T> = (value: T | ((prev: T) => T)) => void;

// const isFn = (value: unknown): value is Function => typeof value === 'function';
// export const useExternalStateReact17 = <T>(props: UseExternalState<T>): [T, SetState<T>] => {

//     const { external, initial = external,  comparator = defaultComparator, onChange } = props;
//     const state = useRef(initial);
//     const prevExternalState = useRef(initial);
//
//     const { 1: updateVersion } = useReducer((prev) => (prev > 63 ? 0 : prev + 1), 0);
//
//     const setState: SetState<T> = useCallback((value) => {
//         state.current = isFn(value) ? value(state.current) : value;
//         updateVersion();
//     }, []);
//
//     if (comparator(prevExternalState.current, external)) {
//         const newState = external;
//         setState(newState);
//         prevExternalState.current = newState;
//         onChange?.(newState);
//     }
//
//     return [state.current, setState];
// };
const defaultComparator: Comparator<any> = (prev, current) => prev !== current;

export const useExternalStateReact18 = <T>(props: UseExternalState<T>): [T, SetState<T>] => {
  const { external, initial = external,  comparator = defaultComparator, onChange } = props;

  const [state, setState] = useState(() => initial);

  const prevExternalState = useRef(initial);

  if (comparator(prevExternalState.current, external)) {
    const newState = external;
    setState(newState);
    prevExternalState.current = newState;
    onChange?.(newState);
  }

  return [state, setState];
};

export const useExternalState = useExternalStateReact18;
