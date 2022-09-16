import { css } from "styled-components";

export const hoverEffect = css`
    position: relative;

    &::before, &::after {
        content: '';
        display: block;
        position: absolute;
        background-color: var(--green-300);
        transition: opacity .2s, transform .2s;
    }

    &::before { 
        width: 8px;
        height: 8px;
        border-radius: 4px;
        left: -20px;
        top: calc(50% - 5px);
    }

    &::after {
        width: 100%;
        height: 1px;
    }

    &:not(:hover) {
        &::before {
            opacity: 0;
            transform: translateX(4px);
        }

        &::after {
            opacity: 0;
            transform: translateY(-4px);
        }
    }

    &:hover {
        &::after {
            transition-delay: .1s;
        }
    }
`