import styled, { keyframes } from 'styled-components';
import { useBearStore } from '../../stores/cartStore';

import Icons from '../Icons';
import Image from '../../components/Image';
import { numberWithCommas } from '../../utils/numberWithCommas';
import LinkWrapper from '../LinkWrapper';

const ProductItem = ({ as = 'li', item, showTopics = false, showPreBuy = true, ...props }) => {
    const { id, fakePreBuyNum, attributes: { name, price, carbon_reduction, image: { data: { attributes: { url } } } } } = item;

    const myCollections = useBearStore(state => state.myCollections);
    const addToCollections = useBearStore(state => state.addToMyCollections);
    const removeFromMyCollections = useBearStore(state => state.removeFromMyCollections);

    const toggleCollection = () => {
        if (myCollections[id]) {
            removeFromMyCollections(id);
        } else {
            addToCollections(item);
        }
    }

    function handleHeartClick(e) {
        e.preventDefault();
        toggleCollection();
    }

    return (
        <StyledProductItem as={as}>
            <LinkWrapper to={`/product/${id}`}>
                <div className='image-container'>
                    <Image src={url} alt={name} />
                </div>
                <StyledHeart onClick={handleHeartClick} active={typeof myCollections[item.id] !== 'undefined'} />
                <h3>{name}</h3>
                <div className="numbers">
                    <div className="span">{price} /張 好政券</div>
                    <span className="carbon-reduction">{numberWithCommas(carbon_reduction)} 萬棵樟樹<Icons.Leaf /></span>
                </div>
                {(!showTopics && showPreBuy) &&
                    <div className="pre-buy">{fakePreBuyNum} 個人有興趣訂製</div>
                }
                {showTopics &&
                    <Topics>
                        {item.attributes.topics.data?.map(topic =>
                            <span className="topic-item" key={topic.attributes.name}>{topic.attributes.name}</span>
                        )}
                    </Topics>
                }
            </LinkWrapper>
        </StyledProductItem>
    )
}

const itemEnter = keyframes`
    from {
        opacity: 0;
        transform: translateY(-12px);
    }
`

const StyledProductItem = styled.div`
    position: relative;
    transition: color .2s;

    animation: ${itemEnter} .3s ease-out;

    .image-container {
        position: relative;
        width: 100%;
        padding-bottom: 82.5%;
        background-color: var(--white-100);
        border-radius: 10px;
        overflow: hidden;
    }

    .image-container img {
        position: absolute;
        top: 5%; left: 5%; width: 90%; height: 90%;
        object-fit: contain;
    }

    h3 {
        margin: 0;
        margin-top: 12px;
        font-size: 18px;
        font-weight: 700;
        line-height: 1.4;
        letter-spacing: .05em;
    }

    .numbers {
        margin-top: 0px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        font-size: 14px;
        font-weight: 500;
    }

    .carbon-reduction >svg {
        position: relative;
        width: 16px;
        top: 6px;
        margin-left: 4px;
    }

    .pre-buy {
        margin-top: 8px;
        font-size: 14px;
        color: var(--primary);
    }

    &:hover {
        color: var(--primary);

        .topic-item {
            background-color: var(--green-300);
        }
    }
`

const StyledHeart = styled(Icons.Heart)`
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;

`

const Topics = styled.div`
    margin-top: 12px;
    
    display: flex;
    gap: 12px;
    flex-wrap: wrap;

    >span {
        padding: 8px 16px;
        border-radius: 50em;
        
        display: inline-block;
        font-size: 14px;
        color: white;
        background-color: var(--primary);

        transition: background-color .2s;
    }
`

export default ProductItem;