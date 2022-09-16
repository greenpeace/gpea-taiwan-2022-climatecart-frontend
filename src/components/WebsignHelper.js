import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import shallow from "zustand/shallow";
import { parse } from 'query-string';
import { useDebounce } from 'react-use';

import { useAppStore } from "../stores/appStore";
import { useBearStore } from "../stores/cartStore";
import { getShoppingRecord, syncShoppingRecord } from "../utils/websign";

/**
 * 功能：
 * - 同步購物紀錄到後台
 * - 剛進站若讀到 key 值，則把已購商品放入購物車
 * @returns 
 */
const WebsignHelper = () => {
    const location = useLocation();

    const { shoppingRecordKey, setTicketsGot, setShowTicketForm, setShoppingRecordKey, setFormData } = useAppStore(state => state, shallow);
    const { myProducts, myFreebies, setMyTickets, products, addToMyProducts } = useBearStore(state => state, shallow);
    
    const [ needToAddToCart, setNeedToAddToCart ] = useState(null);

    useDebounce(() => {
        if (shoppingRecordKey) {
            const biesList = [ ...myProducts, ...myFreebies ];
            syncShoppingRecord(shoppingRecordKey, biesList.map(product => product.id).join(','));
        }
    }, 3000, [myProducts, myFreebies, shoppingRecordKey])

    useEffect(() => {
        const key = parse(location.search).key;
        if (key) {
            fetchRecord(key);
            setShoppingRecordKey(key);
        }
    }, []); // eslint-disable-line

    async function fetchRecord(key) {
        const res = await getShoppingRecord(key);

        if (res) {
            setFormData(res);
        }

        if (res?.cartItems.length > 0) {
            setMyTickets(5);
            setTicketsGot();
            setShowTicketForm(false);
            setNeedToAddToCart(res.cartItems);
        }
    }

    useEffect(() => {
        if (products && needToAddToCart) {
            needToAddToCart.forEach(productId => {
                const product = products[productId];
                if (product) {
                    addToMyProducts(product);
                }
            });
        }
    }, [needToAddToCart, products]);  // eslint-disable-line

    return null;
}
export default WebsignHelper