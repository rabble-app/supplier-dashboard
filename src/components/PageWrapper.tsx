/** @format */

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-[30px] border-grey-4 border-[1px] rounded-lg py-5 bg-white ">
      {children}
    </div>
  );
};

export default PageWrapper;
