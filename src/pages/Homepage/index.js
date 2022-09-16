import { useQuery } from "@apollo/client"
import { useMemo } from "react"
import styled from "styled-components"
import AnimateBackground from "../../components/AnimateBackground"
import BottomBannerBlock from "../../components/BottomBannerBlock"
import RightSideNotifications from "../../components/RightSideNotifications"
import { GET_HOMEPAGE_SETTINGS } from "../../queries"
import { respondTo } from "../../utils/responsive"

import Bubbles from "./Bubbles"
import Landing from "./Landing"
import NextBig from "./NextBig"
import VoteForClimate from "./VoteForClimate"


const Homepage = () => {

    const { data } = useQuery(GET_HOMEPAGE_SETTINGS);

    const settings = useMemo(() =>
        data?.homepageSetting.data?.attributes ?? null
        , [data])

    return (
        <>
            <Landing />
            <div>
                <div>
                    <AnimateBackgroundContainer>
                        <StyledAnimateBackground />
                    </AnimateBackgroundContainer>
                    <RightSideNotifications />
                    <NextBig />
                </div>
                <Bubbles />
            </div>
            {settings?.display_kol_block &&
                <VoteForClimate />
            }
            <BottomBannerBlock />
        </>
    )
}

const AnimateBackgroundContainer = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    height: 1px;
`

const StyledAnimateBackground = styled(AnimateBackground)`
    position: absolute;
    top: 0;
    left: 0;

    ${ respondTo.sm } {
        display: none;
    }
`

export default Homepage