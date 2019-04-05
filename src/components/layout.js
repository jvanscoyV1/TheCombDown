import React from 'react'
import PropTypes from 'prop-types'
import './layout.css'

var i = 0;
const Layout = ({bg_class, colors, children }) => {
  var col = colors;
  if(colors) {
    return (
      <div id="main"
        className = {bg_class}
        style={{
          backgroundImage: ` radial-gradient( 
            circle farthest-corner at 50% -20%,
            ` + col[i+3] + ` 5%, 
            ` + col[i+2] + ` 25%, 
            ` + col[i+1] + ` 65%,
            ` + col[i+3] + ` 115% )`,
          transition: 'all 1s ease-in-out',
        }}
        >
        {children}
      </div>
    )
  } else {
    return (
      <div id="main">
        {children}
      </div>
    )
  }
  
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  colors: PropTypes.array.isRequired,
}



export default Layout
