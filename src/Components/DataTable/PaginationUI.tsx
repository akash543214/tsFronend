import Button from "../Assets/Button";

export default function PaginationUI()
{
    return(
          <div className="p-4 flex justify-between items-center mt-4">
                <Button >
                  Previous
                </Button>
               
                <Button>
                  Next
                </Button>
              </div>
    );
}