import axios from "axios";
import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";

const HideCouplesList = () => {
  const [hideCouple, setHideCouple] = useState();

  async function getHideCoupleFunction() {
    const res = await axios.post("/api/hideUnhide/getHideCouples");
    const response = res.data;
    console.log(response.data, "to get response form api to get happy couple data");
    setHideCouple(response.data);
  }

  useEffect(() => {
    getHideCoupleFunction();
  }, []);

  return (
    <>
      <div className="new-dashboard">
        <SideBar />

        <section className="forself profile-sects" id="couple-profile-div">
          <div className="container" id="user-detail-container">
            
              {hideCouple?.map((item,id)=> {
                return(
                  
              <div className="self-main mb-5 ">
              <div className="self-main-head">
                <h3>Profile </h3>
              </div>
              
              <div className="left-main-box" id="left-main-box">
                <div className="box-img">
                  <img
                    className="user-image"
                    src={item?.avatar || "/img/box-img.png"}
                    alt=""
                  />
                </div>
                <div className="box-text">
                  <div className="box-text-one">
                    <h2>{item?.name}</h2>
                    <div className="flex-box-one">
                      <ul>
                        <li>Age</li>
                        <li>
                          <b>{item?.age}</b>{" "}
                        </li>
                      </ul>
                    </div>

                    <div className="flex-box-one">
                      <ul>
                        <li>Gender</li>
                        <li>
                          <b>{item?.gender}</b>{" "}
                        </li>
                      </ul>
                    </div>
                    <div className="flex-box-one">
                      <ul>
                        <li>Profession</li>
                        <li>
                          <b>{item?.profession}</b>{" "}
                        </li>
                      </ul>
                    </div>
                    <div className="flex-box-one">
                      <ul>
                        <li> City,State, Country</li>
                        <li>
                          <b>{item?.city} {","} {item?.state} {","} {item?.country}</b>{","}
                        </li>
                      </ul>
                    </div>
                    <div className="flex-box-one">
                      <ul>
                        <li>Degree</li>

                        <li>
                          <b>{item?.degree}</b>{" "}
                        </li>
                      </ul>
                    </div>

                    <div className="flex-box-one">
                      <ul>
                        <li>Work</li>

                        <li>
                          <b>{item?.work}</b>{" "}
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

                    {/* <a href="" className="like-btn2">
                      Request contacted{" "}
                    </a> */}
                  </div>

                  <div className="boxthree">
                    {/* <p>I am looking for a suitalbe partner. I have completed my gratuation in From USA
                                univercity</p> */}
                    <p>hello</p>
                  </div>
                </div>
              </div>

              <div className="self-about">
                <div className="self-about-main">
                  <div className="self-about-left">
                    <ul>
                      <li>Mother Tongue</li>
                      <li>
                        <b>{item?.motherTongue}</b>
                      </li>
                    </ul>

                    <ul>
                      <li> Marital Status</li>
                      <li>
                        <b>{item?.maritalStatus}</b>
                      </li>
                    </ul>

                    <ul>
                      <li> Height</li>
                      <li>
                        <b>{item?.height}</b>
                      </li>
                    </ul>

                    <ul>
                      <li> Weight</li>
                      <li>
                        <b>{item?.weight}</b>
                      </li>
                    </ul>
                  </div>
                  
                </div>

                {/* <section className="reference">
                  <div className="reference-head">
                    <h3>Reference</h3>
                  </div>
                  <div className="main-reference">
                    <div className="reference-box">
                      <ul>
                        <li>Name</li>
                        <li>
                          <b style={{ fontWeight: "500" }}>hello </b>
                        </li>
                      </ul>

                      <ul>
                        <li>Email</li>
                        <li>
                          <b style={{ fontWeight: "500" }}>hello</b>
                        </li>
                      </ul>

                      <ul>
                        <li> Phone</li>
                        <li>
                          <b style={{ fontWeight: "500" }}> hello</b>
                        </li>
                      </ul>
                    </div>
                    
                  </div>
                </section> */}

                {/* <div className="self-about-main">
                  <div className="self-about-left">
                    <h3>Parish</h3>
                    <ul>
                      <li>Name</li>
                      <li>
                        <b>hello12</b>
                      </li>
                    </ul>

                    <ul>
                      <li>City</li>
                      <li>
                        <b> helloo233</b>
                      </li>
                    </ul>
                  </div>
                  <div className="self-about-right">
                    <h3>Wishlist</h3>
                    <p>hii here</p>
                  </div>
                </div> */}
              </div>
            </div>
                )
            })}





          </div>
        </section>
      </div>
    </>
  );
};

export default HideCouplesList;
