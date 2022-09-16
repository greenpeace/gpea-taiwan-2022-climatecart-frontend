import styled from 'styled-components';
import { respondTo } from '../../utils/responsive';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import Icons from '../../components/Icons';
import { Container } from '../../components/layouts';
import Title from '../../components/Title';

const ContactUs = () => {
    return (
        <StyledContactUs>
            <Title>聯絡我們</Title>
            <Content>
                <h3>選舉期間合作</h3>
                <p>
                    如果您是選舉候選人與團隊，願意支持綠色和平推廣的氣候環保政見，歡迎寄信至
                    <a href='mailto:inquiry.tw@greenpeace.org'>inquiry.tw@greenpeace.org</a>
                </p>

                <h3>會員服務</h3>
                <p>
                    會員專線：(02)-2361-2351<br />
                    (服務時間：週一至週五，上午 10 點至下午 6 點)
                </p>

                <h3>其他合作與建議</h3>
                <p>
                    如有環境專案、合作邀約、意見分享或其他建議，請寄信至
                    <a href='mailto:inquiry.tw@greenpeace.org'>inquiry.tw@greenpeace.org</a>
                </p>

                <div className="buttons">
                    <ButtonWithIcon theme='white' Icon={Icons.Arrow}>講座邀約</ButtonWithIcon>
                    <ButtonWithIcon theme='white' Icon={Icons.Arrow}>講座邀約</ButtonWithIcon>
                </div>
            </Content>
        </StyledContactUs>
    )
}

const StyledContactUs = styled.div`
    padding-top: 80px;
    padding-bottom: 160px;

    ${respondTo.lg} {
        padding-top: 60px;
        padding-bottom: 120px;
    }
`

const Content = styled(Container)`
    padding-top: 20px;

    ${respondTo.lg} {
        padding-top: 0px;
    }

    h3 {
        margin-top: 40px;
        margin-bottom: 0;
        font-size: 20px;

        ${respondTo.lg} {
            &:first-of-type {
                margin-top: 32px;
            }
        }

    }

    h3::before {
        content: '';
        margin: 0 12px;
        position: relative;
        top: -3px;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50em;
        background-color: var(--green-300);

    }

    p {
        margin-top: 16px;
        font-size: 16px;
        line-height: 1.6;
    }

    a {
        font-weight: 700;
        text-decoration: underline;
        margin: 0 4px;
    }

    .buttons {
        margin-top: 28px;
        display: flex;

        >* {
            margin-left: 28px;
            &:first-child { margin-left: 0; }
        }

        ${respondTo.lg} {
            flex-direction: column;
            align-items: center;
            gap: 20px;

            >* {
                margin-left: 0;
            }
        }
    }
`

export default ContactUs