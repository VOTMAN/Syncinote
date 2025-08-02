import React from 'react'
import { Note } from "@/Types/note"
import { deleteNote } from "@/utils/deleteNote"

const DeleteButton = (curNote: Note) => {
  return (
<>
  <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
    <div className="modal-box">
      <h3 className="font-bold text-lg">Hello!</h3>
      <p className="py-4">Are you sure you want to delete this note?</p>
      <div className="modal-action">
        <button className='btn' onClick={async () => {
            const res = await deleteNote({data: curNote.id})
            if (res?.status == 500) {
              alert("Cannot delete the only note")
              return
            }
            window.location.reload()
          }}>Yes</button>
        <form method="dialog">
          <button className="btn">No</button>
        </form>
      </div>
    </div>
  </dialog>
  <button
    className="ml-1 bg-red-500 rounded text-white px-4 py-2 cursor-pointer hover:bg-red-600"
    onClick={()=>(document.getElementById('my_modal_5') as HTMLDialogElement)?.showModal()}
  >del
  </button>
</>  )
}

export default DeleteButton