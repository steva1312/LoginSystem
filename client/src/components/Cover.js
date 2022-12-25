import React from 'react'

function Cover({ isShow, close }) {
  return (
    <div
      onClick={close}
      className={'cover ' + (isShow ? 'cover-active' : '')}
    ></div>
  )
}

export default Cover
