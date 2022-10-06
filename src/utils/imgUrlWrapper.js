export function imgUrl(url = '') {
    if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
        return url;
    }
    return `${process.env.PUBLIC_URL}${url}`;
}