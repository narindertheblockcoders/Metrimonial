import React, { useEffect } from "react";
import SideBar from "../SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import $ from "jquery";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

const AddEducation = () => {
  const [qualification, setQualification] = useState();
  const [searchQualification, setSearchQualification] = useState();
  const [addQualification, setAddQualification] = useState();
  const [qualificationName, setQualificationName] = useState()
  const router = useRouter();

  async function jqueryCode() {
    $(".state-form").show("slow");
    $(".show-form").hide("slow");
    $(".state-form").toggleClass("show-form");
  }
  async function hide() {
    $(".show-form").hide("slow");
  }

  async function getQualification() {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/master/qualification/getQualification", {
        token: token,
      });
      const response = res.data;
      console.log(
        response.data,
        "to get the response from api to get the Qualification"
      );
      setQualification(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getQualification();
  }, []);

  async function addQualificationFn(data) {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/master/qualification/addQualification", {
        token: token,
        data,
      });
      const response = res.data;
      console.log(response, "to get the response from api to add country");
      toast.success( "Qualification " + 
         response?.data.qualification + " Has Been Added Successfully"
      );
      setTimeout(() => {
        window.location = "/master/addEducation";
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error("Failed to add new country");
    }
  }

  async function formSubmitHandler(event) {
    event.preventDefault();
    const data = {
      qualification: addQualification,
    };
    console.log(data, "data entered by the use to add country");
    addQualificationFn(data);
  }

  async function qualificationSearchFn(e) {
    const search = e.target.value;
    setQualificationName(null)
    console.log(search, "to get the output of search");
    const filterData = qualification.filter((item) => {
      const userData = item.qualification;
      return userData.toLowerCase().includes(search.toLowerCase());
    });
    console.log(filterData, "to get the response of filtered Data");
    setSearchQualification(filterData);
  }

  async function deleteQualification(e) {
    console.log(e, "to get the id of the country");
    const id = e;
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/master/qualification/deleteQualification", {
        token: token,
        id: id,
      });
      const response = res.data;
      console.log(
        response,
        "to get the response from api to delete the country"
      );
      toast.success( "Qualification " +
          response.data.qualification +
          " Has Been Removed Successfully"
      );
      window.location = "/master/addEducation";
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove the city. Please Try Again...");
    }
  }

  async function selectedQualification(item){
    console.log(item,"to get the details of Qualification")
    setQualificationName(item.qualification)
    return;
  }
  return (
    <div>
      <ToastContainer />
      <div className="new-dashboard">
        <SideBar />
        <section className="profile-sec profile-sects">
          <div className="container">
            <div className="row justify-content-center">
              <form
                className="input-sec input-top p-0 state-form"
                id="bar-tops"
              >
                <div className="input-line iptset-line" id="index-line"></div>

                <div className="p-3">
                  <div className="login-top-img" id="city-head-set">
                    <h3 className="heading-text mt-3"></h3>
                    <h3 className="heading-text mt-3 " id="city-text">
                      QUALIFICATION
                    </h3>
                    <button
                      type="button"
                      className="btn-close "
                      id="hide-btn-click"
                      onClick={hide}
                      data-bs-dismiss="input-sec"
                    ></button>
                  </div>
                  <div className="input-item mt-0" id="input-mt">
                    <h6 className="item-text">ADD QUALIFICATION</h6>
                    <input
                      className="textinput"
                      type="text"
                      name="username"
                      autoComplete="on"
                      onChange={(e) => setAddQualification(e.target.value)}
                    />
                  </div>

                  <button
                    variant="primary"
                    className="btn btn-round btn-warning w-100 p-0 "
                    style={{ marginTop: "30px" }}
                    type="submit"
                    onClick={formSubmitHandler}
                  >
                    {" "}
                    ADD{" "}
                  </button>
                </div>
              </form>

              <form className="input-sec input-top p-0" id="bar-top">
                <div className="input-line iptset-line" id="index-line"></div>
                <div className="token-head">
                  <div className="rapper-between" id="token-form-padding">
                    <Link href="/dashboard">
                      <h5
                        style={{ cursor: "pointer" }}
                        // onClick={() => router.back()}
                      >
                        {" "}
                        <i
                          className="bi bi-chevron-left"
                          id="back-btn-icon"
                        ></i>
                      </h5>
                    </Link>
                    <h5 className="heading-text pink-text ">QUALIFICATION</h5>
                    <h5 className="hide-text">1</h5>
                  </div>
                  <div className="input-group mb-1" id="search-bar">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      // placeholder={motherTongueName || "Search Mother Tongue"}
                      aria-label="Username"
                      value={qualificationName}
                      aria-describedby="basic-addon1"
                      onChange={(e) => qualificationSearchFn(e)}
                    />

                    <div
                      onClick={jqueryCode}
                      className="btn add-btn"
                      id="add-btn"
                    >
                      ADD
                    </div>
                  </div>
                </div>
                <div className="token-parts">
                  { qualificationName ? null :
                    searchQualification == null
                    ? qualification?.map((item, id) => {
                        return (
                          <div key={id} className="parts-head" onClick={()=>selectedQualification(item)}>
                            <div className="left-part">
                              <div className="left-side-text">
                                <h5 className="left-text-eth">
                                  {item.qualification}
                                </h5>
                              </div>
                            </div>
                            <div className="right-part">
                              <p onClick={() => deleteQualification(item.id)}>
                                <i
                                  style={{ cursor: "pointer" }}
                                  className="bi bi-trash3"
                                  id="pin-dark-icon"
                                ></i>
                              </p>
                            </div>
                          </div>
                        );
                      })

                    : searchQualification?.map((item, id) => {
                        return (
                          <div key={id} className="parts-head" onClick={()=>selectedQualification(item)}>
                            <div className="left-part">
                              <div className="left-side-text">
                                <h5 className="left-text-eth">
                                  {item.qualification}
                                </h5>
                              </div>
                            </div>
                            <div className="right-part">
                              <p onClick={()=> deleteQualification(item.id)}>
                                <i
                                  className="bi bi-trash3"
                                  id="pin-dark-icon"
                                ></i>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddEducation;
