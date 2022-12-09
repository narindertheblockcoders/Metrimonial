import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import {signIn} from "next-auth/react";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [verify, setVerify] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

 

  async function formSubmitHandler(event) {
    event.preventDefault();
    try{

    var regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (!email || !password) {
      toast.error("Please Provide all the credentials");
      setErrorPassword(false);
      setErrorEmail(false);
      setIsLoading(false);
      setVerify(false);
      setPasswordError(false);
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password
    })
    console.log (res, 'response from credentials')

    if(res?.error) {
      console.log(res.error)
      toast.error("User Doesn't Exist")
    }
    if(!res.error) {
      router.push ('/dashboard')
    }
  }catch(err){
    toast.error("Invalid Password")
  }

     if (!regularExpression.test(password)) {
      setIsLoading(false);
      setErrorPassword(false);
      setErrorEmail(false);
      setVerify(false);
      setPasswordError(true);
      return;
    }
  }

  return (
    <div style={{fontFamily:"Bookman old Style !important"}}>
      <section className="profile-sec ">
        <div className="container">
          <div className="row justify-content-center">
            <ToastContainer />
            <form
              className="input-sec input-top p-0"
              id="bar-top"
              onSubmit={formSubmitHandler}
            >
              <div className="input-line iptset-line" id="index-line"></div>
              <div className="p-3">
                <div className="login-top-img">
                  <h3 className="heading-text mt-3"> Please Login</h3>
                </div>
                <div className="input-item mt-0" id="input-mt">
                  <h6 className="item-text">EMAIL</h6>
                  <input
                    className="textinput"
                    type="email"
                    name="username"
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="on"
                  />
                </div>

                <div
                  className="input-item"
                  style={{ marginTop: "25px", marginBottom: "10px" }}
                >
                  <h6 className="item-text">PASSWORD</h6>
                  <input
                    className="textinput"
                    type="password"
                    name="last-name"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="on"
                  />
                </div>

                  <div
                    style={{
                      color: "black",
                      marginBottom: "35px",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Your password must be at least 8 characters long, should
                    contain at least one number and special character have a
                    mixture of uppercase and lowercase letters.
                  </div>
                

                <div className="forget-div">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      required
                    />
                    <label className="logged-lable" htmlFor="flexCheckDefault">
                      Default Checkbox
                    </label>
                  </div>

                  {/* <p className="forget-text">Forget password?</p> */}
                </div>

                {errorEmail && (
                  <p style={{ color: "red", margin: "0", fontSize: "15px" }}>
                    {" "}
                    User doesn't Exist. Please try again!
                  </p>
                )}
                {errorPassword && (
                  <p style={{ color: "red", margin: "0", fontSize: "15px" }}>
                    {" "}
                    Invalid Password
                  </p>
                )}
                {verify && (
                  <p style={{ color: "green", margin: "0", fontSize: "15px" }}>
                    {" "}
                    User LoggedIn Successfully.{" "}
                  </p>
                )}
                {passwordError && (
                  <p style={{ color: "red", margin: "0", fontSize: "15px" }}>
                    {" "}
                    Your password must be at least 8 characters long, should
                    contain at least one number and special character have a
                    mixture of uppercase and lowercase letters.{" "}
                  </p>
                )}

                <Button
                  variant="primary"
                  className="btn btn-round btn-warning w-100 p-0 "
                  style={{ marginTop: "15px" }}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading…" : "   LOGIN"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
