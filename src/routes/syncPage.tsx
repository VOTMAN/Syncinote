import { getNotes } from '@/utils/getNotes'
import { createFileRoute, Link } from '@tanstack/react-router'
import JSZip from "jszip"
import pkg from 'file-saver';
const {saveAs} = pkg;

export const Route = createFileRoute('/syncPage')({
  component: RouteComponent,
})

function RouteComponent() {

  const exportNotes = async () => {
    const userNotes = await getNotes()
    // console.log(userNotes)
    const zip = new JSZip()
    const folder = zip.folder("synciNoteData")

    for (const note of userNotes) {
      const mdFile = `${note.title || 'Untitled' + note.id}.md`
      folder?.file(mdFile, note.content || "")
    }

    const blob = await zip.generateAsync({type: "blob"})

    saveAs(blob, "synciNoteData.zip")
  }

  return <>
    <div className='min-h-screen min-w-screen flex flex-col justify-center align-middle gap-3 text-center'>
      <Link to="/notes" className='border rounded mx-auto p-3 bg-yellow-400 hover:bg-yellow-500 font-bold'>Back to Pages</Link>
      <button className='border rounded mx-auto p-3 bg-green-400 hover:bg-green-500 font-bold' onClick={exportNotes}>Export Notes</button>
      <p className='font-medium text-gray-600'>Make sure any notes do not have the same name!!!</p>
    </div>
  </>
}
