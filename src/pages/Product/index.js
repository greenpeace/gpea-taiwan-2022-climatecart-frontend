import styled from 'styled-components';
import { respondTo } from '../../utils/responsive';
import { useParams } from "react-router";
import { useBearStore } from '../../stores/cartStore';

import { Container } from '../../components/layouts';
import ProductCard from '../../components/ProductsLayout/ProductCard';
import DashedTitle from '../../components/DashedTitle';
import BundlesContainer from '../../components/BundlesContainer';
import GallerySlick from './GallerySlick';
import FeedbackBox from './FeedbackBox';
import Suggestions from './Suggestions';
import AddToCartBtn from '../../components/AddToCartBtn';


const Page = () => {
    const stateProducts = useBearStore(state => state.products);
    const { productID } = useParams();
    const currentProduct = stateProducts[productID];
    const { attributes: { contentHTML, feedbacks, gallery, topics: { data: topics } } } = currentProduct;


    const handleContentHtml = () => {
        return contentHTML.replace(/\/uploads/gi, `${process.env.REACT_APP_STRAPI_URL}/uploads`);
    };


    return (
        <StyledContainer key={productID}>
            <ProductCard product={currentProduct} className="product-card" />
            <StyledDescription>
                <DashedTitle as="h3">完整介紹</DashedTitle>
                <StyledContent className="content" dangerouslySetInnerHTML={{ __html: handleContentHtml() }} />
                <GallerySlick className="gallery" items={gallery} />
            </StyledDescription>
            <AddToCartBtnContainer>
                <AddToCartBtn item={currentProduct} type="product" />
            </AddToCartBtnContainer>
            <StyledFeedbackContainer>
                <DashedTitle as="h3">真實案例分享</DashedTitle>
                <div className="container">
                    {feedbacks.map((item, id) => <FeedbackBox feedback={item} key={id} />)}
                </div>
            </StyledFeedbackContainer>
            {stateProducts[productID].relatedBundles.length ? <StyledBundlesContainer bundles={stateProducts[productID].relatedBundles} /> : null}
            <StyledSuggestions selectedTopics={topics} currentProductID={productID} />
        </StyledContainer>
    )
}

const StyledContainer = styled(Container)`
    padding: 110px 0 160px 0;

    ${respondTo.lg} {
        padding: 40px 0 0 0;
        width: 100%;

        .product-card {
            width: calc(100vw - 48px);
            margin: 0 auto;
        }
    }
`;

const StyledDescription = styled.div`
    /* border-top: 1px solid var(--grey); */
    padding: 60px 0 80px 0;

    ${respondTo.lg} {
        padding: 40px 0;
        width: calc(100vw - 48px);
        margin: 0 auto;
    }

    h3 {
        margin-bottom: 40px;

        ${respondTo.lg} {
            margin-bottom: 32px;
            margin-top: 0;
        }
    }

    .gallery {
        margin-top: 30px;
    }

`;

const StyledContent = styled.div`
    font-size: 16px;
    line-height: 28px;
    li {
        position: relative;
        padding-left: 20px;

        &:before {
            content: '';
            display: block;
            
            height: 8px;
            width: 8px;
            border-radius: 50%;
            background-color: var(--green-300);

            position: absolute;
            top: 8px;
            left: 0;
        }
    }

    img {
        width: 28vw;
        max-width: 600px;
        height: calc(28vw * 0.66);
        max-height: 396px;
        object-fit: cover;
        
        display: block;
        margin: 28px auto;

        ${respondTo.lg} {
            width: 100%;
            height: auto;
        }
    }
`;

const StyledFeedbackContainer = styled.div`
    border-top: 1px solid var(--grey);
    padding: 60px 0 80px 0;

    ${respondTo.lg} {
        padding: 34px 0 60px 0;
        width: calc(100vw - 48px);
        margin: 0 auto;
    }
    
    h3 {
        margin-bottom: 40px;

        ${respondTo.lg} {
            margin-bottom: 32px;
        }
    }
    .container {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`;

const AddToCartBtnContainer = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 40px;


`

const StyledBundlesContainer = styled(BundlesContainer)`
`;

const StyledSuggestions = styled(Suggestions)``;

export default Page;