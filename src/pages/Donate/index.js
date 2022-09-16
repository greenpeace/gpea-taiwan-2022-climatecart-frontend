import styled from 'styled-components';

import BottomBannerBlock from '../../components/BottomBannerBlock';
import { Container } from "../../components/layouts"

import { respondTo } from '../../utils/responsive';

import Banner from "./Banner"
import BriefContent from './BriefContent';
import DonationModule from './DonationModule';
import FAQ from './FAQ';

const Donate = () => {
    return (
        <>
            <Banner />
            <StyledContainer>
                <div>
                    <BriefContent />
                    <FAQ />
                </div>
                <div>
                    <DonationModule />
                </div>
            </StyledContainer>
            <BottomBannerBlock />
        </>
    )
}

const StyledContainer = styled(Container)`
    padding: 80px 0;
    display: flex;
    align-items: flex-start;

    ${respondTo.lg} {
        flex-direction: column-reverse;
    }

    >* {
        display: inline-block;

        &:first-child {
            width: 720px;

            ${respondTo.lg} {
                width: 100%;
                margin-top: 40px;
            }
        }

        &:last-child {
            margin-left: 60px;
            width: 500px;
            position: sticky;
            top: 120px;
            margin-top: -120px;

            ${respondTo.lg} {
                position: relative;
                top: unset;
                margin-left: 0;
                width: 100%;
            }
        }
    }
`

export default Donate