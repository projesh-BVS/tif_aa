import { InformationCircleIcon } from "@heroicons/react/24/solid";
import ProductUploadFormField from "./SubComps/ProductUploadFormField";
import ProductUploadFormListbox from "./SubComps/ProductUploadFormListbox";
import { Fragment,useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

const ProductUploadCard_About = ({ brandList }) => {
  var formattedBrandList = GetFormattedBrands(brandList);
  const [currSelectedBrand, setCurrSelectedBrand] = useState(
    formattedBrandList[0]
  );


  const [curCatList, setCurCatList] = useState([])



  var formattedCategoryList = GetFormattedCategories(currSelectedBrand);

  const [currSelectedCategory, setCurrSelectedCategory] = useState(
    formattedCategoryList[0]
  );

  const [selectedOption, setSelectedOption] = useState({});

  useEffect(() => {
    formattedCategoryList = GetFormattedCategories(currSelectedBrand);
    setCurCatList(formattedCategoryList)
  }, [currSelectedBrand]);



  useEffect(() => {

    setCurrSelectedCategory(formattedCategoryList[0])
  }, [curCatList]);

  console.log(
    "After calling currSelectedCategory outside useEffect: " +
    currSelectedCategory.display
  );

  function handleOnChange(option) {
    setSelectedOption(option);
    setCurrSelectedCategory(option);
    console.log(" | Option changed to on click: " + option.display);
  }

  return (
    <section className="flex flex-col gap-2 items-center justify-between w-full rounded-2xl shadow-md bg-white overflow-clip">
      <div className="flex w-full items-center gap-4 px-4 py-2 text-xl font-bold text-white bg-gradient-to-br from-tif-lavender to-tif-pink">
        <InformationCircleIcon className="h-6 w-6 lg:h-7 lg:w-7" />
        <h1>About Product</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 p-2 lg:p-4 h-auto gap-4 w-full">
        <ProductUploadFormListbox
          labelText="Brand"
          optionsArray={formattedBrandList}
          onOptionSelect={setCurrSelectedBrand}
        />
        {console.log("while rendering " + currSelectedCategory.display)}
        {/* <ProductUploadFormListbox
          labelText="Category"
          
          optionsArray={formattedCategoryList}
          onOptionSelect={setCurrSelectedCategory}
        /> */}

        <Listbox value={currSelectedCategory} by="id" onChange={handleOnChange}>
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
                {"Category"}
              </Listbox.Label>
            </div>
            <Listbox.Button className="relative w-full h-11 cursor-pointer rounded-lg bg-tif-blue hover:bg-tif-lavender text-white text-sm lg:text-base py-2 pl-4 pr-10 text-left hover:shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-tif-pink">
              <span className="block truncate">{currSelectedCategory.display}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              enter="transition ease-in duration-100"
              leave="transition ease-linear duration-100"
              enterFrom={`opacity-0 ${true ? "-translate-y-4" : "translate-y-4"
                }`}
              enterTo="opacity-100 translate-y-0"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo={`opacity-0 ${true ? "-translate-y-4" : "translate-y-4"
                }`}
            >
              <Listbox.Options
                className={`${true ? "top-full mt-2" : "bottom-full mb-2"
                  } absolute py-1 px-1 z-20 max-h-60 w-full overflow-auto rounded-lg bg-tif-grey border-2 border-tif-blue text-sm lg:text-base shadow-md ring-1 ring-black/5 focus:outline-none`}
              >
                {curCatList.map((option) => (
                  <Listbox.Option
                    key={option.key}
                    value={option}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 rounded-md ${active ? "bg-tif-blue text-white" : "text-tif-blue"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"
                            }`}
                        >
                          {option.display}
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
        {/*<ProductUploadFormField
          fieldID="productCategory"
          fieldName="productCategory"
          fieldType="text"
          fieldLabel="Product Category"
        />*/}
        <ProductUploadFormField
          fieldID="productName"
          fieldName="productName"
          fieldType="text"
          fieldLabel="Product Name"
        />
        <ProductUploadFormField
          fieldID="productTags"
          fieldName="productTags"
          fieldType="text"
          fieldLabel="Product Tags"
        />
        <div className="col-span-full">
          <ProductUploadFormField
            fieldID="productDescription"
            fieldName="productDescription"
            fieldType="text"
            fieldLabel="Product Description"
            multiline={true}
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

  formattedCategories = brand.apiVal.categories.map((category, index) => ({
    id: index,
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
