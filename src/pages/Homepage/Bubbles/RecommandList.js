import { useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import styled, { css } from 'styled-components';
import ButtonWithIcon from '../../../components/ButtonWithIcon';
import Dots from '../../../components/Dots';
import Icons from '../../../components/Icons';

import { Container } from '../../../components/layouts';
import LinkWrapper from '../../../components/LinkWrapper';
import ProductItem from '../../../components/ProductsLayout/ProductItem';
import Title from '../../../components/Title';
import { respondTo, sm, useRespondTo } from '../../../utils/responsive';
import { withSubSlug } from '../../../utils/withSubSlug';

const RecommandList = ({ products = [], topics = [] }) => {

    const isMobile = useRespondTo(sm);

    const navigate = useNavigate();

    function onViewAllButtonClick() {
        navigate(withSubSlug('/products'));
    }

    return (
        <StyledRecommandList>
            <Title>推薦訂製</Title>
            <ProductList as={isMobile ? MobileSlider : 'ul'}>
                { products?.map(product => 
                    <ProductItem key={product.id} item={product} showTopics={false} showPreBuy={false} />
                )}
            </ProductList>
            <TopicList>
                { topics?.map(topic =>
                    <TopicItem key={topic.id} topic={topic} />
                )}
            </TopicList>
            <ButtonContainer>
                <ButtonWithIcon Icon={Icons.Arrow} theme='white' onClick={onViewAllButtonClick}>瀏覽全部</ButtonWithIcon>
            </ButtonContainer>
        </StyledRecommandList>
    )
}

const TopicItem = ({ topic }) => (
    <StyledTopicItem image={topic.attributes.banner_image.data.attributes.url}>
        <LinkWrapper to={`/topics/${topic.id}`}>
            <span>
                { topic.attributes.name }
                <Icons.Arrow />
            </span>
        </LinkWrapper>
    </StyledTopicItem>
)

const MobileSlider = props => {

    const sliderRef = useRef();
    const [ nowIndex, setIndex ] = useState(0);

    function handleBeforeChange(curr, next) {
        setIndex(next)
    }

    function handleDotsClick(index) {
        sliderRef.current?.slickGoTo(index)
    }

    return (<>
        <Slider {...props}
            variableWidth={true}
            dots={false}
            arrows={false}
            ref={sliderRef}
            beforeChange={handleBeforeChange}
        />
        <StyledDots length={[...props.children].length} nowIndex={nowIndex} onClick={handleDotsClick}
            normalColor='var(--grey)'
        />
    </>)
}

const StyledRecommandList = styled.div`
    padding: 60px 0px;
`

const ProductList = styled(Container)`
    margin-top: 40px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 48px 28px;
    list-style-type: none;

    ${ respondTo.lg } {
        grid-template-columns: repeat(3, 1fr);
    }

    ${ respondTo.md } {
        grid-template-columns: repeat(2, 1fr);
    }

    ${ respondTo.sm } {
        margin-left: 0;
        margin-right: 0;
        width: 100vw;
        grid-template-columns: repeat(1, 1fr);

        .slick-slide {
            width: calc(100vw - 48px);
            padding-left: 24px;
        }
    }
`

const StyledDots = styled(Dots)`
    margin-top: 24px;
`

const TopicList = styled(Container).attrs({ as: 'ul' })`
    margin-top: 60px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;

    ${ respondTo.md } {
        grid-template-columns: repeat(1, 1fr);
        gap: 20px;
    }
`

const StyledTopicItem = styled.li`

    height: 120px;
    border-radius: 10px;
    overflow: hidden;

    font-size: 20px;
    font-weight: 700;
    color: white;

    position: relative;

    >a {
        
    }

    &::before, &::after {
        content: '';
        display: block;
        
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        background-size: cover;
        background-position: center;
    }

    &::before {
        filter: brightness(0.4);
    }

    &::after {
        opacity: 0;
        clip-path: circle(0%);
        transition: opacity 1s, clip-path 1s;
    }

    ${({ image }) => image && css`
        &::before, &::after {
            background-image: url(${process.env.REACT_APP_STRAPI_URL + image});
            background-size: 110%;
        }
    `}

    span {
        position: relative;
        z-index: 1;

        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: 100%;

    }
    
    span >svg {
        transition: transform .3s;
        margin-left: 8px;
    }

    &:hover{
        &::after {
            opacity: 1;
            clip-path: circle(100%);
        }

        span >svg {
            transform: translateX(4px);
        }
    }

    ${ respondTo.sm } {
        height: 80px;
        font-size: 18px;
    }
`

const ButtonContainer = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: center;
`

export default RecommandList