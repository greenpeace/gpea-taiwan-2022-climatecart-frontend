import { forwardRef, useId } from 'react';
import styled from 'styled-components';

const FormCheckbox = forwardRef(({
    children, errors, className, as, ...props
}, ref) => {
    const id = useId();
    const error = errors?.[props.name] ?? null;

    return (
        <StyledContainer className={className} as={as}>
            <StyledFormCheckbox>
                <input id={id} {...props} type="checkbox" ref={ref} />
                <label htmlFor={id}>{children}</label>
            </StyledFormCheckbox>
            {error && <div className="error">{error.message}</div>}
        </StyledContainer>
    )
})

const StyledContainer = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;

    .error {
        color: var(--secondary);
        margin-top: 4px;
        font-size: 14px;
        line-height: 1.6;
    }
`;

const StyledFormCheckbox = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;

    input[type=checkbox] {
        width: 24px;
        height: 24px;
        position: relative;
        cursor: pointer;
    }
    
    input[type=checkbox]:before {
        content: "";
        display: block;
        position: absolute;
        width: 14px;
        height: 14px;
        top: 2px;
        left: 3px;
        border: 2px solid var(--primary);
        border-radius: 5px;
        background-color: transparent;
    }

    input[type=checkbox]:checked:after {
        content: "";
        display: block;
        width: 4px;
        height: 8px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        position: absolute;
        top: 5px;
        left: 9px;
    }

    input[type=checkbox]:checked {
        &:before {
            background-color: var(--primary);
        }
    }

    label {
        margin-left: 8px;
    }

`

export default FormCheckbox