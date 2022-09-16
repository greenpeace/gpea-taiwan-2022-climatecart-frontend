import styled from 'styled-components';
import { respondTo } from '../utils/responsive';

const getTitleStyle = (size) => {
    const map = {
        xl: {
            fontSize: 36,
            lineHeight: 52,
            fontWeight: 700,
            lgFontSize: 24,
            lgLineHeight: 34,
        },
        l: {
            fontSize: 32,
            lineHeight: 48,
            fontWeight: 700,
            lgFontSize: 24,
            lgLineHeight: 34,
        },
        m: {
            fontSize: 28,
            lineHeight: 40,
            fontWeight: 700,
            lgFontSize: 24,
            lgLineHeight: 34,
        },
        s: {
            fontSize: 20,
            lineHeight: 28,
            fontWeight: 500,
            lgFontSize: 24,
            lgLineHeight: 34,
        },
    }
    const { fontSize, lineHeight, fontWeight, lgFontSize, lgLineHeight } = map[size];

    return `
        font-size: ${fontSize}px;
        line-height: ${lineHeight}px;
        font-weight: ${fontWeight};

        ${respondTo.lg} {
            font-size: ${lgFontSize}px;
            line-height: ${lgLineHeight}px;
        }
    `;
}

const BaseTitle = ({ as, size, children, ...props }) => {
    return (
        <StyledContainer as={as} size={size} {...props}>
            {children}
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    ${({ size }) => getTitleStyle(size)}
    letter-spacing: 0.05em;
`;

export default BaseTitle;