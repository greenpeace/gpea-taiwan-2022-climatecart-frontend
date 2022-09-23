import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { useAppStore } from '../../stores/appStore';
import { useBearStore } from '../../stores/cartStore';
import { imgUrl } from '../../utils/imgUrlWrapper';
import { respondTo } from '../../utils/responsive';
import Icons from '../Icons';
import ModalPortal from '../ModalPortal';
import ResultImageCanvas from './ResultImageCanvas'

const ResultImage = forwardRef((props, ref) => {

    const { myProducts, myFreebies, products } = useBearStore();
    const { setRsultImageData } = useAppStore();
    const [ editing, setEditing ] = useState(false);
    const [ showHint, setShowHint ] = useState(false);
    const [ hintHaveShown, setHintHaveShown ] = useState(false);
    // const [ movable, setMovable ] = useState(true);
    const movable = true;

    useEffect(() => {
        document.body.style.overflow = editing ? 'hidden': '';
        document.body.style.touchAction = editing ? 'none': 'auto';
    }, [editing])

    const productIds = useMemo(() => {
        return [ ...myProducts.map(product => ~~product.id), ...myFreebies.map(product => ~~product.id)] 
    }, [ myProducts, myFreebies ]);
    
    const hintTimerRef = useRef();
    const [ bgId, setBgId ] = useState(1);
    const [ bgColorId, setBgColorId ] = useState(1);
    const [ layout, setLayout ] = useState(null);

    useEffect(() => {
        setRsultImageData({
            bgId, bgColorId, layout
        })
    }, [bgId, bgColorId, layout]) // eslint-disable-line

    function handleBgChangeButtonClick() {
        setBgId(prev => (prev + 1) % 2);
    }

    function handleColorChangeButtonClick() {
        setBgColorId(prev => (prev + 1) % 2);
    }

    // function handleMovableButtonClick() {
    //     setMovable(prev => !prev);
    // }

    function handleEditingClick() {
        setEditing(true);
        if (!hintHaveShown) {
            hintTimerRef.current = setTimeout(() => {
                setShowHint(true);
            }, 2000);
        }
    }

    function handleModalClickAway() {
        setEditing(false);
        setShowHint(false);
        // setHintHaveShown(false);
        // setMovable(false);
    }

    function handleHintClick() {
        clearTimeout(hintTimerRef.current);
        setShowHint(false);
        setHintHaveShown(true);
    }

    return (
        <>
            <PreviewContainer ref={ref}>
                <ResultImageCanvas 
                    className='canvas'
                    products={products}
                    productIds={productIds} 
                    bgId={bgId + 1} bgColorId={bgColorId + 1} 
                    defaultLayout={layout} onLayoutChanged={setLayout}    
                    enabled={!editing}
                />
                <EditButton onClick={handleEditingClick}>
                    <span><Icons.Edit /></span>
                </EditButton>
            </PreviewContainer>
            { editing &&
                <ModalPortal isVisible onClickAway={handleModalClickAway}>
                    <ModalPanel movable={movable}>
                        <h2>分享您的理想生活藍圖</h2>
                        <p>點擊下方客製化選項，創作專屬社群分享圖，為地球發聲！</p>
                        <div className="canvas-container" onPointerDown={handleHintClick}>
                            <ResultImageCanvas 
                                className='canvas'
                                products={products}
                                productIds={productIds} 
                                bgId={bgId + 1} bgColorId={bgColorId + 1} 
                                defaultLayout={layout} onLayoutChanged={setLayout}    
                                editable={movable}
                            />
                            { showHint &&
                                <img src={imgUrl('/img/result-image/edit-hint.png')} alt='可以自由拖曳每一項政見'/>
                            }
                        </div>
                        <EditorButtons>
                            {/* <button onClick={handleMovableButtonClick} className={movable ? '-active': ''}><Icons.Move /></button> */}
                            <button onClick={handleBgChangeButtonClick}><Icons.Layout /></button>
                            <button onClick={handleColorChangeButtonClick}><Icons.Sticker /></button>
                        </EditorButtons>
                        <ComfirmButton onClick={handleModalClickAway}>修改完成</ComfirmButton>
                        <CloseButton onClick={handleModalClickAway}>
                            <Icons.Close />
                        </CloseButton>
                    </ModalPanel>
                </ModalPortal>
            }
        </>
    )
})

