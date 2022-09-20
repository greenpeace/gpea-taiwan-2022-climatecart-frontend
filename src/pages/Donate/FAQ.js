import { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { respondTo } from '../../utils/responsive';

import Icons from '../../components/Icons';
import Title from '../../components/Title';

const FAQ = () => {
    return (
        <StyledFAQ>
            <Title>FAQ</Title>
            <ul>
                <FAQIitem
                    index={0}
                    q='捐款可享扣稅優惠嗎？'
                    a='綠色和平是「認可慈善捐款」機構，將對每月定期定額捐款人與一次性捐款人，於每年報稅月前寄發上一年度全年的捐款總額證明，收據可作為抵扣所得稅額使用，亦明列個人全年度捐款紀錄。'
                />
                <FAQIitem
                    index={1}
                    q='何時會收到捐款收據呢？'
                    a={"為了讓捐款者享受更便利、更有效率的服務，也為改善您收據保存、寄發遺失等問題，綠色和平將對每月定期定額捐款人與一次性捐款人，於每年報稅月前寄發上一年度全年的捐款總額證明，收據可作為抵扣稅額使用，亦明列個人全年度捐款紀錄。\n\n而為響應近年網路報稅的捐款人需求，我們會在隔年二月前將捐款明細上傳至國稅局系統。因配合國稅局規定，捐款資訊上傳需有捐款者個人身分證字號，若您有相同報稅需求，請致電會員專線(02)2361-2025，或來信至donor.services.tw@greenpeace.org提供您的身分證字號，以利我們順利上傳您的資料。"}
                />
                <FAQIitem
                    index={2}
                    q='我想了解使用信用卡的捐款方式'
                    a={'信用卡捐款是綠色和平主要的捐款方式，它能提供安全、快速且準確的捐款環境，可以在短時間內得知每位熱心捐款人的交易狀態，也節省了大量的行政作業成本。\n\n綠色和平線上捐款\n\n為提供捐款者更方便、更安心的線上捐款環境，綠色和平採用高科技SSL加密技術的線上刷卡機制，可接受國內外各大銀行所發行之VISA及MASTER信用卡。\n\n提醒您：信用卡捐款會即時進行。每月捐款會員的往後捐款，約於每月15日*請款；若未能成功請款，有可能是系統或信用卡等出現問題，因此系統將自動重新嘗試，如有需要，會員服務部將會與您聯繫確認。\n\n*因組織於2020年8月至2021年2月進行內部系統更新，在這段時間登記的每月捐款會員，往後的捐款將按照登記捐款日，固定於每月相同日期請款。（如當月沒有該固定日期，系統將會於該月的最後一天請款，例如：若固定請款日期為每月31日，於2月將會於該月的最後一天進行請款。）日後若有銀行或內部系統更新影響請款安排，應以網頁即時更新為準。如有查詢，歡迎致電會員服務專線(02) 2361-2025，或來信至donor.services.tw@greenpeace.org。'}
                />
                <FAQIitem
                    index={3}
                    q='我能更改捐款金額、信用卡資料或會員通訊資料嗎？'
                    a='任何捐款相關異動，您都可以透過會員專線(02)2361-2025，來信至donor.services.tw@greenpeace.org，或傳真至(02)2361-2033，我們有專人為您核對捐款相關基本資料，為您處理資料變更。'
                />
                <FAQIitem
                    index={4}
                    q='在這個網站上選物有什麼用？'
                    a='對於候選人而言，民意的支持尤為重要，過去臺灣選舉針對氣候政見討論較少，綠色和平綜整14項有助減碳的氣候政見，並結合民眾生活需求。您可以從熟悉的網站選物形式，認識不同氣候政見、也能表達支持。'
                />
                <FAQIitem
                    index={5}
                    q='最多人選的政見可以做什麼？'
                    a='「政見選物所」精選的氣候政見，顯示減緩氣候變遷不代表對生活造成不便；越多人支持的政見，將可為氣候議題帶來正面影響，讓候選人更專注在民眾有感的政見，繼而承諾與兌現。'
                />
                <FAQIitem
                    index={6}
                    q='這些政見是如何被選出來的？'
                    a='綠色和平根據IEA發布之淨零路徑建議，以及C40、ICLEI等國際城市聯盟彙整經典案例，結合民眾生活需求，摘錄14項氣候與淨零相關政策，包含政策要點與國際案例說明及減碳效力。每個城市有不同的條件與需求，候選人及其團隊可依據各縣市需求調整、發展。'
                />
                <FAQIitem
                    index={7}
                    q='減碳力是怎麼計算的？'
                    a='減碳力是以新政策能減少之碳排放占比，乘上該政策所屬能源部門的年碳排放量，再換算為相當於幾棵臺灣樟樹（最常見的行道樹）的吸碳量。如「公有屋頂供民眾投資公民電廠」，是以公有屋頂光電能取代傳統火力發電占比，乘上能源部門年碳排放量，約為257萬公噸CO2e(二氧化碳當量)，相當於467萬棵臺灣樟樹吸碳量。如欲了解各項政見減碳力計算，敬請聯繫綠色和平氣候與能源專案小組。'
                />
            </ul>
        </StyledFAQ>
    )
}

const FAQIitem = ({ q, a, index }) => {

    const ref = useRef();

    function handleClick(e) {
        const selfDom = e.target.parentElement;
        selfDom.classList.toggle('-active', !selfDom.classList.contains('-active'));

        [...document.querySelectorAll('.faq-item')].forEach(item => {
            if (item === selfDom) return;
            item.classList.toggle('-active', false);
        });
    }

    return (
        <StyledFAQIitem className='faq-item' ref={ref} >
            <div className="q" onClick={handleClick}>
                <b>Q{index + 1}：</b>
                <span>{q}</span>
                <Icons.CollapseArrow />
            </div>
            <div className="a">
                {a}
            </div>
        </StyledFAQIitem>
    )
}

const StyledFAQ = styled.div`
    margin-top: 80px;
`

const enterAnim = keyframes`
    from {
        opacity: 0;
        transform: translateY(-16px);
    }
`

const StyledFAQIitem = styled.li`

    .q {
        cursor: pointer;
        padding: 32px 0;
        border-bottom: 1px solid var(--grey);

        font-size: 18px;
        font-weight: 500;

        display: flex;
        align-items: center;

        >* {
            pointer-events: none;
        }

        ${respondTo.lg} {
            padding: 20px 0;
            font-size: 16px;
        }

        b {
            display: inline-block;
            min-width: 48px;
            font-size: 24px;
            font-weight: 700;
            color: var(--primary);

            ${respondTo.lg} {
                font-size: 18px;
                line-height: 24px;
            }
        }

        span {
            margin-right: 8px;
            line-height: 1.6em;
        }

        svg {
            flex-shrink: 0;
            margin-left: auto;
            margin-right: 12px;
            transition: transform .3s ease-out;
        }
    }

    .a {
        padding: 20px 0;
        padding-left: 52px;
        font-size: 16px;
        line-height: 1.6em;
        white-space: pre-line;

        animation: ${enterAnim} .3s ease-out;

        ${respondTo.lg} {
            padding-left: 40px;
        }
    }

    &.-active {
        border-bottom: 1px solid var(--grey);

        .q svg {
            transform: rotateX(180deg);
        }
    }

    &:not(&.-active) {
        .a {
            display: none;
        }
    }
`
export default FAQ