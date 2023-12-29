import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import styled from 'styled-components';

/**
 * @description 뒤로기가나 새로고침 등을 통해 페이지를 떠날 때, 사용자에게 확인을 받습니다.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
 */
function useLeaveBeforeSave(cb) {
    const handler = useCallback((ev) => {
        if (cb())
            ev.preventDefault();
    }, [cb]);
    useEffect(() => {
        window.addEventListener("beforeunload", handler);
        return () => window.removeEventListener("beforeunload", handler);
    }, []);
}
/**
 * @description 마우스가 브라우저를 벗어날 때, 콜백을 실행합니다.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout_event
 */
function useBeforeLeaveMouse(cb) {
    // 전역으로 선언하기엔 이름이 너무 흔합니다.
    const html = useMemo(() => {
        var _a;
        return typeof document !== "undefined"
            ? (_a = document.querySelector("html")) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect()
            : null;
    }, []);
    if (!html) {
        throw new Error("only supported in browser, plz check your env");
    }
    const handler = useCallback((ev) => {
        if (ev.clientY <= 0 ||
            ev.clientY >= html.bottom ||
            ev.clientX <= 0 ||
            ev.clientX >= html.right)
            cb();
    }, [cb]);
    useEffect(() => {
        window.addEventListener("mouseout", handler);
        return () => window.removeEventListener("mouseout", handler);
    }, []);
}

/**
 * @description 클릭 이벤트를 감지 후 콜백을 실행합니다.
 */
// prettier-ignore
const useClick = (onClick) => {
    const element = useRef(null);
    useEffect(() => {
        if (element.current)
            element.current.addEventListener('click', onClick);
        return () => {
            if (element.current)
                element.current.removeEventListener('click', onClick);
        };
    }, []);
    return element;
};

/**
 * @description 특정 요소를 서서히 나타나게 합니다.
 * @default
 * duration: 1000
 * delay: 100
 */
// prettier-ignore
function useFadeIn(duration = 1000, delay = 100) {
    const ref = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            if (ref.current) {
                ref.current.style.opacity = '1';
                ref.current.style.transition = `opacity ${duration}ms ease-in-out`;
            }
        }, delay);
    }, []);
    return {
        ref,
        style: { opacity: '0' },
    };
}

/**
 * @description 브라우저 전체화면을 사용할 수 있게 합니다.
 * 아직 브라우저 호환성을 고려하지 않았습니다.
 * 테스트 코드가 없습니다.
 */
function useFullscreen() {
    const ref = useRef(null);
    const [isFull, setIsFull] = useState(false);
    const triggerFull = useCallback(() => {
        if (ref.current) {
            ref.current.requestFullscreen();
            setIsFull(true);
            // TODO : 브러우저 호환성 고려하기
            // if (ref.current.webkitReqeustFullscreen) {
            // ref.current.webkitReqeustFullscreen()
            // }
            // if (ref.current.mozReqeustFullscreen) {
            // ref.current.mozReqeustFullscreen()
            // if(ref.current.msReqeustFullscreen) {
            // ref.current.msReqeustFullscreen()
        }
    }, []);
    const exitFull = useCallback(() => {
        document.exitFullscreen();
        setIsFull(false);
    }, []);
    return { ref, triggerFull, exitFull, isFull };
}

/**
 * @description 네트워크 상태를 감자합니다.
 */
function useNetwork(onChange) {
    const [status, setStatus] = useState(navigator.onLine);
    const handleChange = () => {
        if (typeof onChange === "function") {
            onChange(navigator.onLine);
        }
        setStatus(navigator.onLine);
    };
    useEffect(() => {
        window.addEventListener("online", handleChange);
        window.addEventListener("offline", handleChange);
        return () => {
            window.removeEventListener("online", handleChange);
            window.removeEventListener("offline", handleChange);
        };
    }, []);
    return status;
}

/**
 * @description 스크롤 위치를 감지합니다.
 */
function useScroll() {
    const [state, setState] = useState({ x: 0, y: 0 });
    const onScroll = useCallback(() => {
        if (typeof window === "undefined")
            return;
        setState({ x: window.scrollX, y: window.scrollY });
    }, []);
    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return state;
}

/**
 * @description 컴포넌트가 언마운트 될 때 함수를 호출합니다.
 */
function useWillUnmount(callback) {
    useEffect(() => {
        return callback;
    }, []);
}

