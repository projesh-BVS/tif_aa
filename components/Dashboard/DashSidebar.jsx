import { Bars3Icon } from "@heroicons/react/24/solid";

const DashSidebar = () => {
    return(
        <section className="flex flex-col h-full w-12 hover:w-48 transition-all">
            <div>
                <button className="flex justify-center items-center w-full h-12 text-white bg-tif-blue hover:bg-tif-lavender hover:shadow-md transition-all">
                    <Bars3Icon className="h-6 w-6" />
                </button>                
            </div>
        </section>
    );
};

export default DashSidebar;