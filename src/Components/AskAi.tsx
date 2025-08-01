import { getStuffFromAi } from "@/utils/genStuffFromAi"
import { useEffect, useState } from "react"
import { Loading } from "@/Components/Loading/Loading"
import { useInstance } from "@milkdown/react";
import { insert, replaceAll } from "@milkdown/kit/utils";

export const AskAi = () => {
  const [prompt, setPrompt] = useState('')
  const [markdown, setMarkdown] = useState('')
  const [loading, setLoading] = useState(false)
  const [editorLoading, get] = useInstance()

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    setMarkdown('')
    try {
      const res = await getStuffFromAi({ data: { prompt } })
      setMarkdown(res.data ?? "Got no response from modal. Try later")
      // setMarkdown("Yes it works")
      // console.log(res)
      // console.log(prompt)
      // setMarkdown(res.data || "No response from ai")
    } catch (err) {
      console.error(err)
      setMarkdown('❌ Failed to generate markdown')
    } finally {
      setLoading(false)
    }
  }

  const handleInsert = () => {
    if (editorLoading) return
    const editor = get();
    if (!editor) return;

    editor.action(replaceAll(""))
    editor.action(insert(markdown))
    const dialog = document.getElementById('ai_modal') as HTMLDialogElement
    dialog?.close()
  }
  return (
  <>
    {loading && <Loading />}

    <button
      className="border rounded p-2 bg-green-500 hover:bg-green-600 text-white mr-1"
      onClick={() => (
        document.getElementById("ai_modal") as HTMLDialogElement
      )?.showModal()}
    >
      🥂 Ask Ai
    </button>

    <dialog id="ai_modal" className="modal">
      <div className="modal-box">
        <div className="flex flex-col gap-4">
          <textarea
            id="prompt"
            className="border w-full p-2 resize-none"
            placeholder="What's on your mind?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
          />

          <div className="flex justify-between gap-2">
            <button className="btn bg-green-500 hover:bg-green-600" onClick={handleGenerate}>
              Generate
            </button>
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>

          {markdown.trim() !== "" && (
            <div id="resArea" className="flex flex-col gap-2">
              <label htmlFor="resText" className="font-semibold">
                AI Generated Markdown:
              </label>
              <textarea
                id="resText"
                className="border w-full p-2 resize-none font-mono bg-gray-100"
                rows={6}
                value={markdown}
                readOnly
              />
              <button
                className="btn bg-yellow-500 hover:bg-yellow-600 text-white"
                onClick={handleInsert}
              >
                Insert into Editor
              </button>
            </div>
          )}
        </div>
      </div>
    </dialog>
  </>
)
}