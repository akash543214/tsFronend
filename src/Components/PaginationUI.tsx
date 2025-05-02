import Button from "./Assets/Button";

export default function PaginationUI()
{
    return(
          <div className="p-4 flex justify-between items-center mt-4">
                <Button >
                  Previous
                </Button>
                <span className="text-gray-700">
                  Page 1 of 1
                </span>
                <Button>
                  Next
                </Button>
              </div>
    );
}