import React from "react";
import "./footer.css";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { BsLinkedin, BsGithub, BsBriefcaseFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md'

function Footer() {
  const { isLogin } = useContext(AuthContext);

  return (
    <div className="footer-container">
      <div className="col3">
          <div className="list-footernav">
            {/* <span>Contacta: </span> */}
          <a className="link-footer" href='https://www.linkedin.com/in/javier-lopez-diaz/' target="blank">
            <BsLinkedin />
            </a>
            <a className="link-footer" href="https://github.com/JaviPitino" target="blank">
             <BsGithub />
            </a>
            <a className="link-footer" href='https://javilopez.netlify.app' target="blank">
              <BsBriefcaseFill />
            </a>
            <a className="link-footer" href='mailto:javierpitino@gmail.com'>
              <MdEmail />
            </a>
          </div>
      </div>
      <div className="col">
        <div className="list-footernav">
            &copy; Created & designed by<strong>&nbsp;Javier López</strong>
        </div>
      </div>
    </div>
  );
}

export default Footer;
