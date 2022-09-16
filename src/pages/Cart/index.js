import styled from "styled-components";
import { useMemo, useState } from "react";
import { useBearStore } from "../../stores/cartStore";
import { respondTo } from '../../utils/responsive';

import { Container } from "../../components/layouts";
import StepsIndicator from "../../components/StepsIndicator";
import OrderInfoBox from "./OrderInfoBox";
import PurchasedProductItem from "../../components/ProductsLayout/PurchasedProductItem";
import DeleteItemModal from "./DeleteItemModal";
import FreebieModal from './FreebieModal';
import EmptyCartPage from './EmptyCartPage';
import { useEffect } from "react";


const Page = () => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openFreebieModal, setOpenFreebieModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);

    const { clearMyFreebies } = useBearStore();
    const myProducts = useBearStore((state) => state.myProducts);
    const myBundles = useBearStore((state) => state.myBundles);

    useEffect(() => {
        clearMyFreebies();
    }, []) // eslint-disable-line

    const soleProducts = useMemo(() => {
        return myProducts.filter((product) => Boolean(product.bundleID) === false);
    }, [myProducts]);

    const totalTickets = useMemo(() => {

        let result = 0;

        if (myBundles.length) {
            myBundles.forEach((bundle) => {
                result += bundle.attributes.price;
            })
        }

        if (soleProducts.length) {
            soleProducts.forEach((product) => {
                result += product.attributes.price;
            })
        }

        return result;
    }, [soleProducts, myBundles]);

    const totalCarbonReduction = useMemo(() => {
        let result = 0;

        if (myBundles.length) {
            myBundles.forEach((bundle) => {
                result += bundle.totalCarbonReduction;
            })
        }

        if (soleProducts.length) {
            soleProducts.forEach((product) => {
                result += product.attributes.carbon_reduction;
            })
        }

        return result;
    }, [soleProducts, myBundles]);

    const deleteProduct = (product) => {
        setDeleteItem({ type: "product", item: product });
        setOpenDeleteModal(true);
    };

    const deleteBundle = (bundle) => {
        setDeleteItem({ type: "bundle", item: bundle });
        setOpenDeleteModal(true);
    };

    if (myProducts.length === 0 && myBundles.length === 0) {
        return <EmptyCartPage />
    }

    return (
        <StyledContainer>
            <DeleteItemModal
                isVisible={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                onClickAway={() => setOpenDeleteModal(false)}
                item={deleteItem?.item}
                type={deleteItem?.type}
            />
            <FreebieModal
                isVisible={openFreebieModal}
                onClose={() => setOpenFreebieModal(false)}
                onClickAway={() => setOpenFreebieModal(false)}
            />
            <StyledInnerContainer>
                <StepsIndicator
                    steps={["選物清單", "聯絡資料"]}
                    nowStepIndex={0}
                />
                <div className="content">
                    <StyledProductsContainer>
                        {myProducts.length ? (
                            <>
                                {soleProducts.map((product, id) => (
                                    <PurchasedProductItem
                                        key={id}
                                        type="product"
                                        item={product}
                                        onDeleteClick={() =>
                                            deleteProduct(product)
                                        }
                                    />
                                ))}
                                {myBundles.map((bundle, id) => (
                                    <PurchasedProductItem
                                        key={id}
                                        type="bundle"
                                        item={bundle}
                                        onDeleteClick={() =>
                                            deleteBundle(bundle)
                                        }
                                    />
                                ))}
                            </>
                        ) : (
                            <div>Empty</div>
                        )}
                    </StyledProductsContainer>
                    <OrderInfoBox
                        className="info-box"
                        total={totalTickets}
                        carbonReduction={totalCarbonReduction}
                        openSuggestionsModal={() => setOpenFreebieModal(true)}
                    />
                </div>
            </StyledInnerContainer>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    background-color: var(--white);
    padding: 40px 0 160px 0;

    ${ respondTo.sm } {
        padding-top: 24px;
    }
`;

const StyledInnerContainer = styled(Container)`

    ${respondTo.lg} {
        width: 100vw;
    }

    .content {
        margin-top: 60px;
        display: flex;
        gap: 28px;

        ${respondTo.lg} {
            flex-direction: column;
            margin-top: 40px;
        }
    }

    .info-box {
        width: 408px;
        flex-shrink: 0;

        ${respondTo.lg} {
            width: 100%;
        }
    }
`;

const RadiusContainer = styled.div`
    border-radius: 5px;
    background-color: white;
`;

const StyledProductsContainer = styled(RadiusContainer)`
    padding: 26px 32px;
    width: 100%;

    ${respondTo.lg} {
        padding: 22px 20px 16px 20px;
    }
`;

export default Page;
