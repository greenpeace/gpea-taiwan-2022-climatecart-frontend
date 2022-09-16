import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';

import Icons from '../Icons';
import Input from '../Input';

const EpaperSubscribe = ({ ...props }) => {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const [submiting, setSubmiting] = useState(false);
    const [success, setSuccess] = useState(false);

    async function onSubmit(data) {

        setSubmiting(true);

        data = {
            ...data,
            OptIn: true,
            CampaignId: process.env.REACT_APP_EMAIL_SUBSCRIPTION_CAMPAIGN_ID
        };
        
        const formData = new FormData();

        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        const res = await fetch(process.env.REACT_APP_EMAIL_SUBSCRIPTION_ENDPOINT, {
            method: 'POST',
            body: formData
        });

        if (res.ok) {
            try {
                const data = await res.json();
                if (data.Supporter) {
                    setSuccess(true);
                }
            }
            catch (err) {

            }
            setSubmiting(false);
        }
        else {
            setSubmiting(false);
        }


    }

    return (
        <StyledEpaperSubscribe {...props} >
            <h2>訂閱綠色和平電子報</h2>

            {!success &&
                <SubscribeForm onSubmit={handleSubmit(onSubmit)} disabled={submiting}>
                    <Input {...register('FirstName', { required: '必須填寫' })} placeholder='First Name' type='text' error={errors['FirstName']} />
                    <Input {...register('LastName', { required: '必須填寫' })} placeholder='Last Name' type='text' error={errors['LastName']} />
                    <Input {...register('Email', {
                        required: '必須填寫',
                        pattern: { value: /^([a-zA-Z0-9_\.-]+\@[\da-zA-Z\.-]+\.[a-zA-Z\.]{2,6})$/g, message: '請輸入正確的 Email' } // eslint-disable-line
                    })} placeholder='Email' type='email' error={errors['Email']} />
                    { errors['Email']?.message && 
                        <div className='error'>{ errors['Email'].message }</div>
                    }
                    <button><Icons.Arrow /></button>
                </SubscribeForm>
            }

            {success &&
                <SuccessBlock>感謝您訂閱電子報</SuccessBlock>
            }

            <div className="hint">訂閱綠色和平 The Green Post，每月送上精選資訊，讓你緊追環保焦點！</div>

        </StyledEpaperSubscribe>
    )
}

const StyledEpaperSubscribe = styled.div`
    position: relative;
    max-width: 400px;

    h2 {
        font-size: 16px;
    }

    .hint {
        font-size: 12px;
        line-height: 1.6em;
        color: var(--white-100);
    }
`

const SubscribeForm = styled.form`
    margin: 12px 0;
    width: 100%;
    position: relative;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;

    input {
        width: 100%;
    }

    input[type=email] { 
        grid-column-start: 1;
        grid-column-end: 3;
    }

    button {
        position: absolute;
        bottom: 16px;
        right: 16px;
        display: flex;
        justify-content: center;
        align-items: center;

        width: 28px;
        height: 28px;
        background-color: var(--green-400);
        border-radius: 50em;

        svg {
            width: 16px;
            height: 16px;
        }

        &:hover {
            background-color: var(--primary);
        }
    }

    .error {
        color: var(--pink);
    }

    ${p => p.disabled && css`
        pointer-events: none;
        opacity: 0.6;
    `}
`

const SuccessBlock = styled.div`
    padding: 40px 0;
    text-align: center;
    color: var(--primary);
`

export default EpaperSubscribe