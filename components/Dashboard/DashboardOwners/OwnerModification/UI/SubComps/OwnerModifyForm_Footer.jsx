import LoadingIndicator from "@/components/Common/LoadingIndicator";
import { CloudArrowUpIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const OwnerModifyForm_Footer = ({
  statusDataUploading,
  statusFormFilled,
  txtSubmitBtn,
  txtCancelBtn,
  onSubmitCallback,
  onCancelCallback,
}) => {
  const [isUploadingData, setIsUploadingData] = useState(statusDataUploading);
  useEffect(() => {
    setIsUploadingData(statusDataUploading);
  }, [statusDataUploading]);

  return (
    <div className="flex p-4 pt-2 gap-4 w-full items-center justify-center">
      <button
        type="Submit"
        onClick={onSubmitCallback}
        disabled={isUploadingData || !statusFormFilled}
        className="flex gap-2 w-full h-12 items-center justify-center px-4 py-2 rounded-lg bg-green-500 text-white font-semibold text-base hover:bg-green-600 hover:shadow-md disabled:bg-green-500/50 transition-all"
      >
        {isUploadingData && (
          <>
            <LoadingIndicator />
            <h1>Please Wait...</h1>
          </>
        )}
        {!isUploadingData && (
          <>
            <CloudArrowUpIcon className="w-5 h-5" />
            <h1>{txtSubmitBtn}</h1>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={onCancelCallback}
        disabled={isUploadingData}
        className="flex gap-2 w-full h-12 items-center justify-center px-4 py-2 rounded-lg bg-red-500 text-white font-semibold text-base hover:bg-red-600 hover:shadow-md disabled:bg-red-500/50 transition-all"
      >
        {isUploadingData && (
          <>
            <LoadingIndicator />
            <h1>Please Wait...</h1>
          </>
        )}
        {!isUploadingData && (
          <>
            <XCircleIcon className="w-5 h-5" />
            <h1>{txtCancelBtn}</h1>
          </>
        )}
      </button>
    </div>
  );
};

export default OwnerModifyForm_Footer;
