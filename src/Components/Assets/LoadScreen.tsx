export default function LoadScreen() {
    return (
      <>
        <div className="mx-auto w-full max-w-4xl rounded-md border border-blue-300 p-6">
          <div className="flex animate-pulse space-x-6">
            <div className="size-14 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-6 py-2">
              <div className="h-3 w-3/4 rounded bg-gray-200"></div>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-2 h-3 rounded bg-gray-200"></div>
                  <div className="col-span-1 h-3 rounded bg-gray-200"></div>
                </div>
                <div className="h-3 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="mx-auto w-full max-w-4xl rounded-md border border-blue-300 p-6">
          <div className="flex animate-pulse space-x-6">
            <div className="size-14 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-6 py-2">
              <div className="h-3 w-3/4 rounded bg-gray-200"></div>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-2 h-3 rounded bg-gray-200"></div>
                  <div className="col-span-1 h-3 rounded bg-gray-200"></div>
                </div>
                <div className="h-3 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }