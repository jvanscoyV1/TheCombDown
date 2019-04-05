import { StaticQuery, graphql } from 'gatsby'
import React from 'react'
import Img from 'gatsby-image'
import Gallery from "./gallery"
import './shows.css'

class Shows extends Gallery {
    constructor(props) {
        super(props);
        this.state = {
            limit: 3
        };
    }
    createShows(data) {
        var shows = [];
        var i = 0;
        console.log(data);
        for(var d in data.allFile.edges) {
            var fluidPic = data.allFile.edges[d].node;
            var img = <div key={d} className={'show'}>
            <Img className="poster" fluid={fluidPic.childImageSharp.fluid}/>
            </div>;
            if(i < this.state.limit)
                shows.push(img);
            i++;
        }
        return shows;
    }

    render(){
        return(
            <StaticQuery
            query={graphql`
                query ShowQuery {
                    allFile(filter:{extension:{regex:"posters/(jpeg|jpg|gif|png)/"}, relativeDirectory:{eq:"posters"},  sourceInstanceName:{eq:"images"}}) {
                        edges {
                            node {
                                relativePath
                                ...fluidImageSmall
                            }
                        }
                    }
                }
                
            `}
            render={(data) => {
              var pics = this.createShows(data);
              return (
                <div>
                  <div className="shows">
                    {pics}
                  </div>
                  <button className={"loadButton"} onClick={()=> {
                        this.setState({
                            limit: this.state.limit+2
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



//         <div className="shows">
//             <ul className="showlist">
//                 <li className="show">
//                     <p>January 10th, 2019 <br></br>
//                     Rochester, NY <br></br>
//                     Flour City Station
//                     </p>
//                 </li>
//                 <li className="show">
//                     <p>Coming Soon...</p>
//                 </li>
//             </ul>
//         </div>
//     )
// };


export default Shows
