"use client";
import LoadingIndicator from "@/components/Common/LoadingIndicator";
import DashPageHeader from "@/components/Dashboard/DashPageHeader";
import useCompany from "@/hooks/useCompany";
import useProduct from "@/hooks/useProduct";
import MagentoClipboardCopy from "@/libs/Common Libs/MagentoClipboardCopy";
import { getFormattedPrice } from "@/utils/productInfoUtils";
import {
  ClipboardIcon,
  CodeBracketIcon,
  InformationCircleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

const ProductView = ({ params }) => {
  const { product, isProductLoading, isProductError } = useProduct(
    params.productID
  );
  const { company, isCompanyLoading, isCompanyError } = useCompany(
    product ? product.data.companyID : null
  );
  const [showVariantSelector, setShowVariantSelector] = useState(false);

  console.log(product);

  let modelViewerVariants = null;
  let modelVariantNames = null;
  let select = null;

  useEffect(() => {
    // This is where we will initialize Model Viewer.
    // We'll do this asynchronously because it's a heavy operation.
    import("@google/model-viewer")
      .then(({ ModelViewerElement }) => {
        // Here, ModelViewerElement is now available and can be used.
        customElements.get("model-viewer") ||
          customElements.define("model-viewer", ModelViewerElement);
      })
      .catch((error) => {
        console.error("Error loading Model Viewer", error);
      });
  }, []); // We pass an empty dependency array so this runs once on mount.

  useEffect(() => {
    //console.log("PRODUCT DATA UPDATED");
    modelViewerVariants = document.querySelector("#CurrProductViewer");
    //console.log("Model Viewer Element - " + modelViewerVariants);

    if (modelViewerVariants != null) {
      modelViewerVariants.addEventListener("load", () => {
        modelVariantNames = modelViewerVariants.availableVariants;

        //console.log("Variant Names - " + modelVariantNames);

        if (modelVariantNames.length > 0) {
          setShowVariantSelector(true);
        } else setShowVariantSelector(false);
      });
    }
  }, [product]);

  useEffect(() => {
    if (showVariantSelector) {
      modelViewerVariants = document.querySelector("#CurrProductViewer");
      modelVariantNames = modelViewerVariants.availableVariants;
      select = document.querySelector("#VariantDropdown");

      for (const name of modelVariantNames) {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
      }

      const option = document.createElement("option");
      option.value = "default";
      option.textContent = "default";
      select.appendChild(option);

      select.addEventListener("input", (event) => {
        modelViewerVariants.variantName =
          event.target.value === "default" ? null : event.target.value;
      });
    }
  }, [showVariantSelector]);

  return (
    <main className="flex flex-col gap-6 items-center w-full h-full overflow-auto bg-tif-grey">
      <DashPageHeader
        icon={<ShoppingBagIcon className="h-8 w-8" />}
        text={"Viewing Product - " + params.productID}
        isLoading={isProductLoading}
        showBackBtn={true}
      />

      {isProductLoading && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-gray-500">
          <span className="font-semibold lg:text-xl">Loading Product</span>
          <span className="font-light text-xs lg:text-sm">Please wait</span>
        </section>
      )}

      {product && product.data == null && !isProductLoading && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {isProductError && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {product && product.data != null && !isProductError && (
        <section className="flex flex-col px-6 gap-4 -mt-6 w-full">
          <div className="flex flex-col xl:flex-row gap-4 w-full">
            <div
              id="card"
              className="flex flex-col gap-4 w-full xl:w-1/2 justify-center items-center relative shadow-md rounded-lg"
            >
              <model-viewer
                id="CurrProductViewer"
                src={product.data.glb}
                ios-src={product.data.usdz}
                poster={product.data.poster}
                alt="3D model of the product"
                shadow-intensity="1"
                camera-controls
                touch-action="pan-y"
                auto-rotate
                autoplay
                ar
                ar-scale="fixed"
                style={{
                  backgroundColor: "white",
                  minHeight: 18 + "rem",
                  height: 100 + "%",
                  borderRadius: 0.5 + "rem",
                }}
              >
                <button
                  slot="ar-button"
                  id="ar-button"
                  className="bg-blue-500 shadow-lg p-2 text-white text-xs rounded-lg w-full bottom-0 absolute"
                >
                  View product in AR
                </button>
                {showVariantSelector && (
                  <div className="flex items-center justify-center gap-4 w-full p-2 font-medium text-white bg-slate-600">
                    <h1 className="whitespace-nowrap">Product Variants</h1>
                    <select
                      id="VariantDropdown"
                      className="w-full p-2 rounded-md bg-tif-blue text-white"
                    ></select>
                  </div>
                )}
              </model-viewer>
            </div>
            <div className="flex flex-col gap-2 w-full text-gray-500">
              <h1 className="text-md xl:text-2xl font-semibold">
                {product.data.productName}
              </h1>
              <div className="flex gap-2">
                <h2 className="text-md xl:text-xl font-semibold text-white bg-tif-blue w-max p-2 rounded-md">
                  {getFormattedPrice(product.data.currency, product.data.price)}
                </h2>
                <h2 className="text-md xl:text-xl font-semibold text-white bg-tif-blue w-max p-2 rounded-md">
                  {"L: " +
                    product.data.productLength +
                    " x W: " +
                    product.data.width +
                    " x H: " +
                    product.data.height +
                    " " +
                    product.data.dimensionUnit}
                </h2>
                <h2 className="text-md xl:text-xl font-semibold text-white bg-tif-blue w-max p-2 rounded-md">
                  {"Wt: " + product.data.weight + " " + product.data.weightUnit}
                </h2>
              </div>
              <p className="text-sm xl:text-lg font-medium italic">
                {product.data.description}
              </p>
            </div>
          </div>

          {
            <div className="flex flex-col w-full bg-gradient-to-br from-tif-blue to-tif-pink font-semibold text-white rounded-lg overflow-clip shadow-md">
              <div className="flex p-2 w-full h-14 items-center justify-between">
                <div className="flex items-center justify-start w-full gap-2">
                  <InformationCircleIcon className="w-6 h-6" />
                  <h1 className="w-full">Additional Info</h1>
                </div>
              </div>

              <div className="flex flex-col w-full text-slate-600 bg-white font-normal">
                <div className="flex w-full items-center justify-between border-b-2">
                  <h1 className="w-1/2 p-4 border-r-2">
                    <span className="font-semibold">ID - </span>
                    {product.data.productID}
                  </h1>
                  <h1 className="w-1/2 p-4">
                    <span className="font-semibold">SKU - </span>
                    {product.data.productSKU
                      ? product.data.productSKU
                      : "Server Error"}
                  </h1>
                </div>
                <div className="flex w-full items-center justify-between border-b-2">
                  {isCompanyLoading && (
                    <div className="p-4">
                      <LoadingIndicator />
                    </div>
                  )}
                  {!isCompanyLoading && company.company && (
                    <h1 className="w-full p-4">
                      <span className="font-semibold">Company - </span>
                      {company?.company[0]?.companyName
                        ? company.company[0].companyName
                        : "Server Error"}
                    </h1>
                  )}
                </div>
                <div className="flex w-full items-center justify-between border-b-2">
                  {isCompanyLoading && (
                    <div className="p-4">
                      <LoadingIndicator />
                    </div>
                  )}
                  {!isCompanyLoading && (
                    <h1 className="w-full p-4">
                      <span className="font-semibold">Outlets - </span>
                      {company?.outletList
                        ? GetOutletNames(
                            product.data.outletIDs,
                            company.outletList
                          )
                        : "Server Error"}
                    </h1>
                  )}
                </div>
                <div className="flex w-full items-center justify-between">
                  <h1 className="w-full p-4">
                    <span className="font-semibold">Category - </span>
                    {product.data.category
                      ? product.data.category
                      : "Server Error"}
                  </h1>
                </div>
              </div>
            </div>
          }

          {/*<div className="flex flex-col w-full bg-gradient-to-br from-tif-blue to-tif-pink font-semibold text-white rounded-lg overflow-clip shadow-md">
            <div className="flex p-2 w-full h-14 items-center justify-between">
              <div className="flex items-center justify-start w-full gap-2">
                <CodeBracketIcon className="w-6 h-6" />
                <h1 className="w-full">Magento Code</h1>
              </div>
              <button
                className="flex items-center justify-center gap-2 p-2 text-white bg-green-500 hover:bg-green-600 hover:shadow-md border-2 border-white/50 rounded-md"
                onClick={() =>
                  MagentoClipboardCopy(
                    product.data.glb,
                    product.data.usdz,
                    product.data.poster
                  )
                }
              >
                <ClipboardIcon className="h-5 w-5" />
                <h1>Copy</h1>
              </button>
            </div>
            <code className="flex p-4 bg-slate-600 text-white font-light">
              &lt;iframe src="https://main.d1vhqgytpq3fa1.amplifyapp.com?src=
              {product.data.glb}&poster={product.data.poster}
              &environmentImage=https://brandlogo.s3.ap-south-1.amazonaws.com/moon_1k.hdr"
              width="px" height="400px" allow="camera" &gt;&lt;/iframe&gt;
            </code>
          </div>*/}
        </section>
      )}
    </main>
  );
};

export default ProductView;

function GetOutletNames(productOutletIDs, outletList) {
  let outletNames = [];

  for (let outletID of productOutletIDs) {
    const outlet = outletList.find((outlet) => outlet.outletID === outletID);

    if (outlet) {
      outletNames.push(outlet.outletName);
    }
  }

  for (let i = 0; i < outletNames.length - 1; i++) {
    outletNames[i] = outletNames[i] + ", ";
  }

  return outletNames;
}
