import styled from "styled-components";
import { useMemo } from "react";
import { useBearStore } from "../../stores/cartStore";
import { respondTo, lg, useRespondTo } from "../../utils/responsive";
import 'slick-carousel/slick/slick.css';


import DashedTitle from "../../components/DashedTitle";
import BasicButton from "../../components/BasicButton";
import LinkWrapper from "../../components/LinkWrapper";
import ProductItem from "../../components/ProductsLayout/ProductItem";
import { Arrow } from "../../components/Icons";
import Slider from "react-slick";

const Suggestions = ({ selectedTopics, currentProductID, ...props }) => {
    const topics = useBearStore((state) => state.topics);
    const allProducts = useBearStore((state) => state.products);
    const SIZE = 4;
    
    const isMobile = useRespondTo(lg);

    const sliderConfig = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        touchthreshold: 100,
        arrows: false,
    };

    const suggestions = useMemo(() => {
        let suggestions = [];
        topics.forEach((topic) => {
            selectedTopics.forEach((t) => {
                if (t.id === topic.id) {
                    let products = topic.attributes.products.data;
                    products.forEach((p) => {
                        if (
                            !suggestions.find((sug) => sug.id === p.id) &&
                            p.id !== currentProductID
                        ) {
                            suggestions.push(allProducts[p.id]);
                        }
                    });
                }
            });
        });
        return suggestions.slice(0, SIZE);
    }, [selectedTopics, currentProductID]); // eslint-disable-line

    return (
        <StyledContainer {...props}>
            <DashedTitle as="h3">你可能會喜歡</DashedTitle>
            {isMobile ? (
                <StyledSlider {...sliderConfig}>
                    {suggestions.map((suggestion, id) => (
                        <ProductItem as="div" item={suggestion} />
                    ))}
                </StyledSlider>
            ) : (
                <ul>
                    {suggestions.map((item, id) => (
                        <ProductItem item={item} key={id} />
                    ))}
                </ul>
            )}
            <LinkWrapper to="/products">
                <BasicButton theme="lightGreen" iconPos="right" Icon={Arrow}>
                    瀏覽更多
                </BasicButton>
            </LinkWrapper>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    padding-top: 28px;

    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;

    ${respondTo.lg} {
        padding: 60px 0 120px 0;
    }

    h3 {
        margin-bottom: 40px;
    }

    ul {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 45px;
        margin-bottom: 40px;
    }

    .pre-buy {
        display: none;
    }
`;

const StyledSlider = styled(Slider)`
    width: 100vw;
    margin-left: 20px;
    margin-bottom: 40px;
    overflow: hidden;


    .slick-slide {
        width: 300px;
        margin-right: 32px;

        a {
            display: block;
        }
    }
`;

export default Suggestions;
