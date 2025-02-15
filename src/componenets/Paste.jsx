import React,{useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

function handleShare(pasteId) {
    const url = `${window.location.origin}/pastes/${pasteId}`;
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard");
}

const Paste = () => {
    const pastes = useSelector((state) =>
    state.paste.pastes);
    const [searchTerm,setSearchTerm]=useState('');
    const dispatch =useDispatch();
    const filteredData=pastes.filter((paste)=>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
);
function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId));
}
  return (
    <div className="bg-gray-100 min-h-screen p-5 text-gray-900">
     <input 
     className='p-2 rounded-xl min-w-[600px] mt-5 border-2 border-gray-300 focus:border-blue-500'
     type='search'
     placeholder='Search here'
     value={searchTerm}
     onChange={(e)=>setSearchTerm(e.target.value)}
     />
     <div className='flex flex-col gap-5 mt-5'>
        {
            filteredData.length>0 &&
            filteredData.map(
                (paste) => {
                    return (
                        <div className='border p-4 rounded-lg shadow-md bg-white' key={paste?._id}>
                            <div className='font-bold text-lg mb-2 text-gray-900'>
                            {paste.title}
                            </div>
                            <div className='mb-4 text-gray-700'>
                                {paste.content}
                            </div>
                            <div className='flex gap-4 justify-evenly'>
                                <button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700'>
                                    <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                                </button>
                                <button className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700'>
                                    <a href={`/pastes/${paste?._id}`}>View</a>
                                </button>
                                <button className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700' onClick={()=>handleDelete(paste?._id)}>
                                    Delete
                                </button>
                                <button className='bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700' onClick={()=>{
                                    navigator.clipboard.writeText(paste?.content)
                                    toast.success("Copied to clipboard")
                                }}>
                                    Copy
                                </button>
                                <button className='bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700' onClick={() => handleShare(paste?._id)}>
                                    Share
                                </button>
                            </div>
                            <div className='text-gray-500 mt-2'>
                                {paste.createdAt}
                            </div>
                        </div>
                    );
                }
            )
        }

     </div>
    </div>
  )
}

export default Paste
