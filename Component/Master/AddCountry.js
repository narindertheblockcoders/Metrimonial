import React, { useEffect } from "react";
import SideBar from "../SideBar";
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
  const [countryName, setCountryName] = useState();
  const [countryAdded, setCountryAdded] = useState(0);
  const [userData, setUserData] = useState();
  const [editInput, setEditInput] = useState();
  const [addCountryValue, setAddCountryValue] = useState();
  const [id, setId] = useState();
  const router = useRouter();

  // async function jqueryCode() {
  //   $(".state-form").show("slow");
  //   $(".show-form").hide("slow");
  //   $(".state-form").toggleClass("show-form");
  // }
  // async function hide() {
  //   $(".show-form").hide("slow");
  // }

  async function getCountry() {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/master/country/getCountry", {
        token: token,
      });
      const response = res.data;
      console.log(
        response.data,
        "to get the response from api to get the Countries"
      );
      setCountry(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCountry();
  }, [countryAdded]);

  async function addCountryFn(data) {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/master/country/addCountry", {
        token: token,
        data,
      });
      const response = res.data;
      console.log(response, "to get the response from api to add country");
      toast.success(
        "Country " + response?.data.countryName + " Has Been Added Successfully"
      );
      setCountryAdded(countryAdded + 1);
      hide();
    } catch (err) {
      console.log(err, "to check the error status");
      toast.error(
        "Country " +
          addCountry +
          " Has already been added in Country List... Please check..."
      );
    }
  }

  async function formSubmitHandler(event) {
    event.preventDefault();
    const data = {
      countryName: addCountry,
    };
    console.log(data, "data entered by the use to add country");
    addCountryFn(data);
  }

  async function updateCountryFn(data) {
    try {
      let res = await axios.post("/api/master/country/updateCountry",data);
      const response = res.data;
      console.log(response, "to get the response from api to add country");
      toast.success(
        "Country " + addCountryValue + " Has Been Updated Successfully"
      );
      setCountryAdded(countryAdded + 1);
      // setEditInput(false);

    } catch (err) {
      console.log(err, "to check the error status");
      toast.error("Failed to update" + addCountryValue);
    }
  }

  async function updateFormSubmitHandler(e) {
    // e.preventDefault();
    console.log(e,"update e here")
    setId(e)
    const data = {
      id:id,
      country: addCountryValue,
    };
    console.log(data, "data entered by the use to add country");
    updateCountryFn(data);
  }

  async function countrySearchFn(e) {
    const search = e.target.value;
    setCountryName(null);
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
      console.log(
        response,
        "to get the response from api to delete the country"
      );
      toast.success("Selected Country Has Been Removed Successfully");
      setCountryAdded(countryAdded + 1);
      setCountryName("");
      setSearchCountry(null);
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove the country. Please Try Again...");
    }
  }

  async function selectedCountry(item) {
    console.log(item, "to get the details of country");
    setCountryName(item.countryName);
  }

  async function editCountry(e) {
    console.log(e);
    setEditInput(true);
  }
  console.log(addCountryValue,"country value")

  return (
    <div>
      <ToastContainer />
      <div className="new-dashboard">
        <SideBar />
        <section className="profile-sec profile-sects">
          <div className="container">
            <div className="row justify-content-center">
              <div
              //  className="input-sec-header"
              >
                <form
                  className="input-sec input-top p-0 input-serch-set"
                  id="card-input-field"
                >
                  <div className="input-line iptset-line" id="index-line"></div>
                  <div className="token-head" id="token-head-add">
                    <div
                      className="rapper-between mb-5 mt-3"
                      id="token-form-padding"
                    >
                      <h5 className="heading-text pink-text ">COUNTRY</h5>
                      <h5 className="hide-text">1</h5>
                    </div>
                    <div className="input-group mb-1 " id="search-bar">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="bi bi-search"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Country"
                        value={countryName}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={(e) => countrySearchFn(e)}
                      />

                      {/* <div className="btn add-btn" id="add-btn"  onClick={formSubmitHandler}>ADD </div> */}
                    </div>
                  </div>
                  <div className="input-sec input-top p-5 mt-5">
                    <div
                      className="input-line iptset-line"
                      id="index-line"
                    ></div>

                    <div className="p-0">
                      <div className="login-top-img" id="city-head-set"></div>
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
                  </div>
                  <div className="left-dashboard mb-4 " id="lr-id">
                    <table className="table funds-table mt-3 " id="funds-color">
                      <thead>
                        <tr className="">
                          <th id="fuds" scope="col">
                            Sr.No
                          </th>

                          <th id="fuds" scope="col">
                            Country
                          </th>
                          <th id="fuds" scope="col"></th>
                          <th id="fuds" scope="col">
                            Status
                          </th>
                          <th id="fuds" scope="col"></th>
                        </tr>
                      </thead>

                      <tbody>
                        {country?.map((item, id) => {
                          return (
                            <tr>
                              <td className="total-account">{id + 1}</td>
                              <td className="total-account">
                                {editInput == true ? (
                                  <input
                                    type="text"
                                    className="form-control w-25"
                                    placeholder="Search Country"
                                    id="edit-contry-input"
                                    defaultValue={item?.countryName}
                                    onChange={(e) => setAddCountryValue(e.target.value)}
                                  />
                                ) : (
                                  <p style={{ margin: "0" }}>
                                    {item?.countryName}{" "}
                                  </p>
                                )}
                              </td>

                              <td className="total-account"></td>
                              <td
                                className="total-account "
                                id="right-textset"
                                onClick={(e) => editCountry(e,item?.id)}
                              >
                                {editInput == true ? (
                                  <i  class="bi bi-check-lg"  id="edit-btn" onClick={(e)=>updateFormSubmitHandler(item?.id)}></i> ) : (
                                  <i class="bi bi-pencil-square"  id="edit-btn"></i>

                                )}
                              </td>
                              <td
                                className="total-account right-textset"
                                id="right-textset"
                                onClick={() => deleteCountry(item.id)}
                              >
                                <i
                                  style={{ cursor: "pointer" }}
                                  className="bi bi-trash3"
                                  id="pin-dark-icon"
                                ></i>{" "}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddCountry;
