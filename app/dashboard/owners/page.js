"use client";
import DashPageHeader from "@/components/Dashboard/DashPageHeader";
import OwnerCollection from "@/components/Dashboard/DashboardOwners/OwnerCollection/OwnerCollection";
import OwnerSearchSelector from "@/components/Dashboard/DashboardOwners/OwnerSearch/OwnerSearchSelector";
import useAllOwners from "@/hooks/useAllOwners";
import { PlusIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";

export default function Owners() {
  const { allOwners, isAllOwnersLoading, isAllOwnersError } = useAllOwners();
  const [searchQuery, setSearchQuery] = useState("");

  function Callback_SearchString(searchString) {
    setSearchQuery(searchString);
  }

  return (
    <main className="flex flex-col gap-6 items-center w-full h-full overflow-auto bg-tif-grey">
      <DashPageHeader
        icon={<UserGroupIcon className="h-8 w-8" />}
        text="Owners"
        isLoading={isAllOwnersLoading}
        showBackBtn={true}
      />

      {isAllOwnersLoading && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-gray-500">
          <span className="font-semibold lg:text-xl">Loading Owners</span>
          <span className="font-lignt text-xs lg:text-sm">Please wait</span>
        </section>
      )}

      {isAllOwnersError && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-lignt text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {allOwners && allOwners.length > 0 && !isAllOwnersError && (
        <section className="flex px-6 gap-4 -mt-6 w-full items-center justify-center">
          <div className="flex flex-col md:flex-row items-center justify-between w-full p-2 lg:p-4 gap-2 rounded-xl shadow-md bg-white">
            <OwnerSearchSelector
              isAutoSearch={true}
              fieldID={"owner-search"}
              fieldName={"OwnerSearch"}
              fieldType={"text"}
              fieldLabel={"Owner Name"}
              callback_SearchString={Callback_SearchString}
            />

            <div href={""} className="w-full md:w-auto">
              <button
                disabled={true}
                className="flex pl-2 pr-4 w-full md:w-auto items-center justify-center gap-4 h-10 rounded-lg text-md text-white disabled:bg-tif-blue/40 disabled:pointer-events-none bg-tif-blue hover:bg-tif-lavender hover:shadow-md whitespace-nowrap transition-all"
              >
                <PlusIcon className="h-6 w-6" />
                <h1 className="font-semibold text-md">Add Owner</h1>
              </button>
            </div>
          </div>
        </section>
      )}

      {allOwners && allOwners.length > 0 && !isAllOwnersError && (
        <section className="flex flex-col px-6 pb-6 gap-4 w-full h-full items-center justify-start overflow-auto">
          {allOwners
            .filter((owner) =>
              owner.ownerDetails[0].ownerName
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            )
            .map((owner, index) => (
              <OwnerCollection
                key={owner.ownerDetails[0].ownerID}
                index={index}
                ownerData={owner}
              />
            ))}
        </section>
      )}
    </main>
  );
}
