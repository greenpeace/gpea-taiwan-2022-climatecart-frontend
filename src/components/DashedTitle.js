import styled from 'styled-components';

const DashedTitle = ({ as, children, ...props }) => {
    return (
        <StyledContainer as={as} {...props}>
            {children}
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    font-size: 24px;
    line-height: 48px;
    font-weight: 700;
    text-align: center;

    padding-bottom: 20px;
    
    position: relative;

    &::after{
        content: '';
        display: block;
        
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);

        width: 22px;
        height: 4px;
        border-radius: 10px;
        background-color: var(--green-300);
    }
`;

export default DashedTitle;