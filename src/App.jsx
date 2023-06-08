import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [data, setData] = useState()

  return (
    <>
     <div className='mainDiv'>
       <form className='mainForm' action="">
         <input className='mainInput' placeholder='Enter your city' type="text" name="" id="" />
         <button><ion-icon name="search-outline"></ion-icon></button>

       </form>
      </div> 
    </>
  )
}

export default App
