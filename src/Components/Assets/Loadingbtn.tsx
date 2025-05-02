

export default function LoadingBtn()
{
    return (
        <button
        type="button"
        disabled
        className="inline-flex w-full items-center justify-center rounded-md bg-gray-400 px-3.5 py-2.5 font-semibold leading-7 text-white cursor-not-allowed"
      >
        <svg
          className="animate-spin h-5 w-5 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
          ></path>
        </svg>
        Loading...
      </button>
    );
}