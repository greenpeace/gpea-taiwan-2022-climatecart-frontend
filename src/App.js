import { useEffect, useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import shallow from 'zustand/shallow';

import ProtectedRoute from './components/ProtectedRoute';
import Homepage from './pages/Homepage';
import Products from './pages/Products';
import Product from './pages/Product';
import Topics from './pages/Topics';
import ContactUs from './pages/ContactUs';
import Privacy from './pages/Privacy';
import Checkout from './pages/Checkout';
import OrderCompleted from './pages/OrderCompleted';
import Donate from './pages/Donate';
import Cart from './pages/Cart';

import GlobalStyle from './components/GlobalStyle';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Tutorials from './components/Tutorials';
import ScrollToTopHelper from './components/ScrollToTopHelper';
import WebsignHelper from './components/WebsignHelper';
import MouseFX from './components/MouseFX';
import UTMHelper from './components/UTMHelper';

import { useBearStore } from './stores/cartStore';
import apolloClient from './utils/apolloClient';
import { withSubSlug } from './utils/withSubSlug';

const App = () => {
    const {
        products,
        topics,
        bundles,
        myBundles,
        myProducts,
        myFreebies,
        myCheckouts,
        fetchAllProducts,
        fetchAllTopics,
        fetchAllBundles
    } = useBearStore(state => state, shallow);

    useEffect(() => {
        async function fetchAllData() {
            await fetchAllBundles();
            await fetchAllProducts();
            await fetchAllTopics();
        }

        fetchAllData();
    }, []); // eslint-disable-line

    const dataLoaded = useMemo(() =>
        products && topics && bundles
        , [products, topics, bundles]);

    const isEmptyCart = useMemo(() =>
        (myProducts.length === 0 && myBundles.length === 0 && myFreebies.length === 0)
        , [myProducts, myBundles, myFreebies]);

    const isEmptyCheckout = useMemo(() =>
        myCheckouts === null
        , [myCheckouts]);

    return (
        <ApolloProvider client={apolloClient}>
            <GlobalStyle />
            <div id="modal" />
            <BrowserRouter>
                <NavBar />
                <ScrollToTopHelper />
                <Routes>
                    <Route path={withSubSlug('/')} exact element={<Homepage />} />
                    <Route path={withSubSlug('/contact-us')} exact element={<ContactUs />} />
                    <Route path={withSubSlug('/privacy')} exact element={<Privacy />} />
                    <Route path={withSubSlug('/donate')} exact element={<Donate />} />

                    <Route path={withSubSlug('/products')} exact element={
                        <ProtectedRoute condition={dataLoaded} Element={Products} />
                    } />
                    <Route path={withSubSlug('/product/:productID')} element={
                        <ProtectedRoute condition={dataLoaded} Element={Product} />
                    } />
                    <Route path={withSubSlug('/topics/:topicID')} element={
                        <ProtectedRoute condition={dataLoaded} Element={Topics} />
                    } />
                    <Route path={withSubSlug('/cart')} exact element={
                        <ProtectedRoute condition={dataLoaded} Element={Cart} />
                    } />
                    <Route path={withSubSlug('/checkout')} exact element={
                        <ProtectedRoute condition={!isEmptyCart} Element={Checkout} redirectTo='/' />
                    } />
                    <Route path={withSubSlug('/order-completed')} exact element={
                        <ProtectedRoute condition={!isEmptyCheckout} Element={OrderCompleted} redirectTo='/' />
                    } />
                    
                </Routes>
                <Footer />
                <Tutorials />
                <WebsignHelper />
                <MouseFX />
                <UTMHelper />
            </BrowserRouter>
        </ApolloProvider>
    );
};

export default App;
