import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import axios from "axios";
import Link from "next/link";

const FaqQuesAns = (props) => {
  console.log(props, "to check whether props are working or not");
  const [ques, setQues] = useState();

  async function getQuesAns() {
    try {
      let res = await axios.post("/api/faq/getFaqQuesAns", {
        id: props.props.id,
      });
      const response = res.data;
      console.log(
        response.data.data,
        "to get response from api to get ques ans"
      );
      setQues(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getQuesAns();
  }, []);
  return (
    <div className="new-dashboard">
      <section className="question profile-sec profile-sects pt-4">
        <SideBar />
        <div className="container">
          <div className="question-head">
            <h2>
              {/* {props?.id == 1 ? null: props?.id}(All Questions) */}
              (All Questions)
            </h2>
          </div>
          <div className="question-main">
            <div className="questionaccordian">
              <div className="accordion" id="accordionExample">
                {ques?.map((item, idx) => {
                  return (
                    <>
                      <div key={idx} className="accordion-item">
                        <h2 className="accordion-header" id={`heading${idx}`}>
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${idx}`}
                            aria-expanded="true"
                            aria-controls={`collapse${idx}`}
                          >
                            {item.question}
                          </button>
                        </h2>
                        <div
                          id={`collapse${idx}`}
                          className="accordion-collapse collapse "
                          aria-labelledby={`heading${idx}`}
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <span>
                              <p>{item.answer}</p>
                            </span>
                          </div>
                          <div
                            style={{
                              float: "right",
                              width: "100%",
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Link href={"/updateQuesAns/" + item?.id}>
                            <button
                              className="button sub-admin-btn"
                              type="button"
                            >
                              Update{" "}
                            </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqQuesAns;
