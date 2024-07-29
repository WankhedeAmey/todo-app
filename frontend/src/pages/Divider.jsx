const Divider = () => {
    return (
        <div class="relative hover:border-slate-600 hover:tracking-widest duration-500 group text-slate-50  overflow-hidden h-14 rounded-md bg-slate-800 p-2 flex justify-center items-center font-extrabold w-full outline-none text-xl">
            <div class="absolute z-10 w-48 h-48 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-slate-900 delay-150 group-hover:delay-75 outline-none"></div>
            <div class="absolute z-10 w-40 h-40 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-slate-800 delay-150 group-hover:delay-100 outline-none"></div>
            <div class="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-slate-700 delay-150 group-hover:delay-150 outline-none"></div>
            <div class="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-slate-600 delay-150 group-hover:delay-200 outline-none"></div>
            <div class="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-slate-500 delay-150 group-hover:delay-300 outline-none"></div>
            <p class="z-10">Filtered Todos </p>
        </div>
    );
};

export default Divider;
