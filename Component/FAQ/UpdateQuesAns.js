import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const UpdateQuesAns = (props) => {
  // console.log(props, "to check whether props are working or not");
  const [answerDetail, setAnswerDetail] = useState();
  const [questionDetail, setQuestionDetail] = useState();
  const [data, setData] = useState()
  const [added, setAdded] = useState(0)

  const router = useRouter()
  async function getUpdateQuesAns() {
    try {
      let res = await axios.post("/api/faq/getQuesById", {
        id: props.props.id,
      });
      const response = res.data;
      console.log( response.data.data, "to get response from api to get ques ans");
      setData (response.data.data)
      // setAnswerDetail(response.data.data[0]);
      // setQuestionDetail(response.data.data[0]);
    } catch (err) {
      console.log(err);
    }
  }
  console.log(questionDetail, "question detail data here for you");

  useEffect(() => {
    getUpdateQuesAns();
  }, [added]);

  async function updateQuesAns (data) {
    try{
      let res = await axios.post("/api/faq/updateQuesAns",data)
      const response = res.data;
      console.log(response,"to get response from api")
      toast.success("Details updated Successfully")
      router.push("/faqQuesAns/" + props.props.id)
      setAdded(added+1)
    }catch(err){
      console.log(err)
      toast.error("Failed to update details")
    }
  }

  async function formSubmitHandler(event) {
    event.preventDefault();
    console.log(props.props.id,"to get the id of the question")

    const data ={
      id:props.props.id,
      question:questionDetail,
      answer:answerDetail,
    }
    console.log(data,"data entered to update question and answer")
    updateQuesAns(data)
  }

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
          {data?.map((item,id)=>{
            return(
          <div className="question-main">
            <div className="questionaccordian">
              <div>
                <>
                  <div>
                    <input
                      type="text"
                      className="ques-inputset"
                      defaultValue={item?.question}
                      onChange={(e) => setQuestionDetail(e.target.value)}
                    />

                    <div className="accordion-collapse ">
                      <textarea
                        className="w-100 ques-textarea"
                        rows={8}
                        cols={8}
                        type="text"
                        maxLength="500"
                        defaultValue={item?.answer}
                        onChange={(e) => setAnswerDetail(e.target.value)}
                      ></textarea>
                    </div>
                    <div
                      style={{
                        float: "right",
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <button className="button sub-admin-btn" type="button" onClick={formSubmitHandler}>
                        Update{" "}
                      </button>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
            )
          })}
        </div>
      </section>
    </div>
  );
};

export default UpdateQuesAns;
