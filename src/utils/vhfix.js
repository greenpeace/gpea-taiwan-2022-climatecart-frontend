import { css } from "styled-components";

function vhFix() {

    const injectVhToDocument = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    window.addEventListener('resize', () => {
        injectVhToDocument();
    });

    injectVhToDocument();
}

function vh(cssAttrName, vh, px) {
    if (px !== undefined) {
        return css`
            ${cssAttrName}: calc(${vh}vh + ${px}px);
            ${cssAttrName}: calc(var(--vh, 1vh) * ${vh} + ${px}px);
        `
    }
    return css`
        ${cssAttrName}: ${vh}vh;
        ${cssAttrName}: calc(var(--vh, 1vh) * ${vh});
    `
}

export { vh };
export default vhFix;