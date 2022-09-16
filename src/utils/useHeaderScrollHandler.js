import { useRef, useEffect } from 'react';

/**
 * 可以讓導航列滑動時自動隱藏的 hook
 *
 * @param {Object} props
 * @param {number} props.navHeight 導航列的高度
 * @param {number} props.transitionDuration 過度動畫的時間（秒）
 * @param {Function} props.onScrollDownCallback 當使用者向下滑時，會呼叫的 callback
 *
 * @example
 * const { headerDomRef } = useHeaderScrollHandler({});
 *
 */
export function useHeaderScrollHandler({
    navHeight = 120,
    transitionDuration = 0.3,
    onScrollDownCallback = () => {}
}) {
    const headerDomRef = useRef(null);

    const prevPageYOffset = useRef(0);
    const navbarTop = useRef(0);

    useEffect(() => {
        window.addEventListener('scroll', handleWindowScroll);
        return () => window.removeEventListener('scroll', handleWindowScroll);
    }, []) // eslint-disable-line

    function handleWindowScroll() {
        if (!headerDomRef.current) return;

        const pageYOffset = Math.max(window.pageYOffset, 0);
        const delta = pageYOffset - prevPageYOffset.current;
        navbarTop.current = navbarTop.current - delta;
        navbarTop.current = Math.max(navbarTop.current, -navHeight);

        if (delta < 0) navbarTop.current = 0;
        if (delta > 0) onScrollDownCallback?.();
        headerDomRef.current.style.setProperty('transition-duration', (delta < 0) ? `${transitionDuration}s`: '0s');
        headerDomRef.current.style.setProperty('transform', `translateY(${navbarTop.current}px)`);

        prevPageYOffset.current = pageYOffset;
    }

    return { headerDomRef };
}
