import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { MilkdownEditor, EditorControls } from '@/Components/MilkdownEditor'
import { Crepe } from "@milkdown/crepe";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { getNotes } from '@/utils/getNotes';
import { Note } from '@/Types/note';

export const Route = createFileRoute('/notes')({
  component: NotesRoot,
  loader: async () => {
    const notes = await getNotes()
    console.log(notes)
    return notes
  }
})

function NotesRoot() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const notes = Route.useLoaderData()

  const [curNote, setCurNote] = useState(notes[0])
  const [showSidebar, setShowSidebar] = useState(true)
  return (
    <div className={`grid h-screen ${showSidebar ? "grid-cols-[20%_1fr]" : "grid-cols-1"}`}>
      <aside className={`overflow-y-auto border-r p-4 transition-all duration-300 ${showSidebar ? "block" : "hidden"}`}>
        <div className='inline-flex gap-2'>
          <p className='text-2xl italic mb-5'>List of notes...</p>
          <button onClick={() => alert("nn")}>🤯</button>
        </div>
        <ul className='flex flex-col gap-2'>
          {notes.map((note) => {
            return <li
              key={note.id}
              className={`cursor-pointer relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full p-2 ${note.id == curNote.id ? "bg-yellow-200 rounded" : null}`}
              onClick={() => setCurNote(note)}
            >
              {note.title}
            </li>
        })}
        </ul>
      </aside>
      {isClient && <MilkdownProvider>
        <main className='p-4 border min-h-screen flex flex-col'>
          <div className='flex justify-between items-center mb-4'>
            <button onClick={() => setShowSidebar(!showSidebar)}>😄</button>
            <p className='text-2xl font-bold'>{curNote.title}</p>
            <EditorControls />
          </div>
          {/* <textarea className='border w-full flex-1 p-2 resize-none' placeholder="What's on your mind?"></textarea> */}
            <div className='border w-full h-full flex-1 resize-none overflow-y-auto'>
              <MilkdownEditor content={curNote.content}/>
            </div>
        </main>
      </MilkdownProvider>}
    </div>
  )
}
