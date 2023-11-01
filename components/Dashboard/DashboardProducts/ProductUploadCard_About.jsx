import { InformationCircleIcon } from "@heroicons/react/24/solid";
import ProductUploadFormField from "./SubComps/ProductUploadFormField";
import ProductUploadFormListbox from "./SubComps/ProductUploadFormListbox";
import { useState, useEffect } from "react";


const ProductUploadCard_About = ({ brandList , handleChange , handleDropdown }) => {
  var formattedBrandList = GetFormattedBrands(brandList);
  const [currSelectedBrand, setCurrSelectedBrand] = useState(
    formattedBrandList[0]
  );

  var formattedCategoryList = GetFormattedCategories(currSelectedBrand);

  const [currSelectedCategory, setCurrSelectedCategory] = useState(
    formattedCategoryList[0]
  );

  useEffect(() => {
   // console.log("Setting initial brand ")
    handleDropdown("brandID",currSelectedBrand.id)
  }, [currSelectedBrand]);

  useEffect(() => {
  
   // console.log("Setting initial category ")
    handleDropdown("category",currSelectedCategory.display)
  }, [currSelectedCategory]);



  return (    
    <section className="flex flex-col gap-2 items-center justify-between w-full rounded-2xl shadow-md bg-white overflow-clip">
      <div className="flex w-full items-center gap-4 px-4 py-2 text-xl font-bold text-white bg-gradient-to-br from-tif-lavender to-tif-pink">
        <InformationCircleIcon className="h-6 w-6 lg:h-7 lg:w-7" />
        <h1>About Product</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 p-2 lg:p-4 h-auto gap-4 w-full">
        {/* Brand Dropdown */}
        <ProductUploadFormListbox
          labelText="Brand"
          optionsArray={formattedBrandList}
          onOptionSelect={setCurrSelectedBrand}
        />
        {console.log("while rendering " + currSelectedCategory.display)}

        {/* Category Dropdown */}
        <ProductUploadFormListbox
          labelText="Category"
          
          optionsArray={formattedCategoryList}
          onOptionSelect={setCurrSelectedCategory}
          isDependant = {true}
        />

      
        <ProductUploadFormField
          fieldID="productName"
          fieldName="productName"
          fieldType="text"
          fieldLabel="Product Name"
          isRequired="true"
          handleChange={handleChange}
        />
        <ProductUploadFormField
          fieldID="productTags"
          fieldName="itemTags"
          fieldType="text"
          fieldLabel="Product Tags"
          handleChange={handleChange}
        />
        <div className="col-span-full">
          <ProductUploadFormField
            fieldID="productDescription"
            fieldName="description"
            fieldType="text"
            fieldLabel="Product Description"
            multiline={true}
            handleChange={handleChange}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductUploadCard_About;

export function GetFormattedBrands(brandList) {
  var formattedBrands = [];

  formattedBrands = brandList.map((brand) => ({
    id: brand.brandID,
    display: brand.brandName,
    apiVal: brand,
  }));

  return formattedBrands;
}

export function GetFormattedCategories(brand, doLog = false) {
  var formattedCategories = [];
  formattedCategories.length = 0;
  var brandID = brand.apiVal.brandID;
  formattedCategories = brand.apiVal.categories.map((category, index) => ({
    id:  brandID.toString() + index.toString(),
    display: Object.keys(category).toString(),
    apiVal: category,
  }));

  if (doLog) {
    console.log("---------GetFormattedCategory(" + brand.display + ")-------");
    for (let i = 0; i < formattedCategories.length; i++) {
      console.log("Index: " + i + " | " + formattedCategories[i].display);
    }
    console.log("---------END FOR-------");
  }

  return formattedCategories;
}
