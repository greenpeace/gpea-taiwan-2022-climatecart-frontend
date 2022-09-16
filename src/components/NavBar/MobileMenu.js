import styled, { css, keyframes } from "styled-components";
import { useState, useEffect } from "react";
import LinkWrapper from "../LinkWrapper";

import { CollapseArrow, Facebook, Instagram, Line, YouTube } from "../Icons";
import { respondFrom } from "../../utils/responsive";
import { useMemo } from "react";
import { vh } from "../../utils/vhfix";

const SNS_ITEMS = [
    {
        Icon: Facebook,
        path: "https://www.facebook.com/greenpeace.org.tw/",
    },
    {
        Icon: YouTube,
        path: "https://www.youtube.com/channel/UCuxqIuQqkmKzaf4q3RnXqWg",
    },
    {
        Icon: Instagram,
        path: "https://www.instagram.com/greenpeace_tw/?hl=zh-tw",
    },
    {
        Icon: Line,
        path: "https://page.line.me/784kpkzx",
    },
];

const MENU_ITEMS = [
    {
        label: "主題精選",
        path: "/#topics",
        children: null,
    },
    {
        label: "全品項一覽",
        path: "/products",
    },
    {
        label: "選物概念",
        path: "/donate",
    },
];

const MobileMenu = ({ isOpen, topics = [], ...props }) => {

    useEffect(() => {
        const root = document.querySelector('#root');

        if (isOpen) {
            root.classList.add('is--locked');
        } else {
            root.classList.remove('is--locked');
        }
    }, [isOpen])

    const menuItems = useMemo(() => {

        if (topics) {   
            const topicsList = topics.map(topic => ({
                label: topic.attributes.name,
                path: `/topics/${topic.id}`
            }))
            
            MENU_ITEMS[0].children = topicsList;
        }

        return MENU_ITEMS;

    }, [topics]);

    return (
        <StyledContainer isOpen={isOpen}>
            <div className="menu__inner">
                <div className="menu__list">
                    {menuItems.map((item, id) => (
                        <MenuItem item={item} key={id} />
                    ))}
                </div>
                <SNSLinks className="sns-group">
                    <p>FOLOW US ON</p>
                    <ul>
                        {SNS_ITEMS.map((link, id) => (
                            <SNSItem key={id} link={link} />
                        ))}
                    </ul>
                </SNSLinks>
            </div>
        </StyledContainer>
    );
};

const MenuItem = ({ item, ...props }) => {
    const { label, path, children } = item;
    const [isSublistOpen, setIsSublistOpen] = useState(false);
    return (
        <StyledMenuItem {...props} isSublistOpen={isSublistOpen}>
            <button>
                {children ? (
                    <p
                        className="menu__collapse"
                        onClick={() => setIsSublistOpen(!isSublistOpen)}
                    >
                        {label}
                        {children && <CollapseArrow />}
                    </p>
                ) : (
                    <LinkWrapper to={path}>{label}</LinkWrapper>
                )}
            </button>
            {children && (
                <StyledChildrenContainer isOpen={isSublistOpen}>
                    {children.map((child, id) => (
                        <li key={id}>
                            <LinkWrapper to={child.path}>
                                {child.label}
                            </LinkWrapper>
                        </li>
                    ))}
                </StyledChildrenContainer>
            )}
        </StyledMenuItem>
    );
};

const SNSItem = ({ link, ...props }) => {
    const Icon = link.Icon;

    return (
        <a href={link.path} target="_blank" rel='noreferrer' {...props}>
            <Icon />
        </a>
    )
}

const StyledContainer = styled.div`
    position: fixed;
    width: 100vw;
    ${ vh('height', 100, -70) };
    top: 70px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: white;

    transform: translateY(-140%);
    transition: transform 0.4s ease-out;

    overflow-x: none;
    overflow-y: auto;

    ${({ isOpen }) =>
        isOpen &&
        css`
            transform: translateY(0);
        `}

    .menu__inner {
        margin: 0 auto;
        min-height: 100%;
        padding-top: 60px;
        padding-bottom: 40px;

        display: flex;
        flex-direction: column;
        gap: 0.1em;
    }

    ${ respondFrom.pad } {
        display: none;
    }

`;

const StyledMenuItem = styled.div`
    text-align: center;

    font-size: 20px;
    line-height: 28px;

    svg {
        transform-origin: center;
        transition: transform 0.4s ease-out;
    }

    ${({ isSublistOpen }) =>
        isSublistOpen &&
        css`
            .menu__collapse svg {
                transform: translateX(100%) rotate(180deg) !important;
            }

            button {
                border: none !important;
            }
        `}

    button {
        width: calc(100% - 54px);
        padding: 20px 0;
        border-bottom: 1px solid var(--green-300);

    }

    .menu__collapse {
        width: fit-content;
        display: flex;
        align-items: center;
        position: relative;
        margin: 0 auto;
        svg {
            position: absolute;
            right: 0;
            transform: translateX(100%);
        }
    }

    &:last-of-type {
        button {
            border: none;
        }
    }
`;

const contentEnter = keyframes`
    from {
        opacity: 0;
        transform: translateY(-16px);
    }
`;

const StyledChildrenContainer = styled.ul`
    width: 100vw;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 32px;
    justify-items: center;

    background-color: var(--white-100);

    font-size: 16px;
    line-height: 24px;
    padding: 32px 40px;

    display: none;
    animation: ${contentEnter} 0.3s ease-out;

    ${({ isOpen }) =>
        isOpen &&
        css`
            display: grid;
        `}
`;

const SNSLinks = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    margin: auto auto 40px auto;

    ul {
        display: flex;
        gap: 30px;
    }
`;

export default MobileMenu;
