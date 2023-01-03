import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import Navbar from "../ui/Navbar";
import Router from "next/router";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import userDetails from "../../pages/userDetails/[uid]";
import { data } from "jquery";
import { toast, ToastContainer } from "react-toastify";

const Advertisement = () => {
  const router = useRouter()

  const [advertisement, setAdvertisement] = useState()
 
  async function advertisementFunction(){
  const res = await axios.post("/api/master/advertisement")
  const response = res.data
  console.log(response.data,"contact us data")
  setAdvertisement(response.data)
  }

  useEffect(()=>{
advertisementFunction()
  },[])




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
              <div className="left-main-box" id="left-main-box">
                <div className="box-img">
                  <img
                    className="user-image"
                    src={item?.avatar || "/img/box-img.png"}
                    // src= "/img/box-img.png"
                    alt=""
                    id="adv-user-image"
                  />
                </div>
                <div className="box-text">
                  <div className="box-text-one">
                    <h2>
                        {item?.fullName}
                        </h2>
                    <div className="flex-box-one">
                      <ul>
                        <li>Organization</li>
                        <li>
                          <b>
                            {item?.organization}
                          </b>{" "}
                        </li>
                      </ul>
                    </div>

                    <div className="flex-box-one">
                      <ul>
                        <li>Description</li>

                        <li>
                          <b>{item?.description}</b>{" "}
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
                        >
                          Approved
                        </button>
                        <button
                          className="button  like-btn2"
                          type="button"
                        >
                          Delete
                        </button>
                        </div>
                  </div>
                  <div className="boxthree">
                    {/* <p>I am looking for a suitalbe partner. I have completed my gratuation in From USA
                                univercity</p> */}
                    <p>hello</p>
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
