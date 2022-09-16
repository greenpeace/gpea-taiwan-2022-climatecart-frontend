import styled from "styled-components";
import { respondTo } from '../../utils/responsive';

import BasicButton from "../../components/BasicButton";
import ImageWrapper from "../../components/Image";
import { Cart, Leaf } from "../../components/Icons";
import { numberWithCommas } from "../../utils/numberWithCommas";

const FreebieRow = ({ item, onAddbtnClick, isDisabled, ...props }) => {
    const {
        attributes: {
            name,
            carbon_reduction,
            price,
            image: {
                data: {
                    attributes: { url },
                },
            },
        },
    } = item;


    return (
        <StyledContainer>
            <div className="wrapper">
                <div className="image-container">
                    <ImageWrapper src={url} alt={name} />
                </div>
                <div className="content">
                    <div className="info">
                        <h4>{name}</h4>
                        <p className="carbon">
                            <Leaf />
                            <strong>{numberWithCommas(carbon_reduction)}</strong>萬棵樟樹
                        </p>
                    </div>
                    <div className="cta">
                        <p className="price">
                            <strike>$ {price} /張 好政券</strike>
                        </p>
                        <BasicButton
                            Icon={Cart}
                            iconPos="left"
                            theme="orange"
                            onClick={onAddbtnClick}
                            disabled={isDisabled}
                            className="btn is--pc"
                        >
                            最後加選
                        </BasicButton>
                    </div>
                </div>
            </div>
            <BasicButton
                Icon={Cart}
                iconPos="left"
                theme="orange"
                onClick={onAddbtnClick}
                disabled={isDisabled}
                className="btn is--mobile"
            >
                最後加選
            </BasicButton>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    border-bottom: 1px solid var(--white);

    .is--pc {
        ${respondTo.lg} {
            display: none;
        }
    }

    .is--mobile {
        display: none;

        ${respondTo.lg} {
            display: flex;
        }
    }


    &:last-of-type {
        border-bottom: none;
        padding-bottom: 0;
    }

    &:first-of-type {
        padding-top: 0;
    }

    ${respondTo.lg} {
        display: flex;
        flex-direction: column;
        padding-bottom: 20px;
    }
    
    .wrapper {
        display: flex;
        gap: 20px;

        padding: 22px 0;    
    }

    .content {
        width: 100%;
        display: flex;
        justify-content: space-between;

        ${respondTo.lg} {
            flex-direction: column;
        }
    }

    .image-container {
        padding: 4px 8px;
        padding-bottom: 0;
        background-color: var(--white-100);
        border-radius: 5px;
        height: min-content;
    }

    img {
        width: 124px;
        height: auto;
        border-radius: 5px;
        flex-shrink: 0;

        ${respondTo.sm} {
            width: 100px;
        }

        ${respondTo.xs} {
            width: 80px;
        }
    }

    h4 {
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 24px;
        text-align: left;

        ${respondTo.lg} {
            font-size: 14px;
            margin-bottom: 16px;
        }
    }

    .info {
        ${respondTo.lg} {

        }
    }

    .carbon {
        display: flex;
        align-items: center;

        ${respondTo.lg} {
            font-size: 14px;
        }
        svg {
            margin-right: 14px;

            ${respondTo.lg} {
                margin-right: 4px;
                height: 16px;
                width: 16px;
            }
        }

        strong {
            color: var(--primary);
            margin: 0 0.3em;
            font-size: 20px;
            
            ${respondTo.lg} {
                font-size: 14px;
            }
        }
    }

    .price {
        opacity: 0.4;
        text-align: right;

        ${respondTo.lg} {
            font-size: 14px;
            margin-top: 20px;
            margin-right: 16px;
        }
    }

    .cta {
        width: 200px;
        margin-left: auto;

        display: flex;
        flex-direction: column;
        gap: 20px;

        ${respondTo.lg} {
            width: 100%;
        }
    }

    .btn {
        ${respondTo.lg} {
            margin: 0 auto;
        }
    }
`;

export default FreebieRow;
