import { InformationCircleIcon } from "@heroicons/react/24/solid";
import ProductUploadFormField from "./SubComps/ProductUploadFormField";
import ProductUploadFormListbox from "./SubComps/ProductUploadFormListbox";
import { useState, useEffect } from "react";

const ProductUploadCard_About = ({
  brandList,
  handleChange,
  handleDropdown,
  fieldsData = null,
}) => {
  var formattedBrandList = GetFormattedBrands(brandList);
  /*const [currSelectedBrand, setCurrSelectedBrand] = useState(
    formattedBrandList[0]
  );*/

 
  const [currSelectedBrand, setCurrSelectedBrand] = useState(
    fieldsData === null
      ? formattedBrandList[0]
      : formattedBrandList[
          GetDataBrandIndex(formattedBrandList, fieldsData.brandID)
        ]
  );

 

  var formattedCategoryList = GetFormattedCategories(currSelectedBrand);

  const [currSelectedCategory, setCurrSelectedCategory] = useState(
    fieldsData === null
      ? formattedCategoryList[0]
      : formattedCategoryList[
          GetDataCategoryIndex(formattedCategoryList, fieldsData.category)
        ]
  );

  useEffect(() => {
    // console.log("Setting initial brand ")
    handleDropdown("brandID", currSelectedBrand.id);
  }, [currSelectedBrand]);

  useEffect(() => {
    // console.log("Setting initial category ")
    handleDropdown("category", currSelectedCategory.display);
  }, [currSelectedCategory]);

  /*useEffect(() => {  
  if(fieldsData!= null){
    //for brand
    formattedBrandList.forEach(brand => {
      if(brand.id == fieldsData.brandID)
      {
        setCurrSelectedBrand(brand);
      }
    });
    //for category
  }}, [fieldsData]);*/

  return (
    <section className="flex flex-col gap-2 items-center justify-between w-full rounded-2xl shadow-md bg-white overflow-clip">
      <div className="flex w-full items-center gap-4 px-4 py-2 text-xl font-bold text-white bg-gradient-to-br from-tif-lavender to-tif-pink">
        <InformationCircleIcon className="h-6 w-6 lg:h-7 lg:w-7" />
        <h1>About Product</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 p-2 lg:p-4 h-auto gap-4 w-full">
        {/* Brand Dropdown */}
        <ProductUploadFormListbox
          labelText="Company"
          optionsArray={formattedBrandList}
          onOptionSelect={setCurrSelectedBrand}
          //onOptionSelect={() => console.log("onOptionSelect for Brand called")}
          initialSelected={currSelectedBrand}
        />
        {console.log("while rendering " + currSelectedCategory.display)}

        {/* Category Dropdown */}
        <ProductUploadFormListbox
          labelText="Category"
          optionsArray={formattedCategoryList}
          onOptionSelect={setCurrSelectedCategory}
          initialSelected={currSelectedCategory}
          isDependant={true}
        />

        <ProductUploadFormField
          fieldID="productName"
          fieldName="productName"
          fieldType="text"
          fieldLabel="Product Name"
          fieldValue={fieldsData === null ? "" : fieldsData.productName}
          handleChange={handleChange}
        />
        <ProductUploadFormField
          fieldID="productTags"
          fieldName="itemTags"
          fieldType="text"
          fieldLabel="Product Tags"
          fieldValue={fieldsData === null ? "" : fieldsData.itemTags}
          handleChange={handleChange}
        />
        <div className="col-span-full">
          <ProductUploadFormField
            fieldID="productDescription"
            fieldName="description"
            fieldType="text"
            fieldLabel="Product Description"
            multiline={true}
            fieldValue={fieldsData === null ? "" : fieldsData.description}
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
    id: brandID.toString() + index.toString(),
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

export function GetDataBrandIndex(formattedBrandArray, dataBrandID) {
  
  for (let index = 0; index < formattedBrandArray.length; index++) {
    // console.log(
    //   "Checking Index: " +
    //     index +
    //     " | formattedArray[index]: " +
    //     formattedBrandArray[index].id
    // );
    if (formattedBrandArray[index].id === dataBrandID) {
     
      return index;
    }
  }
  return null;
}


export function GetDataCategoryIndex(formatttedCategoryArray, category) {
 
  for (let index = 0; index < formatttedCategoryArray.length; index++) {
    console.log(
      "Checking Index: " +
        index +
        " | formatttedCategoryArray[index]: " +
        formatttedCategoryArray[index].display +
        " look for " +
        category
    );
    if (formatttedCategoryArray[index].display === category) {
      console.log("Data Returning index: " + index);
      return index;
    }
  }
  return null;
}
