import { useEffect, useState } from "react";

export const xs = 360;
export const sm = 576;
export const md = 768;
export const pad = 1024;
export const lg = 1280;
export const xl = 1440;
export const _2k = 2048;

const breakpoints = { xs, sm, md, lg, xl, pad, _2k };
const _respondTo = breakpoint => ` @media (max-width: ${breakpoint}px)`;
const _respondFrom = breakpoint => ` @media (min-width: ${breakpoint + 1}px)`;

const respondTo = {};
const respondFrom = {};

Object.keys(breakpoints).forEach(key => {
    respondTo[key] = _respondTo(breakpoints[key]);
});

Object.keys(breakpoints).forEach(key => {
    respondFrom[key] = _respondFrom(breakpoints[key]);
});

function toRespond(pointWithBreakpoint, renderer) {
    if (pointWithBreakpoint === undefined || pointWithBreakpoint === null) return '';

    let renderOutput = '';

    if (typeof pointWithBreakpoint === 'object') {

        if (pointWithBreakpoint['default']) {
            renderOutput = renderer(pointWithBreakpoint['default']);
            if (typeof renderOutput === 'object') {
                renderOutput = renderOutput.join?.('').trim?.();
            }
        }

        Object.keys(pointWithBreakpoint).forEach(key => {
            if (respondTo[key]) {
                let renderResult = renderer(pointWithBreakpoint[key]);
                if (typeof renderResult === 'object') {
                    renderResult = renderResult.join?.('').trim?.();
                }
                renderOutput = `${respondTo[key]} { ${renderResult} };` + renderOutput;
            }
        })
    }
    else if (typeof pointWithBreakpoint === 'number' || typeof pointWithBreakpoint === 'string') {
        renderOutput = renderer(pointWithBreakpoint);
    }

    return renderOutput;
}

function attrToRespond(attributeName, pointWithBreakpoint, unit = 'px') {
    return toRespond(pointWithBreakpoint, value => `${attributeName}: ${value}${unit}`);
}

function isMobile() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIPadOS = navigator?.maxTouchPoints > 2 && /Intel Mac/.test(navigator.userAgent);
    return isMobile || isIPadOS;
}

export function useRespondTo(breakpoint) {

    const [ isMatch, setIsMatch ] = useState(window.innerWidth < breakpoint);

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);

        const handleMatch = (e) => {
            setIsMatch(e.target.matches ?? false);
        }

        mql.addEventListener('change', handleMatch);

        return () => {
            mql.removeEventListener('change', handleMatch);
        }
    }, [breakpoint]);

    return isMatch;
}

export { respondTo, respondFrom, breakpoints, toRespond, attrToRespond, isMobile };
