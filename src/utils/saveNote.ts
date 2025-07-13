import { db } from '@/db/db';
import { createServerFn } from '@tanstack/react-start';
import type { Note } from '@/Types/note';

export const saveNote = createServerFn({ method: "POST", response: 'data' })
.validator((data: Note) => data)
.handler(async (ctx) => {
  try {

    const note = ctx.data
    await db.prepare("UPDATE notes SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
    .run(note.title, note.content, note.id)
  } catch (e) {
    console.log(e)
  }
})

