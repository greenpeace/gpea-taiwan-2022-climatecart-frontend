import { forwardRef, useEffect, useId, useState } from 'react';
import { respondTo } from '../utils/responsive';
import styled, { css } from 'styled-components';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const FormInput = forwardRef(({
    label,
    required = false, hint,
    className, as,
    type, options = [],
    theme = 'primary',
    errors,
    ...props
}, ref) => {

    const id = useId();
    const error = errors?.[props.name] ?? null;

    const [selectDefaultValue, setSelectDefaultValue] = useState()

    function handleDropdownChange(selectedOption) {
        const inputDom = document.getElementById(id);
        inputDom.value = selectedOption.value
        props.onChange({ target: inputDom })
    }

    useEffect(() => {
        if (type !== 'select') return;
        const inputDom = document.getElementById(id);
        setSelectDefaultValue(inputDom.value ?? '');
    }, [type, id])

    return (
        <StyledFormInput className={className} as={as} theme={theme} error={error}>
            {label &&
                <label htmlFor={id}>
                    {label}
                    {required && <span>※必填</span>}
                </label>
            }
            {type === 'select' && <>
                <input type="hidden" id={id} ref={ref} {...props} />
                <Dropdown value={selectDefaultValue} options={options} placeholder={props.placeholder} onChange={handleDropdownChange} />
            </>}
            {type !== 'select' &&
                <input id={id} {...props} required={required} type={type} ref={ref} autoComplete="off" />
            }
            {(hint && !error) &&
                <div className="hint">{hint}</div>
            }
            {error &&
                <div className="error">{error.message}</div>
            }
        </StyledFormInput>
    )
})

const themes = {
    'white': css`
        >input, .Dropdown-control { 
            border: 1px solid white; 
            background-color: rgba(255, 255, 255, 0.5);   
        }
        >.hint {
            color: var(--black);
        }
        .Dropdown-menu {
            border: 1px solid white;
        }
    `,

    'green': css`
        >input, .Dropdown-control { 
            border: 1px solid var(--green-300); 
            background-color: rgba(255, 255, 255, 0.5);   
        }
        >.hint {
            color: var(--primary);
        }
        .Dropdown-menu {
            border: 1px solid white;
        }

    `,
}

const StyledFormInput = styled.div`
    position: relative;

    label {
        font-size: 16px;
        letter-spacing: .05em;

        ${respondTo.lg} {
            font-size: 14px;
        }
    }

    label >span {
        margin-left: 4px;
        font-size: 14px;
        color: var(--primary);
    }

    >input, .Dropdown-control {
        margin-top: 12px;
        padding: 16px;
        width: 100%;
        border-radius: 10px;
        border: 1px solid var(--green-300);
        font-size: 16px;

        transition: background-color .15s;

        &:hover {
            background-color: white;
        }

        ${respondTo.lg} {
            padding: 10px 16px;
            border-radius: 5px;
        }
    }

    .Dropdown-control {
        cursor: pointer;
    }

    .Dropdown-placeholder {
        color: var(--black);
    }

    .Dropdown-arrow {
        top: calc(50% - 3px);
        right: 16px;

        transition: border .3s;
    }

    .Dropdown-menu {
        margin-top: 8px;
        border-radius: 10px;
        border: 1px solid var(--green-300);
    }

    .Dropdown-option {
        padding: 16px;

        background-color: #F8F8F8;

        transition: background-color .15s;

        ${respondTo.lg} {
            font-size: 14px;
        }

        &:nth-child(2n - 1) {
            background-color: #F1F1F1;
        }

        &:hover {
            background-color: white;
        }
    }

    .Dropdown-placeholder {
        ${respondTo.lg} {
            font-size: 14px;
        }
    }

    >.hint, >.error {
        margin-top: 12px;
        font-size: 14px;
        line-height: 1.6;
        color: var(--primary);

        ${respondTo.lg} {
            font-size: 12px;
        }
    }

    >.error {
        color: var(--secondary);
    }

    ${({ theme }) => themes[theme] ?? ''}

    ${({ error }) => error && css`
        >input, .Dropdown-control {
            border-color: var(--secondary);
        }
    `}
`

export default FormInput