import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/notes')({
  component: NotesRoot,
})



function NotesRoot() {
  const [showSidebar, setShowSidebar] = useState(true)
  return (
    <div className={`grid h-screen ${showSidebar ? "grid-cols-[20%_1fr]" : "grid-cols-1"}`}>
      <aside className={`overflow-y-auto border-r p-4 transition-all duration-300 ${showSidebar ? "block" : "hidden"}`}>
        <div className='inline-flex gap-2'>
          <p className='text-2xl italic mb-5'>List of notes...</p>
          <button onClick={() => alert("nn")}>🤯</button>
        </div>
        <ul className='flex flex-col gap-2'>
          {Array.from({length:50}).map((_, i) => (
            <li key={i} className="relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">Note {i + 1}</li>
          ))}
        </ul>
      </aside>
      <main className='p-4 border min-h-screen flex flex-col ${}'>
        <div className='flex justify-between items-center mb-4'>
          <button onClick={() => setShowSidebar(!showSidebar)}>😄</button>
          <p className='text-2xl font-bold'>notename</p>
          <button onClick={() => alert('save')} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>Save</button>
        </div>
        <textarea className='border w-full flex-1 p-2 resize-none' placeholder="What's on your mind?"></textarea>
      </main>
    </div>
  )
}
