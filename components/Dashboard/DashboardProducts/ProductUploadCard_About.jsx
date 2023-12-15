import { InformationCircleIcon } from "@heroicons/react/24/solid";
import ProductUploadFormField from "./SubComps/ProductUploadFormField";
import ProductUploadFormListbox from "./SubComps/ProductUploadFormListbox";
import { useState, useEffect } from "react";

const ProductUploadCard_About = ({
  companyList,
  handleChange,
  handleDropdown,
  fieldsData = null,
}) => {
  var formattedCompanyList = GetFormattedCompanies(companyList);
  /*const [currSelectedCompany, setCurrSelectedCompany] = useState(
    formattedCompanyList[0]
  );*/

  const [currSelectedCompany, setCurrSelectedCompany] = useState(
    fieldsData === null
      ? formattedCompanyList[0]
      : formattedCompanyList[
          GetDataCompanyIndex(formattedCompanyList, fieldsData.companyID)
        ]
  );

  var formattedCategoryList = GetFormattedCategories(currSelectedCompany);

  const [currSelectedCategory, setCurrSelectedCategory] = useState(
    fieldsData === null
      ? formattedCategoryList[0]
      : formattedCategoryList[
          GetDataCategoryIndex(formattedCategoryList, fieldsData.category)
        ]
  );

  useEffect(() => {
    // console.log("Setting initial company ")
    handleDropdown("companyID", currSelectedCompany.id);
  }, [currSelectedCompany]);

  useEffect(() => {
    // console.log("Setting initial category ")
    handleDropdown("category", currSelectedCategory.display);
  }, [currSelectedCategory]);

  /*useEffect(() => {  
  if(fieldsData!= null){
    //for company
    formattedCompanyList.forEach(company => {
      if(company.id == fieldsData.companyID)
      {
        setCurrSelectedCompany(company);
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
        {/* Company Dropdown */}
        <ProductUploadFormListbox
          labelText="Company"
          optionsArray={formattedCompanyList}
          onOptionSelect={setCurrSelectedCompany}
          //onOptionSelect={() => console.log("onOptionSelect for Company called")}
          initialSelected={currSelectedCompany}
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

export function GetFormattedCompanies(companyList) {
  var formattedCompanies = [];

  formattedCompanies = companyList.map((company) => ({
    id: company.companyID,
    display: company.companyName,
    apiVal: company,
  }));

  return formattedCompanies;
}

export function GetFormattedCategories(company, doLog = false) {
  const defaultCat = {
    id: company.apiVal.companyID.toString() + "All",
    display: "Not Defined",
    apiVal: ["None"],
  };
  var formattedCategories = [];
  formattedCategories.length = 0;
  var companyID = company.apiVal.companyID;
  formattedCategories = company.apiVal.categories.map((category, index) => ({
    id: companyID.toString() + index.toString(),
    display: Object.keys(category).toString(),
    apiVal: category,
  }));

  formattedCategories.splice(0, 0, defaultCat);

  if (doLog) {
    console.log(
      "---------GetFormattedCategory(" + company.display + ")-------"
    );
    for (let i = 0; i < formattedCategories.length; i++) {
      console.log("Index: " + i + " | " + formattedCategories[i].display);
    }
    console.log("---------END FOR-------");
  }

  return formattedCategories;
}

export function GetDataCompanyIndex(formattedCompanyArray, dataCompanyID) {
  for (let index = 0; index < formattedCompanyArray.length; index++) {
    // console.log(
    //   "Checking Index: " +
    //     index +
    //     " | formattedArray[index]: " +
    //     formattedCompanyArray[index].id
    // );
    if (formattedCompanyArray[index].id === dataCompanyID) {
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
  return 0;
}
