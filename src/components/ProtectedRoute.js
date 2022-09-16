import styled from 'styled-components';
import { Navigate } from "react-router-dom";
import { withSubSlug } from '../utils/withSubSlug';

const ProtectedRoute = ({ Element, condition, redirectTo }) => {

    if (!condition) {
        if (redirectTo) return <Navigate to={withSubSlug(redirectTo)} />
        else return <LoadingScreen>內容準備中 ...</LoadingScreen>;
    }
    else if (condition) {
        return <Element />
    }
}

const LoadingScreen = styled.div`
    padding: 30vh 0;
    font-size: 16px;
    text-align: center;
    color: var(--primary);
`

export default ProtectedRoute;