const PreviewContainer = styled.div`
    position: relative;

    .canvas {
        min-height: 600px;

        ${ respondTo.sm } {
            min-height: 0;
        }
    }
`

const waveAnim = keyframes`
    0% {
        opacity: 0;
        transform: scale(1);
    }
    50% {
        opacity: 0.8;
        transform: scale(1.3);
    }
    100% {
        opacity: 0;
        transform: scale(1.7);
    }
`

const EditButton = styled.button`
    margin: 0;
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 1;

    >span {   
        display: flex;
        justify-content: center;
        align-items: center;
        
        width: 48px;
        height: 48px;
        border-radius: 50em;
        color: white;
        background-color: var(--green-200);
        backdrop-filter: blur(12px);
    }

    &::before, &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0px;
        z-index: -1;

        display: block;
        width: 48px;
        height: 48px;
        border-radius: 50em;
        opacity: 0.3;
        background-color: white;

        pointer-events: none;
    }

    &::before {
        animation: ${waveAnim} 2s linear infinite .7s;
    }

    &::after {
        animation: ${waveAnim} 2s linear infinite;
    }
`

const modalEnter = keyframes`
    from {
        transform: translateY(-16px);
        opacity: 0;
    }
`

const hintEnter = keyframes`
    from {
        transform: scale(0.8);
        opacity: 0;
    }
`

const ModalPanel = styled.div`
    padding: 60px 16px;
    width: min(844px, 100vw - 32px);
    max-height: calc(var(--vh) * 100 - 80px);
    /* overflow: scroll; */

    background: linear-gradient(40.14deg, rgba(255, 255, 255, 0.675) 0%, rgba(255, 255, 255, 0.9) 100%);
    backdrop-filter: blur(12px);
    border-radius: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;

    animation: ${modalEnter} .3s ease-out;

    h2 {
        font-size: 20px;
    }

    p {
        margin-top: 12px;
        font-size: 16px;
        line-height: 1.4em;
        text-align: center;
    }

    .canvas-container {
        margin-top: 32px;
        position: relative;

        outline: 0px solid var(--primary);
        transition: outline-width .15s;
    }

    .canvas-container >img {
        position: absolute;
        top: calc(50% - 90px);
        left: calc(50% - 90px);
        width: 180px;
        height: 180px;
        /* backdrop-filter: blur(4px); */
        border-radius: 50em;
        user-select: none;
        animation: ${hintEnter} .3s cubic-bezier(.17,.67,.24,1.5);
    }

    .canvas {
        aspect-ratio: 375 / 667;
    }

    ${ respondTo.sm } {
        max-height: calc(var(--vh) * 100 - 32px);
        padding: 24px 16px;
        padding-bottom: 16px;

        h2 {
            display: none;
        }

        .canvas-container {
            margin-top: 24px;
        }
    }

    ${({ movable }) => movable && css`
        overflow: hidden;
        touch-action: none;

        .canvas {
            /* outline-width: 4px; */
        }
    `}
`

const EditorButtons = styled.div`
    display: flex;
    margin-top: 40px;

    >button {
        margin: 0 16px;
        display: flex;
        justify-content: center;
        align-items: center;

        width: 60px;
        height: 60px;
        border-radius: 50em;
        color: var(--primary);
        background-color: white;

        transition: color .2s, background-color .2s;

        &.-active, &:hover {
            background-color: var(--primary);
            color: white;
        }
    }

    ${ respondTo.sm } {
        margin-top: 20px;

        >button {
            width: 48px;
            height: 48px;
            margin: 0 12px;

            &:not(.-active):hover {
                color: var(--primary);
                background-color: white;
            }
        }

        
    }
`

const ComfirmButton = styled.button`
    margin-top: 16px;
    flex-shrink: 0;

    width: 200px;
    height: 60px;

    background-color: rgba(255, 255, 255, 0.6);

    border: 1.5px solid #FFFFFF;
    border-radius: 100px;

    font-weight: 500;
    font-size: 18px;
    text-align: center;

    display: block;
`

const CloseButton = styled.button`
    padding: 16px;
    position: absolute;
    top: 0;
    right: 0;
`

export default ResultImage