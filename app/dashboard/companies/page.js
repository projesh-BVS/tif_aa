"use client";
import DashPageHeader from "@/components/Dashboard/DashPageHeader";
import CompanyList from "@/components/Dashboard/DashboardCompanies/CompanyList";
import useOwner from "@/hooks/useOwner";
import { BuildingOffice2Icon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";

export default function Companies() {
  //const { data: session } = useSession();
  const { owner, isOwnerLoading, isOwnerError } =
    useOwner();
    //session.user.ownerID

  return (
    <main className="flex flex-col gap-6 items-center w-full h-full overflow-auto bg-tif-grey">
      <DashPageHeader
        icon={<BuildingOffice2Icon className="h-8 w-8" />}
        text="Companies"
        isLoading={isOwnerLoading}
        showBackBtn={true}
      />

      {isOwnerLoading && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-gray-500">
          <span className="font-semibold lg:text-xl">Loading Companies</span>
          <span className="font-light text-xs lg:text-sm">Please wait</span>
        </section>
      )}

      {owner && owner.ownerDetails.length == 0 && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {isOwnerError && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}
      {owner && owner.ownerDetails.length > 0 && !isOwnerError && (
        <section className="flex px-6 gap-4 -mt-6 w-full items-center justify-center">
          <CompanyList listItems={owner.companyList} />
        </section>
      )}
    </main>
  );
}
