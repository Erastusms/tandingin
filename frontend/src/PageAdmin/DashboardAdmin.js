import React, { useState, useEffect } from "react";
import { Card } from 'flowbite-react';
import UserService from "../services/user.service";
import { Navigate,Link } from 'react-router-dom';
import { useSelector } from "react-redux";

function DashboardAdmin() {
  const [content, setContent] = useState([]);
 // const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    UserService.getPublicContent(10,10).then(
      (response) => {
        setContent(response.data);
        console.log(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  // if (!currentUser) {
  //   return <Navigate to="/login" />;
  // }
  return (

    <div class="p-4 sm:ml-64">
    <div class="p-4  mt-14">
    <div class="grid grid-cols-2 gap-4 mb-4">
    {content?.data?.leaguesData?.map((e)=>{
       return (
        <Link to={`/admin/dashboard/${e.id}`}>
          <div class="flex items-center justify-center ">
          
      <Card className=" md:w-full" imgSrc={`http://localhost:5000/${e.logo}`}  key={e.id} horizontal>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {e.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      {e.description}
      </p>
    </Card>
         
          </div>
          </Link>
          );
        })}
       </div>
       </div>
</div>
      
  )
}

export default DashboardAdmin