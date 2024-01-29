import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import { Navigate } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import { Button,  Label, Modal, TextInput } from 'flowbite-react';
//import { createLeague } from "../slices/crud";
import {createLeague} from "../actions/league"
import { Table } from 'flowbite-react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import * as Yup from 'yup';



function AdminCompetition() {

  const [openModal, setOpenModal] = useState(false);
  const initialLeagueState = {
    name: "",
    quota: "",
    startDate: "",
    endDate: "",
    prize: "",
    isLocked: false,
    description:"",

  };
 
  const [league, setLeague] = useState(initialLeagueState);
  const [submitted, setSubmitted] = useState(false);
  const [content, setContent] = useState('');
  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setLeague({ ...league, [name]: value });
  };

  const saveLeague = () => {
    const { name,quota,startDate,endDate,prize,isLocked,description  } = league;

    dispatch(createLeague({ name,quota,startDate,endDate,prize,isLocked, description }))      .then(data => {
        console.log(data);
        setLeague({
          name: data.name,
          quota: data.quota,
          startDate: data.startDate,
          endDate: data.endDate,
          prize: data.prize,
          isLocked:data.isLocked,
          description:data.description,

        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newLeague = () => {
    setLeague(initialLeagueState);
    setSubmitted(false);
  };

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
        //console.log(response.data);
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

   console.log(content);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  function onCloseModal() {
    setOpenModal(false);
    
  }
  return (
    <div class="p-4 sm:ml-64">
    <div class="p-4  mt-14">
    <div class="flex items-center justify-center  mb-4 rounded  ">
    <div className="overflow-x-auto  w-full ">
      <Table>
        <Table.Head>
          <Table.HeadCell>League Name</Table.HeadCell>
          <Table.HeadCell>Created At</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Quota</Table.HeadCell>
          <Table.HeadCell>Quota Available</Table.HeadCell>
          <Table.HeadCell>Is Locked</Table.HeadCell>
          <Table.HeadCell><Button onClick={() => setOpenModal(true)}>Buat Liga</Button></Table.HeadCell>
          
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
        {content?.data?.leaguesData?.map((e)=>{
       return (
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {e.name}
            </Table.Cell>
            <Table.Cell>{e?.createdAt}</Table.Cell>
            {e.status === "open"? 
            <Table.Cell className="font-bold text-green">{e.status}</Table.Cell>
            :
            <Table.Cell className="font-bold text-red">{e.status}</Table.Cell>
           }

            
            <Table.Cell>{e.quota}</Table.Cell>
            <Table.Cell>{e.quota_available}</Table.Cell>
            <Table.Cell>{e.is_locked}</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline text-center dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          );
        })}
        </Table.Body>
      </Table>
    </div>
    {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newLeague}>
            Add
          </button>
        </div>
      ) : (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Buat Liga Baru</h3>
          
          <div className="form-group">
            <div className="mb-2 block">
              <Label htmlFor="name" value="League Name" />
            </div>
            <TextInput
              id="name"
              value={league.name}
              name="name"
              type="text"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-6">
          <div className="form-group">
            <div className="mb-2 block">
              <Label htmlFor="description" value="Description" />
            </div>
            <TextInput
              id="description"
              value={league.description}
              name="description"
              type="text"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <div className="mb-2 block">
              <Label htmlFor="quota" value="Kuota Tim" />
            </div>
            <TextInput
              id="quota"
              value={league.quota}
              name="quota"
              type="text"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <div className="mb-2 block">
              <Label htmlFor="Prize" value="Prize" />
            </div>
            <TextInput
              id="Prize"
              value={league.prize}
              name="prize"
              type="text"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <div className="mb-2 block">
              <Label htmlFor="isLocked" value="Password *Optional" />
            </div>
            <TextInput
              id="islocked"
              value={league.isLocked}
              name="isLocked"
              type="text"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <div className="mb-2 block">
              <Label htmlFor="startDate" value="Start Date" />
            </div>
            <TextInput
              id="startDate"
              type="date"
              name="startDate"
              value={league.startDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <div className="mb-2 block">
              <Label htmlFor="stardDate" value="End Date" />
            </div>
            <TextInput
              id="endDate"
              type="date"
              name="endDate"
              value={league.endDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button  onClick={saveLeague}>Submit</Button>
          
         
        </div>
        
        </div>
      </Modal.Body>
    </Modal>
      )}
 </div>
 </div>
 </div>
  )
}

export default AdminCompetition