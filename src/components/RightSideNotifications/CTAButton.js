import styled from 'styled-components';

const CTAButton = ({ children, ...props }) => {
    return (
        <StyledCTAButton {...props}>
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="50" fill="var(--primary)"/>
                <circle cx="11" cy="18" r="6" fill="var(--yellow)"/>
            </svg>
            <div>{ children }</div>
        </StyledCTAButton>
    )
}

const StyledCTAButton = styled.button`

    position: relative;
    width: 100px;
    height: 100px;
    
    display: block;

    >svg, >div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        transition: transform .1s;
    }

    >div {
        font-size: 14px;
        font-weight: 700;
        line-height: 1.6;
        text-align: center;

        color: white;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    &:hover {
        >svg {
            transform: scale(1.05);
        }
    }
`

export default CTAButton