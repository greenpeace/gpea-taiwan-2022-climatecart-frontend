import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { imgUrl } from '../../../utils/imgUrlWrapper';

const Loading = () => {
    
    const [ lengthCount, setLengthCount ] = useState(0);
    const containerRef = useRef();

    useEffect(() => {
        window.addEventListener('resize', calcLengthCount);
        calcLengthCount();
        return () => window.removeEventListener('resize', calcLengthCount);
    }, [])

    function calcLengthCount() {
        setLengthCount(~~(window.innerHeight / 288) + 2)
    }

    return (
        <StyledLoading ref={containerRef}>
            { new Array(lengthCount).fill('').map((_, index) => (
                <Marquee key={index} reversed={index % 2}/>
            ))}
            <Indicator>組合中請稍候...</Indicator>
        </StyledLoading>
    )
}

const loadingEnter = keyframes`
    from {
        opacity: 0;
    }
`

const StyledLoading = styled.div`
    background-color: var(--white);
    position: relative;
    width: 100vw;
    height: max(56.25vw, 900px);
    
    overflow: hidden;

    animation: ${ loadingEnter } .8s ease-out;
`

const indicatorAnim = keyframes`
    50% { color: rgba(255, 255, 255, 0.3 ) }
`

const Indicator = styled.div`
    position: absolute;
    top: calc(50% - 30px);
    left: calc(50% - 100px);
    width: 200px;
    height: 60px;
    border-radius: 50em;

    color: white;
    background: linear-gradient(90deg, var(--green-200) 0%, var(--primary) 47.92%, var(--green-300) 100%);
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0.05em;

    display: flex;
    justify-content: center;
    align-items: center;

    animation: ${ indicatorAnim } 1s ease-in-out infinite;
`

const marqueeAnim = keyframes`
    to { background-position-x: 4382px; }
`

const marqueeAnimReversed = keyframes`
    to { background-position-x: -4382px; }
`

const Marquee = styled.div`
    position: relative;
    top: -160px;

    margin-top: 40px;

    width: 100%;
    height: 216px;

    background-size: cover;
    background-image: url(${imgUrl('/img/home-loading-marquee.png')});
    opacity: 0.2;
    animation: ${({ reversed }) => reversed ? marqueeAnimReversed : marqueeAnim} 50s linear infinite;
`;

export default Loading