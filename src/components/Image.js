
const Image = ({ src, alt, className, ...props }) => {
    const imagePath = `${src}`;
    return <img src={imagePath} className={className} alt={alt} {...props} />
}

export default Image;