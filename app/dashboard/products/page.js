"use client";
import React, { Fragment, useEffect, useState } from "react";
import DashPageHeader from "@/components/Dashboard/DashPageHeader";
import {
  CodeBracketIcon,
  PlusIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { useAllProducts } from "@/hooks/useAllProducts";
import { useSearchParams } from "next/navigation";
import ProductCompanySelector from "@/components/Dashboard/DashboardProducts/ProductCompanySelector";
import Link from "next/link";
import ProductCard from "@/components/Dashboard/DashboardProducts/ProductCard";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import ProductPluginModal from "@/components/Dashboard/DashboardProducts/ProductPluginGeneration/ProductPluginModal";

function Products() {
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

  const searchParams = useSearchParams();
  const productFilterQuery = searchParams.get("productCompany");
  const initialProductFilter = productFilterQuery
    ? parseInt(productFilterQuery)
    : -1; // Use -1 for "All"

  const { companies, products, isAllProductsLoading, isAllProductsError } =
    useAllProducts();

  const [selectedCompany, setSelectedCompany] = useState(initialProductFilter);
  const [openModal_ProductPlugin, setOpenModal_ProductPlugin] = useState(false);
  const [modalMode_ProductPlugin, setModalMode_ProductPlugin] =
    useState("None");

  const Callback_Modal_PluginCustomizer_Open = (modalMode) => {
    setModalMode_ProductPlugin(modalMode);
    setOpenModal_ProductPlugin(true);
  };

  const Callback_Modal_PluginCustomizer_Close = () => {
    setOpenModal_ProductPlugin(false);
  };

  return (
    <main className="flex flex-col gap-6 items-center w-full h-full overflow-auto bg-tif-grey">
      <DashPageHeader
        icon={<ShoppingBagIcon className="h-8 w-8" />}
        text="Products"
        isLoading={isAllProductsLoading}
        showBackBtn={true}
      />

      {isAllProductsLoading && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-gray-500">
          <span className="font-semibold lg:text-xl">Loading Products</span>
          <span className="font-light text-xs lg:text-sm">Please wait</span>
        </section>
      )}

      {isAllProductsError && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {!isAllProductsLoading && !isAllProductsError && (
        <section className="relative flex px-6 gap-4 -mt-6 w-full items-center justify-center">
          <ProductPluginModal
            doOpen={openModal_ProductPlugin}
            companies={companies}
            pluginMode={modalMode_ProductPlugin}
            callback_OnClose={Callback_Modal_PluginCustomizer_Close}
          />

          <div className="flex flex-col md:flex-row items-center justify-between w-full p-2 lg:p-4 gap-2 rounded-xl shadow-md bg-white">
            <ProductCompanySelector
              companies={companies}
              selectedCompany={selectedCompany}
              onChange={setSelectedCompany}
            />

            <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full md:w-fit">
              <PluginOptionsBtn
                Callback_PluginCustomizer_Open={
                  Callback_Modal_PluginCustomizer_Open
                }
              />
              <Link
                href={"/dashboard/products/addproduct/"}
                className="w-full md:w-auto"
              >
                <button className="flex pl-2 pr-4 w-full md:w-auto items-center justify-center gap-4 h-10 rounded-lg text-md text-white bg-tif-blue hover:bg-tif-lavender hover:shadow-md whitespace-nowrap transition-all">
                  <PlusIcon className="h-6 w-6" />
                  <h1 className="font-semibold text-md">Add Product</h1>
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {!isAllProductsLoading && !isAllProductsError && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-6 pb-24 gap-4 w-full overflow-auto">
          {products
            .filter(
              (product) =>
                selectedCompany === -1 || product.companyID === selectedCompany
            )
            .map((product, index) => (
              <ProductCard
                key={product.productID}
                index={index}
                productInfo={product}
                display3D={false}
              />
            ))}
        </div>
      )}
    </main>
  );
}

export default Products;

const PluginOptionsBtn = ({ Callback_PluginCustomizer_Open }) => {
  return (
    <div className="flex items-center justify-center w-full z-10">
      <Menu as="div" className="relative inline-block w-full">
        <div className="flex items-center justify-center">
          <Menu.Button className="flex pl-2 pr-4 w-full md:w-auto items-center justify-center gap-4 h-10 rounded-lg text-md text-white bg-tif-blue hover:bg-tif-lavender hover:shadow-md whitespace-nowrap transition-all">
            <CodeBracketIcon className="h-6 w-6" />
            <h1 className="font-semibold text-md">3rd Party Plugin</h1>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95 translate-x-5 -translate-y-5"
          enterTo="transform opacity-100 scale-100 translate-x-0 translate-y-0"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100 translate-x-0 translate-y-0"
          leaveTo="transform opacity-0 scale-95 translate-x-5 -translate-y-5"
        >
          <Menu.Items className="absolute right-0 mt-2 min-w-full md:min-w-[16rem] md:max-w-[97vw] origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-[0_25px_60px_10px_rgba(0,0,0,0.3)] ring-1 ring-black/5 focus:outline-none overflow-clip">
            <div className="flex flex-col items-center justify-center w-full h-36">
              <div className="relative flex items-center justify-center w-full h-1/3 bg-gradient-to-br from-tif-blue to-tif-pink">
                <h1 className="font-semibold text-white">
                  3rd Party Store Plugin
                </h1>
              </div>
              <div className="flex flex-col p-4 items-center justify-center w-[14rem] h-2/3">
                <p className="font-light text-sm text-center w-full">
                  Please select the 3rd Party Store in which you wish to
                  integrate{" "}
                  <span className="font-medium">TryItFirst Product Viewer</span>
                </p>
              </div>
            </div>
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-tif-blue text-white" : "text-gray-900"
                    } group animate-slideInSpringedLeft flex w-full h-10 items-center rounded-md gap-2 text-sm overflow-clip transition-all`}
                    onClick={() => Callback_PluginCustomizer_Open("Shopify")}
                  >
                    <div className="flex items-center justify-center ml-1 h-[80%] aspect-square bg-white rounded-full">
                      <Image
                        src="/Logos/Shopify_Logo.svg"
                        alt="Shopify Logo"
                        width={20}
                        height={20}
                        className={`${active ? "animate-pulse" : ""}`}
                      />
                    </div>
                    Shopify
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-tif-blue text-white" : "text-gray-900"
                    } group flex w-full h-10 items-center rounded-md gap-2 text-sm overflow-clip transition-all animate-slideInSpringedLeft animate-delay-75`}
                    onClick={() => Callback_PluginCustomizer_Open("Magento")}
                  >
                    <div className="flex items-center justify-center ml-1 h-[80%] aspect-square bg-white rounded-full">
                      <Image
                        src="/Logos/Magento_Logo.svg"
                        alt="Magento Logo"
                        width={20}
                        height={20}
                        className={`${active ? "animate-pulse" : ""}`}
                      />
                    </div>
                    Magento
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
