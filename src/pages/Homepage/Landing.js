import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import gsap, { Sine } from 'gsap';

import ScrollDownIndicator from '../../components/ScrollDownIndicator';
import { respondTo, useRespondTo, sm, respondFrom } from '../../utils/responsive';
import { imgUrl } from '../../utils/imgUrlWrapper';

const Landing = () => {

    const [ svg, setSvg ] = useState();
    const svgContainerRef = useRef();

    const isMobile = useRespondTo(sm);

    useEffect(() => {        
        async function fetchSvg() {
            const res = await fetch(imgUrl(
                !isMobile ? '/img/landing.svg' : '/img/landing-mobile.svg'
            ));
            const body = await res.text();
            setSvg(body);
        }

        fetchSvg();
    }, [isMobile]);

    useEffect(() => {
        if (!svg) return;

        const svgDom = svgContainerRef.current.querySelector('svg');
        svgDom.setAttribute('preserveAspectRatio', !isMobile ? 'xMidYMid slice' : 'xMidYMax slice');
        
        gsap.to(svgDom.querySelector('#svg-kv-bubble-01'), {
            y: -20, duration: 3, yoyo: true, repeat: -1, ease: Sine.easeInOut
        });

        gsap.to(svgDom.querySelector('#svg-kv-bubble-02'), {
            y: 10, duration: 4, yoyo: true, repeat: -1, ease: Sine.easeInOut
        });

        gsap.to(svgDom.querySelector('#svg-kv-bubble-03'), {
            y: -15, duration: 5, yoyo: true, repeat: -1, ease: Sine.easeInOut
        });

        gsap.to(svgDom.querySelector('#svg-kv-bubble-04'), {
            y: 20, duration: 6, yoyo: true, repeat: -1, ease: Sine.easeInOut
        });

        gsap.to(svgDom.querySelector('#svg-kv-q'), {
            y: -10, duration: 3, yoyo: true, repeat: -1, ease: Sine.easeInOut
        });

        gsap.to(svgDom.querySelector('#background-white'), {
            y: 50, duration: 5, yoyo: true, repeat: -1, ease: Sine.easeInOut
        });

        gsap.to(svgDom.querySelector('#svg-kv-light'), {
            y: 10, duration: 5, yoyo: true, repeat: -1, ease: Sine.easeInOut
        });
                
    }, [svg, isMobile])

    return (
        <StyledLanding>
            <div className="img" dangerouslySetInnerHTML={{ __html: svg}} ref={svgContainerRef} />
            {/* <img src={imgUrl('/img/landing.svg')} alt='歡迎光臨政見選物所' /> */}
            <div className="wording">
                <div className="welcome">歡迎光臨</div>
                <img className='kv' src={imgUrl('/img/kv.svg')} alt='政見選物所 Politics Select Shop' />
                <div className="brief">
                    如果你的一票選的不是人和政黨，而是政見<br/>
                    我們的生活，會不會更接近理想一點？
                </div>
            </div>
            <StyledScrollDownIndicator />
        </StyledLanding>
    )
}

const StyledLanding = styled.div`
    position: relative;
    width: 100vw;
    height: min(900px, 100vh - 200px);
    min-height: 600px;

    ${respondTo.sm} {
        height: 160vw;
    }

    #svg-kv-bubble-01, 
    #svg-kv-bubble-02, 
    #svg-kv-bubble-03, 
    #svg-kv-bubble-04, 
    #svg-kv-q, 
    #background-white, 
    #svg-kv-light {
        /* will-change: transform; */
    }

    >.img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        >svg {
            pointer-events: none;
            width: 100%;
            height: 100%;
        }
    }

    >.wording {
        padding-left: 160px;
        position: absolute;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;

        ${respondTo.lg} {
            padding-left: 20px;
            padding-top: 28px;
            justify-content: flex-start;
        }

        ${ respondTo.sm} {
            margin-top: 40px;
        }
    }

    >.wording .welcome {
        font-size: 22px;
        font-weight: 700;
        letter-spacing: 0.1em;

        ${respondTo.lg} {
            font-size: 14px;
        }
    }

    >.wording .kv {
        margin-top: 24px;

        ${ respondFrom._2k } {
            width: 600px;
        }

        ${ respondTo.sm } {
            width: 58vw;
            margin-top: 12px;
        }
    }

    >.wording .brief {
        margin-top: 24px;
        font-size: 16px;
        letter-spacing: 0.1em;
        line-height: 1.75em;
        font-weight: 500;

        ${respondTo.lg} {
            margin-top: 8px;
            font-size: 14px;
        }
    }
`

const StyledScrollDownIndicator = styled(ScrollDownIndicator)`
    position: absolute;
    left: 32px;
    bottom: 40px;

    ${ respondTo.sm } {
        left: calc(50% - 10px);
        bottom: 16px;
    }
`

export default Landing