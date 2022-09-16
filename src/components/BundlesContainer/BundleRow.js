import styled, { css } from 'styled-components';
import { respondTo } from '../../utils/responsive';

import AddToCartBtn from '../AddToCartBtn';
import Image from '../../components/Image';
import LinkWrapper from '../../components/LinkWrapper';
import PriceText from '../../components/PriceText';
import { useBearStore } from '../../stores/cartStore';
import { useMemo } from 'react';

const BundleRow = ({ bundle, ...props }) => {
    const { attributes: { name, price, products: { data: products } } } = bundle;

    const renderItems = () => {
        return products.map((product, id) => (
            <BundleItemContainer key={id}>
                <ProductCard product={product} />
                { (id < products.length - 1) &&
                    <span className="separator"><span>+</span></span>
                }
            </BundleItemContainer>
        ))
        
    };

    return (
        <StyledContainer {...props}>
            <div className="items">
                {renderItems()}
            </div>
            <div className="info">
                <h4>{name}</h4>
                <PriceText price={price} />
                <AddToCartBtn item={bundle} type="bundle" />
            </div>
        </StyledContainer>
    )
}

const ProductCard = ({ product, ...props }) => {
    const { id, attributes: { name, image: { data: { attributes: { url } } } } } = product;
    const { myProducts } = useBearStore();

    const isBought = useMemo(() => {
        const existProduct = myProducts.find(product => product.id === id);
        return existProduct !== undefined;
    }, [myProducts, id])

    return (
        <StyledProductCard to={`/product/${id}`} isBought={isBought}>
            <div className='cover'>
                <Image src={url} />
            </div>
            <h4>{name}</h4>
        </StyledProductCard>
    )
}

const StyledContainer = styled.div`
    background-color: #fff;
    padding: 26px 32px;
    border-radius: 5px;

    display: flex;
    justify-content: space-between;

    ${respondTo.md} {
        flex-direction: column;
        padding: 14px 20px;
    }

    --card-width: 140px;
    --separator-width: 80px;

    .items {
        display: flex;
        flex-wrap: wrap;
        gap: 10px 0;

        ${respondTo.md} {
            width: 100%;
            padding-bottom: 24px;
            border-bottom: 1px solid var(--grey);
        }
        
    }

    .info {
        margin-left: 24px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 12px;

        ${respondTo.md} {
            margin-left: 0px;
            align-items: flex-start;
            padding-top: 24px;
        }


        h4 {
            font-size: 20px;
            line-height: 28px;
            font-weight: 700;
        }

        p {
            text-align: right;
        }

        .add-to-cart-btn {
            margin-top: 28px;

            ${respondTo.md} {
                margin: 20px auto 0 auto;
            }
        }

    }
`;

const BundleItemContainer = styled.span`
    display: flex;

    .separator {
        width: var(--separator-width);
        color: var(--primary);
        font-size: 28px;
        line-height: 30px;

        display: flex;
        justify-content: center;

        ${respondTo.md} {
            display: none;
        }

        span {
            display: block;
            height: fit-content;
            position: relative;
            top: calc(122px / 2);
            transform: translateY(-50%);
        }
    }
`

const StyledProductCard = styled(LinkWrapper)`
    display: block;
    width: var(--card-width);
    transition: opacity .2s;

    ${respondTo.md} {
        width: 100%;
        display: flex;
        gap: 16px;
        
    }

    .cover {
        width: 140px;
        height: fit-content;
        background: var(--white-100);
        border-radius: 5px;
        margin-bottom: 8px;

        ${respondTo.md} {
            flex-shrink: 0;
        }
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    h4 {
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
    }

    ${({ isBought }) => isBought && css`
        opacity: 0.5;
    `}
`;

export default BundleRow;