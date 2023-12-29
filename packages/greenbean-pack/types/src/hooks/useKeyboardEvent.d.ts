import { RefObject } from 'react';
import { AutoCompleteItem } from '../components/AutoComplete';
export interface Item {
    id: string;
    value: string;
    selected?: boolean;
}
export default function useKeyboardEvent<T extends HTMLElement, I extends AutoCompleteItem>(ref: RefObject<T>, items: I[] | undefined, onChange: (item: I) => void, onSubmit: (item: I) => void): {
    open: boolean;
    setOpen: import("react").Dispatch<import("react").SetStateAction<boolean>>;
};
