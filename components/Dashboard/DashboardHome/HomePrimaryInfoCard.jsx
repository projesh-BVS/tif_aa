import {
  BuildingStorefrontIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import DashInfoItem from "../DashInfoItem";

const HomePrimaryInfoCard = ({ ownerData, isOwnerLoading, isOwnerError }) => {
  if (isOwnerLoading) {
    return (
      <section className="flex flex-col p-4 gap-2 items-center justify-between w-full rounded-xl shadow-md text-gray-500 bg-white">
        <span className="font-semibold lg:text-xl">Loading Data</span>
        <span className="font-light text-xs lg:text-sm">Please wait</span>
      </section>
    );
  }

  if (ownerData.ownerDetails.length == 0) {
    return (
      <section className="flex flex-col p-4 gap-2 items-center justify-between w-full rounded-xl shadow-md text-red-500 bg-white">
        <span className="font-semibold lg:text-xl">
          Sorry, there was an error while loading data
        </span>
        <span className="font-light text-xs lg:text-sm">
          Please refresh the page if you still see an error after 30 secs
        </span>
      </section>
    );
  }

  if (isOwnerError) {
    return (
      <section className="flex flex-col p-4 gap-2 items-center justify-between w-full rounded-xl shadow-md text-red-500 bg-white">
        <span className="font-semibold lg:text-xl">
          Sorry, there was an error while loading data
        </span>
        <span className="font-light text-xs lg:text-sm">
          Please refresh the page if you still see an error after 30 secs
        </span>
      </section>
    );
  }

  return (
    <section className="flex flex-col md:flex-row p-2 lg:p-4 gap-2 items-center justify-between w-full rounded-2xl shadow-md bg-white">
      <div className="flex flex-col w-full max-w-xs text-center md:text-left">
        <span className="font-light lg:text-xl">{GetGreeting()}</span>
        <span className="font-semibold text-xl lg:text-2xl whitespace-nowrap text-ellipsis">
          {ownerData.ownerDetails[0].ownerName}
        </span>
      </div>
      <div className="flex flex-col md:flex-row gap-1 lg:gap-2 items-center justify-center md:justify-end w-full">
        <DashInfoItem
          icon={<BuildingStorefrontIcon className="h-7 w-7 lg:h-8 lg:w-8" />}
          text="Brands"
          page="/dashboard/brands"
          count={GetBrandCount((ownerData = { ownerData }))}
        />
        <hr className="text-gray-500" />
        <DashInfoItem
          icon={<ShoppingBagIcon className="h-7 w-7 lg:h-8 lg:w-8" />}
          text="Products"
          page="/dashboard/products"
          count={GetProductCount(ownerData)}
        />
      </div>
    </section>
  );
};

export default HomePrimaryInfoCard;

export function GetGreeting() {
  const hrs = new Date().getHours();
  var greeting;
  if (hrs < 12) greeting = "Good Morning,";
  else if (hrs >= 12 && hrs < 17) greeting = "Good Afternoon,";
  else greeting = "Good Evening,";

  return greeting;
}

export function GetBrandCount({ ownerData }) {
  return ownerData.brandList.length;
}

export function GetProductCount({ ownerData }) {
  var pCount = 0;
  ownerData.brandList.map((brand) => (pCount += brand.productCount));

  return pCount;
}
