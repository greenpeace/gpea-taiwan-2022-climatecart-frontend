import styled from 'styled-components';
import { useMemo, useState } from 'react';
import shallow from 'zustand/shallow';

import { useBearStore } from '../../../stores/cartStore';

import BubbleSelector from './BubbleSelector';
import Loading from './Loading';
import RecommandList from './RecommandList';
import { useAppStore } from '../../../stores/appStore';

const Bubbles = () => {    
    const { products, topics } = useBearStore(
        state => ({
            products: state.products,
            topics: state.topics, 
        }),
        shallow
    );

    const { selectedBubbles, setSelectedBubbles } = useAppStore();

    const [ step, setStep ] = useState(selectedBubbles.length <= 0 ? 0 : 2);

    const recommandList = useMemo(() => {
        const list = Object.values(products || {});
        return list.filter( item => 
            item.attributes.topics.data.map(topic => topic.id)
            .filter( topicId => selectedBubbles.includes(topicId) )
            .length > 0
        )
    }, [products, selectedBubbles]);

    const selectedTopics = useMemo(() => 
        selectedBubbles.map( topicId => topics.find(topic => topic.id === topicId))    
    , [selectedBubbles]) // eslint-disable-line

    function handleBubbleSelectorNextClick(selected = []) {
        setSelectedBubbles(selected);
        setStep(1);
        setTimeout(() => {
            setStep(2);
        }, 3000);
    }

    return (
        <StyledBubbles id='topics'>
            { step === 0 && <BubbleSelector onNextClick={handleBubbleSelectorNextClick} topics={topics} /> }
            { step === 1 && <Loading /> }
            { step === 2 && <RecommandList products={recommandList} topics={selectedTopics} /> }
        </StyledBubbles>
    )
}

const StyledBubbles = styled.div`
    position: relative;
    background-color: rgba(100,100,100,0.05);
`

export default Bubbles