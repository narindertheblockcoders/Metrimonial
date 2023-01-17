import React, { useState, useEffect } from "react";
import SideBar from "../SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Router, useRouter } from "next/router";

const EditTestimonial = (props) => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [marrigeDate, setMarrigeDate] = useState();
  const [image, setImage] = useState();
  const [showImage, setShowImage] = useState();
  const [added, setAdded] = useState();
  const [date, setDate] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [dayData, setDayData] = useState();
  const [monthData, setMonthData] = useState();
  const [yearData, setYearData] = useState();
  const [isLoading, setIsLoading] = useState();
  console.log(props, "to see the props are working or not");
  const router = useRouter();

  async function getProfileFunction() {
    const res = await axios.post("/api/master/getHappyCouples");
    const response = res.data;
    console.log(
      response.data,
      "to get response form api to get happy couple data"
    );
    const filteredData = response.data.filter((item) => {
      const userData = item?.id;
      return userData == props.props.id;
    });
    console.log(filteredData, "to check whether the data is fetched or not");
    setName(filteredData[0]?.names);
    setDescription(filteredData[0]?.description);
    setMarrigeDate(filteredData[0]?.marrigeDate);
    setImage(filteredData[0]?.image);
  }
  useEffect(() => {
    getProfileFunction();
  }, [added]);

  async function imageFormSubmitHandler(img) {
    const formData = new FormData();
    console.log(props.props.id,"to check the id of the happy couple")

    formData.append("avatar", img);
    formData.append("id", props.props.id);

    // console.log(image, "to check the first image");
    // console.log([...formData], "to get the data of formData");

    // for (const pair of formData.entries()) {
    //   console.log(`${pair[0]}, $pair[1]`);
    // }

    // console.log(formData, "to check the data entered by the user");

    try {
      var config = {
        method: "post",
        url: "https://api.orthomatri.com/api/v1/image/updatehappycoupleimage",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${props.props.token.name}`,
        },data: formData,
      };
      const response = await axios(config);
      console.log(response);
      // .then(function (response) {
      // console.log(JSON.stringify(response.data.data));
      toast.success("Image Updated Successfully");
      // });
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
    }
  }
  function uploadImage(event) {
    let img;
    if (event.target.files && event.target.files[0]) {
       img = event.target.files[0];
      // setImage(event.currentTarget.files[0]);

      setShowImage(URL.createObjectURL(img));
    }
    imageFormSubmitHandler(img);
  }

  async function updateHappyCouple(data){
    try{
      let res = await axios.post("/api/master/updateHappyCouple", data)
      const response = res.data;
      console.log(response,"to get the response from api")
      toast.success("Details Updated Successfully")
      setAdded(added+1)
      setTimeout(() => {
        router.push("/master/happyCoupleLatest")
      }, 500);
    }
    catch(err){
      console.log(err)
      toast.error("Failed to update the user profile")
    }
  }

  async function formSubmitHandler(event) {
    event.preventDefault();
    const data = {
      id:props.props.id,
      names: name,
      description:description,
      marrigeDate: year + '/' + month + "/" + date,
    }
    console.log(data,"data entered by the user")
    updateHappyCouple(data)
  }

  async function DateData() {
    const array = [];
    const array2 = [];
    const array3 = [];
    for (let i = 1; i <= 12; i++) {
      array.push(i);
    }

    for (let i = 1; i <= 31; i++) {
      array2.push(i);
    }

    for (let i = 1950; i <= 2023; i++) {
      array3.push(i);
    }
    setMonthData(array);
    setDayData(array2);
    setYearData(array3);
  }

  useEffect(() => {
    DateData();
  }, []);


  return (
    <div>
      <ToastContainer />
      <div className="new-dashboard">
        <SideBar />

        <section
          className="profile-sec pb-0 pt-5 profile-sects"
          id="totalUserProfileSec"
        >
          <div className="container">
            <div className="row justify-content-center">
              <form className="input-sec mb-5" id="card-input-field">
                <h3 className="heading-text pink-text mt-5">
                  {/* {/ <Link href> /} */}
                  <span
                    className="arrows-icon"
                    style={{
                      position: "relative",
                      left: "-23%",
                      cursor: "pointer",
                    }}
                  >
                    {/* <img src={Arrow.src} />   */}
                    <Link href={"/users"}>
                      <span
                        className="arrows-icon  "
                        id="arrow-span"
                        style={{
                          position: "relative",
                          // left: "-20%",
                          // width:"150px",
                          // top:"40%",
                          marginTop: "40px",
                          marginLeft: "20px",
                          cursor: "pointer",
                        }}
                      >
                        <img
                        // src={"/arrow.svg"}
                        />
                      </span>
                    </Link>{" "}
                  </span>
                  ADD HAPPY COUPLE
                </h3>

                <div className="Cards-head mb-5" id="cards-head-resp">
                  <div className="card card-couple-page" id="card-settings">
                    <div className="couple-image-sec">
                      <label htmlFor="img" className="img-upload-class">
                        <img
                          // src={item.avatar}
                          src={showImage || image}
                          className="card-img-top"
                          id="card-img-top"
                          alt="..."
                        />
                      </label>
                      <input
                        onChange={(e) => uploadImage(e)}
                        type="file"
                        id="img"
                        name="img"
                        accept="image/*"
                        className="profile-upload"
                      />
                      {/* <p className="profileupload-text">
                      Click to upload the Photo
                    </p> */}
                    </div>

                    <div className="right-form-sec">
                      <h6 className="State-text mt-0">Name</h6>
                      <div className="input-group mb-1" id="search-bar">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Name Here"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <h6 className="State-text mt-3">
                        Description (max 500 words...)
                      </h6>
                      <div className="input-group mb-1" id="search-bar">
                        <textarea
                          type="text"
                          id="textarea-setting"
                          maxLength="500"
                          rows="8"
                          className="form-control"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </div>
                      <h6 className="State-text mt-3">Marrige Date</h6>
                      <h6>{new Date(marrigeDate).toLocaleString()}</h6> 
                      <h6 className="State-text mt-3">Update Marrige Date</h6>
                      <div className="couple-input-sec">
                        <div
                          className="input-group mb-1 couple-input-text"
                          id="search-bar"
                        >
                          <select
                            type="text"
                            className="form-control"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(e) => setDate(e.target.value)}
                            required
                          >
                            <option> DD</option>
                            {dayData?.map((item, id) => {
                              return <option key={id}>{item}</option>;
                            })}
                          </select>
                        </div>
                        <div
                          className="input-group mb-1 couple-input-text"
                          id="search-bar"
                        >
                          <select
                            type="text"
                            className="form-control"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            id="couple-input-text"
                            onChange={(e) => setMonth(e.target.value)}
                            required
                          >
                            <option>MM</option>
                            {monthData?.map((item, id) => {
                              return <option key={id}>{item}</option>;
                            })}
                          </select>
                        </div>
                        <div className="input-group mb-1" id="search-bar">
                          <select
                            type="text"
                            className="form-control"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(e) => setYear(e.target.value)}
                            required
                          >
                            <option>YYYY</option>
                            {yearData?.map((item, id) => {
                              return (
                                <option key={id} value={item}>
                                  {item}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="couple-button-sec">
                        <Button
                          variant="primary"
                          className="btn btn-round btn-warning w-50 p-0 "
                          style={{ marginTop: "30px" }}
                          type="submit"
                          disabled={isLoading}
                          onClick={formSubmitHandler}
                        >
                          {isLoading ? "Loading…" : "   SUBMIT"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditTestimonial;
