
const Image = ({ src, alt, className, ...props }) => {
    
    let imagePath = `${process.env.REACT_APP_STRAPI_URL}${src}`;

    if (src.indexOf('http://') === 0 || src.indexOf('https://') === 0) {
        imagePath = src
    }

    return <img src={imagePath} className={className} alt={alt} {...props} />
}

export default Image;