import styled from 'styled-components';
import { respondTo } from '../../utils/responsive';
import { useState, useEffect } from 'react';
import { useBearStore } from "../../stores/cartStore";


import { Close } from '../../components/Icons';
import ModalPortal from '../../components/ModalPortal';
import BasicButton from '../../components/BasicButton';

const DeleteItemModal = ({ isVisible, onClickAway, onClose, item, type, ...props }) => {
    const [isOpening, setIsOpening] = useState(isVisible);
    const removeFromMyProducts = useBearStore(
        (state) => state.removeFromMyProducts
    );
    const removeFromMyBundles = useBearStore(
        (state) => state.removeFromMyBundles
    );

    const closeModal = () => {
        setIsOpening(false);
        onClose();
    };

    const deleteItem = () => {

        if (type === 'product') removeFromMyProducts(item);
        if (type === 'bundle') removeFromMyBundles(item);

        closeModal();

    }

    useEffect(() => {
        setIsOpening(isVisible);
    }, [isVisible])

    return (
        <ModalPortal isVisible={isOpening} onClickAway={onClickAway}>
            <StyledContainer>
                <button className="close" onClick={closeModal}>
                    <Close />
                </button>
                <h4>確定要刪除此商品嗎？</h4>
                <p>商品刪除後將無法復原，<br />確定要永久刪除？</p>
                <BasicButton theme="white" className="delete-btn" onClick={deleteItem}>
                    刪除
                </BasicButton>
            </StyledContainer>
        </ModalPortal>
    )
};

const StyledContainer = styled.div`
    width: 35vw;
    max-width: 517px;
    height: calc(35vw * 0.42);
    max-height: 220px;
    border-radius: 20px;
    border: 1px solid white;
    background: linear-gradient(40.14deg, rgba(255, 255, 255, 0.675) 0%, rgba(255, 255, 255, 0.9) 100%);
    backdrop-filter: blur(12px);

    position: relative;

    ${respondTo.lg} {
        width: calc(100vw - 40px);
        height: fit-content;
        max-height: fit-content;
        padding: 40px 16px;

    }

    .close {
        position: absolute;
        top: 17px;
        right: 17px;
    }

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h4 {
        font-size: 20px;
        line-height: 32px;
    }

    p {
        font-size: 16px;
        line-height: 32px;
        margin-bottom: 28px;

        br {
            display: none;
        }

        ${respondTo.lg} {
            text-align: center;
           br {
             display: block;
           }

           margin-bottom: 20px;
            
        }
    }

    .delete-btn {
        margin: 0 auto;
    }

`;


export default DeleteItemModal;