import create from "zustand";
import apolloClient from "../utils/apolloClient";
import { getDeepClone } from '../utils/getDeepClone';
import { getRandomInt } from '../utils/getRandomNumber';
import { GET_ALL_TOPICS, GET_ALL_PRODUCTS, GET_ALL_BUNDLES } from '../queries';

const useBearStore = create((set, get) => ({
    products: null,
    topics: null,
    bundles: null,
    myTickets: 0,
    myProducts: [],
    myBundles: [],
    myCollections: {},
    myFreebies: [],
    myCheckouts: null,
    fetchAllProducts: async () => {
        const { data: { products: { data: products } } } = await apolloClient.query({
            query: GET_ALL_PRODUCTS
        });
        const stateBundles = get().bundles;

        let map = {};

        products.forEach((product, id) => {
            let item = Object.assign({}, product, { fakePurchasedNum: getRandomInt(100, 1000), fakePreBuyNum: getRandomInt(10, 100), relatedBundles: [], bundleID: null });
            map[product.id] = item;
        });


        for (let key in stateBundles) {
            let currentBundle = stateBundles[key];
            let includedProducts = currentBundle.attributes.products.data;
            includedProducts.forEach((product) => {
                map[product.id].relatedBundles.push(currentBundle);
            })
        };

        set({ products: map });
    },

    fetchAllTopics: async () => {
        const { data: { topics: { data: topics } } } = await apolloClient.query({
            query: GET_ALL_TOPICS
        });

        set({ topics });
    },
    fetchAllBundles: async () => {
        const { data: { productBundles: { data: productBundles } } } = await apolloClient.query({
            query: GET_ALL_BUNDLES
        });

        let map = {};
        let cloned = getDeepClone(productBundles);

        cloned.forEach((bundle) => {

            bundle.totalCarbonReduction = getTotalCarbon(bundle);

            map[bundle.id] = bundle;
        });


        set({ bundles: map });
    },
    setMyTickets: (num) => {
        set({ myTickets: num });
    },
    addToMyProducts: (product) => {
        const stateMyProducts = get().myProducts;

        let newState = [...stateMyProducts, product];
        set({ myProducts: newState });


    },
    removeFromMyProducts: (product) => {
        const stateMyProducts = get().myProducts;

        const removed = stateMyProducts.filter((stateProduct) => stateProduct.id !== product.id);
        set({ myProducts: removed });
    },
    addToMyBundles: (bundle) => {
        const stateAllBundles = getDeepClone(get().bundles);
        let stateMyBundles = getDeepClone(get().myBundles);
        let stateMyProducts = getDeepClone(get().myProducts);

        let bundleInState = stateAllBundles[bundle.id];

        bundleInState.attributes.products.data.forEach((bundleProduct) => {
            // 合購中的商品已存在於購物車中
            let alreadyAdded = stateMyProducts.find((myP) => myP.id === bundleProduct.id);
            if (alreadyAdded) {
                // 但是該商品不屬於目前的合購
                let bundleID = alreadyAdded.bundleID;
                if (bundleID !== bundle.id) {
                    // 從我的合購中刪除之前的合購
                    let otherBundleIndex;
                    stateMyBundles.forEach((item, id) => {
                        if (item.id === alreadyAdded.bundleID) {
                            otherBundleIndex = id;
                        }
                    });
                    stateMyBundles.splice(otherBundleIndex, 1);

                    stateMyProducts = stateMyProducts.map((state) => {
                        if (state.bundleID === bundleID) {
                            state.bundleID = null;
                        }
                        return state;
                    });

                }

                // 更新 bundleID
                // alreadyAdded.bundleID = bundle.id;

            } else {
                // bundleProduct.bundleID = bundle.id;
                stateMyProducts.push(bundleProduct);
            }
        });

        stateMyBundles.push(bundleInState);

        // set({ myBundles: stateMyBundles });
        set({ myProducts: stateMyProducts });

    },
    removeFromMyBundles: (deleteBundle) => {
        const stateBundles = get().myBundles;
        const removeProduct = get().removeFromMyProducts;
        const includedProducts = deleteBundle.attributes.products.data;
        includedProducts.forEach((product) => removeProduct(product))

        const removed = stateBundles.filter((bundle) => bundle.id !== deleteBundle.id);
        set({ myBundles: removed });

    },
    addToMyCollections: (product) => {
        const newState = getDeepClone(get().myCollections);
        newState[product.id] = product;
        set({ myCollections: newState });
    },
    removeFromMyCollections: (productID) => {
        const newState = getDeepClone(get().myCollections);
        delete newState[productID];

        set({ myCollections: newState });
    },
    clearMyCollections: () => {
        set({ myCollections: {} });
    },
    addToMyFreebies: (product) => {
        const myFreebies = get().myFreebies;
        const stateProducts = get().products;
        let clone = getDeepClone(stateProducts[product.id]);
        clone.attributes.price = 0;

        set({ myFreebies: [...myFreebies, clone] });
    },
    // 若是使用者結帳到一半退出的話就清除所有免費贈品
    clearMyFreebies: () => {
        // console.log('clear freebies');
        set({ myFreebies: [] });
    },
    updateCheckouts: () => {
        // console.log('update checkouts');
        const myProducts = get().myProducts;
        const myBundles = get().myBundles;
        const myFreebies = get().myFreebies;

        let newState = {
            myProducts,
            myBundles,
            myFreebies
        };

        set({ myCheckouts: newState });
    }
}));



export { useBearStore };

const getTotalCarbon = (bundle) => {
    let totalCarbon = 0;
    bundle.attributes.products.data.forEach((item) => {
        totalCarbon += item.attributes.carbon_reduction;
    });
    return totalCarbon;
}
