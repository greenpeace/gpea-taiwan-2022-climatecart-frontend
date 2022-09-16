import { useNavigate } from 'react-router-dom';

export function useLinkTo(to) {
    const navigate = useNavigate();

    function linkTo(e) {
        e.preventDefault();
        e.stopPropagation();
        if (to === undefined) return;
        navigate(to);
    }

    return { linkTo }
}

export function openLinkWithNewTab(href = '') {
    const aDom = document.createElement('a');
    aDom.href = href;
    aDom.target = '_blank';
    aDom.rel = 'noopener noreferer nofollow';
    aDom.click();
}
