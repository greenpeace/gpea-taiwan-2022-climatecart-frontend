import { useEffect, useState, useRef, useMemo, Fragment } from 'react';
import styled, { css } from 'styled-components';
import Slider from 'react-slick';
import gsap from 'gsap';
import { useMatch } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';

import { respondTo } from '../../utils/responsive';
import { vh } from '../../utils/vhfix';
import Icons from '../../components/Icons';
import { steps, stepsStyle } from './steps';
import TicketForm from './TicketForm';
import { useAppStore } from '../../stores/appStore';
import { withSubSlug } from '../../utils/withSubSlug';

const Tutorials = () => {

    const homepageMatch = useMatch({ path: withSubSlug('/') });
    const [ nowStep, setStep ] = useState(0);
    const [ active, setActive ] = useState(false);
    const { showTicketForm, setShowTicketForm } = useAppStore();
    const openTimerRef = useRef();

    const injectedStep = useMemo(() =>
        showTicketForm ?
            [<TicketForm onCloseClick={close} />]:
            steps({ onCloseClick: close, onNextStepClick: handleNextClick })
        , [showTicketForm]); // eslint-disable-line

    useEffect(() => {
        if (showTicketForm) open();
        else clearTimeout(openTimerRef.current);
    }, [showTicketForm])

    useEffect(() => {
        document.body.style.overflow = active ? 'hidden': '';
    }, [active])

    const maskRef = useRef();
    const panelRef = useRef();
    const sliderRef = useRef();

    useEffect(() => {
        gsap.set(maskRef.current, { opacity: 0, pointerEvents: 'none' });
        gsap.set(panelRef.current, { opacity: 0, pointerEvents: 'none' });

        if (!showTicketForm && homepageMatch) {
            openTimerRef.current = setTimeout(open, 2000);
        }
    }, []); // eslint-disable-line

    function open() {
        setActive(true);
        gsap.to(maskRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.3 });
        gsap.to(panelRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.3, delay: 0.2 });
    }

    function close() {
        gsap.to(maskRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.3 });
        gsap.to(panelRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.3 });
        setActive(false);

        setShowTicketForm(false);
    }

    // function handleDotsClick(index) {
    //     sliderRef.current?.slickGoTo(index)
    // }

    function handleBeforeChange(_, index) {
        setStep(index)
    }

    function handlePrevClick() {
        sliderRef.current?.slickPrev()
    }

    function handleNextClick() {
        sliderRef.current?.slickNext()
    }

    function handlePanelClick(e) {
        e.stopPropagation();
    }

    return (
        <Mask ref={maskRef} onClick={close}>
            <div className='outer' onClick={handlePanelClick}>
                <Panel ref={panelRef} bg={nowStep === injectedStep.length - 1}>
                    <StyledSlider
                        speed={0}
                        arrows={false} dots={false} infinite={false}
                        slidesToShow={1} slidesToScroll={1} adaptiveHeight={true}
                        ref={sliderRef} beforeChange={handleBeforeChange}
                    >
                        {injectedStep.map((step, index) =>
                            <Fragment key={index}>
                                {step}
                            </Fragment>
                        )}
                    </StyledSlider>
                </Panel>

                {( nowStep < 1 && injectedStep.length > 1) && <>
                    {/* <Dots length={injectedStep.length} nowIndex={nowStep} onClick={handleDotsClick} /> */}
                    {/* {nowStep > 0 && <ArrowButton prev onClick={handlePrevClick}><Icons.Arrow /></ArrowButton>} */}
                    {/* {nowStep < injectedStep.length - 1 && <ArrowButton next onClick={handleNextClick}><Icons.Arrow /></ArrowButton>} */}
                </>}

            </div>
        </Mask>
    )
}



const Mask = styled.div`
    position: fixed;
    z-index: var(--z-index-modal);
    top: 0;
    left: 0;
    width: 100vw;
    ${vh('height', 100)};

    background-color: rgba(0, 0, 0, 0.6);

    display: flex;
    justify-content: center;
    align-items: center;

    .outer {
        position: relative;
    }
`

const Panel = styled.div`
    position: relative;
    width: 520px;

    ${vh('max-height', 100, -48)};
    border-radius: 20px;

    padding-top: 40px;
    padding-bottom: 48px;
    
    background: linear-gradient(40.14deg, rgba(255, 255, 255, 0.675) 0%, rgba(255, 255, 255, 0.9) 100%);
    backdrop-filter: blur(12px);

    overflow: auto;

    ${respondTo.lg} {
        width: calc(100vw - 40px);
        max-width: 520px;
        padding-top: 32px;
    }

    ${p => !p.bg && css`
        background: transparent;
        backdrop-filter: none;
    `}
`

const ArrowButton = styled.button`
    display: block;
    width: 48px;
    height: 48px;
    border-radius: 50em;

    background-color: var(--primary);
    color: white;

    position: absolute;
    top: calc(50% - 24px);

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background: linear-gradient(90deg, #248B2E 0%, #71AF35 100%);
    }

    ${respondTo.lg} {
        height: 36px;
        width: 36px;
    }

    ${({ prev }) => prev && css`
        left: -24px;
        svg { transform: rotate(180deg); }

        ${respondTo.lg} {
            left: -18px;
        }
    `}

    ${({ next }) => next && css`
        right: -24px;

        ${respondTo.lg} {
            right: -18px;
        }
    `}

`


const StyledSlider = styled(Slider)`
    .slick-list {
        transition: height .3s;
    }

    .slick-slide {

        > div {
            min-height: 100%;
            display: flex;
            align-items: center;
        }
    }
`

export const SlideItem = styled.div`
    width: 100%;
    padding: 0 40px;

    ${respondTo.lg} {
        padding: 0 28px;
    }

    ${stepsStyle};
`

export default Tutorials