import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import Link from "next/link";
import Script from "next/script";
import $ from "jquery";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const State = () => {
  const [country, setCountry] = useState();
  const [searchCountry, setSearchCountry] = useState("");
  const [countryId, setCountryId] = useState();
  const [countryName, setCountyName] = useState();
  const [addState, setAddState] = useState();
  const [state, setState] = useState();
  const [searchState, setSearchState] = useState();
  const [stateName, setStateName] = useState();
  const [stateAdded, setStateAdded] = useState(0);
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

  async function countrySearchFn(e) {
    const search = e.target.value;
    setCountyName(null);
    setState(null);
    setSearchState(null);
    console.log(search, "to get the output of search");
    const filterData = country.filter((item) => {
      const userData = item.countryName;
      return userData.toLowerCase().includes(search.toLowerCase());
    });
    console.log(filterData, "to get the response of filtered Data");
    setSearchCountry(filterData);
  }

  async function stateSearchFn(e) {
    const search = e;
    setStateName(null);
    console.log(search, "to get the output of search");
    const filterData = state.filter((item) => {
      const userData = item.stateName;
      return userData.toLowerCase().includes(search.toLowerCase());
    });
    console.log(filterData, "to get the response of filtered Data");
    setSearchState(filterData);
  }

  async function getStateFn(countryId) {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/master/state/getState", {
        token: token,
        countryId: countryId,
      });
      const response = res.data;
      console.log(
        response.data,
        "to get the response from api to get the States"
      );
      setState(null);
      setState(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCountry();
  }, []);

  async function selectedCountry(item) {
    setState(null);
    setSearchState(null);
    console.log(item.id, "to get the id of country");
    console.log(item.countryName, "to get the name of country");
    setCountryId(item.id);
    const countryId = item.id;
    console.log(countryId, "to see id is working or nto");
    setCountyName(item.countryName);
    getStateFn(countryId);
  }

  async function selectedState(item) {
    console.log(item.id, "to get the id of State");
    console.log(item.stateName, "to get the name of state");
    setStateName(item.stateName);
  }

  async function addStateFn(data) {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/master/state/addState", {
        token: token,
        data,
      });
      const response = res.data;
      console.log(response, "to get the response from api to add state");
      toast.success(
        "State " +
          response.data.stateName +
          " Has been added successfully in " +
          countryName
      );
      setStateAdded(stateAdded + 1);
      await getStateFn(countryId);
      hide();
    } catch (err) {
      console.log(err);
      toast.error(
        "State " +
          addState +
          " Has already been added in " +
          countryName +
          " Please Check..."
      );
    }
  }

  async function formSubmitHandler(event) {
    event.preventDefault();

    if (!countryId) {
      toast.error("Please Select the Country to Add the State");
      hide();
      return;
    }

    const data = {
      countryId: countryId,
      stateName: addState,
    };

    console.log(data, "date entered by the user");

    addStateFn(data);
  }

  async function deleteState(e) {
    console.log(e, "to get the id of the State");
    const id = e;
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/master/state/deleteState", {
        token: token,
        id: id,
      });
      const response = res.data;
      console.log(
        response,
        "to get the response from api to delete the country"
      );
      toast.success(
        " Selected State Has Been Removed Successfully frorm " +
          countryName
      );
      setStateAdded(stateAdded + 1);
      await getStateFn(countryId);
      setStateName("")
      setSearchState(null)
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove the state. Please Try Again...");
    }
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
                onSubmit={formSubmitHandler}
              >
                <div className="input-line iptset-line" id="index-line"></div>
                <div className="p-3">
                  <div className="login-top-img">
                    <h3 className="heading-text mt-3" id="close-btn-setting">
                      {" "}
                      STATE
                    </h3>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={jqueryCode}
                    ></button>
                  </div>
                  <div className="input-item mt-0" id="input-mt">
                    <h6 className="item-text">ADD STATE</h6>
                    <input
                      className="textinput"
                      type="text"
                      name="username"
                      autoComplete="on"
                      onChange={(e) => setAddState(e.target.value)}
                    />
                  </div>

                  <button
                    variant="primary"
                    className="btn btn-round btn-warning w-100 p-0 "
                    style={{ marginTop: "30px" }}
                    type="submit"
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
                      <h5  style={{ cursor: "pointer" }}>
                        {" "}
                        <i className="bi bi-chevron-left" id="back-btn-icon" ></i>
                      </h5>
                    </Link> */}
                    <h5 className="heading-text pink-text ">STATE</h5>
                    <h5 className="hide-text">1</h5>
                  </div>
                  <h6 className="State-text mt-0">Country</h6>

                  <div className="input-group mb-1" id="search-bar">
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
                  </div>
                </div>
                <div className="token-parts">
                  {countryName
                    ? null
                    : searchCountry == ""
                    ? country?.map((item, id) => {
                        return (
                          <div
                            key={id}
                            className="parts-head"
                            onClick={() => {
                              selectedCountry(item);
                            }}
                          >
                            <div className="left-part">
                              <div className="left-side-text">
                                <h5 className="left-text-eth">
                                  {item.countryName}
                                </h5>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : searchCountry?.map((item, id) => {
                        return (
                          <div
                            key={id}
                            className="parts-head"
                            onClick={() => selectedCountry(item)}
                          >
                            <div className="left-part">
                              <div className="left-side-text">
                                <h5 className="left-text-eth">
                                  {item.countryName}
                                </h5>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                </div>
                <div className="token-head ">
                  <h6 className="State-text mt-4">State</h6>

                  <div className="input-group mb-1" id="search-bar">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="bi bi-search"></i>
                    </span>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search State"
                      value={stateName}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => stateSearchFn(e.target.value)}
                    />

                    <div
                      onClick={jqueryCode}
                      className="btn add-btn pt-2"
                      id="add-btn"
                    >
                      ADD
                    </div>
                  </div>
                </div>
                <div className="token-parts">
                  {stateName
                    ? null
                    : searchState == null
                    ? state?.map((item, id) => {
                        return (
                          <div
                            key={id}
                            className="parts-head"
                            onClick={() => selectedState(item)}
                          >
                            <div className="left-part">
                              <div className="left-side-text">
                                <h5 className="left-text-eth">
                                  {item.stateName}
                                </h5>
                              </div>
                            </div>
                            <div className="right-part">
                              <p onClick={() => deleteState(item.id)}>
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
                    : searchState?.map((item, id) => {
                        return (
                          <div
                            key={id}
                            className="parts-head"
                            onClick={() => selectedState(item)}
                          >
                            <div className="left-part">
                              <div className="left-side-text">
                                <h5 className="left-text-eth">
                                  {item.stateName}
                                </h5>
                              </div>
                            </div>
                            <div className="right-part">
                              <p onClick={() => deleteState(item.id)}>
                                <i
                                  style={{ cursor: "pointer" }}
                                  className="bi bi-trash3"
                                  id="pin-dark-icon"
                                ></i>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  {/* </div> */}
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default State;
