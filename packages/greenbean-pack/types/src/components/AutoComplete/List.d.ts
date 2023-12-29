import { AutoCompleteItem, AutoCompleteProps } from '../AutoComplete';
interface ListProps<T extends AutoCompleteItem> {
    items?: T[];
    open: boolean;
    isLoading?: boolean;
    renderListOptions: AutoCompleteProps<T>['renderListOptions'];
    renderListIsLoading?: AutoCompleteProps<T>['renderListIsLoading'];
    onMounseDown: (item: T) => void;
}
export declare function AutoCompleteList<T extends AutoCompleteItem>({ items, open, isLoading, renderListOptions, renderListIsLoading, onMounseDown }: ListProps<T>): import("react/jsx-runtime").JSX.Element | null;
export {};
