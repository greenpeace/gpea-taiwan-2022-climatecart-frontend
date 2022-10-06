import styled from 'styled-components';

import VolunteerBanner from './VolunteerBanner';
import Quote from './Quote';
import { imgUrl } from '../../utils/imgUrlWrapper';
import { respondTo } from '../../utils/responsive';

const SHARE_QUOTE = {
    avatar: imgUrl('/img/donation/share.jpeg'),
    content: '「氣候變遷影響著我們的生活，而你手中的選票是扭轉未來的關鍵！和我們一同要求地方候選人提出氣候政見！」',
    author: {
        title: '綠色和平專案主任',
        name: '張皪心'
    }
}

const BriefContent = () => {
    return (
        <StyledBriefContent>

            <VolunteerBanner image='/img/donation/pin.jpg' alt='Vote for Earth 限定徽章'>
                現在單筆捐款 300 元（含以上），即可獲得綠色和平 Vote for Earth 限定徽章一枚！
            </VolunteerBanner>

            <h2>現在，你可以成為政見監督者</h2>
            <p>
                在這個網站呈現的每一項政見，都是為了你我更好的未來而準備。<br />
                選舉期間候選人們五光十色的宣傳、口號，是否真的能夠兌現承諾？無論最後是誰當選，都將影響我們四年甚至更長遠的生活。<br /><br />
                綠色和平 100% <b>不接受政府、企業資助，以維持公正獨立</b>。邀請你捐款加入我們，一起監督政府、審視候選人，為臺灣的未來做把關，用公民的力量推動正向改變，邁向你最理想的美好未來。
            </p>
            <img className="img" src={imgUrl('/img/donation/content-1.svg')} alt='現在，你可以成為政見監督者' />

            <VolunteerBanner image='/img/donation/volunteer.jpg' alt='限定版《Vote for Earth》紀念徽章'>
                現在捐款 <b>$300 </b> 以上(含)支持綠色和平環境專案，我們將贈送 <b>限定版《Vote for Earth》紀念徽章</b> 予以感謝。
                (寄送日期將於捐款後於電子郵件寄送領取通知)
            </VolunteerBanner>

            <h2>不要小看你的力量！</h2>
            <p>
                過去，你我一起成功推動臺灣政府宣布「2050 淨零碳排」目標；召集超過60多家企業響應綠能轉型承諾 2025 年轉用 10% 再生能源，並獲官方認證為「環境永續指標」。<br /><br />
                在全球，推動中國、日本、韓國相繼承諾碳中和目標；更成功推動東亞設定停止生產燃油車時程；參與氣候訴訟促使 SHELL 殼牌石油公司被荷蘭法院判定須於 2030 年減碳 45%。<br /><br />
                現在，<b>當你使用好政券支持特定政見，這樣的支持會匯聚成為具體的力量，讓未來綠色和平在推動環境專案時有更大的助力；也讓政府與各縣市執政者無法輕忽。</b>
            </p>
            <img className="img" src={imgUrl('/img/donation/content-2.svg')} alt='不要小看你的力量！' />

            <h2>具體行動拯救氣候</h2>
            <p>
                在 2030 年前，綠色和平將做出具體行動拯救氣候：<br/><br/>
                <b>全面減碳計畫</b><br/>
                要求地方政府提供具體淨零轉型方針，包括中央及地方法規、落實轉型的關鍵制度，並因應歐盟「碳邊境稅」制定碳定價管制。<br/><br/>
                <b>編列氣候基金</b><br/>
                因應氣候變遷的所帶來的災害衝擊，要求政府編列氣候基金，協助受氣候災難衝擊的家庭與產業獲得公平的補償與振興資源。<br/><br/>
                <b>設立地方自治條例</b><br/>
                設立氣候法相關的修訂及地方自治條例，持續進行倡議及施壓，特別是要求在全球舉足輕重的臺灣製造業減少碳排放，讓臺灣在淨零轉型上開闢出可供世界效仿的制度。
            </p>
            <img className="img" src={imgUrl('/img/donation/content-3.svg')} alt='具體行動拯救氣候' />

            <Quote {...SHARE_QUOTE} />

        </StyledBriefContent>
    )
}

const StyledBriefContent = styled.article`
    position: relative;
    margin-top: 40px;

    h2 {
        &:first-child { margin-top: 0; }
        margin: 0 auto;
        margin-top: 64px;

        width: fit-content;
        padding-bottom: 8px;
        border-bottom: 2px solid var(--green-300);
        
        font-size: 24px;
        font-weight: 700;

        ${ respondTo.md } {
            font-size: 20px;
        }
    }

    p {
        margin-top: 20px;
        font-size: 16px;
        line-height: 1.8em;
    }

    .img {
        margin: 0 auto;
        margin-top: 28px;
        display: block;
        max-width: 100%;

        width: 517px;
        border-radius: 10px;
    }

    ${ respondTo.md } {
        margin-top: 24px;
    }

    .badge {
        border-top: 2px solid var(--green-300);
        border-bottom: 2px solid var(--green-300);
        padding: 16px 0;

        font-size: 18px;
        font-weight: 700;
        letter-spacing: 0.05em;
        line-height: 1.5;

        color: var(--primary);

        display: flex;
        align-items: center;
        justify-content: space-between;

        img {
            margin-left: 40px;
            width: 120px;
        }

        ${ respondTo.sm } {
            font-size: 16px;

            img {
                margin-left: 16px;
                width: 80px;
            }
        }
    }
`

export default BriefContent