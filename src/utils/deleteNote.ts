import { createServerFn } from '@tanstack/react-start';
import { db } from "@/db/db";


export const deleteNote = createServerFn({method: "POST"})
.validator((data: number) => data)
.handler( async (data) => {
  const id = data.data
  try {
    const {count} = db.prepare("SELECT COUNT(*) as count from notes").get()
    if (count == 1) {
      throw new Error("Cannot delete the only note")
    }
    const res = db.prepare("DELETE FROM notes WHERE id = ?").run(id)
    console.log(res)
    if (res.changes == 1) {
      return {
        status: 200,
        success: true
      }
    }
    // console.log(id)
  } catch (e) {
    console.log(e)
    return {
      status: 500,
      success: false,
    }
  }
})