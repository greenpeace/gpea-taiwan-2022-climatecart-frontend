import { useState } from 'react';
import styled, { css } from 'styled-components';
import { useForm } from 'react-hook-form';
import { respondTo } from '../../utils/responsive';
import FORM_ERRORS from '../../constants/FORM_ERRORS';

import FormInput from '../FormInput';
import { useBearStore } from '../../stores/cartStore';
import { useAppStore } from '../../stores/appStore';
import { useRemoteCountiesList } from '../../utils/useRemoteCountiesList';
import { websign } from '../../utils/websign';
import { sendPetitionTracking, sendToFbq } from '../../utils/gtmHelpers';
import { SlideItem } from '.';

const TicketForm = ({ onCloseClick, onComplete }) => {

    const [submiting, setSubmiting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const setMyTickets = useBearStore(state => state.setMyTickets);
    const { setTicketsGot, setFormData, setShoppingRecordKey } = useAppStore();
    const counties = useRemoteCountiesList();

    async function onSubmit(data) {

        setSubmiting(true);

        const result = await websign({
            ...data,
            campaignData1: new Date().toISOString()
        });

        if (result.key) {
            setShoppingRecordKey(result.key);
        }

        setFormData(data);
        setMyTickets(5);
        setTicketsGot();
        onCloseClick();

        sendPetitionTracking('ticket', 'Petition Ticket');
        sendToFbq('AddToCart', 'Petition Ticket');

        onComplete?.();
    }

    return (
        <SlideItem>
            <h2>即刻訂製理想生活</h2>
            <p>填寫下列資訊，領取「好政券」：</p>
            <StyledTicketForm onSubmit={handleSubmit(onSubmit)} disabled={submiting}>
                <div className="inputs">
                    <StyledFormInput label='姓氏' type='text' theme='white'
                        {...register('lastName', { required: FORM_ERRORS.REQUIRED })} errors={errors} />

                    <StyledFormInput label='名字' type='text' theme='white'
                        {...register('firstName', { required: FORM_ERRORS.REQUIRED })} errors={errors} />

                    <StyledFormInput label='戶籍地' type='select' theme='white' fullwidth='true' placeholder='請選擇'
                        options={counties}
                        hint='綠色和平將揭露公眾的政見偏好，推動縣市長候選人以實際行動建構您的理想城市。'
                        {...register('address', { required: FORM_ERRORS.REQUIRED })} errors={errors} />

                    <StyledFormInput label='Email' type='text' theme='white' fullwidth='true'
                        hint='綠色和平將持續監測候選人政見，並不定期以 Email 更新您的參與所締造的環境成果。'
                        {...register('email', {
                            required: FORM_ERRORS.REQUIRED,
                            pattern: FORM_ERRORS.EMAIL_PATTERN
                        })} errors={errors} />
                </div>

                <Buttons>
                    <Button outline type='button' onClick={onCloseClick}>先逛逛再領券</Button>
                    <Button type='submit'>領券開始</Button>
                </Buttons>
            </StyledTicketForm>
        </SlideItem>
    )
}

const StyledTicketForm = styled.form`
    padding: 24px 40px;

    .inputs {
        text-align: left;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24px 16px;

        margin-bottom: 28px;

        ${respondTo.lg} {
            margin-right: -18px;
            padding-right: 18px;

            &::-webkit-scrollbar {
                background: transparent;
                width: 4px;

            }

            &::-webkit-scrollbar-thumb {
                background: white;
            }
        }
    }

    ${p => p.disabled && css`
        pointer-events: none;
        opacity: 0.5;
    `}

    ${respondTo.lg} {
        padding: 20px 0 0 0;
        gap: 20px 12px;
    }
`

const StyledFormInput = styled(FormInput)`
    ${({ fullwidth }) => fullwidth && css`
        grid-column-start: 1;
        grid-column-end: 3;
    `}
`

const Buttons = styled.div`
    grid-column-start: 1;
    grid-column-end: 3;

    display: flex;
    justify-content: space-between;

    ${respondTo.lg} {
        flex-direction: column;
        gap: 16px;
        align-items: center;
    }

    ${respondTo.md} {
        flex-direction: column-reverse;
    }
`

const Button = styled.button`
    margin-left: 16px;
    &:first-child { margin-left: 0 }

    ${respondTo.lg} {
        margin-left: 0;
        flex: unset;
        width: 200px;
    }
    
    flex: 1;
    border-radius: 50em;
    border: 1px solid white;
    
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;

    font-size: 18px;
    font-weight: 500;

    background-color: rgba(255, 255, 255, 0.6);

    &:hover {
        color: var(--text);
        background-color: rgba(255, 255, 255, 1);
        border-color: transparent;
    }

    ${({ outline }) => outline && css`
        background-color: transparent;
        color: white;
    `}

    
`

export default TicketForm