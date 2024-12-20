
const Image = ({ src, className }) => {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <img src={src} alt="" className={`relative z-10 w-full h-full  aspect-square object-contain`} />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-green-300 "></div>
        </div>
    )
}

export default Image
