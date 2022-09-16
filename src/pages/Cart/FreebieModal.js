import styled from 'styled-components';
import { respondTo } from '../../utils/responsive';
import { useState, useEffect, useMemo } from 'react';
import { useBearStore } from "../../stores/cartStore";
import { useNavigate } from 'react-router-dom';

import ModalPortal from '../../components/ModalPortal';
import BasicButton from '../../components/BasicButton';
import FreebieRow from './FreebieRow';
import { withSubSlug } from '../../utils/withSubSlug';


const FreebieModal = ({ isVisible, onClose, ...props }) => {
    const navigate = useNavigate();

    const allProducts = useBearStore(state => state.products);
    const myProducts = useBearStore(state => state.myProducts);
    const myCollections = useBearStore(state => state.myCollections);
    const addToMyFreebies = useBearStore(state => state.addToMyFreebies);
    const [isOpening, setIsOpening] = useState(isVisible);
    const [currentSelected, setCurrentSelected] = useState(null);

    const freebieItems = useMemo(() => {
        let collectionsIDs = Object.keys(myCollections);
        let result = [];
        const MAX = 3;


        // 先將收藏過但未進入購物車的商品加入
        if (collectionsIDs.length) {
            collectionsIDs.forEach((ID) => {
                let existInCart = myProducts.find((p) => p.id === ID);
                if (!existInCart) {
                    result.push(myCollections[ID]);
                }
            })
        }


        if (result.length >= MAX) return result.slice(0, 3);

        // 若是不夠三個，剩餘的從未進入購物車且未收藏過的商品中挑選
        let itemNotInCarts = [];

        for (let ID in allProducts) {
            if (!myProducts.find((item) => item.id === ID) && !myCollections[ID]) {
                itemNotInCarts.push(allProducts[ID]);
            }
        };

        let index = 0;
        while (result.length < MAX && index <= itemNotInCarts.length - 1) {
            result.push(itemNotInCarts[index]);
            itemNotInCarts.splice(index, 1);
            index++;
        }

        return result;

    }, [myCollections, myProducts, allProducts]);


    const select = (id) => {
        setCurrentSelected(id);
    };

    const addFreebie = () => {

        if (typeof currentSelected === 'number') {
            addToMyFreebies(freebieItems[currentSelected]);
        }
        navigate(withSubSlug('/checkout'));
    };

    useEffect(() => {
        setIsOpening(isVisible);
    }, [isVisible]);


    return (
        <ModalPortal isVisible={isOpening}>
            <StyledContainer>
                <h3>考慮加選這些商品，<br />讓您的生活更美好！</h3>
                <div className="container">
                    {freebieItems.map((item, id) => (
                        <FreebieRow
                            key={id}
                            item={item}
                            isDisabled={id === currentSelected}
                            onAddbtnClick={() => select(id)}
                        />
                    ))}
                </div>
                <BasicButton theme="white" className="next-step" onClick={addFreebie}>
                    完成訂製
                </BasicButton>
            </StyledContainer>
        </ModalPortal>
    )
}

const StyledContainer = styled.div`
    width: 58vw;
    max-width: 844px;

    /* height: fit-content; */
    max-height: calc(100vh - 80px);
    border-radius: 20px;
    overflow: hidden;
    overflow-y: auto;

    padding: 16px;
    padding-top: 60px;
    padding-bottom: 32px;

    position: relative;
    isolation: isolate;

    backdrop-filter: blur(12px);
    background: linear-gradient(40.14deg, rgba(255, 255, 255, 0.675) 0%, rgba(255, 255, 255, 0.9) 100%);
    border: 1px solid white;

    /* &:before {
        content: '';
        position: absolute;
        z-index: -1;
        display: block;
        top: 0; left: 0; right: 0; bottom: 0;
        
        
        
        border-radius: 20px;

    } */

    display: flex;
    flex-direction: column;
    align-items: stretch;

    ${respondTo.lg} {
        width: calc(100vw - 40px);
        max-width: 844px;
        height: calc(100vh - 80px);
        max-height: 600px;
        padding: 8px;
        padding-top: 24px;
        padding-bottom: 16px;
    }

    h3 {
        text-align: center;
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 64px;

        br {
            display: none;
        }

        ${respondTo.lg} {
            font-size: 20px;
            line-height: 32px;
            margin-bottom: 16px;

            br {
                display: block;
            }
        }

    }

    .container {
        overflow-y: scroll;
        padding: 0 32px;

        ${respondTo.lg} {
            padding: 0 8px;

            &::-webkit-scrollbar {
                background: transparent;
                width: 4px;

            }

            &::-webkit-scrollbar-thumb {
                background: white;
                border-radius: 2px;
            }
        }
    }

    .next-step {
        flex-shrink: 0;
        margin: 0px auto;
        margin-top: 32px;

        ${respondTo.lg} {
            margin: 0 auto;
            margin-top: 16px;
        }
    }

`;

export default FreebieModal;