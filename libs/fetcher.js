const super_baseURL =
  "https://0zwhtezm4f.execute-api.ap-south-1.amazonaws.com/TryItFirst/super?superID=";
const owner_baseURL =
  "https://0zwhtezm4f.execute-api.ap-south-1.amazonaws.com/TryItFirst/owner?ownerID=";
const company_baseURL =
  "https://0zwhtezm4f.execute-api.ap-south-1.amazonaws.com/TryItFirst/company?companyID=";
const product_baseURL =
  "https://0zwhtezm4f.execute-api.ap-south-1.amazonaws.com/TryItFirst/product?productID=";
const analytics_baseURL =
  "https://0zwhtezm4f.execute-api.ap-south-1.amazonaws.com/TryItFirst/analytics/views?companyID=";

export async function fetcher_Super(superID) {
  const response = await fetch(super_baseURL + superID);
  const data = await response.json();
  return data;
}

export async function fetcher_Owner(ownerID) {
  const response = await fetch(owner_baseURL + ownerID);
  const data = await response.json();
  return data;
}

export async function fetcher_AllOwners(ownerList) {
  const ownerIDs = ownerList.map((owner) => owner.ownerID);
  var fullData = [];

  for (let i = 0; i < ownerIDs.length; i++) {
    const response = await fetch(owner_baseURL + ownerIDs[i]);
    const data = await response.json();
    fullData.push(data);
  }

  return fullData;
}

export async function fetcher_Company(companyID) {
  const response = await fetch(company_baseURL + companyID);
  const data = await response.json();
  return data;
}

export async function fetcher_AllCompanies(companyList) {
  const companyIDs = companyList.map((company) => company.companyID);
  var fullData = [];

  for (let i = 0; i < companyIDs.length; i++) {
    const response = await fetch(company_baseURL + companyIDs[i]);
    const data = await response.json();
    fullData.push(data);
  }

  return fullData;
}

export async function fetcher_Product(productID) {
  const response = await fetch(product_baseURL + productID + "&isAdmin=true"); 
  const data = await response.json();
  return data;
}

export async function fetcher_Analytics(companyID) {
  const response = await fetch(analytics_baseURL + companyID);
  const data = await response.json();
  return data;
}
