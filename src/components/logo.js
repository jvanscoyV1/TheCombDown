import React from 'react'
import Img from 'gatsby-image'
const Image = (img) => { 
    return(<Img fluid={img.img.node.childImageSharp.fluid}></Img>)
}
export default Image
