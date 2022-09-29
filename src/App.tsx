import { motion } from 'framer-motion'

const App = () => {
  return (
    <motion.div className='font-poppins flex flex-col justify-center w-screen h-screen items-center' initial={{opacity: 0,}} animate={{opacity: 1,}} transition={{duration: 1, }}>
      <div className='text-center justify-center'>
        <h1 className='text-4xl font-semibold'>Multimail</h1>
        <p className='text-sm text-gray-500 p-2'>The page will be worked on after the design has been finalized.</p>
      </div>
    </motion.div>
  )
}

export default App