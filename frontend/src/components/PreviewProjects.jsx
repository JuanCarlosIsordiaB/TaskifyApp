import {Link} from 'react-router-dom';

export const PreviewProjects = ({project}) => {
    const {name, _id, client} = project;
  return (
    <div className='border-b p-5 flex'>
        <p className='flex-1'>
            {name}
            <span className='text-sm text-gray-500 uppercase'> {client}</span>
        </p>


        <Link 
            to={`${_id}`}
            className='text-gray-600 hover:text-gray-800 uppercase text-sm font-bold'
        >
            Check Project
        </Link>

    </div>
  )
}
