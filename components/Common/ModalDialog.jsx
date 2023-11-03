import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

const ModalDialog = ({
  dialogText,
  dialogSubtext,
  confirmBtnText,
  closeBtnText,
  doOpen,
  closeCallback = null,
  toProductsCallback = null
}) => {
  let [isOpen, setIsOpen] = useState(doOpen);

  function closeModal() {
    setIsOpen(false);
    if(closeCallback != null) closeCallback();
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (doOpen) openModal();
    else closeModal();
  }, [doOpen]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {dialogText}
                  </Dialog.Title>
                  <div className={`mt-2 ${dialogSubtext ? "" : "hidden"}`}>
                    <p className="text-sm text-gray-500">{dialogSubtext}</p>
                  </div>

                  <div className="flex px-6 pb-6 gap-4 w-full items-center justify-center">
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={toProductsCallback}
                      >
                        {confirmBtnText}
                      </button>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        {closeBtnText}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalDialog;
