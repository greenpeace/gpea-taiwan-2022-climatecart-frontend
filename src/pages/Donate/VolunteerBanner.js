import styled from 'styled-components';
import { imgUrl } from '../../utils/imgUrlWrapper';
import { respondTo } from '../../utils/responsive';

const VolunteerBanner = ({ ...props }) => {
    return (
        <StyledContainer {...props}>
            <p>
                現在捐款 <b>$300 </b> 以上(含)支持綠色和平環境專案，我們將贈送 <b>限定版《Vote for Earth》紀念徽章</b> 予以感謝。
                (寄送日期將於捐款後於電子郵件寄送領取通知)
            </p>
            <img src={imgUrl("/img/donation/volunteer.jpg")} alt=''/>
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    width: 100%;
    min-height: 200px;
    background: var(--white-100);
    border-radius: 5px;
    margin: 60px 0;
    padding: 16px 0;

    position: relative;

    display: flex;
    align-items: center;
    padding-left: 40px;

    ${respondTo.lg} {
        padding-left: 20px;
    }

    p {
        margin: 0;
        width: 55%;

        ${respondTo.lg} {
            font-size: 14px;
            line-height: 24px;
        }
    }

    img {
        height: 100%;
        object-fit: cover;
        position: absolute;
        border-radius: 0;
        right: 0;
        top: 0;
        margin: 0 auto;

        clip-path: polygon(40px 0, 100% 0, 100% 100%, 0 100%);

        ${respondTo.lg} {
            width: 38%;
        }

        ${respondTo.sm} {
            object-position: -50px;
        }

        ${respondTo.xs} {
            object-position: -70px;
        }
    }
`;

export default VolunteerBanner;