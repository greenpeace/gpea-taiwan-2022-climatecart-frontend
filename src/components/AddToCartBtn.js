import styled, { css } from "styled-components";
import { useBearStore } from '../stores/cartStore';

import * as Icons from "./Icons";
import BasicButton from "./BasicButton";
import { useAppStore } from "../stores/appStore";
import { useMemo } from "react";


// type = bundle || product

const AddToCartBtn = ({ item, type, className, ...props }) => {
    const { 
        myProducts, myBundles, myTickets,
        addToMyProducts, addToMyBundles, removeFromMyBundles, removeFromMyProducts,
    } = useBearStore();
    const { setShowTicketForm } = useAppStore();

    const isInMyProducts = useMemo(() => {
        if (type !== 'product') return;

        const find = myProducts.find((product) => product.id === item.id);
        return Boolean(find);
    }, [myProducts, item, type]);

    // const isInMyBundles = useMemo(() => {
    //     const find = myBundles.find((bundle) => bundle.id === item.id);
    //     return Boolean(find);
    // }, [myBundles, item]);

    const isInMyBundles = useMemo(() => {
        if (type !== 'bundle') return;

        let bundleProductsId = item.attributes.products.data.map(product => product.id);
        const myProductIds = myProducts?.map(product => product.id);
        myProductIds.forEach(id => {
            const index = bundleProductsId.findIndex(pid => pid == id);
            if (index !== -1) {
                bundleProductsId[index] = null;
            }
        })

        return bundleProductsId.filter(id => id !== null).length === 0;
    }, [myProducts, item, type]);

    const hasTicket = useMemo(() => myTickets > 0, [myTickets]);

    const orderStatus = useMemo(() => {
        if (type === 'product') return isInMyProducts;
        if (type === 'bundle') return isInMyBundles;
    }, [type, isInMyProducts, isInMyBundles]);

    const handleClick = () => {
        if (!hasTicket) {
            setShowTicketForm(true);
            return;
        }

        if (type === 'product') {
            if (!isInMyProducts) {
                addToMyProducts(item);
            }
            else {
                removeFromMyProducts(item);
            }
        } else if (type === 'bundle') {
            if (!isInMyBundles) {
                addToMyBundles(item);
            }
            else {
                removeFromMyBundles(item);
            }
        }
    }

    return (
        <StyledBasicButton
            theme="orange"
            className={`add-to-cart-btn ${className}`}
            Icon={hasTicket ? Icons.Cart : Icons.Ticket}
            iconPos="left"
            onClick={handleClick}
            ordered={orderStatus}
            {...props}
        >
            { !hasTicket ?
                '領券以訂製':
                orderStatus ? '已訂製' : '我想訂製'
            }
        </StyledBasicButton>
    );
};

const StyledBasicButton = styled(BasicButton)`
    box-sizing: border-box;
    border: 1px solid transparent;

    transition: border-color .2s, color .2s;

    ${({ordered}) => ordered && css`
        /* border-color: var(--secondary); */
        background: var(--grey) !important;
        color: white;
        /* pointer-events: none; */

        &:hover {

        }
    `}
`;

export default AddToCartBtn;
