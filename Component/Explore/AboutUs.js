import axios from "axios";
import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AboutUs() {
  const [description1, setDescription1] = useState();
  const [description2, setDescription2] = useState();
  const [point1, setPoint1] = useState();
  const [point2, setPoint2] = useState();
  const [point3, setPoint3] = useState();
  const [founderName, setFounderName] = useState();
  const [aboutData, setAboutData] = useState();
  const [loading, setLoading] = useState(false);
  
  async function aboutFn(data) {
    try {
      const response = await axios.post('/api/explore/aboutus',{data:data})
      console.log(response, 'about')
      toast.success('Updated Successfully')
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error('Failed to update ! Please try again')
      console.log(error)
    }
  }

  async function submitHandlerFn(e) {
    e.preventDefault()
    setLoading(true)

    const data = {
      id:1,
      description1,
      description2,
      point1,
      point2,
      point3,
      founderName
    }
    console.log(data,'data')
    aboutFn(data)
  }

  async function getAboutFn() {
    try {
      const response = await axios.post("/api/explore/getAboutus");
      console.log(response, "about");
      setAboutData(response.data.data[0])
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAboutFn();
  },[])


  return (
    <div className="new-dashboard">
      <ToastContainer/>
      <section className="dear forself profile-sects" id="couple-profile-div">
        <div className="container">
          <SideBar />
          <form onSubmit={(e) => submitHandlerFn(e)}>
            <div className="dear-main">
              <div className="left-dear">
          <div className="couple-head-sec mb-4" >
                <h4>ABOUT US</h4>
            <h2>
               <span> ORTHODOX MATRIMONIAL </span>
            </h2>
          </div>
                <div className="left-dear-head">
                  <h4>Dear</h4>
                  <h2>Guest</h2>
                  <textarea
                    onChange={(e) => setDescription1(e.target.value)}
                    rows={5}
                    maxLength={500}
                    className="left-dear form-control"
                    defaultValue={aboutData?.description1}
                  ></textarea>
                </div>
              </div>
              <div className="right-dear">
                <div className="left-dear-head">
                  <h4>Know More About</h4>
                  <h2>Orthodox Matrimonial</h2>
                </div>
                <p>
                  <textarea
                    defaultValue={aboutData?.point1}
                    onChange={(e) => setPoint1(e.target.value)}
                  ></textarea>
                </p>
                <p>
                  <textarea
                    defaultValue={aboutData?.point2}
                    onChange={(e) => setPoint2(e.target.value)}
                  ></textarea>
                </p>
                <p>
                  <textarea
                    defaultValue={aboutData?.point3}
                    onChange={(e) => setPoint3(e.target.value)}
                  ></textarea>
                </p>
              </div>

              <section className="founder">
                <div className="container-fluid">
                  <div className="main-founder">
                    <div className="left-founder">
                      <div className="left-founder-head">
                        <h4>A message from</h4>
                        <h2>Founder</h2>
                      </div>

                      <p>
                        <textarea
                          onChange={(e) => setDescription2(e.target.value)}
                          className="founder-textarea"
                          rows={5}
                          defaultValue={aboutData?.description2}
                        >
                        </textarea>
                      </p>

                      <div className="name-founder">
                        <input
                          type="text"
                          onChange={(e) => setFounderName(e.target.value)}
                          className="founder-input"
                          placeholder="Founder Name"
                          defaultValue={aboutData?.founderName}
                        ></input>
                      </div>

                      <div className="about-updateBtn">
                        <button
                          disabled={loading}
                          type="submit"
                          className="btn upgrade-btn"
                        >
                          {loading ? "Loading..." : "Update"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
