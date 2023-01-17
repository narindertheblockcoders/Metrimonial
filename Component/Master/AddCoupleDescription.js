import React, { useState, useEffect } from "react";
import SideBar from "../SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";

const AddCoupleDescription = (props) => {
  console.log(
    props,
    "to see whether props are working or not"
  );

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [showImage, setShowImage] = useState();
  const [date, setDate] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [dayData, setDayData] = useState();
  const [monthData, setMonthData] = useState();
  const [yearData, setYearData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function addHappyCouple(event) {
    event.preventDefault();
    console.log(date, month, year, 'date')
    console.log(year + '/' + month + "/" + date)
    const formData = new FormData();

    formData.append("avatar", image);
    formData.append("names", name);
    formData.append("description", description);
    formData.append("marrigeDate", year + '/' + month + "/" + date);

    //   console.log(image, "to check the first image");
    // console.log([...formData], "to get the data of formData");

    // for (const pair of formData.entries()) {
    //   console.log(`${pair[0]}, $pair[1]`,'hello');
    // }

    // console.log(formData, "to check the data entered by the user");

    try {
      var config = {
        method: "post",
        url: "http://3.223.152.95:3000/api/v1/image/addhappycouple",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${props?.props?.token?.name}`,
        },
        data: formData,
      };
      const response = await axios(config);
      console.log(response, 'response is here')
      setIsLoading(true)
      toast.success("Couple Added Successfully")

      setTimeout(() => {
        router.push("/master/happyCoupleLatest")
      }, 1000);
    } catch (err) {
      console.log(err);
      setIsLoading(false)
    }
    // }
  }

  function uploadImage(event) {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(event.currentTarget.files[0]);
      setShowImage(URL.createObjectURL(img));
    }
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
          className="profile-sec pb-0  profile-sects"
          id="totalUserProfileSec"
        >
          <div className="container">
            <div className="row justify-content-center">
              <form className="input-sec mb-5" id="card-input-field" onSubmit={addHappyCouple}>
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
                        {showImage ? (
                          <img
                            // src={item.avatar}
                            src={showImage || ""}
                            className="card-img-top"
                            id="card-img-top"
                            alt="..."
                          />
                        ) : (<h2>Upload Image </h2>)
                        }

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
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <h6 className="State-text mt-3">Description  (max 500 words...)</h6>
                      <div className="input-group mb-1" id="search-bar">
                        <textarea
                          type="text"
                          id="textarea-setting"
                          maxLength="500"
                          rows="8"
                          className="form-control"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </div>
                      <h6 className="State-text mt-3">Date</h6>

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
                        // onClick={addHappyCouple}
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

export default AddCoupleDescription;
