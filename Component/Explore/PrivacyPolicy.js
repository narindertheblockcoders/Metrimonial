import axios from "axios";
import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PrivacyPolicy() {
  const [heading1, setHeading1] = useState();
  const [heading2, setHeading2] = useState();
  const [heading3, setHeading3] = useState();
  const [heading4, setHeading4] = useState();
  const [heading5, setHeading5] = useState();
  const [description1, setDescription1] = useState();
  const [description2, setDescription2] = useState();
  const [description3, setDescription3] = useState();
  const [description4, setDescription4] = useState();
  const [point1, setPoint1] = useState();
  const [point2, setPoint2] = useState();
  const [point3, setPoint3] = useState();
  const [point4, setPoint4] = useState();
  const [point5, setPoint5] = useState();
  const [point6, setPoint6] = useState();
  const [point7, setPoint7] = useState();
  const [point8, setPoint8] = useState();

  const [policyData, setPolicyData] = useState();
  const [loading, setLoading] = useState(false);

  async function policyFn(data) {
    try {
      const res = await axios.post("/api/explore/policy", {
        data: data,
      });
      const response = res.data.data.data

      console.log(response, "pikdj");
      setPolicyData(response.data.data[0])
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
      heading1,
      heading2,
      heading3,
      heading4,
      heading5,
      description1,
      description2,
      description3,
      description4,
      point1,
      point2,
      point3,
      point4,
      point5,
      point6,
      point7,
      point8
    };
    console.log(data, "data");
    policyFn(data);
  }

  async function getPolicyFn() {
    try {
      const response = await axios.post("/api/explore/getPolicy");
      console.log(response, "about");
      setAboutData(response.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPolicyFn();
  }, []);

  return (
    <div className="new-dashboard">
      <SideBar />
      <section
        className="privacy-policy forself profile-sects"
        id="couple-profile-div">
              <div className="couple-head-sec mb-4">
            <h4>PRIVACY POLICY</h4>
            <h2>
               <span> ORTHODOX MATRIMONIAL </span>
            </h2>
          </div>
        <form onSubmit={(e) => submitHandlerFn(e)}>
          <div className="container">
            <div className="terms-section">
              <input
                onChange={(e) => setHeading1(e.target.value)}
                placeholder="Privacy Policy"
              ></input>
            </div>

            <textarea
              onChange={(e) => setDescription1(e.target.value)}
              className="terms-textarea"
              maxLength={1200}
              placeholder="Description"
              rows={6}
            ></textarea>

            <div className="term-section mb-3">
              <input
                placeholder="Lorem ipsum dolor sit amet"
                type="text"
                onChange={(e) => setHeading2(e.target.value)}
              ></input>
            </div>

            <ul>
              <li>
                <input
                className="li-input"
                  type="text"
                  placeholder="Type Description"
                  onChange={(e) => setPoint1(e.target.value)}
                ></input>{" "}
              </li>
              <li>
                <input
                className="li-input"
                  onChange={(e) => setPoint2(e.target.value)}
                  type="text"
                  placeholder="Type Description"
                ></input>{" "}
              </li>

              <li>
                <input
                className="li-input"
                  type="text"
                  onChange={(e) => setPoint3(e.target.value)}
                  placeholder="Type Description"
                ></input>{" "}
              </li>

              <li>
                <input
                className="li-input"
                  onChange={(e) => setPoint4(e.target.value)}
                  type="text"
                  placeholder="Type Description"
                ></input>{" "}
              </li>
              <li>
                <input
                  type="text"
                  className="li-input"
                  onChange={(e) => setPoint5(e.target.value)}
                  placeholder="Type Description"
                ></input>{" "}
              </li>
              <li>
                <input
                  type="text"
                  className="li-input"
                  onChange={(e) => setPoint6(e.target.value)}
                  placeholder="Type Description"
                ></input>{" "}
              </li>

              <li>
                <input
                className="li-input"
                  onChange={(e) => setPoint7(e.target.value)}
                  type="text"
                  placeholder="Type Description"
                ></input>{" "}
              </li>
              <li>
                <input
                className="li-input"
                  onChange={(e) => setPoint8(e.target.value)}
                  type="text"
                  placeholder="Type Description"
                ></input>{" "}
              </li>
            </ul>

            <div className="term-section">
              <input
               className="li-input"
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
                cols="33"
                placeholder="Description"
                onChange={(e) => setDescription2(e.target.value)}
              ></textarea>
            </div>

            <div className="term-section">
              <input
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
                onChange={(e) => setDescription3(e.target.value)}
                cols="33"
                placeholder="Description"
              ></textarea>
            </div>

            <div className="term-section">
              <input
                placeholder="Accusantium laboriosam nostrum"
                type="text"
                onChange={(e) => setHeading5(e.target.value)}
              ></input>
            </div>
            <div>
              <textarea
                className="terms-textarea"
                maxLength="1200"
                rows={6}
                onChange={(e) => setDescription4(e.target.value)}
                cols="33"
                placeholder="Description"
              >
              </textarea>
            </div>

            <div className="about-updateBtn" id="update-padding">
              <button type="submit" className="btn upgrade-btn">
                Update
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
