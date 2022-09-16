import styled, { css } from 'styled-components';

import { imgUrl } from '../utils/imgUrlWrapper';
import { respondTo } from '../utils/responsive';

import ButtonWithIcon from './ButtonWithIcon';
import Icons from './Icons';

const BottomBannerBlock = ({
    title = '關於綠色和平',
    children = <>
        綠色和平致力於為地球發聲，我們的存在是因為脆弱的地球需要改變、需要行動。<br />
        但保護地球的使命不能僅靠綠色和平來完成，您就是改變世界的力量！
    </>,
    buttonLabel = 'ABOUT US',
    buttonTo = 'https://www.greenpeace.org/taiwan/',
    bgImage = imgUrl('/img/about-block-bg.jpg')
}) => {
    return (
        <StyledBottomBannerBlock bgImage={bgImage}>
            <h2>{title}</h2>
            <p>{children}</p>
            { (buttonTo.indexOf('http') === 0) ?
                <a href={buttonTo} target='_blank' rel='noreferrer'>
                    <StyledButtonWithIcon
                        center theme='white' Icon={Icons.Arrow}
                    >{buttonLabel}</StyledButtonWithIcon>
                </a>:
                <></>
             }
        </StyledBottomBannerBlock>
    )
}

const StyledBottomBannerBlock = styled.div`
    padding: 120px 0;
    margin-bottom: -1px;
    
    background-position: center;
    background-size: cover;
    color: white;

    text-align: center;
    font-size: 20px;
    line-height: 1.6;


    ${respondTo.lg} {
        font-size: 16px;
    }

    h2 {
        margin: 0;
        font-size: 28px;

        ${respondTo.lg} {
            font-size: 24px;
        }
    }

    p {
        margin: 0 auto;
        margin-top: 24px;
        width: min(756px, 100vw - 48px);

        ${respondTo.lg} {
            margin-top: 1em;
            width: calc(100vw - 40px);
        }
    }

    ${p => p.bgImage && css`
        background-image: url(${p.bgImage});
    `}

`


const StyledButtonWithIcon = styled(ButtonWithIcon)`
    margin-top: 40px;
`

export default BottomBannerBlock