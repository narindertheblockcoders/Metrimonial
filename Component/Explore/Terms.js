import axios from "axios";
import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Terms() {
  const [heading1, setHeading1] = useState();
  const [heading2, setHeading2] = useState();
  const [heading3, setHeading3] = useState();
  const [heading4, setHeading4] = useState();
  const [heading5, setHeading5] = useState();
  const [description1, setDescription1] = useState();
  const [description2, setDescription2] = useState();
  const [description3, setDescription3] = useState();
  const [description4, setDescription4] = useState();
  const [description5, setDescription5] = useState();
  const [termsData, setTermsData] = useState();
  const [loading, setLoading] = useState(false);


  async function termsFn(data) {
    try {
      const response = await axios.post("/api/explore/terms", { data:data,
      });
      console.log(response, "about");
      toast.success("Updated Successfully");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update ! Please try again");
      console.log(error);
    }
  }

  async function submitHandlerFn(e) {
    e.preventDefault();
    setLoading(true);

    const data = {
      id: 1,
      description1,
      description2,
      heading1,
      heading2,
      heading3,
      heading4,
      heading5,
      description3,
      description4,
      description5

    };
    console.log(data, "data");
    termsFn(data);
  }

  async function getTermsFn() {
    try {
      const response = await axios.post("/api/explore/getterms");
      console.log(response, "about");
      setTermsData(response.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTermsFn();
  }, []);
  return (
    <div className="new-dashboard">
      <SideBar />
      <ToastContainer/>
      <section className="terms forself profile-sects" id="couple-profile-div">
        <form onSubmit={(e) => submitHandlerFn(e)}>
          <div className="container">

          <div className="couple-head-sec mb-4">
            <h4>TERMS OF USE</h4>
            <h2>
               <span> ORTHODOX MATRIMONIAL </span>
            </h2>
          </div>
            <div className="terms-section">
              <input
                onChange={(e) => setHeading1(e.target.value)}
                placeholder={termsData?.heading1}
              ></input>
            </div>

            <textarea
              onChange={(e) => setDescription1(e.target.value)}
              className="terms-textarea"
              maxLength={1200}
              placeholder="Description"
              defaultValue={termsData?.description1}
              rows={6}></textarea>

            <div className="term-section">
              <input
                onChange={(e) => setHeading2(e.target.value)}
                defaultValue={termsData?.heading2}
                placeholder="Lorem ipsum dolor sit amet"
                type="text"
              ></input>
            </div>

            <div>
              <textarea
                onChange={(e) => setDescription2(e.target.value)}
                className="terms-textarea"
                maxLength="1200"
                defaultValue={termsData?.description2}
                rows={6}
                placeholder="Description"
                cols="33"
              ></textarea>
            </div>

            <div className="term-section">
              <input
                defaultValue={termsData?.heading3}
                onChange={(e) => setHeading3(e.target.value)}
                placeholder="Dolor sit amet"
                type="text"
              ></input>
            </div>

            <div>
              <textarea
                className="terms-textarea"
                maxLength="1200"
                rows={6}
                placeholder="Description"
                cols="33"
                defaultValue={termsData?.description3}
                onChange={(e) => setDescription3(e.target.value)}
              ></textarea>
            </div>

            <div className="term-section">
              <input
                defaultValue={termsData?.heading4}
                onChange={(e) => setHeading4(e.target.value)}
                placeholder="Suspendisse vitae enim tortor"
                type="text"
              ></input>
            </div>
            <div>
              <textarea
                className="terms-textarea"
                maxLength="1200"
                rows={6}
                placeholder="Description"
                defaultValue={termsData?.description4}
                cols="33"
                onChange={(e) => setDescription4(e.target.value)}
              ></textarea>
            </div>

            <div className="term-section">
              <input
                placeholder="Accusantium laboriosam nostrum"
                type="text"
                defaultValue={termsData?.heading5}
                onChange={(e) => setHeading5(e.target.value)}
              ></input>
            </div>
            <div>
              <textarea
                className="terms-textarea"
                maxLength="1200"
                rows={6}
                cols="33"
                placeholder="Description"
                defaultValue={termsData?.description5}
                onChange={(e) => setDescription5(e.target.value)}
              ></textarea>
            </div>

            <div className="about-updateBtn " id="update-padding">
              <button disabled={loading} type="submit" className="btn upgrade-btn">
                {loading ? 'Loading...' : 'Update'}
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
