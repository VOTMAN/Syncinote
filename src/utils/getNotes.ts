import { db } from '@/db/db';
import { createServerFn } from '@tanstack/react-start';
import type { Note } from '@/Types/note';

export const getNotes = createServerFn({ method: "POST" })
.handler(async (): Promise<Note[]> => {
  const rows = await db.prepare("SELECT * FROM notes ORDER BY created_at ASC").all()
  return rows as Note[]
})