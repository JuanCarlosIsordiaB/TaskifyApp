import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className='px-4 py-5 bg-white border-b'>
        <div className='md:flex md:justify-between'>
            <h2 className='text-4xl text-sky-600 font-black text-center'>Taskify</h2>
            <input 
                type="search" 
                placeholder='Search a Project'
                className='rounded-lg lg:w-96 block p-2 border'
            />

            <div className='flex items-center gap-4'>
                <Link
                    to='/projects'
                    className='font-bold uppercase text-black hover:text-gray-700 '
                >Projects</Link>
                <button
                    type='button'
                    className='text-white text-sm bg-red-600 hover:bg-red-500 transition-colors p-3 rounded-md uppercase font-bold '
                >
                    Log Out
                </button>
                
            </div>
        </div>
    </header>
  )
}
