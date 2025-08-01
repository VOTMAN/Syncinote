import load from "./loading.png"

export const Loading = () => {
    return(
        <div className='fixed inset-0 z-1000000 flex items-center justify-center border border-dashed border-black bg-white/90 transition-all duration-300 ease-in'>
            <img src={load} alt="loading icon" className='w-16 animate-spin-reverse'/>
        </div>
    )
}

