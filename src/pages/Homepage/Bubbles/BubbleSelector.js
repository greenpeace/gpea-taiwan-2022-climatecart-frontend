import gsap, { Back } from 'gsap';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import ButtonWithIcon from '../../../components/ButtonWithIcon';

import Icons from '../../../components/Icons';
import Title from '../../../components/Title';
import { imgUrl } from '../../../utils/imgUrlWrapper';
import { respondFrom, respondTo } from '../../../utils/responsive';
import { shuffleArray } from '../../../utils/shuffleArray';

const bubblePositions = [
    { x: 460, y: 0 },
    { x: 500, y: 433 },
    { x: 265, y: 81 },
    { x: 640, y: 100 },
    { x: -20, y: 5, size: 252 },
    { x: 30, y: 263, size: 380 },
    { x: 673, y: 291, size: 210 },
    { x: 415, y: 200, size: 210 },
]

const BubbleSelector = ({ 
    onNextClick, topics = [], 
    ...props 
}) => {

    const bubblesRef = useRef();

    const bubbleItems = useMemo(() => {
        if (!topics) return [];

        let shuffledTopics = [...topics];
        shuffledTopics = shuffleArray(shuffledTopics);

        return shuffledTopics.map((topic, index) => ({
            ...topic, ...bubblePositions[index % bubblePositions.length]
        }))
    }, [topics]);

    const [ checkList, setCheckList ] = useState(new Array(bubbleItems.length).fill(false));

    const fill3 = useMemo(() =>
        checkList.filter(item => item).length < 3
        , [checkList])

    // resize
    useEffect(() => {
        function handleResize() {
            const bubbleDom = bubblesRef.current;
            const scale = window.innerWidth / 1440;

            bubbleDom.style.transform = `scale(${scale})`;
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    // intersection
    useEffect(() => {
        if (!topics) return;

        gsap.set(bubblesRef.current.children, {
            opacity: 0, scale: 0.6
        });
        const observer = new IntersectionObserver(entries => {
            if (!entries[0]?.isIntersecting) return;

            function onBubbleEnterComplete() {
                const bubbles = [...bubblesRef.current.children];
                bubbles.forEach(bubble => {
                    bubble.dataset['enter_completed'] = 'true';
                });
            }

            gsap.to(bubblesRef.current.children, {
                opacity: 1, scale: 1, duration: 0.5, delay: 0.5, stagger: 0.05, ease: Back.easeOut,
                onComplete: onBubbleEnterComplete
            })

            observer.disconnect();
        }, { threshold: 0 });

        observer.observe(bubblesRef.current);

        return () => {
            observer.disconnect();
        }
    }, [topics])

    function handleBubbleClick(index) {
        setCheckList(prev => {
            const newList = [...prev];
            newList[index] = !newList[index];
            return newList;
        })
    }

    function handleNextClick() {
        let selectedList = checkList
            .map((checked, index) => checked && bubbleItems[index]?.id )
            .filter(item => item);

        onNextClick(selectedList)
    }

    return (
        <StyledBubbleSelector {...props}>

            <Title>主題精選</Title>

            <div className="wording">
                不滿意的，該從何開始改變？<br/>
                點選 <b>3</b> 個最有感的關鍵字泡泡<br/>
                快速找到建構理想生活的重點政見

                <GenerateButton onClick={handleNextClick} disabled={fill3}>
                    產生推薦組合
                    <div className="arrow"><Icons.Arrow /></div>
                </GenerateButton>
            </div>

            <BubbleBlock ref={bubblesRef}>
                {bubbleItems.map((item, index) => (
                    <Bubble key={item.id}
                        checked={checkList[index]}
                        onClick={() => handleBubbleClick(index)}
                        disabled={!checkList[index] && !fill3}
                        name={item.attributes.name}
                        image={item.attributes.banner_image.data.attributes.url}
                        {...item}
                    />
                ))}
            </BubbleBlock>

            <MobileButtonContainer>
                <GenerateButton onClick={handleNextClick} disabled={fill3}>
                    產生推薦組合
                    <div className="arrow"><Icons.Arrow /></div>
                </GenerateButton>
            </MobileButtonContainer>

        </StyledBubbleSelector>
    )
}

const Bubble = ({
    x, y, size, name, image,
    checked = false, onClick,
    disabled = false
}) => {

    const domRef = useRef();
    const timerRef = useRef();

    useEffect(() => {
        function rndPos() {
            const rndMs = Math.random() * 5000 + 2000;

            if (domRef.current.dataset['enter_completed']) {
                domRef.current.style.transform = `translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px)`
                domRef.current.style.transition = `transform ${rndMs}ms ease-in-out`
                
                if (window.innerWidth <= 576) {
                    domRef.current.style.transform = `translate(0px, 0px)`
                }
            }

            timerRef.current = setTimeout(rndPos, rndMs);
        }

        rndPos();

        return () => {
            clearTimeout(timerRef.current);
        }
    }, [])

    const imageSrc = useMemo(() => {
        if (image.indexOf('http://') === 0 || image.indexOf('https://') === 0) {
            return image;
        }
        return process.env.REACT_APP_STRAPI_URL + image;
    }, [image])

    return (
        <StyledBubble ref={domRef}
            image={imageSrc} x={x} y={y} size={size}
            disabled={disabled} checked={checked} onClick={onClick}
        >
            <div>{name}</div>
        </StyledBubble>
    )
}

const StyledBubbleSelector = styled.div`

    padding-top: 90px;

    position: relative;
    height: max(56.25vw, 900px);

    overflow-x: hidden;

    .wording {

        position: absolute;
        left: 70%;
        top: 30%;
        z-index: 1;

        font-size: 20px;
        font-weight: 500;
        line-height: 40px;
        letter-spacing: .05em;
    }

    .wording b {
        color: var(--primary);
        font-size: 28px;
    }

    ${ respondTo.xl } {
        height: max(56.25vw, 700px);

        .wording {
            padding-left: 40px;

            font-size: 16px;
            line-height: 32px;
        }
    }

    ${ respondTo.lg } {
        .wording {
            left: 65%;
        }
    }

    ${ respondTo.md } {
        padding: 48px 0;
        height: auto;

        .wording {
            margin-top: 32px;
            padding: 0 16px;

            position: relative;
            top: auto;
            left: auto;

            text-align: center;

            >button {
                display: none;
            }
        }
    }
    
`

const BubbleBlock = styled.ul`
    position: absolute;
    width: 100%;
    height: 700px;
    bottom: 0;
    left: 0;

    transform-origin: 0% 100%;

    ${ respondTo.md } {
        margin-top: 28px;
        padding: 0 32px;
        position: relative;
        bottom: auto;
        left: auto;
        transform: none !important;
        height: auto;

        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
    }
`

const StyledBubble = styled.li`
    
    position: absolute;
    width: 160px;
    height: 160px;
    border-radius: 500em;

    font-size: 18px;
    font-weight: 700;
    color: white;
    letter-spacing: .05em;
    
    user-select: none;
    cursor: pointer;
    
    background-color: var(--pink);

    &::after {
        content: url(${imgUrl('/img/bubble-checked.svg')});
        position: absolute;
        top: 6px;
        right: 6px;
        transform: scale(0.8) translate(-3px, 3px);
        opacity: 0;

        transition: transform .2s, opacity .2s;
    }

    >div {
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        transition: transform .3s, opacity .2s;

        border-radius: 500em;
        overflow: hidden;

        ${p => p.image && css`
            &:before {
                content: '';
                display: block;
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                z-index: -1;

                transition: filter .3s;
                filter: brightness(0.5) grayscale(0.2);

                background-image: url(${p.image});
                background-size: cover;
                background-position: center;
            }
        `}
    }

    &:hover >div {
        transform: scale(1.03);

        &:before {
            filter: brightness(0.7);
        }
    }
    
    ${p => css`
        left: ${p.x}px;
        top: ${p.y}px;
    `}

    ${p => p.disabled && css`
        pointer-events: none;
        opacity: 0.6 !important;
    `}

    ${p => p.checked && css`

        >div, &:hover >div {
            transform: scale(0.96);
        }

        &::after {
            transform: scale(1);
            opacity: 1;
        }
    `}

    ${({ size }) => {
        if (!size) return;

        let fontSize = 18;
        let afterPosition = 6;

        if (size < 200) {
            fontSize = 18;
            afterPosition = 6;
        }
        else if (size < 250) {
            fontSize = 20;
            afterPosition = 12;
        }
        else if (size < 350) {
            fontSize = 24;
            afterPosition = 16;
        }
        else {
            fontSize = 28;
            afterPosition = 36;
        }

        return css`
            width: ${size}px;
            height: ${size}px;
            font-size: ${fontSize}px;

            &::after {
                top: ${afterPosition}px;
                right: ${afterPosition}px;
            }
        `
    }}

    ${ respondTo.md } {
        position: relative;
        width: calc(50vw - 32px - 12px);
        height: calc(50vw - 32px - 12px);
        top: auto;
        left: auto;
        font-size: 16px;
    }
`

const GenerateButton = styled.button`
    margin-top: 104px;

    display: flex;
    align-items: center;

    font-size: 18px;
    font-weight: 700;
    color: var(--primary);

    >.arrow {
        margin-left: 28px;

        display: flex;
        justify-content: center;
        align-items: center;
        width: 88px;
        height: 88px;
        border-radius: 50em;

        color: white;
        background-color: var(--primary);
        
        svg {
            width: 40px;
            height: 40px;
        }

    }

    ${({ disabled }) => !disabled && css`
        >.arrow {
            position: relative;
            background: linear-gradient(90deg, #71AF35 0%, #71AF35 100%);
        
            &::before, &::after {
                content: '';
                display: block;
                position: absolute;
                z-index: -1;
                top: 0; left: 0; width: 100%; height: 100%;
                border-radius: 50em;
                background-color: var(--primary);
                pointer-events: none;
                opacity: 0.7;
            }

            &::before {
                animation: ${keyframes`
                    to {
                        transform: scale(1.3);
                        opacity: 0;
                    }
                `} 2s ease-out infinite;
            }

            &::after {
                animation: ${keyframes`
                    to {
                        transform: scale(1.6);
                        opacity: 0;
                    }
                `} 2s ease-out infinite;
            }

            &:hover {
                background: linear-gradient(90deg, #248B2E 0%, #71AF35 100%);
            }
        }
    `}

    ${({ disabled }) => disabled && css`
        pointer-events: none;
        color: var(--grey-100);

        >.arrow {
            background-color: var(--grey-100);
        }
    `}

    ${ respondTo.md } {
        margin-top: 24px;

        >.arrow {
            width: 64px;
            height: 64px;

            svg {
                width: 32px;
                height: 32px;
            }
        }
    }
`

const MobileButtonContainer = styled.div`
    margin-top: 28px;
    display: flex;
    justify-content: center;

    ${ respondFrom.md } {
        display: none;
        margin-top: 0px;
    }
`

export default BubbleSelector