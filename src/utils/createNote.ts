import { db } from "@/db/db";
import { createServerFn } from "@tanstack/react-start";

export const createNote = createServerFn({ method: "POST"})
.handler(async () => {
  try {
    db.prepare(`
      INSERT INTO notes (title, content)
      VALUES (?, ?)
      `).run("New Note",
`# Welcome to Syncinote

> Type your **hearts** out here.
> **Make sure to save changes before switching to another note!!**

Enjoy 😄
`);
    } catch (e) {
      console.log(e);
    }
})