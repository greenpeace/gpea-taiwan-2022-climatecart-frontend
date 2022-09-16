import styled, { css } from "styled-components";
import { respondTo, useRespondTo, md } from "../../utils/responsive";

import DashedTitle from "../DashedTitle";
import BundleRow from "./BundleRow";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

const BundlesContainer = ({ bundles, ...props }) => {
    const isMobile = useRespondTo(md);

    const sliderConfig = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false,
        dots: true
    };

    if (isMobile) return null;

    return (
        <StyledContainer {...props}>
            <DashedTitle as="h3" className="title">理想升級方案</DashedTitle>
            {isMobile ? (
                <div>
                    {
                        <StyledSlider {...sliderConfig} hasSingleItem={bundles.length === 1}>
                            {bundles.map((bundle, id) => (
                                <BundleRow key={id} bundle={bundle} />
                            ))}
                        </StyledSlider>
                    }
                </div>
            ) : (
                <ul>
                    {bundles.map((bundle, id) => (
                        <BundleRow key={id} bundle={bundle} />
                    ))}
                </ul>
            )}
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    background: var(--white);
    box-sizing: border-box;
    padding: 40px 110px 44px 110px;

    ${respondTo.lg} {
        padding: 60px 32px 120px 32px;
    }

    h3 {
        margin-bottom: 40px;

        ${respondTo.lg} {
            margin-bottom: 32px;
        }
    }

    > ul {
        display: flex;
        flex-direction: column;
        gap: 28px;
    }
`;

const StyledSlider = styled(Slider)`

    ${({ hasSingleItem }) => hasSingleItem && css`
        .slick-track {
                display: flex;
                justify-content: center;
        }
    `}


    .slick-slide {
        width: 300px;
        min-height: 600px;
        
        &:not(:first-of-type) {
            margin-left: 24px;
        }
    }

    .slick-dots {
        margin-top: 40px;
        display: flex !important;
        gap: 22px;
        justify-content:center;

        li {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: var(--grey);

            &.slick-active {
                background-color: var(--primary);
            }

            button {
                display: none;
            }
        }
    }
`;

export default BundlesContainer;
