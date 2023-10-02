import { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

const DashSidebar = () => {
    const [isCollapsed, setCollapsed] = useState(true);

    const handleCollapse = () => {
        setCollapsed(!isCollapsed);
    }

    return(
        <section className={`${isCollapsed ? "w-12" : "w-48"} flex flex-col h-full transition-all`}>
            <div>
                <button 
                    className="flex justify-center items-center w-full h-12 text-white bg-tif-blue hover:bg-tif-lavender hover:shadow-md transition-all"
                    onClick={handleCollapse}
                >
                        <ChevronRightIcon className={`${isCollapsed? "rotate-0" : "rotate-180"} h-6 w-6 transition-all duration-300`} />
                </button>                
            </div>
            <div className="border border-red-500 flex justify-center items-center h-full">
                TEST2
            </div>
        </section>
    );
};

export default DashSidebar;