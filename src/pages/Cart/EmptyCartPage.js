import styled from 'styled-components';
import { respondTo } from '../../utils/responsive';

import { Container } from '../../components/layouts';
import { Arrow } from '../../components/Icons';
import LinkWrapper from '../../components/LinkWrapper';
import BasicButton from '../../components/BasicButton';
import { imgUrl } from '../../utils/imgUrlWrapper';

const buttons = [
    {
        to: '/',
        label: '回首頁'
    },
    {
        to: '/products',
        label: '挖掘有趣政見'
    }
]

const EmptyCartPage = () => {
    return (
        <StyledContainer>
            <div className="img">
                <img src={imgUrl('/img/empty-cart.svg')} alt='您尚未訂製任何政見'/>
            </div>
            <div className="actions">
                <p>您尚未訂製任何政見</p>
                <div className="buttons">
                    {
                        buttons.map((btn, id) => (
                            <LinkWrapper to={btn.to} key={id}>
                                <BasicButton Icon={Arrow} iconPos="right" theme="lightGreen">
                                    {btn.label}
                                </BasicButton>
                            </LinkWrapper>
                        ))
                    }
                </div>
            </div>
        </StyledContainer>
    )
}

const StyledContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 110px;

    padding: 160px 0;
    min-height: calc(100vh - 500px);

    ${respondTo.lg} {
        flex-direction: column;
        gap: 48px;
        padding: 90px 36px 120px 36px;
    }

    .img {
        height: 400px;
        width: 436px;

        display: flex;
        align-items: center;
        justify-content: center;

        position: relative;

        >img {
            max-width: 100%;
        }

        ${respondTo.lg} {
            width: 300px;
            height: 265px;
        }

        ${ respondTo.sm } {
            width: 200px;
            height: 140px;
        }
    }

    .actions {
        p {
            font-weight: 700;
            margin-bottom: 24px;
            font-size: 20px;

            ${respondTo.lg} {
                margin-bottom: 28px;
            }
        }
    }

    .buttons {
        display: flex;
        align-items: center;
        gap: 28px;

        ${respondTo.lg} {
            flex-direction: column;
            gap: 20px;
        }
    }

`;
export default EmptyCartPage;