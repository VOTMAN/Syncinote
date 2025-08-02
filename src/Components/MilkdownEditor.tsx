import React from 'react'
import { useEffect, type FC } from "react";
import { Crepe } from "@milkdown/crepe";
import { Milkdown, useEditor, useInstance } from "@milkdown/react";
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";
import { getMarkdown, insert, replaceAll } from "@milkdown/kit/utils";

import { saveNote } from '@/utils/saveNote';
import { Note } from "@/Types/note";

const markdown = `# Hello

bro

how are you

> I'm good, what about you??`;

export const SaveButton: FC<{note: Note}> = ({note}) => {
  const [isLoading, getInstance] = useInstance();

  const handleSave = async () => {
    if (isLoading) return;

    const editor = getInstance();
    if (!editor) return;

    const content = editor.action(getMarkdown());
    note.content = content

    await saveNote({data : note})
  };

  return (
    <button onClick={handleSave} className="bg-yellow-500 rounded text-white px-4 py-2 cursor-pointer hover:bg-yellow-600" disabled={isLoading}>
      Save
    </button>
  );
};

export const setEditor: FC<{content?: string}> = ({content}) => {
  const [loading, get] = useInstance()

  useEffect(() => {
    if (loading) return;
    const editor = get();
    if (!editor) return;

    editor.action(replaceAll(""))
    editor.action(insert(content ?? markdown))

  }, [loading, get, content])

  return null;
}

export const MilkdownEditor: FC<{content?: string}> = (content) => {
  useEditor((root) => {
    const crepe = new Crepe({
      root
    });
    return crepe;
  }, []);

  setEditor(content)
  return <Milkdown />
};
