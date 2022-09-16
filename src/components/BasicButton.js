import styled, { css } from 'styled-components';
import { respondTo } from '../utils/responsive';

const BasicButton = ({ children, theme, Icon, iconPos = 'left', ...props }) => {
    return (
        <StyledButton theme={theme} {...props}>
            {(iconPos === 'left' && Icon) && <Icon />}
            {children}
            {(iconPos === 'right' && Icon) && <Icon />}
        </StyledButton>
    )
}


const themes = {
    'orange': css`
        background: var(--secondary);
        color: var(--white);
        transition: background 0s;

        &:hover {
            background: linear-gradient(90deg, #E64918 0%, #FF7623 100%);
            color: var(--white);
        }
    `,
    'lightGreen': css`
        background: var(--green-600);
        color: var(--black);

        &:hover {
            background: var(--white-100);
        }
    `,
    'white': css`
        background: rgba(255, 255, 255, 0.6);
        color: var(--black);
        border: 1px solid white;

        &:hover {
            background: rgba(255, 255, 255, 1);
            color: var(--black);
        }
    `,
}


const StyledButton = styled.button`
    min-width: 200px;
    height: 60px;
    border-radius:100px;
    box-sizing: border-box;

    ${({ theme }) => themes[theme] ?? ''}

    display: flex;
    gap: 14px;
    align-items: center;
    justify-content: center;

    font-size: 18px;
    font-weight: 500;

    &:disabled {
        background: var(--grey) !important;
        color: white !important;
        pointer-events: none;
    }

    ${ respondTo.sm } {
        /* min-width: 180px;
        height: 48px;
        padding-left: 24px;
        padding-right: 24px;

        font-size: 16px;

        svg {
            position: relative;
            top: -2px;
            width: 20px;
        } */
    }
`;

export default BasicButton;