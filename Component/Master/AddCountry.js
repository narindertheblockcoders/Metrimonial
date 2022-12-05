import React, { useEffect } from "react";
import SideBar from "../Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import $ from "jquery";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

const AddCountry = () => {
  const [country, setCountry] = useState();
  const [searchCountry, setSearchCountry] = useState();
  const [addCountry, setAddCountry] = useState();
  const [countryName, setCountryName] = useState()
  const router = useRouter();

  async function jqueryCode() {
    $(".state-form").show("slow");
    $(".show-form").hide("slow");
    $(".state-form").toggleClass("show-form");
  }
  async function hide() {
    $(".show-form").hide("slow");
  }

  async function getCountry() {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/master/country/getCountry", { token: token });
      const response = res.data;
      console.log(response.data, "to get the response from api to get the Countries");
      setCountry(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCountry();
  }, []);


  async function addCountryFn(data) {
    try {
      const token = localStorage.getItem("token")
      let res = await axios.post("/api/master/country/addCountry", {
        token: token,
        data,
      });
      const response = res.data;
      console.log(response, "to get the response from api to add country");
      toast.success("Country " + response?.data.countryName + " Has Been Added Successfully");
      setTimeout(() => {
        window.location="/master/addCountry"
      },1000);
    } catch (err) {
      console.log(err);
      toast.error("Failed to add new country");
    }
  }

  async function formSubmitHandler(event) {
    event.preventDefault();    const data = {
      countryName: addCountry,
    };
    console.log(data, "data entered by the use to add country");
    addCountryFn(data);
  }

  async function countrySearchFn(e) {
    const search = e.target.value;
    setCountryName(null)
    console.log(search, "to get the output of search");
    const filterData = country.filter((item) => {
      const userData = item.countryName;
      return userData.toLowerCase().includes(search.toLowerCase());
    });
    console.log(filterData, "to get the response of filtered Data");
    setSearchCountry(filterData);
  }

  async function deleteCountry(e) {
    console.log(e, "to get the id of the country");
    const id = e;
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/master/country/deleteCountry", {
        token: token,
        id: id,
      });
      const response = res.data;
      console.log(response, "to get the response from api to delete the country");
      toast.success("Country " + response.data.countryName + " Has Been Removed Successfully")
      window.location="/master/addCountry"
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove the city. Please Try Again...")
    }
  }

  async function selectedCountry(item) {
    console.log(item,"to get the details of country")
    setCountryName(item.countryName)
  }
  return (
    // <div>
    //   <ToastContainer />
    //   <div className="new-dashboard">
    //     <SideBar />
    //     <section className="profile-sec profile-sects">
    //       <div className="container">
    //         <div className="row justify-content-center">
    //           <form
    //             className="input-sec input-top p-0 state-form"
    //             id="bar-tops"
    //             onSubmit={formSubmitHandler}
    //           >
    //             <div className="input-line iptset-line" id="index-line"></div>
    //             <div className="p-3">
    //               <div className="login-top-img">
    //                 <h3 className="heading-text mt-3" id="close-btn-setting">
    //                   {" "}
    //                   COUNTRY
    //                 </h3>
    //                 <button
    //                   type="button"
    //                   className="btn-close"
    //                   aria-label="Close"
    //                   onClick={jqueryCode}
    //                 ></button>
    //               </div>
    //               <div className="input-item mt-0" id="input-mt">
    //                 <h6 className="item-text">ADD COUNTRY</h6>
    //                 <input
    //                   className="textinput"
    //                   type="text"
    //                   name="username"
    //                   autoComplete="on"
    //                   onChange={(e) => setAddCountry(e.target.value)}
    //                 />
    //               </div>

    //               <button
    //                 variant="primary"
    //                 className="btn btn-round btn-warning w-100 p-0 "
    //                 style={{ marginTop: "30px" }}
    //                 type="submit"
    //               >
    //                 {" "}
    //                 ADD{" "}
    //               </button>
    //             </div>
    //           </form>

    //           <form className="input-sec input-top p-0" id="bar-top">
    //             <div className="input-line iptset-line" id="index-line"></div>
               
    //             <div className="token-head ">
    //               <div className="rapper-between" id="token-form-padding">
    //                   <h5
    //                     style={{ cursor: "pointer" }}
    //                   >
    //                     {" "}
    //                     <i
    //                       className="bi bi-chevron-left"
    //                       id="back-btn-icon"
    //                       onClick={() => router.back()}
    //                     ></i>
    //                   </h5>
    //                 <h5 className="heading-text pink-text "> Country </h5>
    //                 <h5 className="hide-text">1</h5>
    //               </div>
    //             </div>
               
    //             <div className="input-group mb-1 " id="search-bar">
    //               <span className="input-group-text" id="basic-addon1">
    //                 <i className="bi bi-search"></i>
    //               </span>
    //               <select
    //                 type="text"
    //                 className="form-control form-select"
    //                 placeholder="Select County"
    //                 aria-label="Username"
    //                 aria-describedby="basic-addon1"
    //                 >
    //                 {country?.map((item,id)=>{
    //                  return(
    //                 <option key={id} value={item.id}>{item.countryName}</option>
    //                 )
    //                 })}
    //                 </select>
    //               <div
    //                 onClick={jqueryCode}
    //                 className="btn add-btn p-2"
    //                 id="add-btn"
    //               >
    //                 ADD
    //               </div>
    //             </div>
             
    //           </form>
    //         </div>
    //       </div>
    //     </section>
    //   </div>
    // </div>
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
                      COUNTRY
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
                    <h6 className="item-text">ADD COUNTRY</h6>
                    <input
                      className="textinput"
                      type="text"
                      name="username"
                      autoComplete="on"
                      onChange={(e) => setAddCountry(e.target.value)}
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
                    {/* <Link href="/dashboard">
                      <h5  style={{ cursor: "pointer" }} >
                        {" "}
                        <i className="bi bi-chevron-left" id="back-btn-icon" ></i>
                      </h5>
                    </Link>
                     */}
                    <h5 className="heading-text pink-text ">COUNTRIES</h5>
                    <h5 className="hide-text">1</h5>
                  </div>
                  <div className="input-group mb-1" id="search-bar">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search City"
                      value={countryName}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => countrySearchFn(e)}
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
                  { countryName ? null :
                    searchCountry == null
                    ? country?.map((item, id) => {
                        return (
                          <div key={id} className="parts-head" onClick={() => selectedCountry(item)}>
                            <div className="left-part">
                              <div className="left-side-text">
                                <h5 className="left-text-eth">
                                  {item.countryName}
                                </h5>
                              </div>
                            </div>
                            <div className="right-part">
                              <p onClick={() => deleteCountry(item.id)}>
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
                    : searchCountry?.map((item, id) => {
                        return (
                          <div key={id} className="parts-head" onClick={()=>selectedCountry(item)}>
                            <div className="left-part">
                              <div className="left-side-text">
                                <h5 className="left-text-eth">
                                  {item.countryName}
                                </h5>
                              </div>
                            </div>
                            <div className="right-part">
                              <p>
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

export default AddCountry;
