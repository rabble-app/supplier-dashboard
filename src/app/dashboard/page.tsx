/** @format */

async function getTime() {
  const res = await fetch(
    'https://worldtimeapi.org/api/timezone/America/Chicago'
  );
  return res.json();
}

const Dashboard = async () => {
  const [time] = await Promise.all([getTime()]);
  return (
    <div className='pt-10 flex justify-center'>
      <h1 className='text-4xl font-gosha'>Home</h1>
      <h1 className='text-4xl font-gosha'>{time.datetime}</h1>
    </div>
  );
};

export default Dashboard;
