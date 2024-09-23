interface UseScrollWindowProps {
  offset: number;
}

type UseScrollWindowReturn = [boolean, React.RefObject<HTMLButtonElement>];

export type UseScrollWindowFunction = (
  props?: UseScrollWindowProps,
) => UseScrollWindowReturn;
