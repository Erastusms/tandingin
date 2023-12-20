import React, { useState, useEffect } from "react";
import { Card } from 'flowbite-react';
import UserService from "../services/user.service";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function DashboardAdmin() {
  const [content, setContent] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    UserService.getPublicContent().then(
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

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    
    <div class="p-4 sm:ml-64 m-10 ">
      <div class="grid grid-cols-3 gap-4 mb-4">
      {content?.map((e)=>{
       return (
      <Card className="max-w-sm" imgSrc="/production.png" horizontal key={e.id}>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {e.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      {e.description}
      </p>
    </Card>
         );
        })}
      </div>
   </div>

      
  )
}

export default DashboardAdmin