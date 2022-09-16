import styled from 'styled-components';
import { imgUrl } from '../../utils/imgUrlWrapper';
import { respondTo } from '../../utils/responsive';

const Banner = () => {
    return (
        <StyledBanner>
            <div className="mask"></div>
            <h2>將未來變成你想要的樣子！</h2>
            <p>
                Every time you spend money, you’re casting a vote for the kind of world you want.<br />
                「你每一次的消費，都是在為你想要的世界投票。」<br />
                — Anne Lappe<br />
                美國作家與教育家，名列《 時代 》雜誌的生態環保名人榜
            </p>
        </StyledBanner>
    )
}

const StyledBanner = styled.div`
    padding: 120px 0;
    text-align: center;
    background-color: #F1F3F5;
    background-image: url(${imgUrl('/img/donation/landing.png')});
    background-size: cover;
    background-position: center 35%;
    color: var(--white);

    position: relative;

    .mask {
        position: absolute;
        z-index: 0;
        top: 0; left: 0; width: 100%; height: 100%;
        background-color: rgba(0,0,0,0.5);
    }

    h2, p {
        filter: drop-shadow(0 4px 4px rgba(0,0,0,0.5));
    }

    h2 {
        font-size: 36px;
        font-weight: 700;
        letter-spacing: .05em;

        ${respondTo.lg} {
            font-size: 24px;
            line-height: 34px;
        }
    }

    p {
        margin-top: 28px;
        font-size: 16px;
        line-height: 1.8em;

        ${respondTo.lg} {
            font-size: 14px;
            line-height: 24px;
            max-width: calc(100vw - 40px);
            margin: 0 auto;
            margin-top: 28px;
        }
    }
`
export default Banner