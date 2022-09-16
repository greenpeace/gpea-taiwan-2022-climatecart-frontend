import { useMemo, useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { respondTo } from '../../utils/responsive';

import { useBearStore } from '../../stores/cartStore';
import { useHeaderScrollHandler } from '../../utils/useHeaderScrollHandler';
import { useAppStore } from '../../stores/appStore';

import Icons from '../Icons';
import { hoverEffect } from './hoverEffect';
import BubbleButton from './BubbleButton';
import Topics from './Topics';
import LinkWrapper from '../LinkWrapper';
import MobileMenuBtn from './MobileMenuBtn';
import MobileMenu from './MobileMenu';
import { imgUrl } from '../../utils/imgUrlWrapper';
import ModalPortal from '../ModalPortal';
import ButtonWithIcon from '../ButtonWithIcon';
import { withSubSlug } from '../../utils/withSubSlug';

const NavBar = () => {

    const prevTicketsGot = useRef(false);
    const prevTicketsCount = useRef(0);

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const [ ticketMessage, setTicketMessage ] = useState(null);
    
    const location = useLocation();
    const navigate = useNavigate();
    const { headerDomRef } = useHeaderScrollHandler({ navHeight: 164 });
    const myProducts = useBearStore(state => state.myProducts);
    const myTickets = useBearStore(state => state.myTickets);
    const topics = useBearStore(state => state.topics);
    const { ticketsGot, setShowTicketForm } = useAppStore();
    
    const showTopics = useMemo(() =>
        location.pathname === '/products' ||
        location.pathname.includes("/topics") ||
        location.pathname.includes('/product')
        , [location])

    const ticketsCount = useMemo(() => {
        if (!ticketsGot) return null;
        let count = myTickets;
        myProducts.forEach(product => {
            count -= product.attributes.price
        })
        return count;
    }, [myProducts, myTickets, ticketsGot])

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location])

    useEffect(() => {
        function confirmation(e) {
            var dialogText = '系統會清空你目前的選物紀錄！';
            e.returnValue = dialogText;
            return dialogText;
        };
        
        window.onbeforeunload = myProducts.length > 0 ? confirmation : undefined;
    }, [myProducts])

    useEffect(() => {
        if (!prevTicketsGot.current && ticketsGot) {
            setTimeout(handleTicketButtonClick, 300);
            prevTicketsGot.current = true;   
        }
    }, [ticketsGot]) // eslint-disable-line

    useEffect(() => {
        if (prevTicketsCount.current === ticketsCount) return;
        if (!ticketsGot) return;
        
        prevTicketsCount.current = ticketsCount;

        if (location.pathname === withSubSlug('/cart')) return;

        if (ticketsCount <= 0) {
            setTimeout(handleTicketButtonClick, 300);
        }
    }, [ticketsCount, location, ticketsGot]); // eslint-disable-line

    function handleTicketButtonClick() {
        if (!ticketsGot) {
            setShowTicketForm(true);
            return;
        }

        if (ticketsCount >= 5) {
            setTicketMessage({
                message: '您已獲得 5 張好政券囉!\n馬上去逛逛吧！',
                buttonLabel: '前往訂製',
                buttonToPath: '/products'
            });
        }
        else if (ticketsCount > 0) {
            setTicketMessage({
                message: `您已使用了 ${5 - ticketsCount} 張好政券囉！\n再去逛逛有什麼商品吧！`,
                buttonLabel: '前往訂製',
                buttonToPath: '/products'
            });
        }
        else if (ticketsCount <= 0) {
            setTicketMessage({
                message: '你的理想生活藍圖已經成形！\n馬上去填寫收件人資訊吧！',
                buttonLabel: '立即前往',
                buttonToPath: '/cart'
            });
        }
        else {
            setShowTicketForm(true);
        }
    }

    function handleTicketAwayClick() {
        setTicketMessage(null);
    }

    function handleGoShoppingButtonClick() {
        navigate(withSubSlug(ticketMessage.buttonToPath));
        setTicketMessage(null);
    }

    return (
        <StyledNavBar ref={headerDomRef} bottomBorder={!showTopics}>
            <MobileMenu isOpen={isMobileMenuOpen} topics={topics} />
            <h1>GreenPeace 綠色和平｜政見選物所 Politics Select Shop</h1>

            <div className="inner">
                <LinkWrapper to='/' className="logo">
                    <img src={imgUrl('/img/logo.svg')} alt='GREENPLACE 綠色和平' />
                </LinkWrapper>

                <PCLinks className="links--pc">
                    <LinkWrapper navLink to='/#topics'>主題精選</LinkWrapper>
                    <LinkWrapper navLink to='/products'>全品項一覽</LinkWrapper>
                    <LinkWrapper navLink to='/donate'>選物概念</LinkWrapper>
                    <BubbleButton Icon={Icons.Ticket} count={ticketsCount} onClick={handleTicketButtonClick} highlight={!ticketsGot} />
                    <LinkWrapper className='-no-deco' to="/cart">
                        <BubbleButton Icon={Icons.Cart} count={location.pathname !== '/order-completed' ? myProducts.length || null : 0} />
                    </LinkWrapper>
                </PCLinks>
                <MobileLinks className="links--mobile">
                    <BubbleButton Icon={Icons.Ticket} count={ticketsCount} onClick={handleTicketButtonClick} highlight={!ticketsGot} />
                    <LinkWrapper className='-no-deco' to="/cart">
                        <BubbleButton Icon={Icons.Cart} count={location.pathname !== '/order-completed' ? myProducts.length || null : 0} />
                    </LinkWrapper>
                    <MobileMenuBtn
                        isActive={isMobileMenuOpen}
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    />
                </MobileLinks>

            </div>

            {showTopics && <Topics />}

            { ticketMessage &&
                <ModalPortal isVisible={true} onClickAway={handleTicketAwayClick}>
                    <TicketMessage>
                        <div className="content">{ ticketMessage.message }</div>
                        <ButtonWithIcon theme='white' onClick={handleGoShoppingButtonClick}>{ ticketMessage.buttonLabel }</ButtonWithIcon>
                    </TicketMessage>
                </ModalPortal>
            }

        </StyledNavBar>
    )
}

