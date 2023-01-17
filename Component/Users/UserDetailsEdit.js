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

const UserDetailsEdit = (props) => {
  console.log(props, "to get the id from token");
  console.log(props.props.token.email);
  const [userData, setUserData] = useState();
  const [adminOneDisable, setAdminOneDisable] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [dob, setDob] = useState();
  const [wishlist, setWishlist] = useState();
  const [gender, setGender] = useState();
  const [motherTongue, setMotherTongue] = useState();
  const [maritalStatus, setMaritalStatus] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [age, setAge] = useState();
  const [summary, setSummary] = useState();
  const [zipCode, setZipCode] = useState();
  const [college, setCollege] = useState();
  const [degree, setDegree] = useState();
  const [profession, setProfession] = useState();
  const [work, setWork] = useState();
  const [added, setAdded] = useState();
  const [image, setImage] = useState();
  const [showImage, setShowImage] = useState();
  const [avatar, setAvatar] = useState();

  const router = useRouter();

  console.log(props.props.id, "to check whethers props are working or not");

  async function getUsers() {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.post("/api/users/getUsers", { token: token });
      const response = res.data;
      console.log(response, "to get the response from api to get users");
      const filteredData = response.data.filter((item) => {
        const userData = item?.id;
        return userData == props.props.id;
      });
      console.log(
        filteredData[0],
        "to check whether the data is fetched or not"
      );

      setName(filteredData[0]?.name);
      setAge(filteredData[0]?.age);
      setEmail(filteredData[0]?.email);
      setPhone(filteredData[0]?.phone);
      setDob(filteredData[0]?.dateOfBirth);
      setWishlist(filteredData[0]?.wishlist);
      setGender(filteredData[0]?.gender);
      setMotherTongue(filteredData[0]?.motherTongue);
      setMaritalStatus(filteredData[0]?.maritalStatus);
      setHeight(filteredData[0]?.height);
      setWeight(filteredData[0]?.weight);
      setCity(filteredData[0]?.city);
      setState(filteredData[0]?.state);
      setCountry(filteredData[0]?.country);
      setSummary(filteredData[0]?.summary);
      setZipCode(filteredData[0]?.zipCode);
      setCollege(filteredData[0]?.college);
      setDegree(filteredData[0]?.degree);
      setProfession(filteredData[0]?.profession);
      setWork(filteredData[0]?.work);
      setAvatar(filteredData[0]?.avatar);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getUsers();
  }, [added]);

  async function imageFormSubmitHandler() {
    // event.preventDefault()

    const formData = new FormData();

    formData.append("avatar", image);
    formData.append("id", props.props.id);

    console.log(image, "to check the first image");
    console.log([...formData], "to get the data of formData");

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, $pair[1]`);
    }

    console.log(formData, "to check the data entered by the user");

    try {
      var config = {
        method: "post",
        url: "http://3.223.152.95:3000/api/v1/image/updateuserimage",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${props.props.token.name}`,
        },
        data: formData,
      };
      await axios(config).then(function (response) {
        console.log(JSON.stringify(response.data.data));
        toast.success("User Profile Updated Successfully");
      });
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
    }
  }
  function uploadImage(event) {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(event.currentTarget.files[0]);
      setShowImage(URL.createObjectURL(img));
    }
    imageFormSubmitHandler();
  }

  async function updateUserProfile(data) {
    try {
      let res = await axios.post("/api/users/updateUserDetails", data);
      const response = res.data.data;
      console.log(
        response.data,
        "to get response from api to apporve from admin 1"
      );
      toast.success("Admin Checked Succesfully");
      setAdded(added + 1);
      router.push("/users/totalUsers");
    } catch (err) {
      console.log(err);
      toast.error("Please Try Again");
    }
  }

  async function formSubmitHandler(event) {
    event.preventDefault();

    const data = {
      id: props.props.id,
      name: name,
      email: email,
      phone: phone,
      dateOfBirth: dob,
      wishlist: wishlist,
      gender: gender,
      motherTongue: motherTongue,
      maritalStatus: maritalStatus,
      height: height,
      weight: weight,
      city: city,
      state: state,
      country: country,
      age: age,
      summary: summary,
      zipCode: zipCode,
      college: college,
      degree: degree,
      profession: profession,
      work: work,
    };

    console.log(data, "data entered by the admin");
    updateUserProfile(data);
  }

  return (
    <>
      <div className="new-dashboard">
        <SideBar />
        <ToastContainer />

        <section className="forself profile-sects">
          <div className="container" id="user-detail-container">
            <div className="self-main">
              <div className="approve-top-header">
                <div className="self-main-head" id="self-main-head">
                  <h3 className="w-50">Profile edit</h3>
                </div>

                <div className="self-about-right" id="self-about-top">
                  {/* <h3>Approved by</h3> */}
                  <button
                    className="button sub-admin-btn"
                    type="submit"
                    onClick={formSubmitHandler}
                  >
                    Save{" "}
                  </button>
                </div>
              </div>

              <div className="left-main-box" id="left-main-box">
                <div className="box-img">
                  <img
                    className="user-image"
                    src={showImage || avatar || "/img/box-img.png"}
                    alt=""
                  />
                  <input
                    type="file"
                    placeholder="Upload Front Side"
                    style={{ marginTop: "10px" }}
                    onChange={(e) => uploadImage(e)}
                  />
                </div>
                <div className="box-text">
                  <div className="box-text-one">
                    <input
                      type="text"
                      className="editDetails-input mb-4 w-50"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {/* <h2>{name}</h2> */}
                    <div className="flex-box-one">
                      <ul>
                        <li>Age</li>
                        <li>
                          <input
                            type="text"
                            className="editDetails-input"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                          />
                        </li>
                      </ul>
                    </div>

                    <div className="flex-box-one">
                      <ul>
                        <li>Gender</li>
                        <li>
                          <input
                            type="text"
                            className="editDetails-input"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                          />
                        </li>
                      </ul>
                    </div>
                    <div className="flex-box-one">
                      <ul>
                        <li>Profession</li>
                        <li>
                          <input
                            type="text"
                            className="editDetails-input"
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                          />
                        </li>
                      </ul>
                    </div>
                    <div className="flex-box-one">
                      <ul>
                        <li> City,State, Country</li>
                        <li>
                          <b>
                            <input
                              type="text"
                              className="editDetails-input"
                              value={city + state + country}
                            />
                          </b>
                        </li>
                      </ul>
                    </div>
                    <div className="flex-box-one">
                      <ul>
                        <li>Degree</li>

                        <li>
                          <b>
                            <input
                              type="text"
                              className="editDetails-input"
                              value={degree}
                              onChange={(e) => setDegree(e.target.value)}
                            />{" "}
                          </b>{" "}
                        </li>
                      </ul>
                    </div>

                    <div className="flex-box-one">
                      <ul>
                        <li>Work</li>

                        <li>
                          <b>
                            <input
                              type="text"
                              className="editDetails-input"
                              value={work}
                              onChange={(e) => setWork(e.target.value)}
                            />{" "}
                          </b>{" "}
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
                              <input
                                type="text"
                                className="editDetails-input"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                              />
                            </span>
                          </div>
                        </li>
                      </ul>
                      <ul className="two-inner2-ul">
                        <li>Email</li>
                        <li>
                          <div className="input-group mb-3">
                            <span className="form-control">
                              <input
                                type="text"
                                className="editDetails-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="boxthree">
                    {/* <p>I am looking for a suitalbe partner. I have completed my gratuation in From USA
                                univercity</p> */}
                    <p></p>
                  </div>
                </div>
              </div>

              <div className="self-about">
                <div className="self-about-main">
                  <div className="self-about-left">
                    <ul>
                      <li>Mother Tongue</li>
                      <li>
                        <b>
                          <input
                            type="text"
                            className="editDetails-input"
                            value={motherTongue}
                            onChange={(e) => setMotherTongue(e.target.value)}
                          />
                        </b>
                      </li>
                    </ul>

                    <ul>
                      <li> Marital Status</li>
                      <li>
                        <b>
                          <input
                            type="text"
                            className="editDetails-input"
                            value={maritalStatus}
                            onChange={(e) => setMaritalStatus(e.target.value)}
                          />
                        </b>
                      </li>
                    </ul>

                    <ul>
                      <li> Height</li>
                      <li>
                        <b>
                          <input
                            type="text"
                            className="editDetails-input"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                          />
                        </b>
                      </li>
                    </ul>

                    <ul>
                      <li> Weight</li>
                      <li>
                        <b>
                          <input
                            type="text"
                            className="editDetails-input"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                          />
                        </b>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default UserDetailsEdit;
