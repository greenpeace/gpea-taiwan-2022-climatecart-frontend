import styled from 'styled-components';

const Dots = ({ 
    length, nowIndex, onClick, 
    normalColor = 'white', activeColor = 'var(--primary)', 
    ...props 
}) => (
    <StyledDots {...props} normalColor={normalColor} activeColor={activeColor}>
        {new Array(length).fill('').map((_, index) =>
            <li key={`dots-${index}`} className={index === nowIndex ? '-active' : ''} onClick={() => onClick(index)}>
                <button></button>
            </li>
        )}
    </StyledDots>
)

const StyledDots = styled.ul`

    display: flex;
    justify-content: center;

    li {
        margin: 0 8px;
    }

    button {
        display: block;
        width: 8px;
        height: 8px;
        border-radius: 50em;
        background-color: ${ p => p.normalColor};

        transition: background-color .15s;
    }

    li.-active >button {
        background-color: ${ p => p.activeColor};
    }
`

export default Dots;