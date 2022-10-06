import styled from "styled-components";
import { respondTo } from '../../utils/responsive';
import { useBearStore } from "../../stores/cartStore";

import { Leaf, Bag } from "../../components/Icons";
import BasicButton from "../../components/BasicButton";
import PriceText from "../../components/PriceText";
import { numberWithCommas } from "../../utils/numberWithCommas";

const OrderInfoBox = ({ total, carbonReduction, openSuggestionsModal, ...props }) => {
    const myTickets = useBearStore((state) => state.myTickets);
    const hasError = total > myTickets;


    return (
        <StyledContainer {...props}>
            <div className="title">
                <p>訂製摘要</p>
            </div>
            <div className="info">
                <p className="total">
                    <span>合計抵扣</span>
                    <PriceText className="price-text" price={total} />
                </p>
                <p className="carbon">
                    <span>
                        <Leaf />
                        減碳力相當於種下 
                    </span>
                    <span>
                        <strong>{numberWithCommas(carbonReduction)}</strong> 萬棵樟樹
                    </span>
                </p>
            </div>
            <StyledErrorMessage isVisible={hasError}>
                您所選的好政見超過好政券數量，請進行刪減
            </StyledErrorMessage>
            <BasicButton
                className="checkout-btn"
                theme="orange"
                Icon={Bag}
                iconPos="left"
                onClick={openSuggestionsModal}
                disabled={hasError}
            >
                確認訂製
            </BasicButton>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    background-color: white;
    border-radius: 5px;
    padding: 32px 24px 40px 24px;

    ${ respondTo.sm } {
        padding: 24px 24px 24px 24px;
    }

    .title {
        padding-bottom: 24px;
        border-bottom: 1px solid var(--grey);

        p {
            font-size: 20px;
            line-height: 28px;
            font-weight: 700;

            position: relative;
            padding-left: 20px;

            &:before {
                content: "";
                display: block;

                height: 8px;
                width: 8px;
                border-radius: 50%;
                background-color: var(--green-300);

                position: absolute;
                top: 8px;
                left: 0;
            }

            ${respondTo.lg} {
                font-size: 18px;
            }
        }

        ${ respondTo.sm } {
            padding-bottom: 12px;

            p {
                font-size: 16px;
            }
        }
    }

    .info {
        padding-top: 24px;
    }

    .total {
        display: flex;
        justify-content: space-between;
        margin-bottom: 24px;

        ${respondTo.lg} {
            margin-bottom: 16px;
        }
    }

    .price-text {
        font-size: 20px;

        ${respondTo.lg} {
            font-size: 18px;
        }

        ${ respondTo.sm } {
            font-size: 16px;
        }
    }

    .carbon {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 24px;

        span {
            display: flex;
            align-items: flex-end;

            svg {
                margin-right: 10px;

                ${respondTo.lg} {
                    margin-right: 4px;
                }
            }
        }

        strong {
            position: relative;
            top: 3px;
            font-size: 28px;
            font-weight: 700;
            color: var(--primary);
            margin-right: 0.3em;
        }
    }

    .checkout-btn {
        margin: 0 auto;
    }
`;

const StyledErrorMessage = styled.p`
    color: var(--secondary);
    text-align: right;
    margin: 26px 0 20px 0;

    display: none;

    ${({ isVisible }) => isVisible && `display: block;`}
`;

export default OrderInfoBox;
