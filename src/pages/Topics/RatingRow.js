import styled, { css } from "styled-components";

import * as Icons from './RatingIcons';
import { createEmptyArray } from "../../utils/createEmptyArray";

const RatingRow = ({ ratingItem, ...props }) => {
    const { label, rating } = ratingItem;
    const max = 5;

    return (
        <StyledContainer className='rating-row'>
            <label>{label}</label>
            <span>
                {createEmptyArray(max).map((_, id) => (
                    <GetIcon key={id} label={label} isActive={id <= rating} />
                ))}
            </span>
        </StyledContainer>
    );
};

const GetIcon = ({ label, isActive }) => {

    
    const FindIcon = Icons[label];
    if (!FindIcon) return null;

    return <FindIcon active={isActive} />;
};

const StyledContainer = styled.div`
    display: flex;
    align-items: center;

    label {
        min-width: 4em;
    }

    >span {
        margin-left: 16px;
        margin-top: -3px;
        display: flex;
        gap: 6px;
    }
`;

export default RatingRow;
