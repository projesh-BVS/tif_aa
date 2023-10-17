import {
  fetcher_AllBrands,
  fetcher_Brand,
  fetcher_Owner,
} from "@/libs/fetcher";
import useSWR from "swr";

export function useAllProducts(ownerID) {
  const {
    data: ownerData,
    error: ownerError,
    isLoading: isOwnerLoading,
  } = useSWR(ownerID, fetcher_Owner);
  const {
    data: allBrandData,
    error: allBrandError,
    isLoading: isBrandLoading,
  } = useSWR(() => (ownerData ? ownerData.brandList : null), fetcher_AllBrands);

  const isLoading = isOwnerLoading || isBrandLoading;
  const isAllProductsError =
    ownerError ||
    allBrandError ||
    (ownerData && ownerData.ownerDetails.length == 0) ||
    (allBrandData && allBrandData.length == 0);

  let allProducts = [];
  let allBrands = [];

  if (allBrandData) {
    allBrands = ownerData.brandList;

    for (let i = 0; i < allBrandData.length; i++) {
      for (let j = 0; j < allBrandData[i].catalogue.length; j++) {
        allProducts.push(allBrandData[i].catalogue[j]);
      }
    }
  }

  return {
    brands: allBrands,
    products: allProducts,
    isAllProductsLoading: isLoading,
    isAllProductsError,
  };
}
