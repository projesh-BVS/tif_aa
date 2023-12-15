"use client";
import DashPageHeader from "@/components/Dashboard/DashPageHeader";
import useProduct from "@/hooks/useProduct";
import { getFormattedPrice } from "@/utils/productInfoUtils";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import React from "react";

const ProductView = ({ params }) => {
  const { product, isProductLoading, isProductError } = useProduct(
    params.productID
  );

  console.log(product);

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
        <section className="flex flex-col xl:flex-row px-6 gap-4 -mt-6 w-full">
          <div
            id="card"
            className="flex flex-col gap-4 w-full xl:w-1/2 justify-center items-center relative shadow-md rounded-lg"
          >
            <model-viewer
              src={product.data.glb}
              ios-src={product.data.usdz}
              poster={product.data.poster}
              alt="3D model of the product"
              shadow-intensity="1"
              camera-controls
              touch-action="pan-y"
              auto-rotate
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
        </section>
      )}
    </main>
  );
};

export default ProductView;
