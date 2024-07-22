import React, { useState, useEffect , } from "react";
import { useParams,Navigate } from 'react-router-dom'
import UserService from "../services/user.service";
import {deleteLeague, updateLeague} from "../actions/league"
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
    id:null,
    name: "",
    quota: "",
    description: "",
    startDate: "",
    endDate: "",
    isLocked: false,
    prize:""
  };
  const [currentLeagueDetail, setCurrentLeagueDetail] = useState(initialLeagueState);
  const [message, setMessage] = useState("");

   const [content, setContent] = useState();
   const [teams, setTeams] = useState([]);
   const [isRemove, setIsRemove] = useState(false);

   const { id } = useParams();

   function formatDateToToday(isoString) {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'};
    return date.toLocaleDateString('id-ID', options);
   }

   const dispatch = useDispatch();
    useEffect(() => {
      UserService.getLeagueDetails(id).then(
        (response) => {
          setContent(response.data);
          setTeams(response.data.data.teams);

          setCurrentLeagueDetail(response.data.data);


          console.log(response.data);
          //console.log(currentLeagueDetail.data.name);
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

    
    const updateCurrentLeague = () => {
      dispatch(updateLeague(currentLeagueDetail.id, currentLeagueDetail))
        .then(response => {
          console.log(response);
  
          setMessage("The League was updated successfully!");
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    // const onChangeLeagueName = (e) => {
    //   const leagueName = e.target.value;
    //   setLeagueName(leagueName);
    // };
    // const onChangeDescription = (e) => {
    //   const Description = e.target.value;
    //   setDescription(Description);
    // };
    // const onChangeQuota = (e) => {
    //   const Quota = e.target.value;
    //   setQuota(Quota);
    // };
    // const onChangeQuotaAvailable = (e) => {
    //   const QuotaAvailable = e.target.value;
    //   setQuotaAvailable(QuotaAvailable);
    // };
    // const onChangeStatus = (e) => {
    //   const Status = e.target.value;
    //   setStatus(Status);
    // };
    // const onChangePrize = (e) => {
    //   const Prize = e.target.value;
    //   setPrize(Prize);
    // };

    const handleInputChange = event => {
      const { name, value } = event.target;
      setCurrentLeagueDetail({ ...currentLeagueDetail, [name]: value });
    };

  return (
    <div class="p-4 sm:ml-64">
   <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
   
   
      <div className="space-y-12">


      
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">League Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">These are the league's default settings, edit and save the information below if necessary.</p>
          {currentLeagueDetail ? (
            <form>
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
                  onChange={handleInputChange}
                  type="text"
                  name="name"
                  id="name"
                  //autoComplete="given-name"
                  value={currentLeagueDetail.name}
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
                  name="status"
                  id="status"
                  onChange={handleInputChange}
                  value={currentLeagueDetail.status}
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
                  name="quota"
                  id="quota"
                  onChange={handleInputChange}
                  value={currentLeagueDetail.quota}
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
                  name="quotaAvailable"
                  id="quotaAvailable"
                  onChange={handleInputChange}
                  value={currentLeagueDetail.quotaAvailable}
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
                  name="prize"
                  id="prize"
                  onChange={handleInputChange}
                  value={currentLeagueDetail.prize}
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
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                  value={currentLeagueDetail.description}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600"></p>
            </div>
            
            </div>
        </form>
        ) : (
          ''
        //   <div>
        //   <br />
        //   <p>Please click on a Tutorial...</p>
        // </div>
        )}
         
          
        </div>
       
      </div>
      
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button onClick={removeLeague} type="button" className="text-sm font-semibold leading-6 text-gray-900">
         Delete
        </button>
        <button
          type="submit"
          onClick={updateCurrentLeague}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
        <div>
        <p>{message}</p>
        </div>
        
      </div>
    

    
  
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
            <img class="rounded-full w-11 h-11" src={`http://localhost:5000/${e.logo}`} alt="image description"/>
            </Table.Cell>
            <Table.Cell>
            {e.name}
            </Table.Cell>
            
            <Table.Cell >{e.shortname}</Table.Cell>
            <Table.Cell className="">{  formatDateToToday(e.createdAt)}</Table.Cell>
            {e.status === "Pending"?
            <Table.Cell className="font-bold text-red-500">{e.status}</Table.Cell>
            :
            <Table.Cell className="font-bold text-green-500">{e.status}</Table.Cell>
            }

            <Table.Cell className="">


            {e.status === "Approved" ||  e.status === "Approved" ?
             ''
             : 
             <>
             <button
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
              Approve
              </button>  
              <button
                className="rounded-md bg-red-600 px-3 py-2 ml-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
              Reject
              </button>  
              </>

            }
              
             
             
          
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