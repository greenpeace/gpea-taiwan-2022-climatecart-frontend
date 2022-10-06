import styled from 'styled-components';
import { respondTo } from '../../utils/responsive';

import Image from "../../components/Image";

const FeedbackBox = ({ feedback, ...props }) => {
    const { content, name, country, country_flag: { data: { attributes: { url: flag_url } } } } = feedback;
    return (
        <StyledContainer>
            <div className="quote" dangerouslySetInnerHTML={{__html: content}}>
                
            </div>
            <div className="info">
                <Image className="flag" src={flag_url} />
                <div className='person'>
                    <p className="name">{name}</p>
                    <p className="country"><span className="hyphen"></span> <span>{country}</span></p>
                </div>
            </div>
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    background-color: var(--white-100);
    padding: 40px 48px 32px 48px;
    border-radius: 5px;

    ${respondTo.lg} {
        padding: 48px 16px 20px 16px;
    }

    .quote {
        font-size: 16px;
        line-height: 28px;
        padding: 0 30px;
        width: max-content;
        max-width: 100%;

        position: relative;

        ${respondTo.lg} {
            font-size: 14px;
            line-height: 24px;
            padding: 0;
        }

        &::before, &::after {
            display: block;
            position: absolute;
            color: var(--primary);
            font-size: 32px;
            font-weight: 500;

            top: 0;

            ${respondTo.lg} {
                transform: translateY(-100%);
            }

        }

        &::before {
            content: '“';
            left: 0;
        }

        &::after {
            content: "”";
            right: 0;
        }
    }

    .info {
        margin-top: 20px;
        display: flex;
        gap: 16px;
        justify-content: flex-end;
        align-items: center;

        ${respondTo.lg} {
            margin-top: 32px;
        }
    }

    .flag {
        width: 40px;
        height: auto;
    }

    .name {
        font-size: 16px;
        line-height: 20px;

        ${respondTo.lg} {
            font-size: 14px;

        }
    }

    .country {
        font-size: 14px;
        line-height: 20px;

        display: flex;
        align-items: center;
        gap: 0.5em;

        ${respondTo.lg} {
            font-size: 12px;

        }
    }

    .hyphen {
        display: inline-block;
        width: 1.5em;
        height: 1px;
        background-color: var(--black);
    }
`;

export default FeedbackBox;