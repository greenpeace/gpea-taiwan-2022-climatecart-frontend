import styled, { keyframes } from 'styled-components';

const ScrollDownIndicator = ({ ...props }) => (
    <StyledScrollDownIndicator {...props} />
)

const loopAnim = keyframes`
    50% {
        transform: translateY(-40px);
    }
`

const StyledScrollDownIndicator = styled.div`
    position: relative;
    width: 20px;
    height: 20px;

    &::before { 
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50em;
        background-color: var(--primary);

        animation: ${loopAnim} 2s ease-in-out infinite;
    }
`

export default ScrollDownIndicator