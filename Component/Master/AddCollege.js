import React, { useEffect } from "react";
import SideBar from "../SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import $ from "jquery";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

const AddCollege = () => {
  const [college, setCollege] = useState();
  const [searchCollege, setSearchCollege] = useState();
  const [addCollege, setAddCollege] = useState();
  const [collegeName, setCollegeName] = useState()
  const router = useRouter();

  async function jqueryCode() {
    $(".state-form").show("slow");
    $(".show-form").hide("slow");
    $(".state-form").toggleClass("show-form");
  }
  async function hide() {
    $(".show-form").hide("slow");
  }

  async function getCollege() {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/master/college/getCollege", {
        token: token,
      });
      const response = res.data;
      console.log(
        response.data,
        "to get the response from api to get the College"
      );
      setCollege(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCollege();
  }, []);

  async function addCollegeFn(data) {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/master/college/addCollege", {
        token: token,
        data,
      });
      const response = res.data;
      console.log(response, "to get the response from api to add country");
      toast.success( "college " + 
         response?.data.college + " Has Been Added Successfully"
      );
      setTimeout(() => {
        window.location = "/master/addCollege";
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(addCollege + " Has already been added in College List... Please Check...");
      
  }
}

  async function formSubmitHandler(event) {
    event.preventDefault();
    const data = {
      collegeName: addCollege,
    };
    console.log(data, "data entered by the use to add college");
    addCollegeFn(data);
  }

  async function collegeSearchFn(e) {
    const search = e.target.value;
    setCollegeName(null)
    console.log(search, "to get the output of search");
    const filterData = college.filter((item) => {
      const userData = item.collegeName;
      return userData.toLowerCase().includes(search.toLowerCase());
    });
    console.log(filterData, "to get the response of filtered Data");
    setSearchCollege(filterData);
  }

  async function deleteCollege(e) {
    console.log(e, "to get the id of the country");
    const id = e;
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/master/college/deleteCollege", {
        token: token,
        id: id,
      });
      const response = res.data;
      console.log(
        response,
        "to get the response from api to delete the country"
      );
      toast.success( "College " +
          response.data.college +
          " Has Been Removed Successfully"
      );
      window.location = "/master/addCollege";
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove the city. Please Try Again...");
    }
  }

  async function selectedCollege(item){
    console.log(item,"to get the details of mother tongue")
    setCollegeName(item.collegeName)
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
                      COLLEGE
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
                    <h6 className="item-text">ADD COLLEGE</h6>
                    <input
                      className="textinput"
                      type="text"
                      name="username"
                      autoComplete="on"
                      onChange={(e) => setAddCollege(e.target.value)}
                    />
                  </div>

                  <button
                    variant="primary"
                    className="btn btn-round btn-warning w-100 p-2 "
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
                    {/* <Link href="/dashboard">
                      <h5 style={{ cursor: "pointer" }} >
                        {" "}
                        <i className="bi bi-chevron-left" id="back-btn-icon" ></i>
                      </h5>
                    </Link> */}
                    <h5 className="heading-text pink-text ">COLLEGE</h5>
                    <h5 className="hide-text">1</h5>
                  </div>
                  <div className="input-group mb-1" id="search-bar">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search College"
                      aria-label="Username"
                      value={collegeName}
                      aria-describedby="basic-addon1"
                      onChange={(e) => collegeSearchFn(e)}
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
                  { collegeName ? null :
                    searchCollege == null
                    ? college?.map((item, id) => {
                        return (
                          <div key={id} className="parts-head" onClick={()=>selectedCollege(item)}>
                            <div className="left-part">
                              <div className="left-side-text">
                                <h5 className="left-text-eth">
                                  {item.collegeName}
                                </h5>
                              </div>
                            </div>
                            <div className="right-part">
                              <p onClick={() => deleteCollege(item.id)}>
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

                    : searchCollege?.map((item, id) => {
                        return (
                          <div key={id} className="parts-head" onClick={()=>selectedCollege(item)}>
                            <div className="left-part">
                              <div className="left-side-text">
                                <h5 className="left-text-eth">
                                  {item.collegeName}
                                </h5>
                              </div>
                            </div>
                            <div className="right-part">
                              <p onClick={()=> deleteCollege(item.id)}>
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

export default AddCollege;
