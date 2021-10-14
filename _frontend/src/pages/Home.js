import React from "react";
import "./Home.css";

import NavBar from "../components/Nav/NavBar";
import CardPhoto from "../components/_Utils/CardPhoto";
import Footer from "../components/Footer/Footer";

const links = [
  { url: "/login", link: "Log in" },
  { url: "/register", link: "Sign up" },
];

const photoHome = [
  {
    url_img: `https://picsum.photos/id/201/150/200`,
    name: "IT",
  },
  {
    url_img: `https://picsum.photos/id/250/150/200`,
    name: "Creative & Design",
  },
  {
    url_img: `https://picsum.photos/id/20/150/200`,
    name: "Marketing",
  },
];

// HOME PAGE
const Home = () => {
  return (
    <div className="home">
      <div className="wrapper-home-nav">
        <NavBar links={links} />
      </div>

      <div className="home-cardPhoto">
        {photoHome.map((photo, index) => {
          return (
            <CardPhoto
              key={index}
              img={photo.url_img}
              imgName={photo.name}
              alt={photo.name.toString()}
            />
          );
        })}
      </div>

      <Footer />
    </div>
  );
};
export default Home;
