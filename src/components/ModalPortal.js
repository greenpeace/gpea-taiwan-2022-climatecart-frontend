import styled, { keyframes } from "styled-components";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useClickAway } from "react-use";
import { respondTo } from "../utils/responsive";

const ModalPortal = ({ isVisible, onClickAway, children, ...props }) => {
    const [isOpen, setIsOpen] = useState(isVisible);
    const modalRef = useRef();

    useClickAway(modalRef, () => {
        if (onClickAway) {
            setIsOpen(false);
            onClickAway();
        }
    });

    useEffect(() => {
        document.body.style.overflow = isVisible ? 'hidden': '';
        setIsOpen(isVisible);
        return () => {
            document.body.style.overflow = '';
        }
    }, [isVisible]);

    if (isOpen) {
        return createPortal(
            <StyledContainer>
                <StyledContent ref={modalRef}>{children}</StyledContent>
            </StyledContainer>,
            document.querySelector("#modal")
        );
    }
    return null;
};

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
`

const StyledContainer = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: var(--z-index-modal);

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.6);

    animation: ${fadeIn} .15s ease-out;
`;

const StyledContent = styled.div`
    /* position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%); */

    position: relative;
    max-height: calc(var(--vh) * 100 - 80px);

    ${ respondTo.sm } {
        max-height: calc(var(--vh) * 100 - 32px);
    }
`;

export default ModalPortal;
