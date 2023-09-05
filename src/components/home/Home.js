import React from 'react'
import Navigation from '../navigation/Navigation'
import Cards from '../reports/Cards'

function Home() {
  const User1 = localStorage.getItem('user');
  
  return (
    <div>
        <Navigation/>
        <Cards userId={User1}/>
    </div>
  )
}

export default Home