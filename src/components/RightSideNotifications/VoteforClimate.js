import { useRef } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { useAppStore } from '../../stores/appStore';
import { imgUrl } from '../../utils/imgUrlWrapper';
import { useRespondTo, sm } from '../../utils/responsive';
import { withSubSlug } from '../../utils/withSubSlug';
import Icons from '../Icons';
import CTAButton from './CTAButton';

const VoteforClimate = () => {

    const panelRef = useRef();
    const { donateNodification, clearDonateNodification } = useAppStore();
    const navigate = useNavigate();

    const homepageMatch = useMatch({ path: withSubSlug('/') });
    const isMobile = useRespondTo(sm);

    function handleCloseClick(e) {
        e?.stopPropagation();
        
        const panelDom = panelRef.current;

        panelDom?.classList.toggle('-closed', true);
        setTimeout(() => {
            clearDonateNodification();
        }, 500);
    }

    function handleClick(e) {
        handleCloseClick();
        navigate(withSubSlug('/donate'));
    }

    if (!donateNodification) return null;

    if (!homepageMatch) return (
        isMobile ? 
            <MobileLink to={withSubSlug('/donate')}>Vote For Climate</MobileLink>:
            <CTAButton onClick={handleClick}>Vote for Climate</CTAButton>
    )

    return (
        <Panel ref={panelRef} onClick={handleClick}>
            <img src={imgUrl('/img/donate-badge.png')} alt="Vote For Climate 徽章" />
            <p>
                捐款支持綠色和平，即贈 Vote For Climate 徽章，一起當地球隊！
            </p>
            <button onClick={handleCloseClick}><Icons.Close /></button>
        </Panel>
    )
}


const closeAnim = keyframes`
    to {
        opacity: 0;
        transform: translateX(50%);
    }
`

const Panel = styled.div`
    cursor: pointer;
    position: relative;

    width: min(300px, 100% - 48px);
    padding: 20px;
    padding-right: 40px;
    border-radius: 10px;
    display: flex;
    
    color: var(--white-100);
    background-color: var(--primary);

    >img {
        width: 56px;
        height: 56px;
        object-fit: contain;
    }

    >p {
        margin: 0;
        margin-left: 16px;
        font-size: 14px;
        font-weight: 700;
        line-height: 1.5em;
    }

    >button {
        position: absolute;
        top: 12px;
        right: 12px;
        padding: 0;
    }

    &.-closed {
        pointer-events: none;
        animation: ${ closeAnim } .3s ease-out forwards;
    }
`

const MobileLink = styled(Link)`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 16px 0;

    background-color: var(--primary);
    color: white;

    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    text-align: center;
`

export default VoteforClimate