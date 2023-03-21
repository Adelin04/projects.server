import React, { useContext, useState } from "react";
import "./Auth.css";

import {  URL_PRODUCTION } from "../_Utils/Dependency";
import NavBar from "../Nav/NavBar";
import Button from "../_Utils/Button";
import Footer from "../Footer/Footer";
import { Redirect } from "react-router-dom";
import {
  FETCH_PROJECTS,
  SET_AUTH,
  SET_CAPITALIZE_USER_PROFILE,
  SET_USERLOGGED_INFO
} from "../Reducer/Action";
import { UserContext } from "../Context/UserContext";
import { ProjectsContext } from "../Context/ProjectsContext";

const links = [
  { url: "/", link: "Home" },
  { url: "/register", link: "Sign up" }
];

const Login = () => {
  const { userLogged, dispatch_user } = useContext(UserContext);
  const { projects, dispatch_projects } = useContext(ProjectsContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [btnMsg, setBtnMsg] = useState("LogIn");
  // const [token, setToken] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    let body = { email: email, password: password };
    setBtnMsg("Loading...");
    setMsg(null);

    fetch(`${URL_PRODUCTION}/auth/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => {
        const {
          succes,
          token,
          userProfile,
          capitalizeUser,
          projectsList
        } = data;
        if (succes) {
          dispatch_user({ type: SET_AUTH, payload: data.succes });
          dispatch_user({ type: SET_USERLOGGED_INFO, payload: userProfile });
          dispatch_user({
            type: SET_CAPITALIZE_USER_PROFILE,
            payload: capitalizeUser
          });
          dispatch_projects({
            type: FETCH_PROJECTS,
            payload: projectsList.filter(
              project => project.isFinished !== true
            ),
            isLoading_Projects: false
          });
          localStorage.setItem("token", token);
        } else {
          setMsg("User or Password is incorect");
          setBtnMsg("LogIn");
        }
      })
      .catch(error => {
        const newError = error.toString().split(":")[1];
        setMsg(newError);
        setBtnMsg("LogIn");
        setEmail("");
        setPassword("");
      });
  };

  const dynamicStyle = {
    margin: "0px auto 10px ",
    width: "auto",
    textAlign: "center",
    fontWeight: "bolder",
    fontSize: "20px",
    color: "salmon"
  };
  const dynamicStyleSpiner = {
    margin: "200px auto 10px ",
    width: "auto",
    textAlign: "center",
    fontWeight: "bolder",
    fontSize: "35px",
    color: "salmon"
  };

  if (userLogged.isAuth) {
    return <Redirect to={"/dashboard"} />;
  } else if (
    userLogged.userLoggedInfo === null ||
    userLogged.userLoggedInfo === undefined
  ) {
    localStorage.removeItem("token");
    return <Redirect to={"/login"} />;
  } else
    return (
      <div className="login">
        <NavBar links={links} />

        <div className="form">
          {msg &&
            <div style={dynamicStyle}>
              {msg}
            </div>}
          <form className="form-content" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              className="input-dataUser"
              onChange={e => setEmail(e.target.value)}
              value={email}
              autoFocus={true}
              required
              type="email"
              id="email"
            />

            <label htmlFor="password">Password</label>
            <input
              className="input-dataUser"
              onChange={e => setPassword(e.target.value)}
              value={password}
              required
              type="password"
              id="password"
            />

            <Button textBtn={btnMsg} />
          </form>
        </div>

        <div className="footer">
          <Footer />
        </div>
      </div>
    );
};

export default Login;

/*   const fetchUserInfo = async () => {
    await fetch(`${URL_HEROKU}/user-profile`)
      .then((response) => response.json())
      .then((data) => {
        setIsAuth(data.succes);
        console.log("useEffect Login -> ", data);
      })
      .catch((err) => console.log(err));
  }; */

/*   React.useEffect(() => {
    const abortController = new AbortController();
    return () => {
      console.log("I am in cleanup function");
      abortController.abort();
    };
  }, []); */

/*   React.useEffect(() => {
    const abortController = new AbortController();
    return async () => {
      await fetch(`${URL_HEROKU}/login`)
        .then((response) => response.json())
        .then((data) => {
          setIsAuth(data.succes);
          console.log("useEffect Login -> ", data);
        })
        .catch((err) => console.log(err));
      console.log("I am in cleanup function");
      abortController.abort();
    };
  }, []); */

/* class Login extends React.Component {
  constructor(props) {
    super();
    this.handleChange = this.handleChange.bind();
    this.handleSubmit = this.handleSubmit.bind();
    this.state = {
      email: "",
      password: "",
      msg: "",
      btnMsg: "LogIn",
      token: "",
      isAuth: false
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit =async e => {
    e.preventDefault();
    let self = this;
    let body = { email: self.state.email, password: self.state.password };
    this.setState({ btnMsg: "Loading...", msg: null });

    await fetch(`${URL_HEROKU}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => {
        console.log("data", data);
        const [succes, token] = data;
        console.log(data);
        if (succes.succes === true) {
          this.setState({ isAuth: true, token: token });
          localStorage.setItem("token", token.token);
        } else
          this.setState({
            msg: "User or Password is incorect",
            btnMsg: "LogIn"
          });
      })
      .catch(err => this.setState({ msg: err }));
  };

  render() {
    const dynamicStyle = {
      margin: "0px auto 10px ",
      width: "auto",
      textAlign: "center",
      fontWeight: "bolder",
      fontSize: "20px",
      color: "salmon"
    };
    const dynamicStyleSpiner = {
      margin: "200px auto 10px ",
      width: "auto",
      textAlign: "center",
      fontWeight: "bolder",
      fontSize: "35px",
      color: "salmon"
    };
    let dynamicMsg = this.state.msg;
    let { isAuth } = this.state;

    if (isAuth || localStorage.getItem("token") !== null)
      return <Redirect to={"/dashboard"} />;
    else
      return (
        <div className="login">
          <NavBar links={links} />

          <div className="form">
            {dynamicMsg &&
              <div style={dynamicStyle}>
                {dynamicMsg}
              </div>}
            <form className="form-content" onSubmit={this.handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                className="input-dataUser"
                onChange={this.handleChange}
                value={this.state.email}
                autoFocus={true}
                required
                type="email"
                id="email"
              />

              <label htmlFor="password">Password</label>
              <input
                className="input-dataUser"
                onChange={this.handleChange}
                value={this.state.password}
                required
                type="password"
                id="password"
              />

              <Button textBtn={this.state.btnMsg} />
            </form>
          </div>

          <div className="footer">
            <Footer />
          </div>
        </div>
      );
  }
}

export default Login; */
