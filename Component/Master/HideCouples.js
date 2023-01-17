import axios from "axios";
import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import Router from "next/router";
import ReactPaginate from "react-paginate";

const HideCouplesList = (props) => {
  const [hideCouple, setHideCouple] = useState();
  const [unHideButton, setUnHideButton] = useState()
  const [userId,setUserId] =useState()
  const [userAdded, setUserAdded] = useState(0)
  const [searchData, setSeachData] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);


  async function getHideCoupleFunction() {
    const res = await axios.post("/api/hideUnhide/getHideCouples");
    const response = res.data;
    console.log(response.data, "to get response form api to get happy couple data");
    setHideCouple(response.data);
  }

  useEffect(() => {
    getHideCoupleFunction();
  }, [userAdded]);

  async function getUnHideCouples(data) {
    try {
      let res = await axios.post("/api/hideUnhide/hideUsers",data);
      const response = res.data.data;
      console.log(response, "to get response from api to apporve from status");
      // Router.push("/master/hideCouples")
      setUserAdded(userAdded+1);
     setUnHideButton(response.isHide)

    } catch (err) {
      console.log(err); 
    }
  }

  async function unHideFunction(e) {
    e.preventDefault();
    console.log(e.target.value, "id getting ")
    const id = e.target.value;
    setUserId(e.target.value)
    console.log(userId)
    const data = {
      id: id,
      status: "1",
      hideAdmin:"0"
    };
    console.log(data, "hide couple data");
    getUnHideCouples(data);
  }
   
  async function searchFunction(e){
    console.log(e.target.value)
    const search = e.target.value;
    const filteredData = hideCouple?.filter((item)=>{
      const name = item?.name;
      const email = item?.email;
      const country = item?.country;
      return(
        name?.toLowerCase().includes(search.toLowerCase()) ||
        email?.toLowerCase().includes(search.toLowerCase()) ||
        country?.toLowerCase().includes(search.toLowerCase())
      );
    });

    console.log(filteredData, "to get hide data by search")
    setSeachData(filteredData)
  }




  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = hideCouple?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };





  return (
    <>
      <div className="new-dashboard">
        <SideBar />

        <section className="forself profile-sects  " id="couple-profile-div">
          <div className="container " id="user-detail-container" >
          
          <div className="hide-couple-mb">
          <div className="search-bar-sec mb-4 mt-3" id="search-bar-sec">
                  <div className="input-group mb-1" id="search-bar-set">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="bi bi-search"></i>
                    </span>

                    <input
                      type="text"
                      className="form-control w-25"
                      placeholder="Search Country"
                      onChange={(e) => searchFunction(e)}
                    />
                  </div>
                </div>
              {searchData == null?
               currentPosts?.map((item,id)=> {
                return(
              <div className="self-main mb-5 mt-0 ">
              <div className="self-main-head">
                <h3>Profile </h3>
              </div>
              
              <div className="left-main-box" id="left-main-box">
                <div className="box-img">
                  <img
                    className="user-image"
                    src={item?.avatar || "/img/box-img.png"}
                    alt=""
                  />
                </div>
                <div className="box-text">
                  <div className="box-text-one">
                    <h2>{item?.name}</h2>
                    <div className="flex-box-one">
                      <ul>
                        <li>Age</li>
                        <li>
                          <b>{item?.age}</b>{" "}
                        </li>
                      </ul>
                    </div>

                    <div className="flex-box-one">
                      <ul>
                        <li>Gender</li>
                        <li>
                          <b>{item?.gender}</b>{" "}
                        </li>
                      </ul>
                    </div>
                    <div className="flex-box-one">
                      <ul>
                        <li>Profession</li>
                        <li>
                          <b>{item?.profession}</b>{" "}
                        </li>
                      </ul>
                    </div>
                    <div className="flex-box-one">
                      <ul>
                        <li> City,State, Country</li>
                        <li>
                          <b>{item?.city} {","} {item?.state} {","} {item?.country}</b>{","}
                        </li>
                      </ul>
                    </div>
                    <div className="flex-box-one">
                      <ul>
                        <li>Degree</li>

                        <li>
                          <b>{item?.degree}</b>{" "}
                        </li>
                      </ul>
                    </div>

                    <div className="flex-box-one">
                      <ul>
                        <li>Work</li>

                        <li>
                          <b>{item?.work}</b>{" "}
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
                              {item?.phone}
                              </span>
                          </div>
                        </li>
                      </ul>
                      <ul className="two-inner2-ul">
                        <li>Email</li>
                        <li>
                          <div className="input-group mb-3">
                            <span className="form-control">
                              {item?.email}
                              </span>
                          </div>
                        </li>
                      </ul>

                    <button
                    className="like-btn2"
                    value={item.id}
                    onClick={(e)=>{unHideFunction(e)}}
                    type="button"
                  >
                    Unhide
                  </button>
                  <ul className="two-inner2-ul">
                        <li>Status</li>
                        <li>
                          <div className="input-group mb-3">
                            <span className="form-control" style={{fontSize:"16px"}}>

                              {item?.hideAdmin ==1? ("Hide by admin"):("Hide by user")  }
                              </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    {/* <button href="" className="like-btn2">
                      Unhide{" "}
                    </button> */}

                    
                             
                        
                  </div>

                  <div className="boxthree">
                    {/* <p>I am looking for a suitalbe partner. I have completed my gratuation in From USA
                                univercity</p> */}
                    <p>hello</p>
                  </div>
                </div>
              </div>

              <div className="self-about">
                <div className="self-about-main">
                  <div className="self-about-left">
                    <ul>
                      <li>Mother Tongue</li>
                      <li>
                        <b>{item?.motherTongue}</b>
                      </li>
                    </ul>

                    <ul>
                      <li> Marital Status</li>
                      <li>
                        <b>{item?.maritalStatus}</b>
                      </li>
                    </ul>

                    <ul>
                      <li> Height</li>
                      <li>
                        <b>{item?.height}</b>
                      </li>
                    </ul>

                    <ul>
                      <li> Weight</li>
                      <li>
                        <b>{item?.weight}</b>
                      </li>
                    </ul>
                  </div>
                  
                </div>

               
              </div>
              </div>
          
                )
            }): searchData?.map((item,id)=>{
              return(
              <div className="self-main mb-5 mt-0 ">
              <div className="self-main-head">
                <h3>Profile </h3>
              </div>
              
              <div className="left-main-box" id="left-main-box">
                <div className="box-img">
                  <img
                    className="user-image"
                    src={item?.avatar || "/img/box-img.png"}
                    alt=""
                  />
                </div>
                <div className="box-text">
                  <div className="box-text-one">
                    <h2>{item?.name}</h2>
                    <div className="flex-box-one">
                      <ul>
                        <li>Age</li>
                        <li>
                          <b>{item?.age}</b>{" "}
                        </li>
                      </ul>
                    </div>

                    <div className="flex-box-one">
                      <ul>
                        <li>Gender</li>
                        <li>
                          <b>{item?.gender}</b>{" "}
                        </li>
                      </ul>
                    </div>
                    <div className="flex-box-one">
                      <ul>
                        <li>Profession</li>
                        <li>
                          <b>{item?.profession}</b>{" "}
                        </li>
                      </ul>
                    </div>
                    <div className="flex-box-one">
                      <ul>
                        <li> City,State, Country</li>
                        <li>
                          <b>{item?.city} {","} {item?.state} {","} {item?.country}</b>{","}
                        </li>
                      </ul>
                    </div>
                    <div className="flex-box-one">
                      <ul>
                        <li>Degree</li>

                        <li>
                          <b>{item?.degree}</b>{" "}
                        </li>
                      </ul>
                    </div>

                    <div className="flex-box-one">
                      <ul>
                        <li>Work</li>

                        <li>
                          <b>{item?.work}</b>{" "}
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
                              {item?.phone}
                              </span>
                          </div>
                        </li>
                      </ul>
                      <ul className="two-inner2-ul">
                        <li>Email</li>
                        <li>
                          <div className="input-group mb-3">
                            <span className="form-control">
                              {item?.email}
                              </span>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* <button href="" className="like-btn2">
                      Unhide{" "}
                    </button> */}

                    
                             
                          <button
                          className="like-btn2"
                          value={item.id}
                          onClick={(e)=>{unHideFunction(e)}}
                          type="button"
                        >
                          Unhide
                        </button>
                        
                  </div>

                  <div className="boxthree">
                    {/* <p>I am looking for a suitalbe partner. I have completed my gratuation in From USA
                                univercity</p> */}
                    <p>hello</p>
                  </div>
                </div>
              </div>

              <div className="self-about">
                <div className="self-about-main">
                  <div className="self-about-left">
                    <ul>
                      <li>Mother Tongue</li>
                      <li>
                        <b>{item?.motherTongue}</b>
                      </li>
                    </ul>

                    <ul>
                      <li> Marital Status</li>
                      <li>
                        <b>{item?.maritalStatus}</b>
                      </li>
                    </ul>

                    <ul>
                      <li> Height</li>
                      <li>
                        <b>{item?.height}</b>
                      </li>
                    </ul>

                    <ul>
                      <li> Weight</li>
                      <li>
                        <b>{item?.weight}</b>
                      </li>
                    </ul>
                  </div>
                  
                </div>

               
              </div>
              </div>
            );

            })
          }
  <div className="paginate-sec " id="paginate-sec" >
                       <ReactPaginate
                  previousLabel="← Previous"
                  nextLabel="Next →"
                  onPageChange={paginate}
                  pageCount={Math.ceil(hideCouple?.length / postsPerPage)}
                  containerClassName="pagination"
                  previousLinkClassName="pagination__link"
                  nextLinkClassName="pagination__link"
                  disabledClassName="pagination__link--disabled"
                  activeClassName="pagination__link--active"
                  className="page-link"
                />
                </div>
  </div>



          </div>
        </section>
      </div>
    </>
  );
};

export default HideCouplesList;
