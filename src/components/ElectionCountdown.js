import { useEffect, useState } from 'react';
import { respondTo } from '../utils/responsive';
import styled from 'styled-components';

const ElectionCountdown = props => {

    const [times, setTimes] = useState({ diffSecs: 0, diffMins: 0, diffHrs: 0, diffDays: 0 });

    useEffect(() => {
        function renewTimes() {
            const today = new Date();
            const election = new Date('2022-11-26T00:00:00');
            const diffMs = (election - today);
            const diffDays = Math.floor(diffMs / 86400000);
            const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
            const diffMins = Math.floor(((diffMs % 86400000) % 3600000) / 60000);
            const diffSecs = Math.floor((((diffMs % 86400000) % 3600000) % 60000) / 1000);

            setTimes({ diffSecs, diffMins, diffHrs, diffDays })
        }
        const timer = setInterval(renewTimes, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <StyledElectionCountdown {...props}>
            <Block number={times.diffDays} unit='DAYS' />
            <Block number={times.diffHrs} fill2 unit='HRS' />
            <Block number={times.diffMins} fill2 unit='MINS' />
            <Block number={times.diffSecs} fill2 unit='SECS' />
        </StyledElectionCountdown>
    )
}

const Block = ({ number, unit, fill2 = false }) => (
    <StyledBlock>
        <span className="number">{(fill2 && number < 10) ? `0${number}` : number}</span>
        <span className="unit">{unit}</span>
    </StyledBlock>
)

const StyledElectionCountdown = styled.div`
    display: flex;
    justify-content: center;
    color: var(--primary);
`

const StyledBlock = styled.span`
    margin: 0 16px;
    user-select: none;

    ${respondTo.lg} {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .number {
        font-size: 72px;
        font-weight: 700;
        letter-spacing: 0.05em;

        ${respondTo.lg} {
            font-size: 36px;
        }
    }
    
    .unit {
        margin-left: 8px;
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 0.05em;

        ${respondTo.lg} {
            font-size: 12px;
            margin-left: 0;
        }
    }
`

export default ElectionCountdown