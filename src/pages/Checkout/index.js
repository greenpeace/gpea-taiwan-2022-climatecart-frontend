import styled from "styled-components";
import { useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { respondTo } from '../../utils/responsive';
import LinkWrapper from "../../components/LinkWrapper";
import ButtonWithIcon from "../../components/ButtonWithIcon";
import FormCheckbox from "../../components/FormCheckbox";
import FormInput from "../../components/FormInput";
import Icons from "../../components/Icons";
import { Container, TwoSideContainer } from "../../components/layouts";
import ResultImage from "../../components/ResultImage";
import StepsIndicator from "../../components/StepsIndicator";
import { StepTitle } from "../../components/Title";
import PurchasedProducts from "../OrderCompleted/PurchasedProducts";

import { useRemoteCountiesList } from "../../utils/useRemoteCountiesList";
import { websign } from "../../utils/websign";
import FORM_ERRORS from '../../constants/FORM_ERRORS';

import { useBearStore } from "../../stores/cartStore";
import { useAppStore } from "../../stores/appStore";
import { withSubSlug } from "../../utils/withSubSlug";
import { sendPetitionTracking, sendToFbq } from "../../utils/gtmHelpers";

const Checkout = () => {

    const canvasRef = useRef();

    const {
        updateCheckouts,
        myProducts,
        myBundles,
        myFreebies,
        setMyTickets,
    } = useBearStore();

    const { formData, setFormData, setShoppingRecordKey, clearTicketsGot } = useAppStore();

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: formData
    });

    const counties = useRemoteCountiesList();

    const birthYearOptions = useMemo(() => {
        const start = 1970;
        const end = new Date().getFullYear() + 1;
        return new Array(end - start)
            .fill(0)
            .map((_, index) => start + index);
    }, [])

    const onSubmitSuccess = async (data) => {

        // const imageDataURL = canvasRef.current?.querySelector('canvas')?.toDataURL();
        // setRsultImageDataURL(imageDataURL);

        const biesList = [ ...myProducts, ...myFreebies ];

        const productNames = biesList.map(product => product.attributes.name).join(',');
        const productIds = biesList.map(product => product.id).join(',');
        
        setShoppingRecordKey(null);
        
        await websign({
            ...data,
            birthYear: ~~data.birthYear,
            campaignData2: new Date().toISOString(),
            campaignData3: productNames,
            campaignData4: productIds
        });

        clearTicketsGot();
        updateCheckouts();
        setMyTickets(null);
        setFormData(data);

        sendPetitionTracking('signup', 'Petition Signup');
        sendToFbq('Lead', 'Petition Signup');
        
        navigate(withSubSlug('/order-completed'));
    };

    const onSubmitError = (error) => console.log(error);

    return (
        <StyledCheckout>
            <StepsIndicator steps={["購物車", "填寫資料"]} nowStepIndex={1} />
            <BackButtonContainer>
                <LinkWrapper to="/cart">
                    <BackButton>
                        <Icons.Arrow /> 返回訂製清單
                    </BackButton>
                </LinkWrapper>
            </BackButtonContainer>

            <StyledTwoSideContainer>
                <div className="left">
                    <div className="preview">
                        <StepTitle title="填寫資料即可獲得您訂製的理想生活藍圖" />
                        <ResultImageContainer ref={canvasRef}>
                            <ResultImage />
                        </ResultImageContainer>
                    </div>
                    <PurchasedProducts
                        className="purchased-box"
                        myProducts={myProducts}
                        myBundles={myBundles}
                        myFreebies={myFreebies}
                    />
                </div>
                <div className="right">
                    <StepTitle
                        title="填寫資料"
                        hint={"完成訂製，將您的理想生活藍圖\n分享給候選人吧！"}
                        hr
                    />
                    <Form onSubmit={handleSubmit(onSubmitSuccess, onSubmitError)}>
                        <NameInputs>
                            <FormInput
                                label="姓氏"
                                required
                                {...register("lastName", { required: FORM_ERRORS.REQUIRED })}
                                errors={errors}
                            />
                            <FormInput
                                label="名字"
                                required
                                {...register("firstName", { required: FORM_ERRORS.REQUIRED })}
                                errors={errors}
                            />
                        </NameInputs>
                        <FormInput
                            label='出生年'
                            required
                            type='select'
                            theme="green"
                            fullWidth
                            placeholder='請選擇'
                            options={birthYearOptions}
                            hint='可幫助我們統計有效選民數量，增加調查結果的說服力。'
                            {...register('birthYear', { required: FORM_ERRORS.REQUIRED })} errors={errors}
                        />
                        <FormInput
                            label="聯絡電話"
                            required
                            hint="綠色和平將以電話邀請您支持環境保護工作，幫助我們開展研究、教育及政策倡議，從而推動政府、企業和社會大眾共同尋求環境問題的解決方案。"
                            {...register('mobilePhone', { required: FORM_ERRORS.REQUIRED, pattern: FORM_ERRORS.ALL_NUMBERS_PATTERN })} errors={errors}
                        />
                        <FormInput
                            label="戶籍地"
                            type='select'
                            options={counties}
                            required
                            placeholder='請選擇'
                            hint="我們將於10月底召開記者會，公布不同縣市地區民眾的政見偏好，呼籲各縣市候選人採納，為您打造理想城市。"
                            {...register('address', { required: FORM_ERRORS.REQUIRED })} errors={errors}
                        />
                        <FormInput
                            label="Email"
                            required
                            hint="綠色和平將持續監測您戶籍地候選人是否提出您偏好的政見，並不定期以 Email 更新消息。"
                            {...register('email', { required: FORM_ERRORS.REQUIRED, pattern: FORM_ERRORS.EMAIL_PATTERN })} errors={errors}
                        />
                        <StyledHr />
                        <StyledFormCheckbox
                            {...register('consent', {
                                required: {
                                    value: true,
                                    type: "required",
                                    message: "請勾選這個欄位"
                                },
                            })} errors={errors}
                        >
                            同意 <LinkWrapper to='/privacy'>隱私權政策</LinkWrapper>
                        </StyledFormCheckbox>
                        <ButtonWithIcon
                            theme="orange"
                            center
                            iconPos="left"
                            Icon={Icons.Bag}
                        >
                            完成訂製
                        </ButtonWithIcon>
                    </Form>
                </div>
            </StyledTwoSideContainer>
        </StyledCheckout>
    );
};

