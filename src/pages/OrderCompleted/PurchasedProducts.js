import { useState, useMemo } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { respondTo } from '../../utils/responsive';

import Icons from '../../components/Icons';
import PurchasedProductItem from '../../components/ProductsLayout/PurchasedProductItem';
import { numberWithCommas } from '../../utils/numberWithCommas';

const PurchasedProducts = ({ title = "查看您選擇的政見", myProducts = [], myBundles = [], myFreebies = [], ...props }) => {
    const [collapsed, setCollapsed] = useState(false);

    function toggleCollapse(e) {
        e.preventDefault();
        setCollapsed(v => !v);
    }

    const soleProducts = useMemo(() => 
        myProducts.filter((product) => Boolean(product.bundleID) === false) || [], 
        [myProducts]
    );

    const totalTickets = useMemo(() => {
        let result = 0;

        if (soleProducts.length) {
            soleProducts.forEach((product) => result += product.attributes.price);
        }

        if (myBundles.length) {
            myBundles.forEach((bundle) => result += bundle.attributes.price);
        }

        return result;
    }, [myBundles, soleProducts]);

    const totalCarbon = useMemo(() => {
        let result = 0;

        if (soleProducts.length) {
            soleProducts.forEach((product) => result += product.attributes.carbon_reduction);
        }

        if (myBundles.length) {
            myBundles.forEach((bundle) => result += bundle.totalCarbonReduction)
        }

        if (myFreebies.length) {
            myFreebies.forEach((freebie) => result += freebie.attributes.carbon_reduction)
        }

        return result;
    }, [soleProducts, myBundles, myFreebies]);

    return (
        <StyledPurchasedProducts {...props} collapsed={collapsed}>
            <button className='collapse-button' onClick={toggleCollapse}>{title} <Icons.CollapseArrow /></button>
            <div className='content'>
                <ul>
                    {soleProducts.length > 0 && (
                        soleProducts.map((product, id) => (
                            <PurchasedProductItem key={`product-${id}`} type="product" item={product} />
                        ))
                    )}

                    {
                        myBundles.length > 0 && myBundles.map((bundle, id) => (
                            <PurchasedProductItem key={`bundle-${id}`} type="bundle" item={bundle} />
                        ))
                    }
                    {
                        myFreebies.length > 0 && myFreebies.map((freebie, id) => (
                            <PurchasedProductItem key={`freebie-${id}`} type="product" item={freebie} />
                        ))
                    }
                </ul>
                <div className="total-price">
                    <span>商品總計</span>
                    <span className='price'>$ {totalTickets} /張 好政券</span>
                </div>

                <div className="total-carbon">
                    <span><Icons.Leaf />減碳力 </span>
                    <span className='count'>
                        <b>{numberWithCommas(totalCarbon)}</b> 萬棵樟樹
                    </span>
                </div>
            </div>
        </StyledPurchasedProducts>
    )
}

const contentEnter = keyframes`
    from {
        opacity: 0;
        transform: translateY(-16px);
    }
`

const StyledPurchasedProducts = styled.div`
    border-radius: 10px;
    background-color: white;
    overflow: hidden;

    ${respondTo.lg} {
        border-radius: 0;
    }

    >.collapse-button {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        padding: 32px 0;
        background: white;

        svg {
            transform: rotateX(180deg);
            transition: transform .3s;
        }
    }

    >.content {
        padding: 32px;
        animation: ${contentEnter} .3s ease-out;

        li:last-of-type {
            ${respondTo.lg} {
                padding-bottom: 20px;
                border-bottom: 1px solid var(--green-300);
            }
        }
    }

    ${ respondTo.md } {
        >.content { 
            padding: 32px 16px;
        }
    } 

    .total-price, .total-carbon {
        margin-top: 28px;

        text-align: right;
        font-size: 16px;

        ${respondTo.lg} {
            display: flex;
            align-items: center;
            
            > * {
                flex-shrink: 0;
            }
        }

        .price, .count {
            display: inline-block;
            width: 280px;
            font-size: 20px;
            font-weight: 500;

            ${respondTo.lg} {
                width: fit-content;
                margin-left: auto;
            }
        }

        .count {
            font-size: 16px;

            b {
                font-size: 36px;
                font-weight: 700;
                color: var(--primary);
            }
        }
    }

    .total-carbon {
        > span {
            display: flex;
            align-items: center;
            line-height: 24px;
            gap: 10px;
        }
    }

    ${p => !p.collapsed && css`
        >.content {
            display: none;
        }

        >.collapse-button {
            svg {
                transform: rotateX(0deg);
            }
        }
    `}

`

export default PurchasedProducts