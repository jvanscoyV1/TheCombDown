import React, { Component } from 'react'
import Grid from '../components/grid'
import Layout from '../components/layout'
import { graphql } from 'gatsby'

var orange_colors = ['#EFE5C8', '#D96905', '#E27910', '#F6C381', '#480004'];
var blue_colors =   ['#EFE5C8', '#1D274F', '#25709F', "#1D274F", '#1D274F'];
var red_colors =    ['#640E12', '#DF1F28', '#F6AA43', '#F6C37D', '#F6C37D'];
// var yellow_colors = ['#EFE5C8', '#D96905', '#E27910', '#F6C381', '#480004'];

var color_schemes = [blue_colors, orange_colors, red_colors];

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.gallery = []
    this.state = {
      i: 0,
    };
    this.logos = [];
    for(var l in this.props.data.allFile) {
      this.logos.push(props.data.allFile[l]);
    }
  }
  render() {
    return (
      <Layout colors={color_schemes[this.state.i]}>
          <button 
            style={{
              position:'fixed',
              top: 0,
              left: 0,
              zIndex: 100,
            }} 
            id="colorswap"
            onClick = {() => { 
            this.setState({
              i: (this.state.i+1)%color_schemes.length,
            });
            }}>
            Swap Colors</button>
          <Grid data={this.props.data} shows={this.shows} gallery={this.gallery} logo={this.logos[0][this.state.i]} colors={color_schemes[this.state.i]}></Grid>
      </Layout>
    )
  }
} 

export const fluidImageLarge = graphql`
fragment fluidImageLarge on File {
  childImageSharp {
    fluid(maxWidth: 1500) {
      ...GatsbyImageSharpFluid
    }
  }
}
`;

export const fluidImageSmall = graphql`
fragment fluidImageSmall on File {
  childImageSharp {
    fluid(maxWidth: 800) {
      ...GatsbyImageSharpFluid
    }
  }
}
`;

export const query = graphql`
  query IndexQuery{
    allFile(filter:{extension:{regex:"/(jpeg|jpg|gif|png)/"}, relativeDirectory:{eq:"logos"},  sourceInstanceName:{eq:"images"}}) {
      edges {
        node {
          relativePath
          ...fluidImageSmall
        }
      }
    }
    hero: file(relativePath: { eq: "combs.jpg" }) {
      ...fluidImageLarge
    }
  }
`

export default IndexPage
