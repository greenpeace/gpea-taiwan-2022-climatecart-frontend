import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { useAppStore } from '../../stores/appStore';

const DonationModule = ({ ...props }) => {

    const { formData } = useAppStore();

    return (
        <StyledDonationModule {...props}>
            <Helmet>
                <script src='https://api.greenpeace.org.hk/app/donation-module/main.js'/>
            </Helmet>
            <div
                data-gpea-module="gpea-donation-module"
                data-gpea-market='TW'
                data-gpea-language='zh_TW'
                data-gpea-campaign-id=''
                data-gpea-env='production'
                data-gpea-campaign='climate_cart'
                data-gpea-formdata={JSON.stringify({
                    FirstName: formData?.firstName ?? '',
                    LastName: formData?.lastName ?? '',
                    Email: formData?.email ?? '',
                    MobilePhone: formData?.mobilePhone ?? '',
                    MobileCountryCode: '886',
                    Birthdate: formData?.birthYear ? `${formData.birthYear}-01-01` : ''
                })}
            />
        </StyledDonationModule>
    )
}

const StyledDonationModule = styled.aside`
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    overflow: hidden;
    line-height: initial;

    button {
        text-align: center;
    }
`

export default DonationModule