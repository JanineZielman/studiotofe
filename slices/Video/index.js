import React from 'react'

const Video = ({ slice }) => (
  <video muted autoPlay loop playsInline>
    <source src={slice.primary.video.url} type="video/mp4"/>
  </video>
)

export default Video