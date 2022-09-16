import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { formatNumber } from "../../utils/formatNumber";
import { respondTo } from '../../utils/responsive';

import * as Icons from "../Icons";
import Image from "../Image";
import BaseTitle from "../BaseTitle";
import AddToCartBtn from "../AddToCartBtn";
import BasicButton from "../BasicButton";
import RatingRow from "../../pages/Topics/RatingRow";
import LinkWrapper from "../LinkWrapper";
import PriceText from '../PriceText';
import { shareToFB, shareToLine } from "../../utils/socialMediaShare";

const ProductCard = ({ product, className, ...props }) => {
    const location = useLocation();
    const {
        id,
        fakePurchasedNum,
        attributes: {
            carbon_reduction,
            image: {
                data: {
                    attributes: { url: imageUrl },
                },
            },
            name,
            price,
            ratings,
            topics: { data: topics },
        },
    } = product;

    const hasViewMoreBtn = useMemo(() => {
        const condition = location.pathname.includes("topics");
        return condition;
    }, [location]);

    const snsLinks = {
        facebook: {
            icon: () => <Icons.Facebook />,
            href: "http://www.facebook.com",
            onClick: () => shareToFB()
        },
        line: {
            icon: () => <Icons.Line />,
            href: "https://line.me/zh-hant/",
            onClick: () => shareToLine()
        },
    };

    const renderSnsLink = (snsItem) => {
        const Icon = snsItem.icon;
        return (
            <button onClick={snsItem.onClick}>
                <Icon />
            </button>
        );
    };

    return (
        <StyledContainer className={`product-card ${className}`} {...props}>
            <ImageContainer>
                <Image src={imageUrl} />
            </ImageContainer>
            <StyledInfoContainer>

                <BaseTitle as="h2" size="xl">{name}</BaseTitle>
                <StyledTagsList>
                    {topics.map((topic, id) => (
                        <StyledTag key={id}>
                            <LinkWrapper to={`/topics/${topic.id}`}>
                                {topic.attributes.name}
                            </LinkWrapper>
                        </StyledTag>
                    ))}
                </StyledTagsList>

                <StyledMetaContainer>
                    <div className="meta">
                        <p>
                            <Icons.Leaf /> 減碳力 <strong>{formatNumber(carbon_reduction)}</strong> 萬棵樟樹
                        </p>
                        <ul>
                            {ratings.map((rating, id) => (
                                <RatingRow key={id} ratingItem={rating} />
                            ))}
                        </ul>
                    </div>
                    <div className="share">
                        <div>
                            <span>Share to</span>
                            <ul>
                                {Object.keys(snsLinks).map((key, id) => (
                                    <li key={id}>{renderSnsLink(snsLinks[key])}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </StyledMetaContainer>

                <StyledPriceContainer>
                    <div className="price">
                        {/* <p className="label">理想生活實踐價</p> */}
                        <PriceText className="price-text" price={price} />
                        <p className='bought-count'>
                            已有<strong>{ formatNumber(fakePurchasedNum) }</strong>人訂製這項政見
                        </p>
                    </div>
                    <div className="cta">
                        <AddToCartBtn item={product} type="product" />
                        {hasViewMoreBtn && (
                            <LinkWrapper to={`/product/${id}`}>
                                <BasicButton
                                    theme="lightGreen"
                                    Icon={Icons.Arrow}
                                    iconPos="right"
                                >
                                    完整介紹
                                </BasicButton>
                            </LinkWrapper>
                        )}
                    </div>
                </StyledPriceContainer>

            </StyledInfoContainer>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 76px;
    width: 100%;
    
    padding-bottom: 60px;
    border-bottom: 1px solid var(--grey);

    ${respondTo.md} {
        flex-direction: column;
        gap: 18px;
    }

    img {
        width: 555px;
        height: 488px;

        ${respondTo.md} {
            width: 100%;
            height: fit-content;
            object-fit: contain;
        }
    }
`;

const StyledInfoContainer = styled.div`
    width: 100%;

    h2 {
        margin-bottom: 24px;

        ${respondTo.md} {
            margin-bottom: 20px;
        }
    }
`;

const StyledTagsList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    margin-bottom: 40px;

    ${respondTo.md} {
        margin-bottom: 24px;
    }
`;

const ImageContainer = styled.div`
    position: relative;
    padding: 16px 28px;
    background: var(--white-100);
    border-radius: 10px;
    width: 100%;
    max-width: 520px;
    height: min-content;
    text-align: center;
    
    >img {
        width: 100%;
        height: auto;
    }

    ${ respondTo.lg } {
        width: 50%;
    }

    ${respondTo.md} {
        max-width: 100%;
        width: 100%;
        margin-bottom: 24px;

        >img {
            max-height: 320px;
        }
    }
`

const StyledTag = styled.li`
    >a {
        display: block;
        background: var(--primary);
        color: var(--white);
        padding: 8px 14px;
        border-radius: 100px;
        
        font-size: 14px;
        line-height: 20px;

        &:hover {
            background: var(--green-300);
        }
    }
`;

const StyledPriceContainer = styled.div`
    
    margin-top: 48px;

    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    ${respondTo.md} {
        margin-top: 16px;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 16px;

        > div {
            width: 100%;
        }
    }

    .price {

        .label {
            color: var(--primary);
            font-size: 14px;
            line-height: 20px;
            margin-bottom: 8px;
        }

        .price-text {
            font-size: 28px;
            line-height: 40px;
            letter-spacing: 0.05em;
            font-weight: 500;

            ${ respondTo.sm } {
                font-size: 18px;
                line-height: 24px;
            }
        }

        .bought-count {
            margin-top: 8px;
            color: var(--primary);
            font-size: 14px;
            line-height: 20px;

            strong {
                font-size: 18px;
                line-height: 22px;
                font-weight: 500;
                color: var(--green-200);
                margin: 0 0.2em;
            }
        }
    }

    .cta {
        display: flex;
        align-items: flex-end;
        gap: 12px;

        ${ respondTo.md } {
            justify-content: flex-end;
        }

        ${respondTo.sm} {
            gap: 20px;
            flex-direction: column;
            align-items: center;
        }
    }

    ${ respondTo.pad } {
        flex-direction: column;
        gap: 24px;

        .price {
            align-self: flex-start;
        }
    }
`;

const StyledMetaContainer = styled.div`
    margin-top: 40px;

    display: flex;
    justify-content: space-between;

    ${respondTo.md} {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        gap: 24px;

        > div {
            width: 100%;
        }

    }

    .meta {
        p {
            display: flex;
            align-items: flex-end;
        }

        strong {
            color: var(--primary);
            font-size: 28px;
            font-weight: 700;
            margin: 0 0.2em;
            position: relative;
            top: 2px;
        }

        ul {
            margin-top: 24px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
    }

    .share {

        align-self: flex-end;

        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;

        ${respondTo.md} {
            gap: 40px;
            align-items: flex-start;

            a {
                margin: 0 auto;
            }
        }
        
        > div {
            display: flex;
            align-items: center;
            gap: 28px;
        }

        ul {
            display: flex;
            gap: 20px;
        }
    }
`;

export default ProductCard;
