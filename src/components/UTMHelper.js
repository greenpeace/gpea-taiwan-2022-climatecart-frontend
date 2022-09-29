import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import create from "zustand";
import { parse, stringify } from 'query-string';
import { withSubSlug } from "../utils/withSubSlug";

export const useUtmStore = create((set) => ({
    utmData: {},
    prevPathname: null,
    completionURL: null,

    setUtmData: value => set(state => ({ utmData: { ...state.utmData, ...value } })),
    setPrevPathname: pathname => set({ prevPathname: pathname }),
    setCompletionURL: value => set({ completionURL: value }),
}))

const UTMHelper = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { 
        utmData, setUtmData, 
        prevPathname, setPrevPathname, setCompletionURL
    } = useUtmStore();

    useEffect(() => {
        const utmParams = Object.fromEntries(Object.entries(parse(location.search)).filter(([key]) => key.indexOf('utm_') === 0));
        Object.keys(utmParams).forEach((key) => {
            if (Array.isArray(utmParams[key])) {
                utmParams[key] = utmParams[key].filter( value => value )
                utmParams[key] = utmParams[key][utmParams[key].length - 1];
            }
        });

        setUtmData(utmParams);
        setCompletionURL(window.location.href)
    }, []); // eslint-disable-line

    useEffect(() => {
        if (
            location.pathname === withSubSlug('/donate') && 
            prevPathname !== location.pathname
        ) {
            const params = {...parse(location.search), ...utmData};
            
            navigate(`${location.pathname}?${stringify(params)}`, { replace: true })
        }
        
        setPrevPathname(location.pathname);
    }, [location]); // eslint-disable-line

    return null;
}
export default UTMHelper