

export default function LoadingCircle()
{

    return (
        <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        <h1 className="mt-4 text-2xl font-semibold">Loading...</h1>
      </div>
    );
}