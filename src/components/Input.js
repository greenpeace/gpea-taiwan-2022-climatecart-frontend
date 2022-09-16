import { forwardRef } from 'react';
import styled, { css } from 'styled-components';

const Input = forwardRef(({ error, ...props }, ref) => {
    return (
        <StyledInput error={error} {...props} ref={ref} />
    )
})

const StyledInput = styled.input`
    display: block;
    padding: 20px 16px;
    border-radius: 5px;

    border: 1.5px solid transparent;
    font-size: 16px;
    font-weight: 500;

    background-color: rgba(255,255,255,0.08);
    color: white;

    transition: border-color .2s;
    
    &:focus {
        border-color: var(--primary);
    }

    &::placeholder {
        color: currentColor;
        opacity: 0.6;
    }

    ${ p => p.error && css`
        border-color: var(--pink);
    `}
`

const ErrorMessage = styled.div`
    position: absolute;
`

export default Input;