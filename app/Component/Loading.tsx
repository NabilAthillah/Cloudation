import React from 'react'

const Loading = () => {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 w-screen-h-screen z-[99999] bg-white flex flex-col items-center justify-center'>
      <video autoPlay loop muted className='w-2/4'>
        <source src="/assets/videos/LOADING SCREEN CLOUDATION.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default Loading