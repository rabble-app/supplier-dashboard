/** @format */

interface ITeamDetailsInfo {
  title: string;
  subtitle: string;
}

const TeamDetailsInfo = ({ title, subtitle }: ITeamDetailsInfo) => {
  return (
    <div>
      <hr className="border-0 border-b-[1px] border-grey-4 my-4" />
      <small className="font-gosha text-xs text-grey-5 font-normal">
        {title}
      </small>
      <p className="font-normal text-sm leading-6 text-grey-6">{subtitle}</p>
    </div>
  );
};

export default TeamDetailsInfo;
