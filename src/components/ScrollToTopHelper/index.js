import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPosition, scrollTo } from '../../utils/scrollTo';

const ScrollToTopHelper = () => {

    const location = useLocation();
    const [ nowPathname, setPathname ] = useState(null);
    const [ nowHash, setHash ] = useState(null);

    useEffect(() => {
        if (nowPathname !== location.pathname) {
            setPathname(location.pathname);
            window.scrollTo?.(0, 0);
        }
        
        if (nowHash !== location.hash) {
            setHash(location.hash);
            const targetDom = document.getElementById(location.hash.replace('#', ''));
            if (!targetDom) return;

            const { y } = getPosition(targetDom);
            scrollTo(1, y);

        }
    }, [location]) // eslint-disable-line

    return null;
}

export default ScrollToTopHelper;
