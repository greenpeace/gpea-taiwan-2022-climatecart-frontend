import styled from 'styled-components';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useBearStore } from '../../stores/cartStore';
import { isMobile, respondTo } from '../../utils/responsive';
import { numberWithCommas } from '../../utils/numberWithCommas';

import BottomBannerBlock from '../../components/BottomBannerBlock';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import Icons from '../../components/Icons';
import { Container } from '../../components/layouts';
import PurchasedProducts from './PurchasedProducts';
import { useAppStore } from '../../stores/appStore';
import { openLinkWithNewTab } from '../../utils/useLinkTo';
import ResultImageCanvas from '../../components/ResultImage/ResultImageCanvas';

const OrderCompleted = () => {
    const canvasRef = useRef();

    const { myProducts, myBundles, myFreebies } = useBearStore(state => state.myCheckouts);
    const { clearMyFreebies, clearMyCollections, removeFromMyProducts, removeFromMyBundles, products } = useBearStore();
    const { resultImageData } = useAppStore();

    const [ resultImageDataUrl, setResultImageDataUrl ] = useState(null);
    const [ downloaded, setDownloaded ] = useState(true);

    const productIds = useMemo(() => {
        return [ ...myProducts.map(product => ~~product.id), ...myFreebies.map(product => ~~product.id)] 
    }, [ myProducts, myFreebies ]);

    useEffect(() => {
        clearAllState();
    }, []); // eslint-disable-line

    const clearAllState = () => {
        myProducts.forEach((product) => {
            removeFromMyProducts(product);
        });

        if (myBundles.length) {
            myBundles.forEach((bundle) => {
                removeFromMyBundles(bundle);
            });
        }

        clearMyFreebies();
        clearMyCollections();
    };

    function handleDownloadClick() {

        // var link = document.createElement("a");
        // link.download = '綠色和平政見選物所';
        // link.href = imageDataURL;
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);

        var image = new Image();
        image.src = resultImageDataUrl;

        var w = window.open("");
        w.document.write(image.outerHTML);
        
        setDownloaded(true);
    }

    function handleIgClick() {
        openLinkWithNewTab(
            isMobile() ? 
            'instagram://story-camera': 
            'https://www.instagram.com/'
        );
    }

    function handleFbClick() {
        const content = `我已經訂製喜歡的政見了！你也來挑選喜歡的好政見，一起為地球投票吧！\n👉 https://act.gp/3BJo02b`;
        let link = 'https://www.facebook.com/share.php?u=' + encodeURIComponent('https://act.gp/3BJo02b') + (content ? `&quote=${encodeURIComponent(content)}` : '');
        openLinkWithNewTab(link);
        // openLinkWithNewTab(
        //     isMobile() ? 
        //     'fb://facewebmodal': 
        //     'https://www.facebook.com/'
        // );
    }

    function handleLineClick() {
        const content = `我已經訂製喜歡的政見了！你也來挑選喜歡的好政見，一起為地球投票吧！\n👉 https://act.gp/3BJo02b`;
        let link = `https://line.me/R/msg/text/?${encodeURIComponent(content)}`;
        openLinkWithNewTab(link);
    }

    function handleCanvasLoaded() {
        setTimeout(() => {
            const imageDataURL = canvasRef.current?.querySelector('canvas')?.toDataURL();
            setResultImageDataUrl(imageDataURL)
        }, 1000);

    }

    const soleProducts = useMemo(() => 
        myProducts.filter((product) => Boolean(product.bundleID) === false), 
        [myProducts]
    );

    const totalCarbon = useMemo(() => {
        let result = 0;


        if (soleProducts.length) {
            soleProducts.forEach((product) => result += product.attributes.carbon_reduction);
        }

        if (myBundles.length) {
            myBundles.forEach((bundle) => result += bundle.totalCarbonReduction);
        }

        if (myFreebies.length) {
            myFreebies.forEach((freebie) => result += freebie.attributes.carbon_reduction)

        }
        return result;
    }, [soleProducts, myBundles, myFreebies]);


    return (
        <StyledOrderCompleted>
            <StyledContainer>
                <Wording>
                    <Icons.OrderCompleted />
                    <h2>您訂製的理想生活正在路上...</h2>
                    <p>
                        感謝您造訪綠色和平的政見選物所<br/>
                        您所選擇的政見，有助於實踐低碳永續的理想生活：
                    </p>
                </Wording>
                <StyledPurchasedProducts
                    myProducts={myProducts}
                    myBundles={myBundles}
                    myFreebies={myFreebies}
                />
                <Numbers>
                    <div>
                        <h3>達成淨零排放，臺灣每年需要</h3>
                        <div className="number">
                            <b>{numberWithCommas(48200)}</b> 萬棵樟樹
                        </div>
                    </div>
                    <div>
                        <h3>您的選擇相當於為臺灣種下了</h3>
                        <div className="number">
                            <b>{numberWithCommas(totalCarbon)}</b> 萬棵樟樹
                        </div>
                    </div>
                </Numbers>

                <ResultImageContainer>
                    <h3>分享您的理想生活藍圖</h3>
                    <p>
                        越多人支持好政見，理想生活越快兌現。<br/>
                        和親友分享您支持的綠色政見，一起為地球投票！
                    </p>
                    <StyledResultImage ref={canvasRef}>
                        { resultImageData &&
                            <ResultImageCanvas 
                                className='canvas'
                                products={products}
                                productIds={productIds} 
                                bgId={resultImageData.bgId + 1} bgColorId={resultImageData.bgColorId + 1} 
                                defaultLayout={resultImageData.layout}
                                pixelRatio={1.2}
                                canvas={true}
                                onLoaded={handleCanvasLoaded}
                            />
                        }
                        { resultImageDataUrl && 
                            <img src={resultImageDataUrl} alt='' />
                        }
                        <span className="hint">長按儲存圖片</span>
                    </StyledResultImage>

                    <ShareToSocial>
                        { !downloaded &&
                            <div className="buttons">
                                <ButtonWithIcon 
                                    theme='white' Icon={Icons.Download} iconPos='right' 
                                    onClick={handleDownloadClick}
                                >下載圖片</ButtonWithIcon>
                            </div>
                        }
                        { downloaded && <>
                            <h4>Share to Social Media</h4>
                            <div className="buttons">
                                <ButtonWithIcon onClick={handleIgClick} theme='white' Icon={Icons.Instagram} iconPos='left' >分享到 IG 限時動態</ButtonWithIcon>
                                <ButtonWithIcon onClick={handleFbClick} theme='white' Icon={Icons.Facebook} iconPos='left' >分享到 FB 動態牆</ButtonWithIcon>
                                { isMobile() && <ButtonWithIcon onClick={handleLineClick} theme='white' Icon={Icons.Line} iconPos='left' >分享給 LINE 好友</ButtonWithIcon> }
                                <ButtonWithIcon theme='white' Icon={Icons.Download} onClick={handleDownloadClick} iconPos='left'>下載分享圖片</ButtonWithIcon>
                            </div>
                        </>}
                    </ShareToSocial>

                </ResultImageContainer>

            </StyledContainer>

            <BottomBannerBlock title='你滿意這次的購物經驗嗎？'
                buttonLabel='捐款支持'
            >
                你已經悄悄加入全球超過50國家及地區的行動，用選舉政見督促候選人為我們長遠的未來負責，期待你最後能為氣候投下你最滿意的一票！
            </BottomBannerBlock>

        </StyledOrderCompleted>
    )
}

