import styled, { css } from 'styled-components';

import { respondTo } from '../../utils/responsive';

const MobileMenuBtn = ({ isActive, onClick, ...props }) => {

    return (
        <StyledButton isActive={isActive} onClick={onClick}>
            <span></span>
            <span></span>
            <span></span>
        </StyledButton>
    )
}

const StyledButton = styled.button`
    position: relative;

    width: 24px;
    height: 18px;
    overflow: hidden;
    margin-top: -3px;

    display: none;

    ${respondTo.pad} {
        display: block;
    }


    span {
        display: block;
        width: 24px;
        height: 2px;
        background-color: var(--black);
        position: absolute;
        border-radius: 2px;

        transition: transform 0.2s ease-out;
        left: 2px;

        &:nth-of-type(2n) {
            top: 50%;
            transform: translateY(-50%);
        }


        &:first-of-type {
            transform-origin: 50% 50%;
            top: 0;
        }

        &:last-of-type { 
            transform-origin: 50% 50%;
            bottom: 0;
        }
    }

    ${({ isActive }) => isActive && css`

        span:first-of-type {
            transform: translateY(8px) translateX(-1px) rotate(40deg);
        }

        span:nth-of-type(2) {
            opacity: 0;
        }

        span:last-of-type {
            transform: translateY(-8px) translateX(-1px) rotate(-40deg) ;
        }
    `}


    
`;

export default MobileMenuBtn;