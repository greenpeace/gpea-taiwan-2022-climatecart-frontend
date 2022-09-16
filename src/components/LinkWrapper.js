
import { Link as OriginalLink, NavLink } from 'react-router-dom';
import { useMemo } from 'react';
import { withSubSlug } from '../utils/withSubSlug';

const LinkWrapper = ({ to, openNewTab = false, children, navLink = false, ...props }) => {
    const isExternalLink = useMemo(() =>
        to?.indexOf('http://') === 0 || to?.indexOf('https://') === 0
        , [to])

    const linkConfig = (isExternalLink || openNewTab)
        ? {
            target: "_blank",
            rel: "noopener noreferrer nofollow",
        }
        : {};

    if (!to) {
        return <a {...props}>{children}</a>;
    }

    const LinkComponent = navLink ? NavLink : OriginalLink;

    return (
        <LinkComponent to={withSubSlug(to)} {...linkConfig} {...props}>
            {children}
        </LinkComponent>
    );
}

export default LinkWrapper;