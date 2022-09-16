import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { respondTo } from '../utils/responsive';

const MouseFX = () => {

    const listenedDomsRef = useRef([]);
    const circleRef = useRef();

    useEffect(() => {
        const observer = new MutationObserver(handleMutation);

        const div = document.getElementById("root");

        observer.observe(div, {
            childList: true,
            attributes: true,
            characterData: true,
        });
        handleMutation();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [])

    function handleMutation() {
        handleButtonLeave();

        listenedDomsRef.current?.forEach(item => {
            item.removeEventListener('mouseenter', handleButtonHover);
            item.removeEventListener('mouseleave', handleButtonHover);
        });

        const buttons = document.body.querySelectorAll('button');
        const alink = document.body.querySelectorAll('a');
        const inputs = document.body.querySelectorAll('input');

        const items = [...buttons, ...alink, ...inputs];
        items.forEach(item => {
            item.addEventListener('mouseenter', handleButtonHover);
            item.addEventListener('mouseleave', handleButtonLeave);
        })

        listenedDomsRef.current = items;
    }

    function handleButtonHover(e) {
        const isInput = e.currentTarget.tagName === 'INPUT'
        circleRef.current?.setAttribute('r', isInput ? 28: 20);
        circleRef.current?.classList.toggle('-hover', true);
        circleRef.current?.classList.toggle('-input', isInput);
    }

    function handleButtonLeave() {
        circleRef.current?.setAttribute('r', 12);
        circleRef.current?.classList.toggle('-hover', false);
        circleRef.current?.classList.toggle('-input', false);
    }

    function handleMouseMove(e) {
        circleRef.current?.setAttribute('cx', e.clientX);
        circleRef.current?.setAttribute('cy', e.clientY);
    }

    return (
        <StyledMouseFX>
            <circle cx='-12' cy='-20' r='20' fill="var(--green-100)" ref={circleRef} />
        </StyledMouseFX>
    )
}

const StyledMouseFX = styled.svg`
    position: fixed;
    top: 0;
    left: 0;
    z-index: var(--z-index-mouse);

    width: 100vw;
    height: 100vh;

    pointer-events: none;


    >circle {
        opacity: 0.5;
        transition: r .3s, fill .3s, opacity .5s;

        &.-hover {
            opacity: 0;
        }

        &.-input {
            opacity: 0;
        }
    }

    ${respondTo.md} {
        display: none;
    }
`

export default MouseFX
