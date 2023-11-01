"use client";
import DashPageHeader from "@/components/Dashboard/DashPageHeader";
import ProductUploadCard_About from "@/components/Dashboard/DashboardProducts/ProductUploadCard_About";
import ProductUploadCard_Dimensions from "@/components/Dashboard/DashboardProducts/ProductUploadCard_Dimensions";
import ProductUploadCard_Model from "@/components/Dashboard/DashboardProducts/ProductUploadCard_Model";
import ProductUploadCard_Pricing from "@/components/Dashboard/DashboardProducts/ProductUploadCard_Pricing";
import useOwner from "@/hooks/useOwner";
import { Fragment, useState, useEffect } from "react";
import axios from 'axios';

import {
  CloudArrowUpIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

const AddProduct = () => {
  const { owner, isOwnerLoading, isOwnerError } = useOwner(1);

  
    const [fields, setFields] = useState({
      brandID: '',
      name: '',
      description: '',
      price: '',
      currency: '',
      discountPercent: 0,
      discountedPrice: 0,
      category: '',
      weight: '',
      weightUnit:'',
      materials: 'default',
      height: '',
      width: '',
      length: '',
      dimensionUnit:'',
    });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name " + name + " value " +value )
    setFields({ ...fields, [name]: value });
  };

  function handleDropdown(name, value) {
    // Do something with name and value
    console.log("name " + name + " value " +value )
    setFields({ ...fields, [name]: value });
  }

  function handleFile(name, value) {
    // Do something with name and value
    console.log("name " + name + " value " +value )
    setFields({ ...fields, [name]: value });
  }

  const handleSubmit = async (event) => {
    // Submit all data to your backend
    event.preventDefault();
      console.log(fields)
    await axios.post('https://0zwhtezm4f.execute-api.ap-south-1.amazonaws.com/TryItFirst/add_product', fields);
    
    
  };

  useEffect(() => {
  
    console.log("form values " +  JSON.stringify(fields));
  }, [fields]);

  return (
    <main className="flex flex-col gap-6 items-center w-full h-full overflow-auto bg-tif-grey">
      <DashPageHeader
        icon={<PlusCircleIcon className="h-8 w-8" />}
        text="Add Product"
        isLoading={isOwnerLoading}
        showBackBtn={false}
      />
      {isOwnerLoading && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-gray-500">
          <span className="font-semibold lg:text-xl">Preparing Form</span>
          <span className="font-light text-xs lg:text-sm">Please wait</span>
        </section>
      )}

      {owner && owner.ownerDetails.length == 0 && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {isOwnerError && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {owner && owner.ownerDetails.length > 0 && !isOwnerError && (
        <form className="flex flex-col gap-6 items-center w-full h-full overflow-auto -mt-6">
          <section className="flex px-6 gap-4 w-full items-center justify-center">
            <ProductUploadCard_Model handleFile={handleFile} />
          </section>

          <section className="flex px-6 gap-4 w-full items-center justify-center">
            <ProductUploadCard_About brandList={owner.brandList} handleChange={handleChange} handleDropdown = {handleDropdown} />
          </section>

          <section className="flex px-6 gap-4 w-full items-center justify-center">
            <ProductUploadCard_Dimensions handleChange={handleChange} handleDropdown = {handleDropdown} />
          </section>

          <section className="flex px-6 gap-4 w-full items-center justify-center">
            <ProductUploadCard_Pricing  handleChange={handleChange} handleDropdown = {handleDropdown} />
          </section>

          <section className="flex px-6 pb-6 gap-4 w-full items-center justify-center">
            <button
              disabled={false}
              onClick={handleSubmit}
              className="flex p-4 gap-4 items-center justify-center w-full rounded-xl hover:shadow-lg disabled:shadow-none font-semibold text-lg text-white bg-green-500 hover:bg-green-700 disabled:bg-green-500/40 transition-all"
            >
              <span>
                <CloudArrowUpIcon className="h-6 w-6" />
              </span>
              <span>Upload Product</span>
            </button>
            <button
              disabled={true}
              className="flex p-4 gap-4 items-center justify-center w-full rounded-xl hover:shadow-lg disabled:shadow-none font-semibold text-lg text-white bg-red-500 hover:bg-red-700 disabled:bg-red-500/40 transition-all"
            >
              <span>
                <TrashIcon className="h-6 w-6" />
              </span>
              <span>Discard</span>
            </button>
          </section>
        </form>
      )}
    </main>
  );
};

export default AddProduct;
