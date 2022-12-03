import React, { useState, useEffect } from "react";
import { Collapse } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);
  const { data: session } = useSession();
  const [tokenData, setTokenData]= useState()

  // async function getUserData() {
  //   let data = await axios.post("api/userProfile");
  //   // setName(data.data.data);
  // }
  const router = useRouter();
  const refCode = router.query;

  async function getUserStatus() {
    try {
      // const token = localStorage.getItem("token");
      let res = await axios.post("/api/getuserid");
      const response = res.data;
      setTokenData(response.data.data)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    if(session) {
      getUserStatus();
    }
  },[])



  // useEffect(() => {
  //   if (session) {
  //     getUserData();
  //   }
  // }, []);

  function logoutHandler() {
    signOut('/login');
    router.push('/login')
    window.localStorage.clear()
  }

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg top-nav ">
          <div className="container-fluid" id="fluid-set">
          {session ? (
            <a className="navbar-brand" href="/" id="href-setts" >
              Welcome {tokenData?.firstName}
              {/* <img id="logo-id" style={{ marginLeft: "-10px" }} src="/navbar/stier.png"/> */}
            </a>):null}
              <img style={{ marginLeft: "-10px" }}  />
            {/* <button
              // onClick={() => setOpen(!open)}
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded={open}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button> */}
            {/* <Collapse> */}
              <div
                // className="collapse "
                // id="navbarSupportedContent"
                // style={{ justifyContent: "flex-end", position:"absolute", right:"3%", marginRight:"0px !important", margin:"0" }}
              >
                <ul
                  className="navbar-nav mb-2 mb-lg-0"
                  style={{ marginLeft: "auto !important" }}
             >
            
            {session ? (
                    <li className="nav-item" id="bg-navbar">
                      <a
                        className="nav-link active total-account"
                        aria-current="page"
                        href="#"
                       
                      >
                      <i style={{fontSize:"18px"}} className="fa-regular fa-bell" id="i-nav"></i>
                      </a>
                    </li>
                  ) : null}
                        
            {session ? (
                    <li className="nav-item" id="bg-navbar">
                      <a
                        className="nav-link active total-account"
                        aria-current="page"
                        href="#"
                       
                      >
                  <i style={{fontSize:"18px"}} className="fa-regular fa-circle-question" id="i-nav"></i>
                      </a>
                    </li>
                  ) : null}

            {session ? (
                    <li className="nav-item p-0" id="bg-navbar">
                        <a onClick={logoutHandler}
                          className="nav-link active total-account "
                          // style={{ marginBottom: "-10px", padding:"0" }}
                          type="submit"
                        >
                       <img src="/navbar/logout.png"/>
                        </a>
                    </li>
                  ) : null}

                  {/* {!session ? (
                    <li className="nav-item">
                      <Link href={"/"}>
                        <button
                          className="btn btn-outline-success border-btn"
                          type="submit"
                        >
                          LOGIN / SIGNUP
                        </button>
                      </Link>
                    </li>
                  ) : null} */}

                </ul>
              </div>
            {/* </Collapse> */}

            {/* {session ? (
                    <li className="nav-item">
                      <Link href={"/"}>
                        <button
                          onClick={logoutHandler}
                          className="btn btn-outline-success border-btn"
                          style={{ marginRight: "10px" }}
                          type="submit"
                        >
                          Logout
                        </button>
                      </Link>
                    </li>
                  ) : null} */}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
