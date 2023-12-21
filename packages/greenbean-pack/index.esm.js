import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { __awaiter } from "tslib";

function useLeaveBeforeSave(cb) {
  const handler = useCallback(
    (ev) => {
      if (cb()) ev.preventDefault();
    },
    [cb],
  );
  useEffect(() => {
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);
}
function useBeforeLeaveMouse(cb) {
  // 전역으로 선언하기엔 이름이 너무 흔합니다.
  const html = useMemo(() => {
    var _a;
    return typeof document !== "undefined"
      ? (_a = document.querySelector("html")) === null || _a === void 0
        ? void 0
        : _a.getBoundingClientRect()
      : null;
  }, []);
  if (!html) {
    throw new Error("only supported in browser, plz check your env");
  }
  const handler = useCallback(
    (ev) => {
      if (
        ev.clientY <= 0 ||
        ev.clientY >= html.bottom ||
        ev.clientX <= 0 ||
        ev.clientX >= html.right
      )
        cb();
    },
    [cb],
  );
  useEffect(() => {
    window.addEventListener("mouseout", handler);
    return () => window.removeEventListener("mouseout", handler);
  }, []);
}

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
 * @description 특정 요소를 서서히 나타나게 하는 훅
 * @param {number} duration
 * @param {number} delay
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

function useInput(init, validator) {
  const [state, setState] = useState(init);
  const onChange = useCallback(
    (value) => {
      if (typeof validator !== "function") return;
      const willUpdate = validator(value);
      if (willUpdate) setState(value);
    },
    [validator],
  );
  return [state, setState, onChange];
}

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

function useNotification(title, options) {
  const fireNotif = useCallback(
    () =>
      __awaiter(this, void 0, void 0, function* () {
        yield Notification.requestPermission();
        if (Notification.permission !== "granted") {
          return;
        }
        new Notification(title, options);
      }),
    [title, options],
  );
  return { fireNotif };
}

function useScroll() {
  const [state, setState] = useState({ x: 0, y: 0 });
  const onScroll = useCallback(() => {
    if (typeof window === "undefined") return;
    setState({ x: window.scrollX, y: window.scrollY });
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return state;
}

function useTabs(initTab, allTabs) {
  const [currentIndex, setCurrentIndex] = useState(initTab);
  return {
    currentItem: allTabs[currentIndex],
    setCurrentItem: setCurrentIndex,
  };
}

const isBrowser = typeof window !== "undefined";
function useTitle(initTitle) {
  const [title, setTitle] = useState(initTitle);
  useEffect(() => {
    if (!isBrowser) return;
    const el = document.querySelector("title");
    el && el.setAttribute("title", title);
    setTitle(initTitle);
  }, [initTitle, title]);
  return { title, setTitle };
}

/**
 * useWillUnmount hook
 * 컴포넌트가 언마운트 될 때 함수를 호출합니다.
 * @param {Function} callback 컴포넌트가 언마운트 될 때 호출 할 콜백 함수
 */
function useWillUnmount(callback) {
  useEffect(() => {
    return callback;
  }, []);
}

export {
  useBeforeLeaveMouse,
  useClick,
  useFadeIn,
  useFullscreen,
  useInput,
  useLeaveBeforeSave,
  useNetwork,
  useNotification,
  useScroll,
  useTabs,
  useTitle,
  useWillUnmount,
};
