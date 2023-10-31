"use client";
import { useState, useEffect } from "react";
import ProductUploadFormField from "./SubComps/ProductUploadFormField";
import ProductUploadFormListbox from "./SubComps/ProductUploadFormListbox";
import { CubeIcon } from "@heroicons/react/24/solid";
import { getDimensionUnits, getWeightUnits } from "@/utils/productUnitsUtils";

const dimensionUnits = getDimensionUnits();
const weightUnits = getWeightUnits();

const ProductUploadCard_Dimensions = ({handleChange , handleDropdown}) => {
  const [selectedDimUnit, setSelectedDimUnit] = useState(dimensionUnits[0]);
  const [selectedWtUnit, setSelectedWtUnit] = useState(weightUnits[0]);

  useEffect(() => {
  
    handleDropdown("dimensionUnit",selectedDimUnit.display)
  }, [selectedDimUnit]);

  useEffect(() => {
  
    handleDropdown("weightUnit",selectedWtUnit.display)
  }, [selectedWtUnit]);

  return (
    <section className="flex flex-col gap-2 items-center justify-between w-full rounded-2xl shadow-md bg-white">
      <div className="flex w-full items-center gap-4 px-4 rounded-t-2xl py-2 text-xl font-bold text-white bg-gradient-to-br from-tif-lavender to-tif-pink">
        <CubeIcon className="h-6 w-6 lg:h-7 lg:w-7" />
        <h1>Product Dimensions</h1>
      </div>
      <div className="grid grid-cols-4 p-2 lg:p-4 h-auto gap-4 w-full">
        <div className="col-span-full md:col-span-3">
          <ProductUploadFormListbox
            labelText="LxWxH Unit"
            optionsArray={dimensionUnits}
            onOptionSelect={setSelectedDimUnit}
           
          />
        </div>
        <div className="col-span-full md:col-span-1">
          <ProductUploadFormListbox
            labelText="Wt Unit"
            optionsArray={weightUnits}
            onOptionSelect={setSelectedWtUnit}
          />
        </div>
        <ProductUploadFormField
          fieldID="productLength"
          fieldName="length"
          fieldType="number"
          fieldLabel="Length"
          handleChange={handleChange}
        />
        <ProductUploadFormField
          fieldID="productWidth"
          fieldName="width"
          fieldType="number"
          fieldLabel="Width"
          handleChange={handleChange}
        />
        <ProductUploadFormField
          fieldID="productHeight"
          fieldName="height"
          fieldType="number"
          fieldLabel="Height"
          handleChange={handleChange}
        />
        <ProductUploadFormField
          fieldID="productWeight"
          fieldName="weight"
          fieldType="number"
          fieldLabel="Weight"
          handleChange={handleChange}
        />
      </div>
    </section>
  );
};

export default ProductUploadCard_Dimensions;
