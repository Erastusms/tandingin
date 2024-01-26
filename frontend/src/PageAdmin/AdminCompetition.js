import React, { useState, useEffect,useRef  } from "react";
import UserService from "../services/user.service";
import { Navigate,Link } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import { Button,  Label, Modal, TextInput,FileInput,Pagination,Checkbox } from 'flowbite-react';
import { HiLockClosed,HiLockOpen } from "react-icons/hi";
//import { createLeague } from "../slices/crud";
import {createLeague, deleteLeague} from "../actions/league"
import { Table } from 'flowbite-react';
import Form from "react-validation/build/form";
//import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";




function AdminCompetition() {
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [totalData, setTotalData] = useState(0);
  const [isDataCreated, setDataCreated] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  // const onPageChange = (page) => setCurrentPage(currentPage);
  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  const initialLeagueState = {
    id: null,

  };
  const fileInputRef = useRef(null);
  const form = useRef();
  const checkBtn = useRef();
  const [openModal, setOpenModal] = useState(false);
  const [content, setContent] = useState('');
  const { user: currentUser } = useSelector((state) => state.auth);
  const [successful, setSuccessful] = useState(false);
   const [name, setName] = useState('')
   const [quota, setQuota] = useState('')
   const [startDate, setStartDate] = useState('')
   const [endDate, setEndDate] = useState('')
   const [prize, setPrize] = useState('')
   const [isLocked, setIsLocked] = useState(false)
   const [description, setDescription] = useState('')
   const [file, setFile] = useState(null);
   const [key, setKey] = useState(null);




  //const { message } = useSelector(state => state.message);
   const [message, setMessage] = useState('')

  const dispatch = useDispatch();

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  const onChangeQuota = (e) => {
    const quota = e.target.value;
    setQuota(quota);
  };
  const onChangeStartDate = (e) => {
    const stardDate = e.target.value;
    setStartDate(stardDate);
  };
  const onChangeEndDate = (e) => {
    const endDate = e.target.value;
    setEndDate(endDate);
  };
  // const onChangeIsLocked = (e) => {
  //   const isLocked = e.target.value;
  //   setIsLocked(isLocked);
  // };
  const onChangeKey = (e) => {
    const key = e.target.value;
    setKey(key);
  };
  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };
  const onChangePrize = (e) => {
    const prize = e.target.value;
    setPrize(prize);
  };
  const onChangeFile = (e) => {
    const image = e.target.files[0];
    setFile(image);
  };
  const handleCheckboxChange = (event) => {
    setIsLocked(event.target.checked)
    setIsChecked(event.target.checked);
    //setKey(' ')
    // isChecked  ? setIsLocked(true) : setIsLocked(false)
    
  };
  // console.log(key);
  const handleCreateLeague = async (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {

      // dispatch(createLeague(name,quota,startDate,endDate,prize,isLocked, description,file,key))
   let dispatchParams = [ name,quota,startDate,endDate,prize,isLocked, description,file,key]
    // if (file != null){
    //   dispatchParams.push(file)
    // } 
    console.log(file);
    dispatch(createLeague(...dispatchParams))
        .then(() => {
          setSuccessful(true);
          setOpenModal(false)
          setDataCreated(true);
        })
        .catch((err) => {
          setSuccessful(false);
          // Menampilkan pesan kesalahan dari respon

          if (err.response && err.response.data && err.response.data.message) {
            console.error("Kesalahan server:", err.response.data.message);
            setMessage(err.response.data.message)
          } else {
            console.error("Kesalahan umum:", err.message);
          }
            });
        }
  };


  useEffect(() => {
    UserService.getPublicContent(page,pageSize).then(
      (response) => {
        setDataCreated(false);
        setContent(response.data);
        setTotalData(response.data.totalData);
        setPageSize(response.data.pageSize);
        //setCurrentPage(response.data.page);
        setPage(response.data.page);



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
  }, [isDataCreated,page, pageSize]);

  const totalPages = Math.ceil(totalData / pageSize);
  // const paginatedData = content?.data?.leaguesData?.slice(
  //   (currentPage - 1) * pageSize,
  //   currentPage * pageSize
  // );


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
            <Table.Cell className="font-bold text-green-500">{ e.status.toUpperCase()}</Table.Cell>
            :
            <Table.Cell className="font-bold text-red-500">{e.status.toUpperCase()}</Table.Cell>
           }

            
            <Table.Cell className="text-center">{e.quota}</Table.Cell>
            <Table.Cell className="text-center">{e.quotaAvailable}</Table.Cell>
            {e.isLocked === true ?
            <Table.Cell className="text-center"><HiLockClosed size={30} color="red" /></Table.Cell>
            :
            <Table.Cell className="text-center"><HiLockOpen size={30}  color="orange"/></Table.Cell>
            }
            <Table.Cell>
            {/* <Link to={`/admin/dashboard/${e.id}`}> */}
              <a href={`/admin/dashboard/${e.id}`} className="font-medium text-cyan-600 hover:underline text-center dark:text-cyan-500">
                Edit
              </a>
              {/* </Link> */}
              
            </Table.Cell>
          </Table.Row>
          
          );
          
          })
        }
        <div className="flex overflow-x-auto sm:justify-center">
          {/* <Pagination currentPage={xxx} totalPages={xxxxx}  /> */}
          
           
          </div>
        </Table.Body>
      </Table>
    </div>
     
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
    
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Buat Liga Baru</h3>
          <Form onSubmit={handleCreateLeague} ref={form}>
          {file && (
        <div>
          
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            style={{ maxWidth: '100%', maxHeight: '200px' }}
            className="text-center"
            ref={fileInputRef}
          />
        </div>
      )}
          <div className="form-group">
            <div className="mb-2 block">
              <Label htmlFor="Image" value="Image" />
            </div>
            <FileInput
              id="file"            
              type="file"  
              onChange={onChangeFile}
              validations={[required]}
              
            />
          </div>
          <div className="form-group">
            <div className="mb-2 block">
              <Label htmlFor="name" value="League Name" />
            </div>
            <TextInput
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={onChangeName}
              validations={[required]}
              
            />
          </div>
          <div className="space-y-6">
          <div className="form-group">
            <div className="mb-2 block">
              <Label htmlFor="description" value="Description" />
            </div>
            <TextInput
              id="description"
              name="description"
              type="text"
              value={description}
              onChange={onChangeDescription}
              //validations={[required]}
              
            />
          </div>
          <div className="form-group">
            <div className="mb-2 block">
              <Label htmlFor="quota" value="Kuota Tim" />
            </div>
            <TextInput
              id="quota"
              name="quota"
              type="text"
              value={quota}
              onChange={onChangeQuota}
              validations={[required]}
              
            />
          </div>
          <div className="form-group">
            <div className="mb-2 block">
              <Label htmlFor="Prize" value="Prize" />
            </div>
            <TextInput
              id="Prize"
              name="prize"
              type="text"
              value={prize}
              onChange={onChangePrize}
              validations={[required]}
              
            />
          </div>
          <div className="form-group">
            <div className="mb-2 block">
              
            </div>
            <Checkbox 
            id="agree" 
            // checked={isChecked}
            onChange={handleCheckboxChange}/>
            <Label htmlFor="isLocked" value="Is Locked ?" />
          </div>
          {isChecked ?  
          <div className="form-group">
            <div className="mb-2 block">
              <Label htmlFor="key" value="Input League Key" />
            </div>
            <TextInput
              id="key"
              name="key"
              type="text"
              value={key}
              onChange={onChangeKey}
              // validations={[required]}
              
              
            />
          </div> : 
          <div className="form-group" hidden>
            {/* <div className="mb-2 block">
              <Label htmlFor="isLocked" value="Input League Key" />
            </div>
            <TextInput
              id="islocked"
              name="isLocked"
              type="text"
              value='false'
              onChange={onChangeIsLocked}
              validations={[required]}
              
              
            /> */}
          </div>
          }
         
          <div className="form-group">
            <div className="mb-2 block">
              <Label htmlFor="startDate" value="Start Date" />
            </div>
            <TextInput
              id="startDate"
              type="date"
              name="startDate"
              value={startDate}
              onChange={onChangeStartDate}
              validations={[required]}
              
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
              value={endDate}
              onChange={onChangeEndDate}
              validations={[required]}
              
            />
          </div>
          <div className="form-group">
            {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )} 
          <Button type="submit">Submit</Button>
           
              
          </div>
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </div>
        </Form>
        </div>
        
      </Modal.Body>
      
    </Modal>
      
 </div>
 </div>
 </div>
  )
}

export default AdminCompetition