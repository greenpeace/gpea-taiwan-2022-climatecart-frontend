import styled from 'styled-components';
import { respondTo } from '../../utils/responsive';
import { numberWithCommas } from '../../utils/numberWithCommas';

import Icons from '../Icons';
import ImageWrapper from '../../components/Image';
import { useMemo } from 'react';

const PurchasedProductItem = ({
    type,
    item,
    onDeleteClick,
    ...props
}) => {

    const priceDisplay = useMemo(() => {
        return item?.attributes.price > 0 ?
            `$ ${item.attributes.price} /張 好政券`:
            '免費加選'
    }, [item])

    if (type === 'product') {
        const { attributes: { name, price, carbon_reduction, image: { data: { attributes: { url } } } } } = item;
        return (
            <StyledPurchasedProductItem {...props}>
                <div>
                    <ImageWrapper className="cover" src={url} alt={name} />
                    <div className="wording">
                        <div className="info">
                            <div className="name">{name}</div>
                            <div className="price is--pc">{ priceDisplay }</div>
                        </div>
                        <div className="carbon_reduction">
                            <Icons.Leaf />減碳力相當於種下 <b>{numberWithCommas(carbon_reduction)}</b> 萬棵樟樹
                        </div>
                    </div>
                    {onDeleteClick &&
                        <button className="delete-button" onClick={onDeleteClick}>
                            <Icons.Close />
                        </button>
                    }
                </div>
                <div className="price is--mobile">{ priceDisplay }</div>
            </StyledPurchasedProductItem>
        )
    } else if (type === 'bundle') {
        const { totalCarbonReduction, attributes: { name, price, products: { data: products } } } = item;

        const coverImg = products[0].attributes.image.data.attributes.url;
        return (
            <StyledPurchasedProductItem {...props}>
                <div>
                    <ImageWrapper className="cover" src={coverImg} alt={name} />
                    <div className="wording">
                        <div className="info">
                            <div className="name">
                                <p>{name}</p>
                                <div className="list">{products.map((product, id) => <span key={product.attributes.name}>{product.attributes.name}{id < products.length - 1 && '、'}</span>)}</div>
                            </div>
                            <div className="price is--pc">{ priceDisplay }</div>
                        </div>
                        <div className="carbon_reduction">
                            <Icons.Leaf />減碳力相當於種下 <b>{numberWithCommas(totalCarbonReduction)}</b> 萬棵樟樹
                        </div>
                    </div>
                    {onDeleteClick &&
                        <button className="delete-button" onClick={onDeleteClick}>
                            <Icons.Close />
                        </button>
                    }
                </div>
                <div className="price is--mobile">{ priceDisplay }</div>
            </StyledPurchasedProductItem>
        )
    }
}

const StyledPurchasedProductItem = styled.li`
    list-style-type: none;

    > div {
        display: flex;
        align-items: flex-start;
        position: relative;
    }

    ${respondTo.lg} {
        display: flex;
        flex-direction: column;

        > div {
            display: flex;
        }
    }

    .is--pc {
        
        ${respondTo.lg} {
            display: none !important;
        }
    }

    .is--mobile {
        display: none !important;

        ${respondTo.lg} {
            display: unset;
        }


    }

    &:not(:last-child) {
        margin-bottom: 28px;
        padding-bottom: 28px;
        border-bottom: 1px solid var(--grey);
    }

    .cover {
        width: 140px;
        height: 112px;
        object-fit: contain;
        background-color: var(--white-100);
        border-radius: 5px;
    }

    .wording {
        flex: 1;
        position: relative;

        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        margin-left: 20px;
    }

    .wording .name {
        font-size: 20px;
        font-weight: 500;

        ${respondTo.lg} {
            font-size: 16px;
        }
    }

    .info {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .name {
        width: 65%;
        .list {
            font-size: 14px;
            line-height: 24px;
            margin-top: 0.2em;

            ${respondTo.lg} {
                font-size: 12px;
                line-height: 20px;
            }
        }

        ${respondTo.lg} {
            width: 100%;
        }

    }

    .price {
        font-size: 20px;

        ${respondTo.lg} {
            font-size: 14px;
        }
    }

    .price.is--mobile {
        margin-top: 20px;
        margin-left: auto;
        display: inline-flex;

    }

    .wording .carbon_reduction {
        margin-top: 24px;
        width: 100%;
        
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        
        font-size: 16px;

        >* {
            flex-shrink: 0;
        }

        >b {
            margin: 0 4px;
            font-size: 20px;
            color: var(--primary);

            ${respondTo.lg} {
                margin: 0 2px;
                font-size: 14px;
            }
        }

        >svg {
            position: relative;
            top: -3px;
            margin-right: 8px;

            ${respondTo.lg} {
                margin-right: 4px;
                height: 16px;
                width: 16px;
                top:0 ;
            }
        }

        ${respondTo.lg} {
            font-size: 14px;

            b {
                font-size: 14px;
            }
        }
    }

    .delete-button {
        margin-left: 16px;
        color: var(--grey);

        &:hover {
            color: var(--black);
        }
    }


`

export default PurchasedProductItem