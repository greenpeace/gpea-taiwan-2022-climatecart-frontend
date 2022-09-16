import styled from 'styled-components';
import { respondTo } from '../../utils/responsive';
import ElectionCountdown from '../../components/ElectionCountdown';
import { imgUrl } from '../../utils/imgUrlWrapper';

const NextBig = () => {
    return (
        <StyledNextBig>
            <div className="wording">
                <h2>使用好政券，兌現好政見</h2>
                <p>
                    在政見選物所，你可以使用「好政券」支持好政見<br/>
                    別忘了，在生活中你也能發揮一己之力<br/>
                    讓理想的氣候與環境，真實兌現
                </p>
            </div>
            <StyledElectionCountdown />
            <ElectionDay>選舉投票日：2022 年 11 月 26 日</ElectionDay>
            <QuoteBlock>
                <p className='wording'>
                    為你想要的世界投票<br />
                    成就你想看見的未來
                </p>
            </QuoteBlock>
        </StyledNextBig>
    )
}

const StyledNextBig = styled.div`

    padding: 90px 0;

    ${respondTo.lg} {
        padding-top: 80px;
        padding-bottom: 60px;
    }
    
    >.wording {
        text-align: center;

        ${respondTo.lg} {
            width: calc(100vw - 40px);
            margin: 0 auto;
        }
    }


    >.wording > h2 {
        font-size: 28px;
        font-weight: 700;
        line-height: 1.6em;

        ${respondTo.lg} {
            font-size: 18px;
            line-height: 2em;
        }
    }

    >.wording > p {
        margin-top: 16px;

        font-size: 16px;
        font-weight: 400;
        line-height: 1.8em;

        ${respondTo.lg} {
            font-size: 14px;
            line-height: 24px;
        }
    }
`

const StyledElectionCountdown = styled(ElectionCountdown)`
    margin-top: 80px;

    ${respondTo.lg} {
        margin-top: 40px;
    }
`

const ElectionDay = styled.div`
    margin-top: 24px;
    font-size: 16px;
    letter-spacing: 0.05em;
    text-align: center;

    ${respondTo.lg} {
        font-size: 14px;
    }
`

const QuoteBlock = styled.div`
    margin: 0 auto;
    margin-top: 80px;

    position: relative;

    border-radius: 5px;
    width: min(844px, 100% - 48px);
    padding: 96px 100px;
    background-color: var(--white-100);
    background-image: url(${imgUrl('/img/next-big-quote.png')});
    background-size: contain;
    background-position: 100% center;
    background-repeat: no-repeat;

    ${respondTo.lg} {
        width: min(440px, calc(100vw - 40px));
        margin: 90px auto 0 auto;
        padding: 40px 24px;
        background-image: url(${imgUrl('/img/next-big-quote-mobile.png')});
    }

    >.wording {
        margin: 0;
        
        position: relative;
        font-size: 20px;
        font-weight: 700;
        line-height: 2.7em;
        display: inline-block;

        background-size: 20px 2.7em;
        background-position-y: -8px;
        background-image:  repeating-linear-gradient(0deg, var(--green-300), var(--green-300) 2px, rgba(0,0,0,0) 1px, rgba(0,0,0,0));

        ${respondTo.lg} {
            padding: 0 8px;
            font-size: 16px;
            line-height: 24px;
            background-image: none;
        }

        &::before, &::after {
            position: absolute;
            top: -12px;
            color: var(--primary);
            font-size: 24px;

            ${respondTo.lg} {
                font-size: 18px;
            }
        }

        &::before {
            content: '“';
            left: -24px;

            ${respondTo.lg} {
                left: -9px;
            }

        }

        &::after {
            content: '”';
            right: -24px;

            ${respondTo.lg} {
                right: -9px;
            }
        }
    }

    >button {
        position: absolute;
        right: 20px;
        bottom: 20px;

        display: flex;
        justify-content: center;
        align-items: center;

        width: 48px;
        height: 48px;
        background-color: var(--primary);
        border-radius: 50em;

        color: white;

        &:hover {
            background-color: var(--green-100);
        }

        ${respondTo.lg} {
            height: 24px;
            width: 24px;

            svg {
                height: 12px;
            }
        }
    }
`

export default NextBig