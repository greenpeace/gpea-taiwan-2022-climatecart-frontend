import styled, { css } from 'styled-components';
import { respondTo } from '../utils/responsive';

const ButtonWithIcon = ({
    theme = 'green',
    iconPos = 'right', Icon,
    center = false,
    children, ...props
}) => {
    return (
        <StyledButton {...props} iconPos={iconPos} theme={theme} center={center}>
            {(iconPos === 'left' && Icon) && <Icon />}
            {children}
            {(iconPos === 'right' && Icon) && <Icon />}
        </StyledButton>
    )
}

const themes = {
    'green': css`
        background: linear-gradient(90deg, var(--green-200) 0%, var(--primary) 100%);
        &:disabled {
            background: var(--white-100) !important;
        }
    `,
    'orange': css`
        background: var(--secondary);
        &:disabled {
            background: var(--white-100) !important;
        }
        &:hover {
            background: linear-gradient(90deg, #E64918 0%, var(--secondary) 100%);
        }
    `,
    'white': css`
        outline: 1px solid transparent;
        background: var(--green-500);
        color: var(--black);
        transition: background-color .2s, color .2s, outline-color .3s;

        &:hover {
            background: linear-gradient(90deg, var(--green-200) 0%, var(--primary) 100%);
            color: var(--white);
        }
    `
}

const StyledButton = styled.button`
    
    padding: 16px 40px;
    border-radius: 50em;

    display: flex;
    align-items: center;
    font-size: 18px;

    transition: color .2s, background .2s;

    color: white;

    &:disabled {
        color: var(--black) !important;
        pointer-events: none;
    }

    ${({ center }) => center && css`
        margin-left: auto;
        margin-right: auto;
    `}

    ${({ theme }) => themes[theme] ?? '' }

    ${({ iconPos }) =>
        iconPos === 'right' ?
            css`svg { margin-left: 8px; }` :
            iconPos === 'left' ?
                css`svg { margin-right: 8px; }` :
                ''
    };

    ${ respondTo.sm } {
        /* padding: 12px 32px;

        font-size: 16px; */
    }
    
`
export default ButtonWithIcon