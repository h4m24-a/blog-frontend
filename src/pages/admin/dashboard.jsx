import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../context/useAuthContext";
import getDashboard from "../../api/admin/dashboard";
import NavbarAdmin from "../../components/navbarAdmin";


const Dashboard = () => {

const { accessToken , role} = useAuthContext();

const { data: profile, isLoading, isError } = useQuery({
  queryKey: ['profile'],
  queryFn: () => getDashboard(accessToken),     // using token from auth context global state
  enabled: !!accessToken                    // Ensures the query only runs if accessToken exists

})


if (isLoading || !profile) {
  return <div>Loading Dashboard....</div>
}

if (role !== 'ADMIN') {
  return <div>Loading Dashboard...</div>
}

if (isError) {
  return <div>Error occurred when loading profile!</div>
}





  return (
    <>
      <NavbarAdmin />
      <main>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl bg-black rounded-xl px-8 py-3 text-white mt-4 text-center font-rubik"><span className="font-bold">{profile.username}</span>, Welcome to the Dashboard!</h1>
          {/* <p>{profile.message}</p>
          <p>{profile.role}</p> */}
        </div>
      </main>
    </>
  );

}



export default Dashboard