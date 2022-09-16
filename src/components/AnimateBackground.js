import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { vh } from '../utils/vhfix';

const AnimateBackground = ({ ...props }) => {

    const ref = useRef();
    const timerRef = useRef();

    useEffect(() => {
        const circles = [...ref.current.children];

        circles.forEach(circle => {
            circle.style.transform = `translate(${Math.random() * 30 + 10}vw, ${Math.random() * 30 + 10}vh)`;
        })

        timerRef.current = setInterval(() => {
            circles.forEach(circle => {
                circle.style.transform = `translate(${Math.random() * 30 + 10}vw, ${Math.random() * 30 + 10}vh)`;
                circle.style.transition = 'transform 7s linear';
            })
        }, 7000);

        return () => {
            clearInterval(timerRef.current);
        }
    }, [])

    return (
        <StyledAnimateBackground {...props} ref={ref}>
            <div/>
            <div/>
            <div/>
            <div/>
        </StyledAnimateBackground>
    )
}

const StyledAnimateBackground = styled.div`
    width: 100vw;
    ${ vh('height', 100 )};
    filter: blur(100px);

    z-index: -1;

    >div {
        opacity: .4;
        border-radius: 50em;
        position: absolute;
        left: calc(50% - var(--size) / 2);
        top: calc(50% - var(--size) / 2);
        width: var(--size);
        height: var(--size);

    }

    >div:nth-child(1) {
        --size: 220px;
        background-color: var(--green-100);
    }

    >div:nth-child(2) {
        --size: 90px;
        background-color: var(--yellow);
    }

    >div:nth-child(3) {
        --size: 140px;
        background-color: var(--green-100);
    }

    >div:nth-child(4) {
        --size: 80px;
        background-color: var(--cyan);
    }
`

export default AnimateBackground