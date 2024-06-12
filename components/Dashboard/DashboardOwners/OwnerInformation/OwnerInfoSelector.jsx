import { useState } from "react";

const OwnerInfoSelector = ({ infoTabs, callback_OnTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabSelect = (selectedIndex) => {
    setSelectedTab(selectedIndex);
    callback_OnTabChange(selectedIndex);
  };

  return (
    <section className="flex flex-col items-center justify-center w-full rounded-xl shadow-lg overflow-clip">
      {/* Tab Buttons */}
      <div className="flex items-center justify-center w-full">
        {infoTabs.map((tab, index) => (
          <button
            disabled={index == selectedTab}
            className={`flex items-center justify-center w-full h-10 md:h-12 gap-4 font-normal disabled:font-semibold text-white disabled:text-tif-blue bg-tif-blue hover:bg-tif-lavender disabled:bg-white transition-all
          }`}
            onClick={() => handleTabSelect(index)}
            key={"OwnerInfoTab" + index}
          >
            {tab.tabIcon}
            {tab.tabName}
          </button>
        ))}
      </div>

      {/* Filter Section */}
      <div
        className={`${
          infoTabs[selectedTab].tabFilters == null ? "hidden" : "flex"
        } items-center justify-center p-2 md:p-4 w-full bg-white rounded-b-xl`}
      >
        {infoTabs[selectedTab].tabFilters && infoTabs[selectedTab].tabFilters}
      </div>
    </section>
  );
};

export default OwnerInfoSelector;
