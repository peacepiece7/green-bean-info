import { useState } from "react";

function useTabs(initTab: number, allTabs: number[]) {
  const [currentIndex, setCurrentIndex] = useState(initTab);
  return {
    currentItem: allTabs[currentIndex],
    setCurrentItem: setCurrentIndex,
  };
}

export { useTabs };
