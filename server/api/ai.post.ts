import OpenAI from "openai";

export default defineEventHandler(async(event) => {
  const {OPENAI_API_KEY} = useRuntimeConfig();

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
  });

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  return completion;
})