function useThrottle(value, delay) {
    const [throttledValue, setThrottledValue] = useState(value);
    const lastRan = useRef(Date.now());
    useEffect(() => {
        const handler = setTimeout(function () {
            if (Date.now() - lastRan.current >= delay) {
                setThrottledValue(value);
                lastRan.current = Date.now();
            }
        }, delay - (Date.now() - lastRan.current));
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return throttledValue;
}

function useIntersectionObserver(elementRef, { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false }) {
    const [entry, setEntry] = useState();
    const frozen = (entry === null || entry === void 0 ? void 0 : entry.isIntersecting) && freezeOnceVisible;
    const updateEntry = ([entry]) => {
        setEntry(entry);
    };
    useEffect(() => {
        const node = elementRef === null || elementRef === void 0 ? void 0 : elementRef.current;
        const hasIOSupport = !!window.IntersectionObserver;
        if (!hasIOSupport || frozen || !node)
            return;
        const observerParams = { threshold, root, rootMargin };
        const observer = new IntersectionObserver(updateEntry, observerParams);
        observer.observe(node);
        return () => observer.disconnect();
    }, [elementRef === null || elementRef === void 0 ? void 0 : elementRef.current, JSON.stringify(threshold), root, rootMargin, frozen]);
    return entry;
}

function useKeyboardEvent(ref, items, onChange, onSubmit) {
    const [open, setOpen] = useState(false);
    const [idx, setIdx] = useState(null);
    const handleKeyDown = useCallback((e) => {
        var _a;
        if (!items) {
            setIdx(null);
            return;
        }
        if (e.key === 'Enter' && idx !== null) {
            onSubmit(items[idx]);
            setIdx(null);
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.blur();
        }
        setIdx((prevIdx) => {
            switch (e.key) {
                case 'ArrowDown':
                    return prevIdx === null ? 0 : Math.min(prevIdx + 1, items.length - 1);
                case 'ArrowUp':
                    return prevIdx === null ? 0 : Math.max(prevIdx - 1, 0);
                default:
                    return prevIdx;
            }
        });
    }, [items, ref, onSubmit, idx]);
    useEffect(() => {
        if (ref.current)
            ref.current.onkeydown = handleKeyDown;
        return () => {
            if (ref.current)
                ref.current.onkeydown = null;
        };
    }, [handleKeyDown, ref]);
    useEffect(() => {
        if (idx === null || !items)
            return;
        onChange(items[idx]);
    }, [idx]);
    return { open, setOpen };
}

function AutoCompleteList({ items, open, isLoading, renderListOptions, renderListIsLoading, onMounseDown }) {
    const handleOnClick = (item) => {
        onMounseDown(item);
    };
    if (isLoading)
        return (jsx(List, { "$open": open, children: jsx(ListItem, { "$open": open, children: renderListIsLoading ? renderListIsLoading() : 'Loading...' }) }));
    if (!items || !items.length)
        return null;
    return (jsx(List, { "$open": open, children: items.map((item) => {
            return (jsx(ListItem, { "$open": open, onMouseDown: () => handleOnClick(Object.assign(Object.assign({}, item), { test: false })), children: renderListOptions(item, !!item.selected) }, item.id));
        }) }));
}
const List = styled.ul `
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  margin: auto;
  border: ${({ $open }) => ($open ? '1px solid black' : 'none')};
`;
const ListItem = styled.li `
  width: 100%;
  height: ${({ $open }) => ($open ? '2rem' : '0px')};
  z-index: 1;
  overflow: hidden;
  transition: height 0.2s ease-in-out;
`;

function AutoComplete({ items, onEnter, onSelect: onSelectList, isLoading, recommendStateBeforeChange: state, reset, renderListIsLoading, renderListOptions, inputStyle }) {
    var _a, _b, _c, _d;
    const [list, setList] = useState();
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const { open, setOpen } = useKeyboardEvent(inputRef, list, handleKeyDown, handleSubmit);
    function handleKeyDown(item) {
        setList((prev) => prev === null || prev === void 0 ? void 0 : prev.map((prevItem) => prevItem.id === item.id ? Object.assign(Object.assign({}, prevItem), { selected: true }) : Object.assign(Object.assign({}, prevItem), { selected: false })));
    }
    function handleSubmit(item) {
        inputRef.current.value = '';
        setInputValue(item.value);
        onEnter(item);
    }
    function handleMounseDown(item) {
        inputRef.current.value = '';
        setInputValue(item.value);
        onEnter(item);
    }
    // * Open 상태이고, 인풋 창이 비었을 때, 추천 카테고리를 보여줍니다.
    useEffect(() => {
        if (open && !inputValue) {
            const recommendList = state === null || state === void 0 ? void 0 : state.map((item) => ({
                id: item,
                value: item,
                selected: false
            }));
            setList(recommendList);
        }
        else {
            setList(items);
        }
    }, [inputValue, open, state, items]);
    useEffect(() => {
        if (reset) {
            setInputValue('');
        }
    }, [reset]);
    return (jsxs("div", { className: "greenbean-pack-auto-complete", style: {
            position: 'relative',
            width: `${(_a = inputStyle === null || inputStyle === void 0 ? void 0 : inputStyle.width) !== null && _a !== void 0 ? _a : '100%'}`,
            height: `${(_b = inputStyle === null || inputStyle === void 0 ? void 0 : inputStyle.height) !== null && _b !== void 0 ? _b : 'auto'}`,
            padding: `${(_c = inputStyle === null || inputStyle === void 0 ? void 0 : inputStyle.padding) !== null && _c !== void 0 ? _c : '0'}`,
            margin: `${(_d = inputStyle === null || inputStyle === void 0 ? void 0 : inputStyle.margin) !== null && _d !== void 0 ? _d : '0'}`
        }, children: [jsx("input", { ref: inputRef, type: "text", placeholder: "\uCE74\uD14C\uACE0\uB9AC", autoComplete: "off", onBlur: () => setTimeout(() => setOpen(false), 200), onFocus: () => setOpen(true), onChange: (e) => {
                    setInputValue(e.target.value);
                    onSelectList && onSelectList(e.target.value);
                }, value: inputValue, required: true, style: Object.assign(Object.assign({}, inputStyle), { margin: 0, padding: 0 }) }), jsx(AutoCompleteList, { items: list, open: open, onMounseDown: (item) => handleMounseDown(item), isLoading: isLoading, renderListOptions: renderListOptions, renderListIsLoading: renderListIsLoading })] }));
}

export { AutoComplete, useBeforeLeaveMouse, useClick, useFadeIn, useFullscreen, useIntersectionObserver, useLeaveBeforeSave, useNetwork, useScroll, useThrottle, useWillUnmount };
