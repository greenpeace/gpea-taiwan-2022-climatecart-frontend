import styled from 'styled-components';
import { respondTo } from '../../utils/responsive';

const Quote = ({ avatar, content, author, ...props }) => {
    return (
        <StyledContainer {...props}>
            <p className="content">
                {content}
            </p>
            <div className='meta'>
                <span className='author'>
                    <span>{author.title}</span>
                    <b>{author.name}</b>
                </span>
                <img src={avatar} alt='avatar' />
            </div>
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    margin-top: 60px;
    background: var(--white-100);
    border-radius: 5px;

    padding: 40px 32px 32px 40px;

    ${respondTo.lg} {
        padding: 20px 16px 20px 20px;
    }

    .content {
        margin: 0;
    }

    .meta {
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        gap: 16px;
        margin-top: -1em;

        ${respondTo.lg} {
            margin-top: 8px;
        }
    }

    .author {
        display: block;
        position: relative;

        padding-left: 1.7em;

        &::before {
            content: '';
            display: block;
            width: 1.3em;
            height: 1px;
            background-color: var(--black);

            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }

        b {
            margin-left: 0.4em;
        }
    }

    img {
        height: 54px;
        width: 54px;
        border-radius: 50%;
    }

`;

export default Quote;