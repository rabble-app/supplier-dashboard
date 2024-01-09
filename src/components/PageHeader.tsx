/** @format */

interface IPageHeader {
  title: string;
  subtitle: string;
  count: number;
  label: string;
}

const PageHeader = ({ title, subtitle, count, label }: IPageHeader) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <h1 className="text-2xl text-grey-6 font-gosha font-bold capitalize">
          {title}
        </h1>
        <span className="bg-blue-1 text-xs font-medium text-white px-2 py-0.5 rounded-[100px] capitalize">
          {count} {label}
        </span>
      </div>
      <p className="text-grey-2 text-sm">{subtitle}</p>
    </div>
  );
};

export default PageHeader;
