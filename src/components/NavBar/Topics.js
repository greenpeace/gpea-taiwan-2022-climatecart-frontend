import { useMemo, useState } from 'react';
import { respondTo, respondFrom } from '../../utils/responsive';
import styled, { css, keyframes } from 'styled-components';
import shallow from 'zustand/shallow';

import { useBearStore } from '../../stores/cartStore.js';
import { hoverEffect } from './hoverEffect.js';
import LinkWrapper from '../LinkWrapper';
import Image from '../Image';

const Topics = () => {

    const { products, topics } = useBearStore(
        state => ({
            products: state.products,
            topics: state.topics,
        }),
        shallow
    );

    const [hoverIndex, setHoverIndex] = useState(null);
    const [productListOpen, setProductListOpen] = useState(false);

    const pickedProducts = useMemo(() => {
        let items = Object.values(products || {});
        items = items.filter(product =>
            product.attributes.topics.data.map(topic => topic.id)
                .filter(topicId => topicId === topics?.[hoverIndex]?.id)
                .length > 0
        );

        return items.map(item => ({
            id: item.id,
            name: item.attributes.name,
            image: item.attributes.image.data.attributes.url
        }));
    }, [hoverIndex, products]) // eslint-disable-line

    function openProductList(topicIndex) {
        setHoverIndex(topicIndex);
        setProductListOpen(true);
    }

    function closeProductList() {
        setProductListOpen(false);
    }

    return (
        <StyledTopics onMouseLeave={closeProductList}>
            <TopicsList>
                {topics?.map((topic, index) =>
                    <TopicItem key={`topic${topic.id}`} onMouseEnter={() => openProductList(index)}>
                        <LinkWrapper navLink to={`/topics/${topic.id}`}>{topic.attributes.short_name ?? topic.attributes.name}</LinkWrapper>
                    </TopicItem>
                )}
            </TopicsList>
            <ProductsList active={productListOpen} key={Math.random()}>
                {pickedProducts.map(product =>
                    <ProductItem key={`${hoverIndex}product${product.id}`} {...product} onClick={closeProductList} />
                )}
            </ProductsList>
        </StyledTopics>
    )
}

const ProductItem = ({ id, name, image, onClick }) => (
    <StyledProductItem>
        <LinkWrapper to={`/product/${id}`} onClick={onClick} >
            <Image src={image} alt={name} />
            <h4>{name}</h4>
        </LinkWrapper>
    </StyledProductItem>
)

const enterAnim = keyframes`
    from {
        opacity: 0;
        transform: translateY(-16px);
    }
`

const StyledTopics = styled.div`
    animation: ${enterAnim} .3s ease-out forwards;

`

const TopicsList = styled.ul`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 12px 80px;
    background-color: white;
    border-bottom: 1.5px solid var(--green-300);


    ${respondTo.lg} {
        flex-wrap: nowrap;
        justify-content: flex-start;
        padding: 0 8px;
        width: 100vw;
        overflow-x: scroll;

        &::-webkit-scrollbar {
            height: 0;
            width: 0;
        }
    }
`

const TopicItem = styled.li`
    margin: 8px 32px;
    font-size: 16px;
    line-height: 1.6em;

    &:hover {
        font-weight: 700;
        color: var(--primary);
    }
    
    ${respondFrom.lg} {
        ${hoverEffect};
    }

    ${ respondTo.xl } {
        margin: 8px 20px;
    }

    ${respondTo.lg} {
        flex-shrink: 0;
        height: 100%;
        margin: 0;
        padding: 8px 16px;
        padding-bottom: 12px;
        position: relative;

        &:after {
            content: '';
            display: block;
            height: 5px;
            width: 100%;
            background-color: var(--green-300);

            position: absolute;
            left: 0;
            bottom: 0;

            transform: scaleY(0);
            transform-origin: bottom;
            transition: 0.2s transform ease-out;
        }

        &:hover {
            color: var(--green-300);

            &:after {
                transform: scaleY(100%);
            }
        }
    }

    a.active {
        color: var(--primary);    
    }
    
`

const ProductsList = styled.ul`
    position: absolute;
    width: 100%;
    top: 100%;
    left: 0;

    padding: 20px 80px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 24px 64px;
    background-color: rgba(255,255,255,1);
    /* backdrop-filter: blur(4px); */
    border-bottom: 1.5px solid var(--green-300);

    transition: opacity .3s, transform .3s;

    ${p => !p.active && css`
        pointer-events: none;
        opacity: 0;
        transform: translateY(-40px);
    `}

    ${respondTo.lg} {
        flex-wrap: nowrap;
        padding: 22px 20px 28px 20px;
        justify-content: flex-start;
        gap: 24px;

        width: 100vw;
        overflow-x: scroll;

        &::-webkit-scrollbar {
            height: 0;
            width: 0;
        }
    }

    ${ respondTo.md } {
        display: none;
    }
`

const productItemEnter = keyframes`
    from {
        opacity: 0;
        transform: scale(0.8);
    }
`

const StyledProductItem = styled.li`
    width: 140px;
    
    animation: ${productItemEnter} .3s ease-out;

    ${respondTo.lg} {
        flex-shrink: 0;
    }

    >a {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    img {
        width: 100%;
        height: 112px;
        object-fit: contain;
    }

    h4 {
        margin: 0;
        margin-top: 12px;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.5;
    }

    &:hover {
        h4 {
            color: var(--primary);
        }
    }
`


export default Topics