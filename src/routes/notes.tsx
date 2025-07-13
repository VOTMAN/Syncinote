import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { MilkdownEditor, SaveButton } from '@/Components/MilkdownEditor'
import { MilkdownProvider } from "@milkdown/react";
import { getNotes } from '@/utils/getNotes';
import { createNote } from '@/utils/createNote';
import { deleteNote } from '@/utils/deleteNote';
import DeleteButton from '@/Components/DeleteButton';

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
  const notes = Route.useLoaderData()

  useEffect(() => {
    setIsClient(true);
    if (notes.length == 0) {
      createNote()
    }
  }, [notes]);


  const [curNote, setCurNote] = useState(notes[0])
  const [showSidebar, setShowSidebar] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const handleRename = async () => {
    const newTitle = prompt("Enter a new title for the note:", curNote.title);
    if (!newTitle || newTitle.trim() === "" || newTitle === curNote.title) return;

    const updatedNote = { ...curNote, title: newTitle };
    setCurNote(updatedNote);

    notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );

    try {
      const { saveNote } = await import("@/utils/saveNote");
      await saveNote({ data: updatedNote });
    } catch (err) {
      console.error("Failed to save updated title", err);
    }

    window.location.reload()
  };

  return (
    <div className={`md:grid h-screen ${showSidebar ? "grid-cols-[20%_1fr]" : "grid-cols-1"}`}>
      <aside
      className={`overflow-y-auto border-r p-4 transition-all duration-300 bg-white shadow-md ${showSidebar ? 'block' : 'hidden'}`}
      >
      <div className='mb-4'>
        <div className='flex justify-between px-0.5'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-3'>Notes</h2>
          <h2>💰</h2>
        </div>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search notes'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500'
          />
          <button
            onClick={async () => {
              await createNote()
              window.location.reload()
              setCurNote(notes[notes.length - 1])
            }}
            className='absolute right-2 top-1.5 font-bold text-black hover:text-yellow-500'

          >
            +
          </button>
        </div>
      </div>

      <ul className='flex flex-col gap-1.5 overflow-y-auto max-h-[calc(100vh-180px)] pr-1 pb-2'>
        {notes
          .filter((note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.content.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((note) => (
            <li
              key={note.id}
              onClick={() => setCurNote(note)}
              className={`
                px-3 py-2 rounded-md cursor-pointer relative
                transition-colors duration-200 overflow-hidden
                ${note.id === curNote.id
                  ? 'bg-yellow-100 text-black font-medium shadow-sm'
                  : 'hover:bg-gray-100 text-gray-800'}
              `}
            >
              {note.title}
            </li>
          ))}
      </ul>

      {notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
      ).length === 0 && (
        <p className='text-gray-500 mt-4 text-sm italic text-center'>
          No matching notes found.
        </p>
      )}
</aside>

      {isClient &&
      <MilkdownProvider>
        <main className='p-4 border min-h-screen flex flex-col'>
          <div className='flex justify-between items-center mb-4'>
            <span className='flex gap-3 '>
              <button className='cursor-pointer ' onClick={() => setShowSidebar(!showSidebar)}>😄</button>
              <span onClick={handleRename}>📋</span>
            </span>
            <p className='text-2xl font-bold overflow-x-hidden'>{curNote.title}</p>
            <span>
              <SaveButton note={curNote}/>
              <DeleteButton {...curNote}/>
            </span>
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
