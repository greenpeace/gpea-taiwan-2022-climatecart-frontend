import 'normalize.css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

    :root {
        --primary: #71AF35 !important;
        --secondary: #FF7623 !important;

        --green-100: #66CC00 !important;
        --green-200: #248B2E !important;
        --green-300: #D4DD30 !important;
        --green-400: #002C2D !important;
        --green-500: #E2F3D1 !important;
        --green-600: rgba(156,222,89,0.25) !important;

        --cyan: #62CBD7 !important;
        --yellow: #FFD86F !important;
        --pink: #FFA9A9 !important;
        
        --grey: #DEE2E6 !important;
        --grey-100: #C1C2C4 !important;
        --black: #052C44 !important;
        --white: #FAFAF9 !important;
        --white-100: #F5F8E4 !important;

        --z-index-mobilemenu: 1010;
        --z-index-navbar: 1100;
        --z-index-modal: 1200;
        --z-index-mouse: 1300;

    }

    body {
        margin: 0;
        font-family: 'Montserrat', 'Noto Sans TC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: var(--black);
        overflow-y: auto;
        overflow-x: hidden;
    }

    #root {
        &.is--locked {
            height: 100vh;
            overflow: hidden;
        }
    }

    * { 
        box-sizing: border-box;
    }

    *::selection {
        background-color: var(--green-100);
        color: var(--white);
    }

    ul {
        padding-inline-start: 0;
        margin-block-start: 0;
        margin-block-end: 0;
        list-style-type: none;
    }

    a {
        all: unset;
        text-decoration: none;
        cursor: pointer;
    }

    button {
        all: unset;
        outline: none;
        cursor: pointer;
    }

    dd {
        margin-inline-start: 0;
    }

    // mobile safari gives input a weird shadow
    input, select {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;

        &:disabled {
            opacity: 1;
        }

        &:focus {
            outline: none;
        }

        &:-webkit-autofill {
            background-color: transparent;
        }
    }

    // reset
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font-size: inherit;
        vertical-align: baseline;
    }


`

export default GlobalStyle;
