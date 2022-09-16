
const Image = ({ src, alt, className, ...props }) => {
    const imagePath = `${process.env.REACT_APP_STRAPI_URL}${src}`;
    return <img src={imagePath} className={className} alt={alt} {...props} />
}

export default Image;