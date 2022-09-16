import styled, { css } from 'styled-components';
import { respondTo } from '../utils/responsive';

const StepsIndicator = ({
    steps = [],
    nowStepIndex = 0,
    ...props
}) => (
    <CenterContainer {...props}>
        <StyledStepsIndicator>
            {steps.map((step, index) =>
                <StepItem key={index} step={step} index={index} nowStepIndex={nowStepIndex} />
            )}
        </StyledStepsIndicator>
    </CenterContainer>
)


const StepItem = ({ step, index, nowStepIndex }) => (
    <StyledStepItem active={index <= nowStepIndex}>
        <div className="index">{index + 1}</div>
        <div className="step">{step}</div>
    </StyledStepItem>
)

const CenterContainer = styled.div`
    display: flex;
    justify-content: center;
`

const StyledStepsIndicator = styled.ul`
    display: inline-block;
    padding-bottom: 36px;

    ${ respondTo.sm } {
        padding-bottom: 8px;
    }
`

const StyledStepItem = styled.li`
    position: relative;
    display: inline-block;

    margin-left: 120px;

    &::before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 120px;
        height: 2px;
        background-color: var(--green-300);
        top: 18px;
        right: 100%;
    }

    ${ respondTo.sm } {
        margin-left: 64px;

        &::before {
            width: 64px;
        }
    }

    &:first-child { 
        margin-left: 0;

        &::before {
            display: none;
        }
    }
    
    >.index {
        position: relative;
        z-index: 1;
        width: 36px;
        height: 36px;
        border-radius: 50em;
        background-color: var(--primary);

        font-size: 16px;
        font-weight: 700;
        text-align: center;
        line-height: 36px;
        color: var(--white);

        ${ respondTo.sm } {
            width: 32px;
            height: 32px;
            line-height: 32px;
            font-size: 14px;
        }

    }

    >.step {
        position: absolute;
        top: calc(100% + 12px);
        left: calc(50% - 32px);
        width: 64px;
        
        font-size: 14px;
        text-align: center;

        ${ respondTo.sm } {
            top: calc(100% + 8px);
            font-size: 12px;
        }
    }

    ${ p => !p.active && css`

        >.index {
            background-color: var(--grey);
            color: #B3BEC5;
        }

        >.step {
            opacity: 0.5;
        }

        &::before {
            background-color: var(--grey);
        }
    `}
`

export default StepsIndicator