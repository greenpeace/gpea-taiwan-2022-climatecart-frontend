import { UPLOAD_WEBSIGN, SYNC_SHOPPING_RECORD, GET_SHOPPING_RECORD } from "../queries";
import apolloClient from "./apolloClient";

import { useUtmStore } from "../components/UTMHelper";

function getUtmData() {
    const { utmData, completionURL } = useUtmStore.getState();
    return {
        utmCampaign: utmData?.utm_campaign,
        utmContent: utmData?.utm_content,
        utmMedium: utmData?.utm_medium,
        utmSource: utmData?.utm_source,
        utmTerm: utmData?.utm_term,
        completionURL: completionURL
    }
}

export async function websign(data) {
    
    const res = await apolloClient.mutate({
        mutation: UPLOAD_WEBSIGN,
        variables: {
            ...data,
            utmData: getUtmData()
        },
    }) 

    return res?.data?.websign;
}

export async function syncShoppingRecord(key, productsString) {

    const res = await apolloClient.mutate({
        mutation: SYNC_SHOPPING_RECORD,
        variables: { 
            key, 
            products: productsString, 
            utmData: getUtmData()
        }
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