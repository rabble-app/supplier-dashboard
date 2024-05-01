/** @format */

const PageWrapper = ({ children, mt = 30 }: { children: React.ReactNode, mt?: number }) => {
  return (
    <div className={`mt-[${mt}px] border-grey-4 border-[1px] rounded-lg py-5 bg-white shadow-custom-2`}>
      {children}
    </div>
  );
};

export default PageWrapper;
