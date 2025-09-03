import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../context/useAuthContext";
import getDashboard from "../../api/admin/dashboard";
import { Link } from "react-router";
import NavbarAdmin from "../../components/navbarAdmin";


const Dashboard = () => {

const { accessToken } = useAuthContext();

const { data: profile, isLoading, isError } = useQuery({
  queryKey: ['profile'],
  queryFn: () => getDashboard(accessToken),     // using token from auth context global state
  enabled: !!accessToken                        // Ensures the query only runs if accessToken exists

})


if (isLoading) {
  return <div>Loading profile....</div>
}


if (isError || !profile) {
  return <div>Error occurred when loading profile!</div>
}





  return (
    <>
      <NavbarAdmin />
      <main>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl mt-4 text-center font-medium font-sans">{profile.message}</h1>
          <p>{profile.username}</p>
          <p>{profile.role}</p>
        </div>
      </main>
    </>
  );

}



export default Dashboard