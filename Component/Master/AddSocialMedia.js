import React, { useEffect } from "react";
import SideBar from "../SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import $ from "jquery";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

const AddSocialMedia = () => {
  const [addTwitter, setAddTwitter] = useState();
  const [addFacebook, setAddFacebook] = useState();
  const [addInsta, setAddInsta] = useState();
  const [data, setData] = useState();
  const [id, setId] = useState();
  const [socialMedia, setSocialMedia] = useState(0);

  async function instagramCode() {
    $(".state-form").show("slow");
    $(".show-form").hide("slow");
    $(".state-form").toggleClass("show-form");
  }

  async function facebookCode() {
    $(".state-form1").show("slow");
    $(".show-form").hide("slow");
    $(".state-form1").toggleClass("show-form");
  }

  async function twitterCode() {
    $(".state-form2").show("slow");
    $(".show-form").hide("slow");
    $(".state-form2").toggleClass("show-form");
  }

  async function hide() {
    $(".show-form").hide("slow");
  }

  async function getSocialMediaFn() {
    try {
      let res = await axios.post("/api/master/socialMedia/getSocialMedia");
      const response = res.data;
      console.log(response, "to get the response from api to get social media");
      console.log(response.data[0].id, "to get the id of the suer");
      setData(response.data);
      setId(response.data[0].id);
      // setAddFacebook(response.data[0].facebookLink)
      // setAddInsta(response.data[0].instagramLink)
      // setAddTwitter(response.data[0].twitterLink);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getSocialMediaFn();
  }, [socialMedia]);

  async function updateSocialMedia(data) {

    try {
      let res = await axios.post(
        "/api/master/socialMedia/addSocialMedia",
        data
      );
      const response = res.data;
      console.log(
        response,
        "to get the respnse from api to update social media"
      );
      setSocialMedia(socialMedia+1)
      hide();
    } catch (err) {
      console.log(err);
    }
  }

  async function formSubmitHandler(event) {
    event.preventDefault();

    const data = {
      id: id,
      instagramLink: addInsta,
      facebookLink: addFacebook,
      twitterLink: addTwitter,
    };

    console.log(data, "data entered by the admin to update the social media");

    updateSocialMedia(data);
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
                    <h3 className="heading-text mt-3 " id="city-text"></h3>
                    <button
                      type="button"
                      className="btn-close "
                      id="hidee-btn-click"
                      onClick={hide}
                      data-bs-dismiss="input-sec"
                    ></button>
                  </div>
                  <div className="input-item mt-0" id="input-mt">
                    <h6 className="item-text">UPDATE INSTAGRAM</h6>
                    <input
                      className="textinput"
                      type="text"
                      name="username"
                      autoComplete="on"
                      onChange={(e) => setAddInsta(e.target.value)}
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
                    SUBMIT{" "}
                  </button>
                </div>
              </form>
              <form
                className="input-sec input-top p-0 state-form1"
                id="bar-tops"
              >
                <div className="input-line iptset-line" id="index-line"></div>

                <div className="p-3">
                  <div className="login-top-img" id="city-head-set">
                    <h3 className="heading-text mt-3"></h3>
                    <h3 className="heading-text mt-3 " id="city-text"></h3>
                    <button
                      type="button"
                      className="btn-close "
                      id="hidee-btn-click"
                      onClick={hide}
                      data-bs-dismiss="input-sec"
                    ></button>
                  </div>
                  <div className="input-item mt-0" id="input-mt">
                    <h6 className="item-text">UPDATE FACEBOOK</h6>
                    <input
                      className="textinput"
                      type="text"
                      name="username"
                      autoComplete="on"
                      onChange={(e) => setAddFacebook(e.target.value)}
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
                    SUBMIT{" "}
                  </button>
                </div>
              </form>

              <form
                className="input-sec input-top p-0 state-form2"
                id="bar-tops"
              >
                <div className="input-line iptset-line" id="index-line"></div>

                <div className="p-3">
                  <div className="login-top-img" id="city-head-set">
                    <h3 className="heading-text mt-3"></h3>
                    <h3 className="heading-text mt-3 " id="city-text"></h3>
                    <button
                      type="button"
                      className="btn-close "
                      id="hidee-btn-click"
                      onClick={hide}
                      data-bs-dismiss="input-sec"
                    ></button>
                  </div>
                  <div className="input-item mt-0" id="input-mt">
                    <h6 className="item-text">UPDATE TWITTER</h6>
                    <input
                      className="textinput"
                      type="text"
                      name="username"
                      autoComplete="on"
                      onChange={(e) => setAddTwitter(e.target.value)}
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
                    SUBMIT{" "}
                  </button>
                </div>
              </form>

              <form className="input-sec input-top p-0" id="bar-top">
                <div className="input-line iptset-line" id="index-line"></div>
                {data ? data?.map((item, idx) => {
                  return (
                    <>
                      <div key={idx} className="token-head">
                        <div className="rapper-between" id="token-form-padding">
                          <h5 className="heading-text pink-text ">
                            SOCIAL MEDIA
                          </h5>
                          <h5 className="hide-text">1</h5>
                        </div>

                        <h6 className="State-text mt-3">INSTAGRAM</h6>

                        <div className="input-group mb-1" id="search-bar">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Social Media"
                            value={item.instagramLink}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            disabled
                          />

                          <div
                            onClick={instagramCode}
                            className="btn add-btn"
                            id="add-btn"
                          >
                            UPDATE
                          </div>
                        </div>
                        <h6 className="State-text mt-5">FACEBOOK</h6>
                        <div className="input-group mb-1 " id="search-bar">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Social Media"
                            value={item.facebookLink}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            disabled
                          />

                          <div
                            onClick={facebookCode}
                            className="btn add-btn"
                            id="add-btn"
                          >
                            UPDATE
                          </div>
                        </div>
                        <h6 className="State-text mt-5">TWITTER</h6>
                        <div className="input-group mb-1 " id="search-bar">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Social Media"
                            value={item.twitterLink}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            disabled
                          />

                          <div
                            onClick={twitterCode}
                            className="btn add-btn"
                            id="add-btn"
                          >
                            UPDATE
                          </div>
                        </div>
                      </div> 
                    </>
                    );
                  }): 
                      <div className="token-head">
                      <div className="rapper-between" id="token-form-padding">
                        <h5 className="heading-text pink-text ">
                          SOCIAL MEDIA
                        </h5>
                        <h5 className="hide-text">1</h5>
                      </div>

                      <h6 className="State-text mt-3">INSTAGRAM</h6>

                      <div className="input-group mb-1" id="search-bar">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Social Media"
                          // defaultValue={item?.instagramLink}
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          disabled
                        />

                        <div
                          onClick={instagramCode}
                          className="btn add-btn"
                          id="add-btn"
                        >
                          UPDATE
                        </div>
                      </div>
                      <h6 className="State-text mt-5">FACEBOOK</h6>
                      <div className="input-group mb-1 " id="search-bar">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Social Media"
                          // defaultValue={item.facebookLink}
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          disabled
                        />

                        <div
                          onClick={facebookCode}
                          className="btn add-btn"
                          id="add-btn"
                        >
                          UPDATE
                        </div>
                      </div>
                      <h6 className="State-text mt-5">TWITTER</h6>
                      <div className="input-group mb-1 " id="search-bar">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Social Media"
                          // defaultValue={item?.twitterLink}
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          disabled
                        />

                        <div
                          onClick={twitterCode}
                          className="btn add-btn"
                          id="add-btn"
                        >
                          UPDATE
                        </div>
                      </div>
                    </div>
                  
                  }
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddSocialMedia;
