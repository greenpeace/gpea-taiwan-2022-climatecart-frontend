import styled from 'styled-components';

import { respondTo } from '../utils/responsive';

export const Container = styled.div`
    margin-left: auto;
    margin-right: auto;
    width: min(1280px, 100vw - 48px);
`

export const TwoSideContainer = styled(Container)`
    display: flex;
    align-items: flex-start;

    ${respondTo.lg} {
        width: 100vw;
        flex-direction: column;
        gap: 20px;
    }

    >* {
        padding: 32px 24px;
        border-radius: 5px;
        background-color: white;

        ${respondTo.lg} {
            width: 100vw;
            border-radius: 0;
        }
    }

    >*:first-child {
        flex: 1;
    }

    >*:last-child {
        margin-left: 28px;
        width: 408px;

        ${respondTo.lg} {
            margin-left: 0;
            width: 100vw;
        }

    }

    ${ respondTo.md } {
        >* {
            padding: 32px 16px;
        }
    }
`