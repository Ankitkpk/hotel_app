import React from 'react'
import Hero from '../components/Hero'
import FeatureDestination from '../components/FeatureDestination'
import ExclusiveOffers from '../components/ExclusiveOffers'
import Testinomials from '../components/Testinomials'
import NewsLetter from '../components/NewsLetter'


const Home = () => {
  return (
     <div>
     <Hero/>
      <FeatureDestination/>
      <ExclusiveOffers/>
      <Testinomials/>
      <NewsLetter/>
     </div>
  )
}

export default Home 