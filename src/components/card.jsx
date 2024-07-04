function Card({ children, fontColor = "text-black", dividerColor = "bg-black", borderColor = "border-blue-500", backgorund = "bg-blue-300", status = 50, titleText = "Card", quantity = 50 }) {
    return (
        <div className={`hover:scale-105 hover:transition-all ease-in-out duration-300 border-b-8 ${borderColor} w-64 h-44 rounded-md ${backgorund} flex flex-col justify-center items-center py-2`}>
            <div className="text-black text-2xl mb-1 mt-1">
                {children} <span>{titleText}</span>
            </div>
            <div className={`divider h-0.5 mx-4 rounded-sm ${dividerColor}`}></div>
            <div className="flex justify-around items-center gap-4 mt-2">
                <div className={`text-7xl ${fontColor}`}>
                    {quantity}
                </div>
                <div className={`radial-progress ${fontColor}`} style={{ "--value": status }} role="progressbar">{status}%</div>
            </div>
        </div>
    )
}

export default Card;