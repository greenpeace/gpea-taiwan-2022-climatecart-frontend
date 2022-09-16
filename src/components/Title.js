import styled from 'styled-components';
import { respondTo } from '../utils/responsive';

const Title = ({ children, ...props }) => (
    <StyledTitle {...props} >
        <span>{children}</span>
    </StyledTitle>
)

const StyledTitle = styled.h2`

    margin: 0;

    display: flex;
    justify-content: center;

    font-size: 36px;
    font-weight: 700;
    letter-spacing: 0.05em;

    position: relative;
    z-index: 0;

    ${respondTo.lg} {
        font-size: 24px;
        line-height: 34px;
    }

    >span {
        display: block;
        padding-bottom: 16px;
        position: relative;
    }

    >span::before {
        content: '';
        display: block;
        width: 36px;
        height: 36px;
        border-radius: 50em;
        background-color: var(--green-300);
        opacity: 0.25;

        position: absolute;
        top: -12px;
        left: -20px;
        z-index: -1;
    }

    >span::after {
        content: '';
        display: block;
        width: 22px;
        height: 4px;
        border-radius: 2px;
        background-color: var(--green-300);

        position: absolute;
        bottom: 0;
        left: calc(50% - 11px);
    }

`

export const StepTitle = ({ title, hint, hr = false }) => (
    <StyledStepTitle>
        {title && <h2>{title}</h2>}
        {hint && <div className='hint'>{hint}</div>}
        {hr && <hr />}
    </StyledStepTitle>
)

const StyledStepTitle = styled.div`

    >h2 {
        font-size: 20px;
        font-weight: 700;
        letter-spacing: .05em;
        margin: 0;

        ${respondTo.lg} {
            font-size: 18px;
        }
    }

    >h2::before {
        content: '';
        margin: 0 12px;
        margin-left: 4px;
        position: relative;
        top: -4px;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50em;
        background-color: var(--green-300);
    }

    >.hint {
        margin-top: 8px;
        font-size: 16px;
        padding-left: 24px;
        letter-spacing: .05em;
        white-space: pre-line;
        line-height: 1.4em;
    }

    >hr {
        margin: 24px 0;
        border: 0;
        border-bottom: 1px solid var(--grey);
    }
`

export default Title