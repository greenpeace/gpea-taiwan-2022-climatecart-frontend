import styled, { css, keyframes } from 'styled-components';

const BubbleButton = ({ 
    enabled = true,  highlight = false,
    count,
    Icon, 
    onClick, 
}) => {
    return (
        <StyledBubbleButton onClick={onClick} enabled={enabled} highlight={highlight}>
            <Icon />
            { count !== null &&
                <Bubble key={count}>{count < 0 ? 0 : count}</Bubble>
            }
        </StyledBubbleButton>
    )
}

const waveAnim = keyframes`
    0% {
        opacity: 0;
        transform: scale(0.1);
    }
    50% {
        opacity: 0.3;
        transform: scale(0.8);
    }
    100% {
        opacity: 0;
        transform: scale(1.5);
    }
`

const StyledBubbleButton = styled.button`
    position: relative;

    ${({ enabled }) => !enabled && css`
        pointer-events: none;
    `}

    ${({ highlight }) => highlight && css`

        &::before, &::after {
            content: '';
            position: absolute;
            top: -13px;
            left: -12px;
            z-index: -1;

            display: block;
            width: 50px;
            height: 50px;
            border-radius: 50em;
            opacity: 0.3;
            background-color: var(--green-100);

            pointer-events: none;
        }

        &::before {
            animation: ${waveAnim} 2s linear infinite .7s;
        }

        &::after {
            animation: ${waveAnim} 2s linear infinite;
        }
    
    `}
`

const bubbleEnter = keyframes`
    from {
        opacity: 0;
        transform: scale(.7);
    }
`

const Bubble = styled.div`
    background-color: var(--primary);
    border-radius: 50em;
    
    color: white;
    font-size: 12px;
    font-weight: 700;
    line-height: 20px;
    text-align: center;

    position: absolute;
    width: 20px;
    height: 20px;
    top: -12px;
    right: -12px;

    animation: ${ bubbleEnter } .5s cubic-bezier(.17,.67,.47,2.17);
`

export default BubbleButton;