"use client";
import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

const ProductUploadFormListbox = ({
  labelText,
  optionsArray,
  onOptionSelect,
  showBelow = true,
  isDependant = false,
}) => {  
  
  const [selectedOption, setSelectedOption] = useState(optionsArray[0]); //This selected option is set after render 
  const [options, setOptions] = useState(optionsArray);

useEffect(() => {
  
  setOptions(optionsArray)
  
  
}, [optionsArray[0].display]);

useEffect(() => {
  if(isDependant)
  {   
    //console.log("options reset") ;
    setSelectedOption(options[0])
    handleOnChange(options[0])
  }  
  
}, [options]);


  function handleOnChange(option) {
    setSelectedOption(option);
    
    onOptionSelect(option);
    //console.log(labelText + " | Option changed to on click: " + option.display);
  }


  useEffect(() => {
    handleOnChange(optionsArray[0])
    
  }, []);

  return (
    <Listbox value={selectedOption} by="id" onChange={handleOnChange}>
      <div className="relative">
        <div className="relative">
          <Listbox.Label
            className="
                absolute
                -top-3.5 
                left-2
                px-2
                z-10 
                
                text-white
                bg-tif-lavender
                text-sm
                font-medium
                rounded-md
                border-[1px]
                border-white
                        
                transition-all
            "
          >
            {labelText}
          </Listbox.Label>
        </div>
        <Listbox.Button className="relative w-full h-11 cursor-pointer rounded-lg bg-tif-blue hover:bg-tif-lavender text-white text-sm lg:text-base py-2 pl-4 pr-10 text-left hover:shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-tif-pink">
          <span className="block truncate">{selectedOption.display}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition ease-in duration-100"
          leave="transition ease-linear duration-100"
          enterFrom={`opacity-0 ${
            showBelow ? "-translate-y-4" : "translate-y-4"
          }`}
          enterTo="opacity-100 translate-y-0"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo={`opacity-0 ${
            showBelow ? "-translate-y-4" : "translate-y-4"
          }`}
        >
          <Listbox.Options
            className={`${
              showBelow ? "top-full mt-2" : "bottom-full mb-2"
            } absolute py-1 px-1 z-20 max-h-60 w-full overflow-auto rounded-lg bg-tif-grey border-2 border-tif-blue text-sm lg:text-base shadow-md ring-1 ring-black/5 focus:outline-none`}
          >            
            {optionsArray.map((option) => (              
              <Listbox.Option
                key={option.id}
                value={option}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 rounded-md ${
                    active ? "bg-tif-blue text-white" : "text-tif-blue"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >                      
                      { option.display}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-tif-white">
                        <CheckCircleIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default ProductUploadFormListbox;