const StyledNavBar = styled.header`
    position: sticky;
    top: 0;
    z-index: var(--z-index-navbar);

    >h1 {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
    }

    .inner {
        width: 100%;
        height: 100px;
        background-color: white;
        position: relative;
        z-index: var(--z-index-navbar);

        padding-left: 80px;
        padding-right: 40px;
        
        display: flex;
        align-items: center;

        ${p => p.bottomBorder && css`
            border-bottom: 1.5px solid var(--green-300);
        `}
    }

    ${respondTo.lg} {
        .inner {
            padding-left: 40px;
        }
    }


    ${respondTo.pad} {
        .links--pc {
            display: none;
        }

        .inner {
            height: 70px;
            padding: 0 16px;
            padding-top: 4px;
        }

        .logo {
            img {
                max-height: 22px;
            }
        }
    }

    ${ respondTo.xs } {
        .logo {
            width: 160px;
            img {
                width: 160px;
            }
        }
    }
`

const PCLinks = styled.nav`
    margin-left: auto;

    display: flex;
    align-items: center;

    >a, >button {
        margin-left: 60px;
        display: inline-block;
        line-height: 24px;
        font-size: 18px;

        &:first-child {
            margin-left: 0;
        }

        &:hover {
            color: var(--primary);
        }
    }

    >a {
        &:not(.-no-deco) {
            ${hoverEffect};
        }

        &.active::after {
            opacity: 1;
            transform: translateY(0);
        }
    }

    ${ respondTo.lg } {
        >a, >button {
            margin-left: 40px;
        }
    }
`;

const MobileLinks = styled.nav`
    margin-left: auto;

    display: flex;
    align-items: center;
    gap: 24px;

    display: none;
    
    ${respondTo.pad} {
        display: flex;
    }
`;

const TicketMessage = styled.div`
    padding: 40px 0;
    width: min(100vw - 32px, 520px);
    background: linear-gradient(40.14deg, rgba(255, 255, 255, 0.675) 0%, rgba(255, 255, 255, 0.9) 100%);
    backdrop-filter: blur(12px);

    border-radius: 20px;
    text-align: center;

    .content {
        white-space: pre-line;
        font-weight: 700;
        font-size: 20px;
        line-height: 32px;
    }

    button {
        margin: 0 auto;
        margin-top: 28px;
        background: rgba(255, 255, 255, 0.6);
        border: 1.5px solid #FFFFFF;
    }

    ${ respondTo.sm } {
        .content {
            font-size: 16px;
            line-height: 24px;
        }
    }
`

export default NavBar