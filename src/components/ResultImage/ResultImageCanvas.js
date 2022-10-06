import gsap, { Back } from 'gsap';
import { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import Two from "two.js";

import { imgUrl } from '../../utils/imgUrlWrapper';
import { respondTo } from '../../utils/responsive';
import { shuffleArray } from '../../utils/shuffleArray';

const ResultImageCanvas = ({
    products = {}, productIds = [], 
    bgId = 1, bgColorId = 1, 
    pixelRatio = 1,
    editable = false,
    defaultLayout = [], onLayoutChanged = () => {},
    enabled = true,
    canvas = false,
    onLoaded = () => {},
    ...props 
}) => {
    
    const domRef = useRef();
    const twoRef = useRef();
    
    const itemsGroupRef = useRef();
    const bgBackSprintRef = useRef();
    const bgForeSprintRef = useRef();

    const pointsRef = useRef([]);
    const sprintsRef = useRef([]);
    const pointSprintIndexSheetRef = useRef([]);
    const storedProductIdsRef = useRef([]);

    const dragStateRef = useRef(null);

    useEffect(() => {
        if (enabled) setup();
        return () => unmount();
    }, [productIds, bgId, enabled]); // eslint-disable-line

    useEffect(() => {
        if (!bgBackSprintRef.current || !bgForeSprintRef.current || !enabled) return;
        bgBackSprintRef.current.texture = new Two.Texture(imgUrl(`/img/result-image/bg${bgId}-${bgColorId}.jpg`));
        bgForeSprintRef.current.texture = new Two.Texture(imgUrl(`/img/result-image/bg${bgId}-${bgColorId}.png`));
    }, [bgId, bgColorId, enabled]); // eslint-disable-line

    useEffect(() => {
        const dom = domRef.current; // eslint-disable-line
        
        if (!dom) return;
        if (!editable || !enabled) return;

        dom.addEventListener('pointerdown', handlePointerDown, {passive: false});
        dom.addEventListener('pointerup', handlePointerUp, {passive: false});
        dom.addEventListener('pointermove', handlePointerMove, {passive: false});
        dom.addEventListener('pointerleave', handlePointerUp, {passive: false});

        return () => {
            dom.removeEventListener('pointerdown', handlePointerDown, {passive: false});
            dom.removeEventListener('pointerup', handlePointerUp, {passive: false});
            dom.removeEventListener('pointermove', handlePointerMove, {passive: false});
            dom.removeEventListener('pointerleave', handlePointerUp, {passive: false});
        }
    }, [editable, enabled])  // eslint-disable-line

    function setup() {
        const two = new Two({
            autostart: true,
            type: canvas ? Two.Types.canvas: Two.Types.svg,
            width: 375 * pixelRatio,
            height: 667 * pixelRatio,
        });

        if (!canvas) {
            two.renderer.domElement.setAttribute('preserveAspectRatio', 'xMidYMid slice');
            two.renderer.domElement.setAttribute('viewBox', '0 0 375 667');
            two.renderer.domElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            two.renderer.domElement.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        }

        // ====== background ======
        bgBackSprintRef.current = two.makeSprite(imgUrl(`/img/result-image/bg${bgId}-${bgColorId}.jpg`), two.width * 0.5, two.height * 0.5);
        bgBackSprintRef.current.scale = 0.5 * pixelRatio;
        
        // ====== items ======
        const itemsGroup = two.makeGroup();

        two.load(imgUrl(`/img/result-image/bg${bgId}.svg`), svg => {
            const itemRects = [...svg.children[0].children];
            const points = itemRects.map(rect => ({ x: rect.position.x * pixelRatio, y: rect.position.y * pixelRatio }));
            const sprints = new Array(points.length).fill(null);
            const pointSprintIndexSheet = new Array(points.length).fill(null);
            const storedProductIds = new Array(points.length).fill(null);

            let loadedCount = 0;

            let shuffledProductIds = productIds;

            points.forEach((point, i) => {

                if (i % productIds.length === 0) shuffledProductIds = shuffleArray(shuffledProductIds)
                const productId = defaultLayout?.[i] ?? shuffledProductIds[i % productIds.length];

                if (!productId) return;

                let textureUrl = (
                    products[productId]?.attributes.image?.data.attributes.formats.thumbnail?.url ?? products[productId]?.attributes.image?.data.attributes.url
                );

                if (textureUrl.indexOf('http://') !== 0 && textureUrl.indexOf('https://') !== 0) {
                    textureUrl = process.env.REACT_APP_STRAPI_URL + textureUrl
                }

                two.makeTexture(textureUrl, () => {
                    const sprite = two.makeSprite(textureUrl);
                    sprite.center();
                    sprite.position.x = point.x;
                    sprite.position.y = point.y;

                    if (!canvas) {
                        gsap.fromTo(sprite, {
                            scale: 0,
                        }, {
                            scale: 124.41 / sprite.width * pixelRatio * 1.2, 
                            duration: 0.3, 
                            delay: Math.random() * 0.3,
                            ease: Back.easeOut
                        });
                    } 
                    else {
                        sprite.scale = 124.41 / sprite.width * pixelRatio * 1.2;
                    }
                    
                    itemsGroup.add(sprite);
                    sprints[i] = sprite;
                    pointSprintIndexSheet[i] = i;
                    storedProductIds[i] = productId;
                    
                    loadedCount ++;

                    if (loadedCount >= points.length) {
                        pointsRef.current = points;
                        sprintsRef.current = sprints;
                        pointSprintIndexSheetRef.current = pointSprintIndexSheet;
                        storedProductIdsRef.current = storedProductIds;
                        syncSprintPositions();
                        onLoaded?.();
                    }
                });
            })    
        });

        itemsGroupRef.current = itemsGroup;

        // ====== foreground ======
        bgForeSprintRef.current = two.makeSprite(imgUrl(`/img/result-image/bg${bgId}-${bgColorId}.png`), two.width * 0.5, two.height * 0.5);
        bgForeSprintRef.current.scale = 0.5 * pixelRatio;

        two.appendTo(domRef.current);
        twoRef.current = two;

    }

    function handlePointerDown(e) {

        const mouseVector = parsePointerPoint(e);

        sprintsRef.current.forEach((sprint, sprintIndex) => {
            if (!sprint) return;
            if (Two.Vector.distanceBetween(mouseVector, sprint.position) < 50) {

                itemsGroupRef.current.remove(sprint);
                itemsGroupRef.current.add(sprint);

                const pointIndex = pointSprintIndexSheetRef.current.findIndex(si => si === sprintIndex);

                dragStateRef.current = {
                    sprintMousePosition: Two.Vector.sub(mouseVector, sprint.position),
                    sprint: sprint,
                    sprintIndex: sprintIndex,
                    pointIndex: pointIndex
                };
            }
        });
    }

    function handlePointerMove(e) {
        if (e.cancelable) e.preventDefault();
        
        const mouseVector = parsePointerPoint(e);
        let pointIndex = null;

        pointsRef.current.forEach((point, _pointIndex) => {
            if (Two.Vector.distanceBetween(mouseVector, point) < 50 * pixelRatio) {
                pointIndex = _pointIndex;
            }
        });

        if (!dragStateRef.current) {
            domRef.current.style.cursor = pointIndex === null ? 'default' : 'move';
            return;
        }

        const sprint = dragStateRef.current.sprint;
        sprint.position = Two.Vector.sub(mouseVector, dragStateRef.current.sprintMousePosition);

        if (pointIndex !== null && pointSprintIndexSheetRef.current[pointIndex] !== dragStateRef.current.sprintIndex) {
            const prevIndex = pointSprintIndexSheetRef.current[pointIndex];

            pointSprintIndexSheetRef.current[pointIndex] = dragStateRef.current.sprintIndex;
            pointSprintIndexSheetRef.current[dragStateRef.current.pointIndex] = prevIndex;

            dragStateRef.current.pointIndex = pointIndex;
            syncSprintPositions();
        }

    }

    function handlePointerUp(e) {
        if (!dragStateRef.current) return;
        dragStateRef.current = null;
        syncSprintPositions();
    }

    function syncSprintPositions() {

        sprintsRef.current.forEach((sprint, sprintIndex) => {
            const pointIndex = pointSprintIndexSheetRef.current.findIndex( si => si === sprintIndex);

            if (
                pointIndex < 0 || 
                pointIndex === dragStateRef.current?.pointIndex
            ) return;

            if (
                sprint.position.x === pointsRef.current[pointIndex].x && 
                sprint.position.y === pointsRef.current[pointIndex].y
            ) return;

            if (!canvas) {
                gsap.to(sprint.position, {
                    ...pointsRef.current[pointIndex], 
                    duration: 0.2, ease: Back.easeOut
                });
            } else {
                sprint.position.x = pointsRef.current[pointIndex].x;
                sprint.position.y = pointsRef.current[pointIndex].y;
            }

        });

        const newLayout = pointSprintIndexSheetRef.current.map((sprintIndex) => storedProductIdsRef.current[sprintIndex])
        onLayoutChanged(newLayout)
    }

    function parsePointerPoint(e) {
        const rect = domRef.current.getBoundingClientRect();
        const widthRatio = 375 / rect.width;
        const heightRatio = 667 / rect.height;

        const x = e.offsetX * widthRatio * pixelRatio;
        const y = e.offsetY * heightRatio * pixelRatio;

        return new Two.Vector(x, y);
    }

    function unmount() {
        twoRef.current?.clear();
        if (!domRef.current) return;

        [...domRef.current.children].forEach(child => {
            domRef.current.removeChild(child);
        });
    }

    return (
        <StyledResultImage {...props} ref={domRef} editable={editable}/>
    )
}

const StyledResultImage = styled.div`
    /* width: min(375px, 100vw - 48px); */
    height: max(min(var(--vh) * 100 - 460px, 667px), 200px);
    aspect-ratio: 1 / 1.775;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #383838;
    color: white;

    position: relative;

    ${respondTo.md} {
        height: max(min(var(--vh) * 100 - 320px, min(667px, 150vw)), 200px);
        /* width: min(280px, 100vw - 48px);
        height: initial;    */
    }

    >canvas, >svg {
        position: absolute;
        top: 0; left: 0; 
        width: 100% !important; 
        height: 100% !important;
    }

    ${({ editable }) => !editable && css`
        /* pointer-events: none; */
    `}
`

export default ResultImageCanvas