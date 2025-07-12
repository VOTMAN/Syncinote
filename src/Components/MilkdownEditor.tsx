import { useEffect, type FC } from "react";

import { Crepe } from "@milkdown/crepe";
import { Milkdown, useEditor, useInstance } from "@milkdown/react";

import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";
import { getMarkdown, insert, replaceAll } from "@milkdown/kit/utils";

const markdown = `# Hello

bro

how are you

> I'm good, what about you??`;

export const EditorControls: FC = () => {
  const [isLoading, getInstance] = useInstance();

  const handleSave = () => {
    if (isLoading) return;

    const editor = getInstance();
    if (!editor) return;

    const content = editor.action(getMarkdown());
    console.log(content)
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

    if (content) {
      editor.action(replaceAll(""))
      editor.action(insert(content))
    } else {
      editor.action(replaceAll(""))
      editor.action(insert(markdown))
    }

  }, [loading, get, content])

  return true;
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
