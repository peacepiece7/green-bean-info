/// <reference types="react" />
declare function useTabs(
  initTab: number,
  allTabs: number[],
): {
  currentItem: number;
  setCurrentItem: import("react").Dispatch<
    import("react").SetStateAction<number>
  >;
};
export { useTabs };
