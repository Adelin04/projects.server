import React from "react";
import "./Auth.css";

import NavBar from "../Nav/NavBar";
import Button from "../_Utils/Button";
import Footer from "../Footer/Footer";
import { URL_HEROKU } from "../_Utils/Dependency";

const links = [
  { url: "/", link: "Home" },
  { url: "/login", link: "Log in" },
];

class Register extends React.Component {
  constructor(props) {
    super();
    this.handleChange = this.handleChange.bind();
    this.handleSubmit = this.handleSubmit.bind();
    this.state = {
      lastName: "",
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
      msg: "",
      btnMsg: "Sign up",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let self = this;

    // const dataUser = new FormData();
    // dataUser.append("firstName", this.state.firstName);
    // dataUser.append("lastName", this.state.lastName);
    // dataUser.append("email", this.state.email);
    // dataUser.append("password", this.state.password);
    // dataUser.append("confirmPassword", this.state.confirmPassword);
    const dataUser = {
      firstName: self.state.firstName.trim(),
      lastName: self.state.lastName.trim(),
      email: self.state.email.trim(),
      password: self.state.password.trim(),
    };

    self.setState({ btnMsg: "Loading...", msg: null });

    try {
      if (self.state.password === self.state.confirmPassword) {
        fetch(`${URL_HEROKU}/auth/register`, {
          headers: { "Content-Type": " application/json" },
          method: "POST",
          body: JSON.stringify(dataUser),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            const { succes } = data;
            if (data.succes === true) self.setState({ btnMsg: "Sing up" });
          })
          .catch((err) => {
            console.log(err);
            self.setState({ msg: err.toString() });
          });
      } else
        self.setState({ msg: "The password is diferent to confirm password" });
    } catch (err) {
      console.error(err.toString());
      self.setState({ msg: err.toString(), btnMsg: "Sing up" });
    } finally {
      self.setState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        btnMsg: "Sign up",
      });
    }
  };

  render() {
    const dynamicStyle = {
      margin: "0px auto 10px ",
      width: "auto",
      textAlign: "center",
      fontWeight: "bolder",
      fontSize: "20px",
      color: "salmon",
    };

    let dynamicMsg = this.state.msg;

    return (
      <div className="register">
        <NavBar links={links} />

        <div className="form">
          {dynamicMsg && <div style={dynamicStyle}>{dynamicMsg}</div>}
          <form className="form-content" onSubmit={this.handleSubmit}>
            <label htmlFor="lastName">Last Name</label>
            <input
              className="input-dataUser"
              onChange={this.handleChange}
              value={this.state.lastName}
              autoFocus={true}
              required
              type="text"
              id="lastName"
            />

            <label htmlFor="firstName">First Name</label>
            <input
              className="input-dataUser"
              onChange={this.handleChange}
              value={this.state.firstName}
              autoFocus={true}
              required
              type="text"
              id="firstName"
            />

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

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="input-dataUser"
              onChange={this.handleChange}
              value={this.state.confirmPassword}
              required
              type="password"
              id="confirmPassword"
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
export default Register;
