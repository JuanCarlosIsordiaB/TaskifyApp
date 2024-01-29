import {Link} from 'react-router-dom';

export const ForgetPassword = () => {
  return (
    <>
      <form 
        action=""
        className='my-10 bg-white shadow rounded-md px-10 py-5'
      >
        
        <h2 className='text-sky-600 font-black text-6xl capitalize my-10'>
          Recover your <span className='text-slate-700'>account.</span></h2>
        
        <div className='my-5 '>
          <label 
            htmlFor="email" 
            className='block uppercase text-gray-600 text-xl font-bold'
          >Email</label>
          <input 
            type="email" 
            id='email'
            placeholder='Write your email'
            className='w-full mt-3 p-3 border border-gray-300 rounded-md bg-gray-100'
            />
        </div>
        
        <input type="button" className='w-full bg-sky-600 rounded-md text-white font-bold py-2 text-xl cursor-pointer hover:bg-sky-900 transition-colors mt-10' value='Send Instructions'  />
        <nav className='lg:flex lg:justify-between '>
          <Link
            to='/'
            className='block text-center my-5 text-slate-500 font-semibold text-sm  hover:text-slate-700'
          >Already has an account? Login</Link>
          
        </nav>

      </form>
      

    </>
  )
}
