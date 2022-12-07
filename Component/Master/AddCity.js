import React from "react";
import SideBar from "../SideBar";
import Link from "next/link";
import $ from "jquery";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCity = () => {
  const [country, setCountry] = useState();
  const [countryId, setCountryId] = useState();
  const [stateId, setStateId] = useState();
  const [state, setState] = useState();
  const [searchCountry, setSearchCountry] = useState();
  const [searchState, setSearchState] = useState();
  const [searchCity, setSearchCity] = useState();
  const [countryName, setCountryName] = useState();
  const [stateName, setStateName] = useState();
  const [city, setCity] = useState();
  const [addCity, setAddCity] = useState();
  const [cityName, setCityName] = useState();
  const [cityAdded, setCityAdded] = useState();
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
    setCountryName(null);
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
    } catch (err) {
      console.log(err);
    }
  }

  async function stateSearchFn(e) {
    const search = e.target.value;
    setStateName(null);
    console.log(search, "to get the output of search");
    const filterData = state.filter((item) => {
      const userData = item.stateName;
      return userData.toLowerCase().includes(search.toLowerCase());
    });
    console.log(filterData, "to get the response of filtered Data");
    setSearchState(filterData);
  }

  async function citySearchFn(e) {
    const search = e.target.value;
    // if(search ="") return;
    setCityName(null);
    console.log(search, "to get the output of search");
    const filterData = city?.filter((item) => {
      const userData = item.cityName;
      return userData.toLowerCase().includes(search.toLowerCase());
    });
    console.log(filterData, "to get the response of filtered Data");
    setSearchCity(filterData);
  }

  async function selectedCountry(item) {
    console.log(item.id, "to get the id of country");
    console.log(item.countryName, "to get the name of country");
    setCountryId(item.id);
    setCountryName(item.countryName);
    const countryId = item.id;
    console.log(countryId, "to see id is working or nto");
    getStateFn(countryId);
  }

  async function selectedState(item) {
    console.log(item.id, "to get the id of State");
    console.log(item.stateName, "to get the name of state");
    setStateId(item.id);
    const stateId = item.id;
    console.log(stateId, "to see id is working or nto");
    setStateName(item.stateName);
    getCityFn(stateId, cityAdded);
  }

  useEffect(() => {
    getCountry();
  }, []);

  async function addCityFn(data) {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/master/city/addCity", {
        token: token,
        data,
      });
      const response = res.data;
      console.log(response, "to get the response from api to add state");
      toast.success(
        "City " +
          response.data.cityName +
          " Has been added successfully in " +
          stateName
      );
        setCityAdded(cityAdded+1)
        await getCityFn(stateId)
        hide();
    } catch (err) {
      console.log(err);
      toast.error("City " + addCity + " Has already been added in State " + stateName + " Please Check...");
    }
  }

  async function formSubmitHandler(event) {
    event.preventDefault();

    if (!stateId) {
      toast.error("Please Select the Country and then State to add the City")
      hide();
      return;
    }
    const data = {
      stateId: stateId,
      cityName: addCity,
    };

    console.log(data, "date entered by the user");

    addCityFn(data);
  }

  async function getCityFn(stateId) {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/master/city/getCity", {
        token: token,
        stateId: stateId,
      });
      const response = res.data;
      console.log(response, "to get the response from api to get all cities");
      setCity(response.data);
      return response.data
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteCity(e) {
    console.log(e, "to get the id of the State");
    const id = e;
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/master/city/deleteCity", {
        token: token,
        id: id,
      });
      const response = res.data;
      console.log(
        response,
        "to get the response from api to delete the country"
      );
      toast.success(
        "Selected City Has Been Removed Successfully from " +
          stateName
      );
     setCityAdded(cityAdded+1)
     await getCityFn(stateId)
     setCityName(null);
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove the city. Please Try Again...");
    }
  }

  async function selectedCity(item) {
    console.log(item, "to get the details of the city");
    setCityName(item.cityName);
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
                      City
                    </h3>
                    <button
                      type="button"
                      class="btn-close"
                      id="city-btn-closes"
                      aria-label="Close"
                      onClick={jqueryCode}
                    ></button>
                  </div>
                  <div className="input-item mt-0" id="input-mt">
                    <h6 className="item-text">ADD CITY</h6>
                    <input
                      className="textinput"
                      type="text"
                      name="username"
                      autoComplete="on"
                      onChange={(e) => setAddCity(e.target.value)}
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
                      <h5 style={{ cursor: "pointer" }}>
                        {" "}
                        <i  className="bi bi-chevron-left"  id="back-btn-icon" ></i>
                      </h5>
                    </Link> */}
                    <h5 className="heading-text pink-text ">CITY</h5>
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
                    : searchCountry == null
                    ? country?.map((item, id) => {
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
                      onChange={(e) => stateSearchFn(e)}
                    />
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
                          </div>
                        );
                      })}
                  {/* </div> */}
                </div>

                <div className="token-head ">
                  <h6 className="State-text mt-4">City</h6>

                  <div className="input-group mb-1" id="search-bar">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="bi bi-search"></i>
                    </span>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search city"
                      value={cityName || "Search City " }

                      onChange={(e) => citySearchFn(e)}
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
                  {cityName
                    ? null
                    : searchCity == null
                    ? city?.map((item, id) => {
                        return (
                          <div
                            key={id}
                            className="parts-head"
                            onClick={() => selectedCity(item)}
                          >
                            <div className="left-part">
                              <div className="left-side-text">
                                <h5 className="left-text-eth">
                                  {item.cityName}
                                </h5>
                              </div>
                            </div>
                            <div className="right-part">
                              <p onClick={() => deleteCity(item.id)}>
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
                    : searchCity?.map((item, id) => {
                        return (
                          <div
                            key={id}
                            className="parts-head"
                            onClick={() => selectedCity(item)}
                          >
                            <div className="left-part">
                              <div className="left-side-text">
                                <h5 className="left-text-eth">
                                  {item.cityName}
                                </h5>
                              </div>
                            </div>
                            <div className="right-part">
                              <p onClick={()=> deleteCity(item.id)}>
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
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddCity;
