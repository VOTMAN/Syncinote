import { createServerFn, useServerFn } from "@tanstack/react-start"
import { GoogleGenAI } from "@google/genai";

export const getStuffFromAi = createServerFn({method: "POST"})
.validator((data: {prompt: string}) => data)
.handler( async ({data}) => {
  try {
    const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_API_KEY});
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Give me the response for this given question or statment in markdown: ${data.prompt}`,
    });

    return {success: true, data: response.text}
  } catch (e) {
    console.log(e)
    return {success: false, data: null}
  }
})




