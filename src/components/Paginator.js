import React, { useEffect } from "react";
import { respondTo } from "../utils/responsive";
import styled, { css } from "styled-components";
import { PrevArrow, NextArrow } from '../components/Icons';

const Paginator = ({
    currentPage,
    lastPage,
    onPageClick,
    loading = false,
    ...props
}) => {
    useEffect(() => {
        if (!currentPage) return;
        onPageClick?.(Math.max(Math.min(lastPage, currentPage), 1));
    }, [lastPage]); // eslint-disable-line

    function handlePreviousClick(e) {
        e.preventDefault();
        if (!currentPage) return;
        onPageClick?.(Math.max(1, currentPage - 1));
    }

    function handleNextClick(e) {
        e.preventDefault();
        if (!currentPage) return;
        onPageClick?.(Math.min(lastPage, currentPage + 1));
    }

    function handlePageClick(e) {
        if (!currentPage) return;
        onPageClick?.(~~e.currentTarget.dataset["page"]);
    }

    return (
        <Root {...props} page={currentPage} loading={loading ? "loading" : ""}>
            <ArrowButton
                prev="prev"
                enabled={currentPage > 1}
                onClick={handlePreviousClick}
            >
                <PrevArrow />
            </ArrowButton>
            {currentPage - 3 > 0 && (
                <>
                    <NavButton
                        onClick={handlePageClick}
                        data-page={1}
                        isCurrent
                    >
                        {1}
                    </NavButton>
                    <SplitDot />
                </>
            )}
            {new Array(lastPage).fill(null).map((_, index) =>
                index + 1 >= currentPage - 2 && index + 1 <= currentPage + 2 ? (
                    <NavButton
                        key={index}
                        onClick={handlePageClick}
                        data-page={index + 1}
                        isCurrent={index + 1 === currentPage}
                    >
                        {index + 1}
                    </NavButton>
                ) : null
            )}
            {currentPage + 3 < lastPage && (
                <>
                    <SplitDot />
                    <NavButton onClick={handlePageClick} data-page={lastPage}>
                        {lastPage}
                    </NavButton>
                </>
            )}
            <ArrowButton
                next="next"
                enabled={currentPage < lastPage}
                onClick={handleNextClick}
            >
                <NextArrow />
            </ArrowButton>
        </Root>
    );
};

const Root = styled.nav`
    margin-top: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    ${respondTo.lg} {
        width: calc(100vw - 48px);
        margin: 60px auto 0 auto;
    }

    ${({ page }) =>
        page &&
        css`
            [data-page="${page}"] {
                font-weight: 500;
            }
        `}

    ${({ loading }) =>
        loading &&
        css`
            > * {
                opacity: 0.5;
                pointer-events: none;
            }
        `}
`;

const NavButton = styled.a`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 8px;

    line-height: 40px;
    font-size: 20px;
    font-weight: 400;
    color: var(--grey);

    transition: color 0.2s, background-color 0.2s;

    > svg {
        font-size: 1.4em;
    }

    &:hover {
        border-color: var(--primary);
    }

    ${({ isCurrent }) =>
        isCurrent &&
        css`
            color: var(--primary);
            font-weight: 500;
        `}
`;

const ArrowButton = styled(NavButton)`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: var(--primary);

    display: flex;
    align-items: center;
    justify-content: center;

    transition: 0.2s ease-out all;

    &:hover {
        transform: translate(4px, 4px);
    }

    ${(p) =>
        p.prev &&
        css`
            margin-right: auto;
        `}

    ${(p) =>
        p.next &&
        css`
            margin-left: auto;
        `}

    ${(p) =>
        !p.enabled &&
        css`
            pointer-events: none;
            background-color: var(--grey);
        `}
`;

const SplitDot = styled.span`
    margin: 0 6px;

    &::before {
        content: "...";
        font-size: 16px;
        font-weight: 700;
    }
`;

export default Paginator;
