import styled from 'styled-components';

const PriceText = ({ price, ...props }) => {
    return (
        <StyledText {...props}>
            {price} / 張 好政券
        </StyledText>
    )
}

const StyledText = styled.span`
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
    color: var(--black);
`;

export default PriceText;