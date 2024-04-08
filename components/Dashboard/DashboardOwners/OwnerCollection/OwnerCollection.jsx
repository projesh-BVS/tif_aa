import OwnerCollectionBody from "./OwnerCollectionBody";
import OwnerCollectionHeader from "./OwnerCollectionHeader";

const OwnerCollection = ({ index, ownerData }) => {
  return (
    <section
      className="animate-slideInSpringedLeft flex flex-col shrink-0 items-center w-full bg-white rounded-2xl shadow-md overflow-clip transition-all"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <OwnerCollectionHeader
        index={index}
        ownerInfo={ownerData.ownerDetails[0]}
      />
      <OwnerCollectionBody index={index} ownerData={ownerData} />
    </section>
  );
};

export default OwnerCollection;
