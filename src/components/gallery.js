import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import './gallery.css'


class Gallery extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      limit: 4,
    }
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  
  createPics(data) {
    var pics = [];
    var i = 0;
    for(var d in data.allFile.edges) {
      var fluidPic = data.allFile.edges[d].node;
      var pictureClass;
      var aspect = fluidPic.childImageSharp.fluid.aspectRatio;
      if(aspect <= 0.8)
        pictureClass = "pic tall"
      else if(aspect <= 1.1)
        pictureClass = "pic square"
      else
        pictureClass = "pic wide"
      var img = <div key={d} className={pictureClass}><Img className="img_container" fluid={fluidPic.childImageSharp.fluid}/></div>;
      if(i < this.state.limit)
        pics.push(img);
      i++;
    }
    return pics;
  }

  render() {
    return(
      <StaticQuery
      query={graphql`
        query GalleryQuery {
          allFile(filter:{extension:{regex:"/(jpeg|jpg|gif|png)/"}, relativeDirectory:{eq:"gallery"},  sourceInstanceName:{eq:"images"}}) {
            edges {
              node {
                relativePath
                ...fluidImageLarge
              }
            }
          }
          
        }
      `}
      render={(data) => {
        var pics = this.createPics(data);
        return (
          <div>
            <div className="pics">
              {pics}
            </div>
            <button className={"loadButton"} onClick={()=> {
              this.setState({
                limit: this.state.limit+3
              });
            }}>
              More
            </button>
            <button className={"loadButton"} onClick={()=> {
              this.setState({
                  limit: Math.max(this.state.limit-2, 1)
              });
            }}>
              Fewer
            </button>
          </div>
          
        )
      }}
    />
    )
  }

}
export default Gallery;
// export default Gallery => (
//   <StaticQuery
//     query={graphql`
//       query GalleryQuery {
// poster1_10: file(relativePath: { eq: "1_10.png" }) {
//   ...fluidImageLarge
// }
// combs: file(relativePath: { eq: "combs.jpg" }) {
//   ...fluidImageLarge
// }
// show: file(relativePath: { eq: "show.jpg" }) {
//   ...fluidImageLarge
// }
// show2: file(relativePath: { eq: "show2.jpg" }) {
//   ...fluidImageLarge
// } 
// show3: file(relativePath: { eq: "show3.jpg" }) {
//   ...fluidImageLarge
// }  
// show4: file(relativePath: { eq: "show4.jpg" }) {
//   ...fluidImageLarge
// } 
// show5: file(relativePath: { eq: "show5.jpg" }) {
//   ...fluidImageLarge
// } 
// show6: file(relativePath: { eq: "show6.jpg" }) {
//   ...fluidImageLarge
// } 
// show7: file(relativePath: { eq: "show7.jpg" }) {
//   ...fluidImageLarge
// } 
// show8: file(relativePath: { eq: "show8.jpg" }) {
//   ...fluidImageLarge
// } 
// show9: file(relativePath: { eq: "show9.jpg" }) {
//   ...fluidImageLarge
// } 
// show10: file(relativePath: { eq: "show10.jpg" }) {
//   ...fluidImageLarge
// } 
// poster12_31: file(relativePath: { eq: "12_31.png" }) {
//   ...fluidImageLarge
// }
// poster11_03: file(relativePath: { eq: "11-03.png" }) {
//   ...fluidImageLarge
// } 
// gatsby_icon: file(relativePath: { eq: "gatsby-icon.png"}) {
//   ...fluidImageLarge
// }
// combs1: file(relativePath: { eq: "combs.jpg" }) {
//   ...fluidImageLarge
// } 
// gatsby_icon1: file(relativePath: { eq: "gatsby-icon.png"}) {
//   ...fluidImageLarge
// }
// show12_311: file(relativePath: { eq: "12_31.png" }) {
//   ...fluidImageLarge
// }
// gatsby_icon2: file(relativePath: { eq: "gatsby-icon.png"}) {
//   ...fluidImageLarge
// }

// logo_orange: file(relativePath: { eq: "orange.png"}) {
//   ...fluidImageLarge
// }
// logo_red: file(relativePath: { eq: "red.png"}) {
//   ...fluidImageLarge
// }
// logo_blue: file(relativePath: { eq: "blue.png"}) {
//   ...fluidImageLarge
//         combs: file(relativePath: { eq: "combs.jpg" }) {
//           ...fluidImage
//         } 
//       }
//     `}
//     render={(data) => {
//       var pics = createPics(data);
//       return (
//         <div className="pics">
//           {pics}
//           <button onClick={()=> {
//             limit++;
//             this.forceUpdate();
//           }}>Load More</button>
//         </div>
//       )
//     }}
//   />
// )