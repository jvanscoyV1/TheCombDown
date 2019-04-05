import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Logo from './logo'
// import Img from 'gatsby-image'
import './header.css'

const Header = ({ logo, hero, colors }) => {
  // var col = colors.slice().reverse();
  var linkstyle = {
    fontSize: '1.5rem',
    color: colors[0],
    textShadow: '1px 1px 0px ' + colors[4],// + colors[0],
  }
  // var linkshadow = {
  //   fontSize: '1.5rem',
  //   textShadow: '-1px -1px 6px ' + colors[2],
  // }
  var headerClass;
  if(1 > 100)
    headerClass = "header smush"
  else 
    headerClass = "header";
  
  return (
  <div className={headerClass}>
      {/* <div id="hero">
        <Img className="hero_container" fluid={hero.childImageSharp.fluid}/>
      </div> */}
        <Link to="/">
          <div className="logo">
            <Logo img={logo}></Logo>
          </div>
        </Link>
      {/* <ul className="page-links shadow">
        <li>
          <div className="link first" style={linkshadow}>
            Shows
          </div>
        </li>
        <li>
          <div className="link" style={linkshadow}>
            Gallery
          </div>
        </li>
        <li>
          <div className="link" style={linkshadow}>
            About Us
          </div>
        </li>
        <li>
          <div className="link final" style={linkshadow}>
            Get At Us
          </div>
        </li>
      </ul> */}
      <ul className="page-links">
        <li>
          <Link to="#shows">
            <div className="link first" style={linkstyle}>
              Shows
            </div>
          </Link>
        </li>
        <li>
          <Link to="#gallery">
            <div className="link" style={linkstyle}>
              Gallery
            </div>
          </Link>
        </li>
        <li>
          <Link to="#about">
            <div className="link" style={linkstyle}>
              About Us
            </div>
          </Link>
        </li>
        <li>
          <Link to="#contact">
            <div className="link final" style={linkstyle}>
              Get At Us
            </div>
          </Link>
        </li>
      </ul>
  </div>
)}
Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `The Comb Down`,
}

export default Header
