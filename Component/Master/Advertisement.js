import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";

import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";


const Advertisement = () => {
  const router = useRouter()
  const [advertisement, setAdvertisement] = useState()
  const [added, setAdded] = useState(0)
 const [btnResponse, setBtnResponse] =useState(false)
 const [deleteIdValue, setDeleteIdValue] = useState();


  async function advertisementFunction(){
  const res = await axios.post("/api/advertisement/advertisement")
  const response = res.data
  console.log(response.data,"contact us data")
  setAdvertisement(response.data)
  setBtnResponse(true)
  }

  useEffect(()=>{
advertisementFunction()
  },[added])

  async function ApproveAdvertisement(data){
    // console.log(e,"e data here")
    try{
    //  const id = e
    //  const active = 1
    const res = await axios.post("/api/advertisement/approveAdvertisement",data)
    const responses= res.data
    console.log(responses,"approve user response here")
    setBtnResponse(true)
    toast.success("Approve Successfully")
    setAdded(added+1)
  }catch(err){
    setBtnResponse(false)
    console.log(err)
    setBtnResponse(false)
  }
  }

  async function approvedSubmitHandler (e) {
    console.log(e.target.value,"to get the id of the user")
    const data = {
      id:e.target.value,
      active:1
    }
    console.log(data,"data entered by the user")
    ApproveAdvertisement(data)
  }




  async function deleteAdvertisement(e){
    console.log(e,"e data here")
    try{
     const id = e
    const res = await axios.post("/api/advertisement/deleteAdvertisement",{id:id})
    const response = res.data
    console.log(response.data,"delete user response here")
     toast.success("Delete advertisement successfully")
     setAdded(added+1)
  }catch(err){
    console.log(err)
    toast.error("Please try again")
  }
  }





  return (
    <>
      <div className="new-dashboard">
        <SideBar />
        <ToastContainer />

        <section className="forself  profile-sects pt-0" id="couple-profile-div">
          <div className="container" id="user-detail-container">
            <div className="hide-couple-mb">
            
          {advertisement?.map((item)=>{
                        return(     
            <div className="self-main">
              <div className="self-main-head">
                <h3> Advertisement </h3>
              </div>
              <div className="left-main-box" style={{boxShadow:"none"}} id="left-main-boxs">
                <div className="box-img">
                  <img
                    className="user-image"
                    src={item?.avatar || "/img/box-img.png"}
                    // src= "/img/box-img.png"
                    alt=""
                    id="adv-user-image"
                  />
                </div>
                <div className="box-text" id="query-box">
                  <div className="box-text-one">
                    <h2>
                        {item?.fullName}
                        </h2>
                    <div className="flex-box-one">
                      <ul >
                        <li>Organization</li>
                        <li>
                          <b>
                            {item?.organization}
                          </b>{" "}
                        </li>
                      </ul>
                    </div>

                    <div className="flex-box-one" >
                      <ul >
                        <li id="quehy-description-sec">Description</li>

                        <li id="query-description">
                          <li ><b> {item?.description}</b></li>{" "}
                        </li>
                      </ul>
                    </div>

               
                  </div>
                  <div className="box-text-two" id="forself-two">
                    <div className="forself-two-inner">
                      <h4>Contact Details</h4>
                      <ul className="two-inner1-ul">
                        <li>Contact </li>
                        <li>
                          <div className="input-group mb-3">
                            <span className="form-control">
                              {item?.phone}
                            </span>
                          </div>
                        </li>
                      </ul>
                      <ul className="two-inner2-ul">
                        <li>Email</li>
                        <li>
                          <div className="input-group mb-3">
                            <span className="form-control">
                              {item?.email}
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>

              <div className="delete-btn-sec">
          {/* {btnResponse == false?( */}
            <button
            className="button  like-btn2"
            type="button"
            value={item.id}
            onClick={(e) => approvedSubmitHandler(e)}
          >
            Approve
          </button>
          {/* ):(
           "")}   */}
          <button
            className="button  like-btn2"
            type="button"
            onClick={() =>setDeleteIdValue(item?.id) }
            data-bs-toggle="modal" data-bs-target="#deleteModal"
          >
            Delete
          </button>
          </div>
                     
                  </div>
                  <div className="boxthree">
                    {/* <p>I am looking for a suitalbe partner. I have completed my gratuation in From USA
                                univercity</p> */}
                    {/* <p>hello</p> */}
                  </div>
                </div>
              </div>
            </div>
            );
          })
        }
</div>
          </div>
        </section>


              {/* <!-- Modal --> */}
              <div
          class="modal fade"
          id="deleteModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" id="deleteModl-content">
              <div class="modal-body">Are You Sure You Want to Delete This Advertisement?</div>
              <div class="modal-footer">
                <button
                  type="button"
                  id="deleteBtn-Modal"
                  value={deleteIdValue}
                  data-bs-dismiss="modal"
                  onClick={(e) => deleteAdvertisement(e.target.value)}

                  class="btn btn-primary"
                >
                  Delete
                </button>
                <button
                  type="button"
                  id="cancelBtn-Modal"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Advertisement;
