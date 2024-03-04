/** @format */

interface IMainHeading {
  date: string;
  message: string;
}

const MainHeading = ({ date, message }: IMainHeading) => {
  return (
    <div>
      <h1 className="text-grey-6 font-gosha text-4xl">{date}</h1>
      <p className="text-grey-5 text-xl">{message}</p>
    </div>
  );
};

export default MainHeading;