const StyledCheckout = styled.div`
    padding-top: 40px;
    padding-bottom: 160px;
    background-color: var(--white);

    ${ respondTo.sm } {
        padding-top: 24px;
    }
`;

const BackButtonContainer = styled(Container)`
    margin-top: 40px;
`;

const BackButton = styled.button`
    display: flex;
    align-items: center;
    color: var(--primary);

    > svg {
        position: relative;
        top: -1px;
        transform: rotate(180deg);
        margin-right: 4px;
    }
`;

const StyledTwoSideContainer = styled(TwoSideContainer)`
    margin-top: 28px;

    .left {
        padding: 0;
        background-color: transparent;
        border-radius: 5px;

        display: flex;
        flex-direction: column;
        gap: 20px;

    }

    .preview {
        padding: 32px 36px 54px 36px;
        background: white;

        ${respondTo.lg} {
            padding: 28px 24px 40px 24px;
        }

        ${respondTo.md} {
            padding: 28px 16px 40px 16px;
        }
    }

    .right {
    }

`;

const ResultImageContainer = styled.div`
    margin-top: 40px;

    display: flex;
    justify-content: center;
    
    ${respondTo.lg} {
        margin-top: 28px;
    }
`;

const NameInputs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
`

const Form = styled.form`
    > * {
        margin-top: 24px;
        &:first-child {
            margin-top: 0;
        }
    }
`;

const StyledHr = styled.hr`
    margin: 28px 0;
    border: 0;
    border-bottom: 1px solid var(--grey);
`;

const StyledFormCheckbox = styled(FormCheckbox)`
    a {
        text-decoration: underline;
    }
`

export default Checkout;
