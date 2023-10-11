import React, { useContext } from 'react'
import { MatrizContext } from '@/context/MatrizContext';

export default function Upload() {
    const { setRender } = useContext(MatrizContext)
    function upload() {
        const fileInput = document.getElementById('upload') as HTMLInputElement;
        const file = fileInput.files?.[0];
      
        if (file) {
          const reader = new FileReader();
      
          reader.onload = function (e: ProgressEvent<FileReader>) {
            if (e.target) {
              const jsonContent = e.target.result as string;
              const jsonData = JSON.parse(jsonContent);
              setRender(jsonData);
            }
          };
      
          reader.readAsText(file);
        }
        fileInput.value = ''
      }

    return (
        <div className='bg-black md:w-80 w-64 py-2 min-h-[142px] rounded-2xl flex flex-col justify-around items-center'>
            <input onChange={upload} id="upload" type="file" className="flex h-10 w-4/5 rounded-md bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-800 file:text-sm file:font-medium" />
        </div>
    )
}