const StyledOrderCompleted = styled.div`
    background-color: var(--white);
`

const StyledContainer = styled(Container)`
    padding-top: 60px;
    padding-bottom: 120px;
    width: min(844px, 100vw - 48px);
`

const Wording = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        margin-top: 24px;
        font-size: 24px;
        font-weight: 700;

        ${respondTo.lg} {
            font-size: 18px;
            line-height: 26px;
        }
    }

    p {
        margin-top: 16px;
        font-size: 16px;
        text-align: center;
        line-height: 1.6em;
    }
`

const StyledPurchasedProducts = styled(PurchasedProducts)`
    margin-top: 40px;

    & {
        border-radius: 5px;
    }

`

const Numbers = styled.div`
    margin-top: 20px;
    padding: 28px 0;
    background-color: white;
    border-radius: 10px;

    display: flex;

    ${respondTo.lg} {
        flex-direction: column;
        padding: 28px 20px;
    }

    >div {
        flex: 1;

        border-left: 1px solid var(--green-300);
        :first-child { border-left: none; };

        ${respondTo.lg} {
            border-bottom: 1px solid var(--green-300);
            border-left: none;
            
            padding-bottom: 28px;

            &:last-of-type {
                border-bottom: none;
                padding-top: 28px;
                padding-bottom: 0;
            }
        }

        h3 {
            font-size: 20px;
            font-weight: 500;
            text-align: center;

            ${respondTo.lg} {
                font-size: 18px;
            }
        }

        .number {
            margin-top: 20px;
            font-size: 16px;
            font-weight: 500;
            text-align: center;
        }

        .number b {
            font-size: 46px;
            color: var(--primary);
            margin-right: 8px;

            ${respondTo.lg} {
                font-size: 32px;
            }
        }
    }
`

const ResultImageContainer = styled.div`
    margin-top: 40px;
    padding: 60px 0;
    background-color: white;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;

    ${respondTo.lg} {
        margin-top: 20px;
        padding: 40px 16px 60px 16px;
    }

    h3 {
        font-size: 20px;
        font-weight: 700;

        ${respondTo.lg} {
            font-size: 18px;
        }
    }

    p {
        margin-top: 12px;
        font-size: 16px;
        line-height: 1.6em;
        text-align: center;

        ${respondTo.lg} {
            text-align: center;
            line-height: 28px;
        }
    }
`

const StyledResultImage = styled.div`
    margin-top: 28px;
    position: relative;
    width: min(375px, 100%);

    >div { margin: 0 auto; }

    .canvas {
        position: absolute;
        visibility: hidden;
    }

    img {
        width: 100%;
    }

    .hint {
        display: inline-block;
        margin-top: 8px;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.05em;

        &::before {
            content: '';
            position: relative;
            margin-left: 8px;
            margin-right: 8px;
            top: -1px;

            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50em;
            background-color: var(--green-300);
        }
        /* color: var(--grey-100); */
    }

    ${ respondTo.sm } {
        width: min(280px, 100%);
    }
`

const ShareToSocial = styled.div`
    margin-top: 32px;

    
    h4 {
        font-size: 14px;
        font-weight: 500;
        text-align: center;
    }

    .buttons {
        margin-top: 20px;
        display: flex;
        justify-content: center;

        ${respondTo.lg} {
            flex-direction: column;
            gap: 20px;
            margin-top: 16px;
        }
        
        >* {
            margin: 0 12px;
        }
    }
`

export default OrderCompleted