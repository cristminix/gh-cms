export async function loader({ params }) {
  const { module, fk, pageNumber, pk } = params
  return { module, pageNumber, fk, pk }
}
const Dashboard = ({}) => {
  return <>This is Dashboard</>
}

export default Dashboard
