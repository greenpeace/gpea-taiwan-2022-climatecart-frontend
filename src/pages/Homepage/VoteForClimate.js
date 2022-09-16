import styled from 'styled-components';
import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';

import { respondTo, lg, useRespondTo, respondFrom } from '../../utils/responsive';
import Title from '../../components/Title';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import Icons from '../../components/Icons';
import { GET_KOL_PROMOTES } from '../../queries';
import Image from '../../components/Image';
import { Link } from 'react-router-dom';
import { withSubSlug } from '../../utils/withSubSlug';

const PC_SLIDER_SETTING = {
    arrows: false,
    variableWidth: true,
    infinite: false,
    slidesToScroll: 2
};

const MOBILE_SLIDER_SETTING = {
    arrows: false,
    variableWidth: true,
    infinite: true,
    slidesToScroll: 1,
    centerMode: true
}

const VoteForClimate = () => {
    const isMobile = useRespondTo(lg);
    const { data: kolsData } = useQuery(GET_KOL_PROMOTES);

    const currentSliderSetting = useMemo(() => {
        if (isMobile) return MOBILE_SLIDER_SETTING;
        return PC_SLIDER_SETTING;
    }, [isMobile]);

    const kols = useMemo(() => {
        if (!kolsData) return [];
        return kolsData.kolPromotes.data.map(kol => ({
            name: kol.attributes.name,
            title: kol.attributes.title,
            image: kol.attributes.image.data.attributes.url,
            content: kol.attributes.content,
        }));
    }, [kolsData])

    return (
        <StyledVoteForClimate>
            <Title>好友分享</Title>
            <Subtitle>看看他們訂製的理想生活</Subtitle>
            <SliderContainer>
                <Slider {...currentSliderSetting}>
                    {kols.map((item, index) =>
                        <SliderItem key={index}>
                            <div className="image-container">
                                <Image src={item.image} alt={item.name} />
                                <div className="content">「{item.content}」</div>
                            </div>
                            <div>
                                <span className="name">{item.name}</span>｜<span>{item.title}</span>
                                <div className="mobile-content">「{item.content}」</div>
                            </div>
                        </SliderItem>
                    )}
                </Slider>
            </SliderContainer>
            <CTAWord>
                一起當地球隊！<br/>
                捐款支持綠色和平<br className='-mobile-only'/>
                即贈<b>「Vote For Earth」</b>限量徽章
            </CTAWord>
            <Link to={withSubSlug('/donate')}>
                <StyledButtonWithIcon Icon={Icons.Arrow} theme='orange' center >我想捐款</StyledButtonWithIcon>
            </Link>
        </StyledVoteForClimate>
    )
}

const StyledVoteForClimate = styled.div`
    padding-top: 90px;
    padding-bottom: 100px;
    overflow-x: hidden;

    ${respondTo.lg} {
        padding: 60px 0;
    }
`

const Subtitle = styled.h3`
    margin-top: 60px;
    font-size: 16px;
    font-weight: 400;
    text-align: center;

    ${respondTo.lg} {
        margin-top: 32px;
    }
`

const SliderContainer = styled.div`
    margin: 40px auto;
    width: min(1280px, 100% - 48px);

    ${respondTo.lg} {
        margin: 24px auto 48px auto;
    }

    .slick-list {
        overflow: visible;
    }

    .slick-track {
        display: flex !important;

        ${ respondTo.md } {
            margin: 0;
        }
    }

    .slick-slide {
        ${respondTo.lg} {
            --width: 280px;
            --padding: 12px;
            width: calc(var(--width) + (var(--padding) * 2));
            padding: 0 var(--padding);
        }
    }
`

const SliderItem = styled.div`

    position: relative;

    font-size: 16px;
    letter-spacing: .05em;
    margin-right: 48px;
    outline: none !important;

    ${respondTo.lg} {
        margin-right: 0;
    }

    .mobile-content {
        display: none;
        
        ${respondTo.lg} {
            display: block;

            font-size: 14px;
            line-height: 20px;
            margin-top: 12px;
        }
    }


    .image-container {
        position: relative;
    }

    img {
        border-radius: 10px;
        width: 280px;
        height: 300px;
        object-fit: cover;
    }

    >div {
        margin-top: 16px;
    }

    .name {
        font-weight: 700;
    }

    .content {
        position: absolute;
        left: 36px;
        bottom: 24px;
        z-index: 5;

        width: min(320px, 100vw - 48px);
        background-color: var(--white-100);
        border-radius: 10px;
        padding: 16px;
        pointer-events: none;

        line-height: 1.5;

        transition: opacity .2s, transform .2s;

        ${respondTo.lg} {
            display: none;
        }
    }

    &:not(:hover) .content {
        opacity: 0;
        transform: translateY(4px);
    }
`

const CTAWord = styled.div`
    margin-top: 60px;
    
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    line-height: 1.6em;

    ${respondTo.lg} {
        font-size: 18px;
        line-height: 28px;
        max-width: calc(100vw - 40px);
        margin: 0 auto;
    }

    b {
        font-size: 22px;
    }

    .-mobile-only {
        ${ respondFrom.md } {
            display: none;
        }
    }
`

const StyledButtonWithIcon = styled(ButtonWithIcon)`
    margin-top: 28px;

    ${respondTo.lg} {
        margin-top: 40px;
    }
`


export default VoteForClimate