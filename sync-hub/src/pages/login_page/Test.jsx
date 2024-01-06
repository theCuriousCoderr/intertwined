import React from 'react'

function Test() {




  return (
    <div className='space-y-1 p-10'>
     { [[1,2,3], [1,2,3] , [1,2,3]].map((item1, index1) => { return (
        <div className='flex gap-1'>
            { item1.map((item2, index2) => {return (
                // {(index1+1 === 1|| index1+1 === 2 || index1 +1 ==3 ) && (item2 === 1 || item2 === 2 || item2 === #) }
                // <div className={`size-8 ${ (([1,2,3].includes(index1+1)) && ([1,2,3].includes(item2))) ? "bg-gray-900 bg-opacity-80 " : "bg-pink-400"} rounded-sm p-1 border border-slate-900 text-sm flex items-center justify-center`}>
                    <div className={`size-8 bg-white rounded-sm p-1 border border-slate-900 text-sm flex items-center justify-center`}>
                    Y <span className='text-xs mt-1'> {index1 + 1}{item2} </span>
                </div>
            )})}
        </div>    
     )}) }
     </div>
  )
}

export default Test
