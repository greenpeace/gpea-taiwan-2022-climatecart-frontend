import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import styled from 'styled-components';
import { useRef, useEffect } from "react";
import { getPosition } from '../../utils/scrollTo';
import { respondTo, lg, useRespondTo } from '../../utils/responsive';

import { Arrow } from '../../components/Icons';
import Image from '../../components/Image';

const GallerySlick = ({ items, ...props }) => {
    const containerRef = useRef();
    const tagRef = useRef();
    const mousePosX = useRef();
    const mousePosY = useRef();
    const lastScrolledRef = useRef(0);
    const isMobile = useRespondTo(lg);
    const sliderRef = useRef();


    const sliderConfig = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        touchthreshold: 100,
        arrows: false,
    };

    const updateMousePos = (x, y) => {
        mousePosX.current = x;
        mousePosY.current = y;
    };


    const getMousePos = () => {
        return {
            x: mousePosX.current,
            y: mousePosY.current
        }
    };

    const updateTagPos = (x, y) => {
        if (!tagRef.current) return;
        tagRef.current.style.left = x + 'px';
        tagRef.current.style.top = y + 'px';
    };

    const showTag = () => tagRef.current && (tagRef.current.style.opacity = 1);
    const hideTag = () => tagRef.current && (tagRef.current.style.opacity = 0);

    useEffect(() => {
        if (isMobile) return;
        if (!tagRef.current || !containerRef.current) return;
        const containerPos = getPosition(containerRef.current);

        const boundingRect = containerRef.current.getBoundingClientRect();

        const handleMousemove = (e) => {
            updateMousePos(e.pageX, e.pageY);

            const isWithinContainer = () => {
                const leftBound = containerPos.x;
                const rightBound = leftBound + boundingRect.width;
                const topBound = containerPos.y;
                const bottomBound = topBound + boundingRect.height;

                return ((e.pageX >= leftBound && e.pageX <= rightBound) && (e.pageY >= topBound && e.pageY <= bottomBound));

            };

            if (isWithinContainer()) {
                showTag();
                let left = e.pageX - getPosition(containerRef.current).x;
                let top = e.pageY - getPosition(containerRef.current).y;
                updateTagPos(left, top);
            } else {
                hideTag();
            }
        }

        const handleScroll = () => {
            const mousePos = getMousePos();
            if (!mousePos.x || !mousePos.y) return;

            if (lastScrolledRef.current !== window.scrollY) {
                const diff = window.scrollY - lastScrolledRef.current
                const newMouseY = mousePos.y + diff;
                updateMousePos(mousePos.x, newMouseY);
                updateTagPos(mousePos.x - getPosition(containerRef.current).x, newMouseY - getPosition(containerRef.current).y);
                lastScrolledRef.current = window.scrollY;

                if (newMouseY >= getPosition(containerRef.current).y + boundingRect.height || newMouseY <= getPosition(containerRef.current).y) {
                    hideTag();
                } else {
                    showTag();
                }
            };
        }

        document.addEventListener('mousemove', handleMousemove);

        document.addEventListener('scroll', handleScroll);


        return () => {
            document.removeEventListener('mousemove', handleMousemove);
            document.removeEventListener('scroll', handleScroll);
        }
    }, [isMobile])

    return (
        <StyledContainer ref={containerRef} {...props}>
            <Tag ref={tagRef}>
                <Arrow />
            </Tag>
            <StyledSlider {...sliderConfig} ref={sliderRef}>
                {
                    items.map((item, id) => <SlideItem onClick={() => console.log(id)} item={item} key={id} />)
                }
            </StyledSlider>
        </StyledContainer>
    )
}

const SlideItem = ({ item, ...props }) => {
    const { description, image: { data: { attributes: { url: imageUrl } } } } = item;
    return (
        <StyledSlideItem {...props}>
            <Image src={imageUrl} />
            {description && (
                <div className="caption">
                    {description}
                </div>
            )}
        </StyledSlideItem>
    )
}

const StyledContainer = styled.div`
    position: relative;

    /* height: 340px; */
`;

const StyledSlider = styled(Slider)`
    margin: 0 -24px;
    
    .slick-list {
        /* margin-left: -14px; */
    }

    .slick-track {
        display: flex;
    }
`;

const Tag = styled.div`
    height: 80px;
    width: 80px;
    border-radius:50%;
    color: #fff;
    background-color: var(--primary);

    display: flex;
    align-items: center;
    justify-content: center;

    transition: opacity 0.1s ease-out;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 222;
    pointer-events: none;

    ${respondTo.lg} {
        display: none;
    }

`;

const StyledSlideItem = styled.div`
    --width: 20vw;

    width: var(--width);
    max-width: 300px;

    margin: 0;
    margin-left: 16px;

    ${respondTo.lg} {
        --width: 300px;
    }

    img {
        width: var(--width);
        max-width: 300px;
        height: calc(var(--width) * 0.82);
        max-height: 248px;
        border-radius: 10px;
        object-fit: cover;
    }

    .caption {
        margin-top: 12px;
        width: 100%;
        background-color: var(--white-100);
        border-radius: 5px;
        padding: 20px;
        min-height: 80px;

        font-size: 14px;
        line-height: 20px;
        white-space: pre-line;
    }
`;

export default GallerySlick;