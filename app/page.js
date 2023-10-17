"use client";
import { useEffect } from "react";
import LoginWindow from "@/components/LoginWindow/LoginWindow";

export default function Home() {
  useEffect(() => {
    // This is where we will initialize Model Viewer.
    // We'll do this asynchronously because it's a heavy operation.
    import("@google/model-viewer")
      .then(({ ModelViewerElement }) => {
        // Here, ModelViewerElement is now available and can be used.
        customElements.define("model-viewer", ModelViewerElement);
      })
      .catch((error) => {
        console.error("Error loading Model Viewer", error);
      });
  }, []); // We pass an empty dependency array so this runs once on mount.

  return (
    <main className="flex flex-col items-center justify-center gap-10 w-screen h-screen bg-tif-grey">
      <LoginWindow />
      <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-gray-500">
        <span className="font-semibold lg:text-xl">
          Login is non restricted. Press the Login button to continue
        </span>
        <span className="font-light text-xs lg:text-sm text-gray-500">
          The login module is suspended for ease of testing. It will be
          activated once testing for this update is done.
        </span>
      </section>
    </main>
  );
}
