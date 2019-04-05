import PropTypes from 'prop-types'
import React from 'react'
import Header from './header'
import Gallery from './gallery'
import Shows from './shows'
import "./grid.css"



const Grid = ({data, logo, colors}) => {
  var headerStyle = {
    fontSize: '1.2rem',
    color: colors[0],
    textShadow: '1px 1px 0px ' + colors[4],// + colors[0],
  };
  console.log(data);
  return (
    <div className="main-grid">
      <Header hero={data.hero} logo={logo} colors={colors} />
      <div className="chunk" id="shows">
        <h1 style={headerStyle}>Shows</h1>
        <Shows></Shows>
      </div>
      <div className="chunk" id="gallery">
        <h1 style={headerStyle}>Gallery</h1>
        <Gallery data={data}></Gallery>
      </div>
      <div className="chunk" id="about">
        <h1 style={headerStyle} >About Us</h1>
        <div className="abouttext">
          <p>The Comb Down was brought together by the one and only Brian "Gourd" Mlodzinski.
            Gourd aka DJ Gourd has been spinning funky vinyl for over two decades and has a 
            reputation for bringing his listeners and dancers into an atmosphere that is 
            hard to forget and easy to crave. Gourd is well known for his collection of raw 70's funk, 
            80's boogie/synth funk, Afrobeat, Disco, 80's/90's Hip-Hop and straight up dance classics.
            With his love of the music, guitar, showmanship and having a grand time, a band like this was inevitable. </p>
          <p>It eventually came time to dust off the old Hammond b3 and her sister Leslie Speaker,
            add a few horns to the mix whilst incorporating the tough and very necessary foundational
            element of drums and bass; voila, The Comb Down was born. Focusing specifically on the 
            musical styles of 1960's-1970's funk, paying proper homage to the historic nuances, 
            attire and instrumentation is something that the band doesn't take lightly. </p>
          <p>Aside from playing with The Comb Down, members of the band travel musically 
          through many different genres and styles. The musicians in this group have been
          seen with acts such as, John Brown's Body, Dispatch, Giant Panda Guerilla Dub Squad, 
          Big Mean Sound Machine, Mutron Warriors, Nahko and Medicine for the People, Road Man, 
          The Nth Power, Sophistafunk, Guster, Funky Dawgz Brass Band, Thunder Body, 
          Don Most from Happy Days, Double Tiger, Black Castle and The Crucials, in naming a few.</p>
          <p>When listening to The Comb Down, it is guaranteed that you'll be shaking your ass.</p>
        </div>
        
      </div>
      <div className="chunk" id="contact">
        <h1 style={headerStyle} >Get At Us</h1>
      </div>
    </div>
  )
}
Grid.propTypes = {
  siteTitle: PropTypes.string,
}

Grid.defaultProps = {
  siteTitle: ``,
}

export default Grid
