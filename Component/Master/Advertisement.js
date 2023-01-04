import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";

import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";


const Advertisement = () => {
  const router = useRouter()
  const [advertisement, setAdvertisement] = useState()
 
  async function advertisementFunction(){
  const res = await axios.post("/api/advertisement/advertisement")
  const response = res.data
  console.log(response.data,"contact us data")
  setAdvertisement(response.data)

  }

  useEffect(()=>{
advertisementFunction()
  },[])

  async function ApproveAdvertisement(e){
    console.log(e,"e data here")
    try{
     const id = e
     const active = 1
    const res = await axios.post("/api/advertisement/approveAdvertisement",{id:id,active}),
    responses= res.data
    console.log(responses,"approve user response here")
    toast.success("Approve Successfully")

  }catch(err){
    console.log(err)
  }
  }




  async function deleteAdvertisement(e){
    console.log(e,"e data here")
    try{
     const id = e
    const res = await axios.post("/api/advertisement/deleteAdvertisement",{id:id})
    response = res.data
    console.log(response.data,"delete user response here")
  }catch(err){
    console.log(err)
  }
  }





  return (
    <>
      <div className="new-dashboard">
        <SideBar />
        <ToastContainer />

        <section className="forself profile-sects" id="couple-profile-div">
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
                        <li>Description</li>

                        <li id="query-description">
                          <li id="quehy-description-sec"><b> {item?.description}</b></li>{" "}
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
                          <button
                          className="button  like-btn2"
                          type="button"
                          onClick={()=>ApproveAdvertisement(item?.id)}
                        >
                          Approved
                        </button>
                        <button
                          className="button  like-btn2"
                          type="button"
                          onClick={()=>deleteAdvertisement(item?.id)}
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
      </div>
    </>
  );
};

export default Advertisement;
