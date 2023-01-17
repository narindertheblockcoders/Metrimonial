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
        <nav className="navbar navbar-expand-lg top-nav pt-0">
          <div className="container-fluid" id="fluid-set">
          {session ? (
          <div  className="left-dashboard  first-set  mb-4" id="leftt-section">
                {" "}
                <h5>Welcome -  {" "} Admin1 </h5>
              </div>):null}
          {/* {session ? (
            <a className="navbar-brand" href="/" id="href-setts" >
              Welcome {tokenData?.firstName}
            </a>):null} */}
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
        
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
