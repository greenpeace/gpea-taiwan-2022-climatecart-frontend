import { useState } from "react"
import { useDebounce } from "react-use"
import styled, { css, keyframes } from "styled-components"
import { imgUrl } from "../../utils/imgUrlWrapper"
import { respondTo } from '../../utils/responsive'
import Dots from "../Dots"
import TicketForm from "./TicketForm"

export const steps = ({ onCloseClick, onNextStepClick }) => [
    <IntroImage src={imgUrl('/img/intro-image.svg')} alt='為你想要的世界投票' onClick={onNextStepClick} />,
    // <TutorialsSlideShow />,
    <TicketForm onCloseClick={onCloseClick} />
]

const tutorials = [
    { 
        image: '/img/tutorials/1.jpg', 
        label: '馬上領券，開始瀏覽'
    },
    { 
        image: '/img/tutorials/2.jpg', 
        label: '選擇主題，生成推薦'
    },
    { 
        image: '/img/tutorials/3.jpg', 
        label: '查看政見內容'
    },
    { 
        image: '/img/tutorials/4.jpg', 
        label: '訂製專屬的理想生活藍圖'
    },
];

const TutorialsSlideShow = () => {

    const [ nowIndex, setIndex ] = useState(-1);

    useDebounce(() => {
        setIndex(index => (index + 1) % tutorials.length);
    }, 3000, [nowIndex])

    return (
        <>
            <h2>歡迎光臨綠色和平的政見選物所</h2>
            <p>馬上領取好政券，盡情挖寶吧！</p>
            { tutorials[nowIndex]?.image ? 
                <img key={`img${nowIndex}`} src={imgUrl(tutorials[nowIndex]?.image)} alt={tutorials[nowIndex]?.label} />:
                <div className="img"/>
            }
            <h3 key={`label${nowIndex}`}>{ tutorials[nowIndex]?.label }</h3>
            <StyledDots length={tutorials.length} nowIndex={nowIndex} onClick={setIndex} />
        </>
    )
}

const StyledDots = styled(Dots)`
    margin-top: 32px;
    bottom: 0px;
    width: 100%;
`

const IntroImage = styled.img`
    width: 100%;
    cursor: pointer;
`


const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`

export const stepsStyle = css`

    text-align: center;

    h2 {
        font-size: 20px;
        font-weight: 700;
        line-height: 2em;

        ${respondTo.lg} {
            font-size: 18px;
            line-height: 32px;
        }
    }

    h2 + p {
        font-size: 16px;
        font-weight: 400;
        line-height: 2em;

        ${respondTo.lg} {
            font-size: 14px;
            line-height: 24px;
        }
    }

    img, h3 { 
        opacity: 0;
        animation: ${ fadeIn } .3s ease-out forwards;
    }

    img {
        width: 100%;
        height: auto;
    }

    h3 {
        margin-top: 16px;
        font-size: 20px;
        animation-delay: .15s;
        line-height: 24px;
        height: 24px;
    }

    p {
        font-size: 14px;
        font-weight: 500;
        line-height: 1.6em;
    }

    hr {
        border: 0;
        border-bottom: 1px solid white;
        margin: 40px 0;
    }

    .-first {
        position: relative;
        padding: 20px 0;
        min-height: 160px;

        display: flex;
        flex-direction: column;
        justify-content: center;

    }

`