export function shareToFB(url = window.location.href, content = '') {
    if (typeof url !== 'string') url = window.location.href;
    let link = 'https://www.facebook.com/share.php?u=' + encodeURIComponent(url) + (content ? `&quote=${encodeURIComponent(content)}` : '');
    window.open(link);
    return false;
}

export function shareToLine(url = window.location.href, content = '') {
    if (typeof url !== 'string') url = window.location.href;
    let link = `http://line.naver.jp/R/msg/text/?${content ? (encodeURIComponent(content) + '%0D%0A%0D%0A') : ''}${encodeURIComponent(url)}`;
    // let link = 'https://social-plugins.line.me/lineit/share?url=' + encodeURIComponent(url) + (content ? `&text=${encodeURIComponent(content)}` : '');
    window.open(link);
    return false;
}


export function shareToTwitter(url = window.location.href, content = '') {
    if (typeof url !== 'string') url = window.location.href;
    let link = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(url) + (content ? `&text=${encodeURIComponent(content)}` : '');
    window.open(link);
    return false;
}

export function copyLink(e, onComplete = null) {
    copyToClipboard(window.location.href);
    onComplete?.();
    if (!onComplete) {
        alert('連結已複製')
    }
}

function copyToClipboard(text) {
    var temp = document.createElement('input');
    document.querySelector('body').append(temp);
    temp.value = text;
    temp.select();
    document.execCommand('copy');
    temp.remove();
}
