import React, { useState, useEffect , } from "react";
import { useParams,Navigate } from 'react-router-dom'
import UserService from "../services/user.service";
import {deleteLeague} from "../actions/league"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { PhotoIcon } from '@heroicons/react/24/solid'
import { useNavigate } from "react-router-dom";
import { Table } from 'flowbite-react';
//import { Button,  Label, Modal, TextInput,FileInput,Pagination,Checkbox } from 'flowbite-react';
import { HiLockClosed } from "react-icons/hi";



function LeagueDetails() {
  const navigate = useNavigate();
  const initialLeagueState = {
    id: null,
  };
   const [content, setContent] = useState();
   const [teams, setTeams] = useState([]);

   const [isRemove, setIsRemove] = useState(false);

   const { id } = useParams()
   const { user: currentUser } = useSelector((state) => state.auth);
   const [currentLeague, setCurrentLeague] = useState(initialLeagueState);

   const dispatch = useDispatch();
    useEffect(() => {
      UserService.getLeagueDetails(id).then(
        (response) => {
          setContent(response.data);
          setTeams(response.data.data.teams);

          setCurrentLeague(response.data);

          console.log(response.data.data.teams);
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
    useEffect(() => {
      UserService.getLeagueDetails(id);
    }, [id]);

    const removeLeague = async () => {
      dispatch(deleteLeague(content.data.id))
        .then(() => {

         setIsRemove(true)
         navigate('/admin/mycompetition');
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

  return (
    <div class="p-4 sm:ml-64">
   <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
   
   <form>
      <div className="space-y-12">


      
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">League Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">These are the league's default settings, edit and save the information below if necessary.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                League Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  value={content?.data?.name}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Status
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  value={content?.data?.status}
                  className="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>  
            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
              Quota 
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={content?.data?.quota}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
              Quota Available
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  value={content?.data?.quotaAvailable}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
               Prize
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  value={content?.data?.prize}
                  className="block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div> 
            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={content?.data?.description}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600"></p>
            </div>

            
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button onClick={removeLeague} type="button" className="text-sm font-semibold leading-6 text-gray-900">
         Delete
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>

    
  
   </div>
   <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
   
   <form>
      <div className="space-y-12">


      
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add New Team
        </button>
      </div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">List Team</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">These are the league's default settings, edit and save the information below if necessary.</p>

          
        </div>

        <div className="overflow-x-auto  w-full ">
      <Table>
        <Table.Head>
          <Table.HeadCell>Team's Logo</Table.HeadCell>
          <Table.HeadCell>Team Name</Table.HeadCell>
          <Table.HeadCell>Short Name</Table.HeadCell>
          <Table.HeadCell>Created At</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Approve</Table.HeadCell>
          
        </Table.Head>
        <Table.Body className="divide-y">
        {
        teams.length > 0 ? (
        teams.map((e)=>(


          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" >
            <Table.Cell>  
            <img class="rounded-full w-11 h-11" src={`http://tandingin-production.up.railway.app/${e.logo}`} alt="image description"/>
            </Table.Cell>
            <Table.Cell>
            {e.name}
            </Table.Cell>
            
            <Table.Cell >{e.shortname}</Table.Cell>
            <Table.Cell className="">{e.createdAt}</Table.Cell>
            {e.status === "Pending"?
            <Table.Cell className="font-bold text-red-500">{e.status}</Table.Cell>
            :
            <Table.Cell className="font-bold text-green-500">{e.status}</Table.Cell>
            }

            <Table.Cell className="">
            <button
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
        Approve
        </button>  
            </Table.Cell>
            
          </Table.Row>
        ))
) : (
  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center font-bold" >
    There's No Team in this League
    </Table.Row>
     )}
        </Table.Body>
      </Table>
    </div>

      </div>

      {/* <div className="mt-6 flex items-center justify-end gap-x-6">
        <button onClick={removeLeague} type="button" className="text-sm font-semibold leading-6 text-gray-900">
         Delete
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div> */}
    </form>

    
  
   </div>
</div>
  )
}

export default LeagueDetails