import { UPLOAD_WEBSIGN, SYNC_SHOPPING_RECORD, GET_SHOPPING_RECORD } from "../queries";
import apolloClient from "./apolloClient";

export async function websign(data) {
    
    const res = await apolloClient.mutate({
        mutation: UPLOAD_WEBSIGN,
        variables: data
    }) 

    return res?.data?.websign;
}

export async function syncShoppingRecord(key, productsString) {
    const res = await apolloClient.mutate({
        mutation: SYNC_SHOPPING_RECORD,
        variables: { key, products: productsString }
    }) 

    return res;
}

export async function getShoppingRecord(key) {
    const res = await apolloClient.query({
        query: GET_SHOPPING_RECORD,
        variables: { key }
    })

    return res?.data?.shoppingRecordByKey
}