import { RefObject } from 'react';
interface Args extends IntersectionObserverInit {
    freezeOnceVisible?: boolean;
}
export declare function useIntersectionObserver(elementRef: RefObject<Element>, { threshold, root, rootMargin, freezeOnceVisible }: Args): IntersectionObserverEntry | undefined;
export {};
