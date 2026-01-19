import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChatWithGod from './ChatWithGod'
import { Analytics } from '@vercel/analytics/react';

function App() {

  return (
    <>
      <Analytics />
      <ChatWithGod />
    </>
  )
}

export default App
