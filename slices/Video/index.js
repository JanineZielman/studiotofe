import React from 'react'

const Video = ({ slice }) => {
  return(
    <div className={`video-section ${slice.items.length > 0 && 'multi'}`}>
      <div className='video'>
        <video muted autoPlay loop playsInline>
          <source src={slice.primary.video?.url} type="video/mp4"/>
        </video>
      </div>
      {slice.items.map((item, i) => {
        return(
          <div className='video' key={`video${i}`}>
            <video muted autoPlay loop playsInline>
              <source src={item.video?.url} type="video/mp4"/>
            </video>
          </div>
        )
      })}
    </div>
  )
}

export default Video