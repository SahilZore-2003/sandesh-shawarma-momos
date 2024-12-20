

const HomeTab = ({
    tab, setTab
}) => {
    const handleChangeTab = (index) => {
        setTab(tab.map((item, e) => ({ ...item, selected: e === index })));
    };
    return (
        <div className="my-5 ">
            <h2 className="text-secondaryText text-xl font-bold">Food and Category</h2>
            <div className="w-full flex items-center gap-2 my-4 hide-scrollbar overflow-x-scroll snap-x">
                {tab.map(({ icon, title, selected }, index) => (
                    <div
                        onClick={() => handleChangeTab(index)}
                        key={index}
                        className={`snap-start flex shrink-0 cursor-pointer select-none flex-col items-center gap-1 pt-4 bg-background rounded-lg p-2 px-4 ${selected ? "border-primary border-[2px]" : "border-border border-[2px]"
                            }`}
                    >
                        <span className="inline-block bg-primary p-2 text-3xl rounded-md">
                            {icon()}
                        </span>
                        <h2 className="text-secondaryText font-medium text-sm">{title}</h2>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default HomeTab
