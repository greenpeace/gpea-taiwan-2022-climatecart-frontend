import styled from 'styled-components';
import { scrollToTop } from '../../utils/scrollTo';

const ToTopButton = () => {

    function handleClick() {
        scrollToTop();
    }

    return (
        <StyledToTopButton onClick={handleClick}> 
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="24" transform="rotate(-90 24 24)" fill="var(--primary)"/>
                <path d="M23.25 20.871L19.227 24.894L18.1665 23.8335L24 18L29.8335 23.8335L28.773 24.894L24.75 20.871V30H23.25V20.871Z" fill="white"/>
            </svg>
            <div>Top</div>
        </StyledToTopButton>
    )
}

const StyledToTopButton = styled.button`
    position: absolute;
    bottom: calc(100% + 20px);
    right: 20px;

    div {
        margin-top: 4px;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        color: var(--primary);
    }

    svg {
        transition: transform .2s;
    }

    &:hover {
        svg {
            transform: scale(1.1);
        }
    }
`

export default ToTopButton