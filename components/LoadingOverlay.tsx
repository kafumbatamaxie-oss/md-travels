"use client";

export default function LoadingOverlay({
  show,
}: {
  show: boolean;
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl text-center space-y-4">
        
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto" />

        <p className="font-semibold">
          Creating your invoice...
        </p>

        <p className="text-sm text-gray-500">
          Please wait, do not close this page.
        </p>

      </div>
    </div>
  );
}