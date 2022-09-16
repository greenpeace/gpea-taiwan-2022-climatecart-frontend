import { useEffect, useRef } from 'react';
import { useMatch } from 'react-router-dom';
import styled, { css } from 'styled-components';

// import { useAppStore } from '../../stores/appStore';
import { respondTo, sm, useRespondTo } from '../../utils/responsive';
import { withSubSlug } from '../../utils/withSubSlug';
// import CTAButton from './CTAButton';
import VoteforClimate from './VoteforClimate';

const RightSideNotifications = ({ moreMarginTop = false }) => {
    
    // const { setShowTicketForm, ticketsGot } = useAppStore();

    const rootRef = useRef();
    const containerRef = useRef();

    const prevPageYOffset = useRef(0);

    const homepageMatch = useMatch({ path: withSubSlug('/') });
    const isMobile = useRespondTo(sm);

    useEffect(() => {
        window.addEventListener('scroll', handleWindowScroll);
        return () => window.removeEventListener('scroll', handleWindowScroll);
    }, [homepageMatch, isMobile]) // eslint-disable-line

    function handleWindowScroll() {
        if (!rootRef.current) return;
        if (isMobile && !homepageMatch) return;

        const dom = rootRef.current;
        const containerDom = containerRef.current;

        const pageYOffset = Math.max(window.pageYOffset, 0);
        const delta = pageYOffset - prevPageYOffset.current;

        prevPageYOffset.current = pageYOffset;

        if (dom.getBoundingClientRect().top > 0) {
            containerDom.classList.toggle('-offset-y', false);
            return;
        }

        containerDom.classList.toggle('-offset-y', delta < 0);
    }

    // function handleTicketButtonClick() {
    //     setShowTicketForm(true);
    // }

    return (
        <StyledRightSideNotifications ref={rootRef}>
            <NotificationsContainer ref={containerRef} moreMarginTop={moreMarginTop}>
                <VoteforClimate />
                {/* { !ticketsGot &&
                    <CTAButton onClick={handleTicketButtonClick}>我要領券</CTAButton>
                } */}
            </NotificationsContainer>
        </StyledRightSideNotifications>
    )
}

const StyledRightSideNotifications = styled.div`
    position: sticky;
    top: 0;
    z-index: 2;
    height: 1px;
`

const NotificationsContainer = styled.div`
    position: absolute;
    top: 0px;
    right: 16px;

    display: flex;
    flex-direction: column;
    align-items: flex-end;

    transition: transform .3s;

    pointer-events: none;

    &.-offset-y {
        transform: translateY(100px);

        ${ respondTo.pad } {
            transform: translateY(70px);
        }
        
        ${({ moreMarginTop }) => moreMarginTop && css`
            transform: translateY(168px);

            ${ respondTo.pad } {
                transform: translateY(130px);
            }
        `}
    }

    >* {
        margin-top: 16px;
        pointer-events: all;
    }
`


export default RightSideNotifications