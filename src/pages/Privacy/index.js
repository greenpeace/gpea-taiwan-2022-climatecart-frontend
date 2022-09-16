import styled, { css } from 'styled-components';
import { respondTo } from '../../utils/responsive';
import { POLICY_ITEMS, PRIVACY_ITEMS } from './content';

import { Container } from '../../components/layouts';
import Title from '../../components/Title';

const Privacy = () => {
    return (
        <StyledPrivacy>
            <Title>隱私權政策</Title>
            <p>
                此政策適用於綠色和平網站的所有版面，但卻不適用於其他隱私政策有異的網站連結。
                <ol>
                    {POLICY_ITEMS.map((item, id) => <StyledListItem key={id} number={id + 1}>{item}</StyledListItem>)}
                    <div className='contacts'>
                        <h3>Greenpeace 綠色和平</h3>
                        <div>
                            電話：(02)-2361-2351<br />
                            傳真：(02)-2361-2033
                        </div>
                        <div>
                            10045 臺北市中正區重慶南路一段 109 號<br />
                            Email: inquiry.tw@greenpeace.org
                        </div>
                    </div>
                </ol>
            </p>

            <hr />

            <Title>綠色和平個人資料保護聲明</Title>
            <p>
                您的個人資料將絕對保密，為保障您的權益，謹依個人資料保護法第 8 條之規定告知下列事項：
                <ol>
                    {PRIVACY_ITEMS.map((item, id) => <StyledListItem key={id} number={id + 1}>{item}</StyledListItem>)}
                </ol>
                若您不希望收到綠色和平的資訊，請來電或以電子郵件通知。若您想修改個資，請傳真、電子郵件或致電綠色和平辦公室。
            </p>
        </StyledPrivacy>
    )
}

const StyledPrivacy = styled(Container)`
    padding-top: 80px;
    padding-bottom: 160px;

    ${respondTo.lg} {
        padding-top: 60px;
        padding-bottom: 120px;
    }

    p {
        margin-top: 40px;
        font-size: 16px;
        line-height: 1.75em;

        ${respondTo.lg} {
            margin-top: 32px;
            font-size: 14px;
            
        }
    }

    .contacts {
        margin: 20px auto;
        padding: 20px 24px;

        position: relative;
        width: min(640px, 100% - 48px);

        display: flex;
        flex-wrap: wrap;

        background-color: var(--white);

        ${respondTo.lg} {
            width: 100%;
            padding: 16px;
        }

        h3 {
            margin: 0;
            margin-bottom: 4px;
            width: 100%;
            font-size: 18px;
        }

        >div {
            font-size: 16px;
            font-weight: 500;
            margin-left: 64px;
            &:first-of-type { margin-left: 0 };

            ${respondTo.lg} {
                margin-left: 0;
                margin-top: 24px;

                &:first-of-type {
                    margin-top: 0;
                }
            }
        }
    }

    hr {
        margin: 60px 0;
        border: 0;
        border-bottom: 1px solid var(--grey);

        ${respondTo.lg} {
            margin: 40px 0;
        }
    }

`

const StyledListItem = styled.li`
    list-style-type: none;
    position: relative;
    padding-left: 1.10em;

    ${({ number }) => number && css`
        &::before {
            content: "${number}.";
            display: block;
            font-size: 1em;

            position: absolute;
            left: 0;
        }
    `}

`;

export default Privacy