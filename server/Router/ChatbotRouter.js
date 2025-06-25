const express =require("express")
const openai = require("../Helpers/OpenAi")
const router =express.Router()

router.post("/messages",async (req,res)=>{
    const {message} = req.body

    const prompt =`You're an AI assistant for a company's HR system.
- If the user asks how to contact, reply ONLY with: "#go:contact"
- Otherwise, answer normally.

User: "${message}"
`;

try {
    const result = await openai.chat.completions.create({
        model: "gpt-4.1",
      messages: [{ role: "user", content: prompt }],
    })
    
const reply = result.choices[0].message.content
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: "AI error", details: err.message })
    
}
})

module.exports =router;