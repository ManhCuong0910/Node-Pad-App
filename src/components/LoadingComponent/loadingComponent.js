import React from 'react'
import '../LoadingComponent/loading.moudle.css'
import { useSelector } from 'react-redux'
function LoadingComponent() {
  const {isLoading} = useSelector((state) => state.LoginReducer)
  if(isLoading){
    return (
      <div className='bgLoading'>
          <img src={require('../../assets/IMG_Loading/goku.gif')} alt=''></img>
      </div>
    )
  }else{
    return ''
  }
}

export default LoadingComponent