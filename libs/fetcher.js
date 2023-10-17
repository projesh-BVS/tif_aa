const owner_baseURL =
  "https://0zwhtezm4f.execute-api.ap-south-1.amazonaws.com/TryItFirst/brandsofaowner?ownerID=";
const brand_baseURL =
  "https://0zwhtezm4f.execute-api.ap-south-1.amazonaws.com/TryItFirst/catalogue_brand?brandID=";
const product_baseURL =
  "https://0zwhtezm4f.execute-api.ap-south-1.amazonaws.com/TryItFirst/product?productID=";

export async function fetcher_Owner(ownerID) {
  const response = await fetch(owner_baseURL + ownerID);
  const data = await response.json();
  return data;
}

export async function fetcher_Brand(brandID) {
  const response = await fetch(brand_baseURL + brandID);
  const data = await response.json();
  return data;
}

export async function fetcher_AllBrands(brandList) {
  const brandIDs = brandList.map((brand) => brand.brandID);
  var fullData = [];

  /*const response = await fetch(brand_baseURL + brandIDs[0])
    const data = await response.json()
    return data*/

  for (let i = 0; i < brandIDs.length; i++) {
    const response = await fetch(brand_baseURL + brandIDs[i]);
    const data = await response.json();
    fullData.push(data);
  }

  return fullData;
}

export async function fetcher_Product(productID) {
  const response = await fetch(product_baseURL + productID);
  const data = await response.json();
  return data;
}
