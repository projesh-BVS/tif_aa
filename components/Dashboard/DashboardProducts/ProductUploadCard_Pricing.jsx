"use client";
import { useState } from "react";
import ProductUploadFormField from "./SubComps/ProductUploadFormField";
import ProductUploadFormListbox from "./SubComps/ProductUploadFormListbox";
import { getCurrencyUnits } from "@/utils/productUnitsUtils";
import { TagIcon } from "@heroicons/react/24/solid";

const currencyUnits = getCurrencyUnits();

const ProductUploadCard_Pricing = () => {
  const [selectedCurrUnit, setSelectedCurrUnit] = useState(currencyUnits[0]);

  return (
    <section className="flex flex-col gap-2 items-center justify-between w-full rounded-2xl shadow-md bg-white">
      <div className="flex w-full items-center gap-4 px-4 py-2 text-xl rounded-t-2xl font-bold text-white bg-gradient-to-br from-tif-lavender to-tif-pink">
        <TagIcon className="h-5 w-5 lg:h-6 lg:w-6" />
        <h1>Product Pricing</h1>
      </div>
      <div className="grid grid-cols-5 p-2 lg:p-4 h-auto gap-4 w-full">
        <div className="col-span-full xl:col-span-1">
          <ProductUploadFormListbox
            labelText="Currency"
            optionsArray={currencyUnits}
            onOptionSelect={setSelectedCurrUnit}
            showBelow={false}
          />
        </div>
        <div className="col-span-full xl:col-span-3">
          <ProductUploadFormField
            fieldID="productPrice"
            fieldName="productPrice"
            fieldType="number"
            fieldLabel="Price"
          />
        </div>
        <div className="col-span-full xl:col-span-1">
          <ProductUploadFormField
            fieldID="discountPercent"
            fieldName="discountPercent"
            fieldType="number"
            fieldLabel="Discount %"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductUploadCard_Pricing;
