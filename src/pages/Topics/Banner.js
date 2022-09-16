import styled from 'styled-components';
import { respondTo } from '../../utils/responsive';

import BaseTitle from '../../components/BaseTitle';
import { imgUrl } from '../../utils/imgUrlWrapper';

const Banner = ({ image, title, description, ...props }) => {
    return (
        <StyledContainer {...props} >
            <div className="title-groups">
                <BaseTitle as="h2" size="xl">
                    {title}
                </BaseTitle>
                <p dangerouslySetInnerHTML={{ __html: description }} />
            </div>
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    width: 100vw;
    height: 400px;

    background-color: #f1f3f5;
    background-image: url(${imgUrl('/img/topic-banner.svg')});
    background-size: cover;
    background-position: center;


    .title-groups {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content:center;
    }

    h2 {
        margin-bottom: 28px;

        ${respondTo.lg} {
            font-size: 24px;
            line-height: 34px;
        }
    }

    p {
        width: 24vw;
        text-align: center;

        font-size: 16px;
        line-height: 28px;
        white-space: pre-line;

        ${respondTo.lg} {
            width: calc(100vw - 40px);
            margin: 0 auto;
        }
    }

    ${ respondTo.md } {
        background-image: url(${imgUrl('/img/topic-banner-mobile.svg')});
    }

`;

export default Banner;