import { HTMLAttributes } from 'react';
export interface AutoCompleteItem {
    id: string;
    value: string;
    selected?: boolean;
}
export interface AutoCompleteProps<T extends AutoCompleteItem> {
    items?: T[];
    onEnter: (item: T) => void;
    onSelect?: (value: string) => void;
    isLoading?: boolean;
    recommendStateBeforeChange?: string[];
    reset?: boolean;
    style?: HTMLAttributes<HTMLElement>['style'];
    renderListOptions: (item: AutoCompleteItem, isSelected: boolean) => JSX.Element | string;
    renderListIsLoading?: () => JSX.Element | string;
    inputStyle?: HTMLAttributes<HTMLInputElement>['style'];
}
export declare function AutoComplete<T extends AutoCompleteItem>({ items, onEnter, onSelect: onSelectList, isLoading, recommendStateBeforeChange: state, reset, renderListIsLoading, renderListOptions, inputStyle }: AutoCompleteProps<T>): import("react/jsx-runtime").JSX.Element;
