import styled, { css, keyframes } from "styled-components";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useBearStore } from '../../stores/cartStore';
import { getDeepClone } from '../../utils/getDeepClone';
import { respondTo } from '../../utils/responsive';

import { Container } from '../../components/layouts';
import Banner from "./Banner";
import ProductCard from "../../components/ProductsLayout/ProductCard";
import BundlesContainer from "../../components/BundlesContainer";

const Page = () => {
    const stateTopics = useBearStore(state => state.topics);
    const stateProducts = useBearStore(state => state.products);
    const { topicID } = useParams();
    const currentTopic = stateTopics.find((topic) => topic.id === topicID);

    // const [currentTab, setCurrentTab] = useState(0);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        let result = [];
        const rawProducts = currentTopic.attributes.products.data;
        const clonedProducts = getDeepClone(rawProducts);

        clonedProducts.forEach((product) => {
            if (stateProducts[product.id]) {
                result.push(stateProducts[product.id])
            }
        });

        setAllProducts(result);
    }, [currentTopic]); // eslint-disable-line

    const {
        banner_image,
        description,
        name,
        bundles: { data: bundles },
    } = currentTopic.attributes;


    return (
        <StyledContainer>
            <Banner
                image={banner_image.data.attributes.url}
                title={name}
                description={description}
            />
            {/* <StyledTabsContainer>
                {allProducts.map((product, id) => (
                    <StyledTab
                        key={id}
                        isCurrent={id === currentTab}
                        onClick={() => setCurrentTab(id)}
                    >
                        <span>{product.attributes.short_name}</span>
                    </StyledTab>
                ))}
            </StyledTabsContainer> */}

            <StyledProductContainer>
                { allProducts?.map(product => (
                    <ProductCard key={product.id} product={product} className="product-card" />
                ))}
                {bundles.length ? <BundlesContainer bundles={bundles} /> : null}
            </StyledProductContainer>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
`;

// const StyledTabsContainer = styled.div`
//     padding-top: 80px;

//     display: flex;
//     justify-content: center;

//     ${respondTo.lg} {
//         padding: 0 16px;
//         padding-top: 40px;

//         flex-wrap: nowrap;
//         justify-content: flex-start;
//         width: 100vw;
//         overflow-x: scroll;

//         &::-webkit-scrollbar {
//             height: 0;
//             width: 0;
//         }
//     }
// `;

// const StyledTab = styled.button`
//     min-width: 208px;
//     padding-bottom: 24px;

//     ${respondTo.lg} {
//         min-width: fit-content;
//         padding: 0 24px;
//         padding-bottom: 8px;
//     }

//     span {
//         color: var(--black);
//         opacity: 0.4;
//         font-size: 18px;
//         line-height: 26px;
//         width: 100%;
//         display: block;
//         text-align: center;

//         ${respondTo.lg} {
//             font-size: 16px;
//             line-height: 24px;
//         }
//     }

//     position: relative;

//     &:after {
//         content: "";
//         display: block;
//         position: absolute;
//         left: 0;
//         top: 100%;
//         background-color: var(--green-300);
//         width: 100%;
//         height: 2px;

//         transform-origin: bottom;
//         transition: 0.2s ease-out transform;
//     }

//     ${({ isCurrent }) =>
//         isCurrent &&
//         css`
//             span {
//                 color: var(--primary);
//                 font-weight: 700;
//                 opacity: 1;
//             }

//             &:after {
//                 transform: scaleY(250%);
//             }
//         `}
// `;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const StyledProductContainer = styled(Container)`
    padding-top: 80px;
    padding-bottom: 160px;

    animation: ${fadeIn} 0.4s ease-out 1;

    ${respondTo.lg} {
        padding-top: 40px;
        padding-bottom: 80px;
    }

    .product-card {
        margin-bottom: 60px;
    }
`;

export default Page;
