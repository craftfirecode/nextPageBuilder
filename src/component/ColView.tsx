import exp from "constants";

const ColView = ({ cms, children }: any) => {
  return (
    <>
    {cms && cms.length > 0 && cms[0].col === "w75" && (
        <div className="col">
          <div className="container mx-auto flex flex-col gap-4">
            <div className="flex justify-center">
              <div className="md:w-3/4 w-full">
              {children}
              </div>
            </div>
          </div>
        </div>
      )}
      {cms && cms.length > 0 && cms[0].col === "w50" && (
        <div className="col">
          <div className="container mx-auto flex flex-col gap-4">
            <div className="flex justify-center">
              <div className="md:w-1/2 w-full">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
      {cms && cms.length > 0 && cms[0].col === "w25" && (
        <div className="col">
          <div className="container mx-auto flex flex-col gap-4">
            <div className="flex justify-center">
              <div className="md:w-1/3 w-full">
              {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ColView;
