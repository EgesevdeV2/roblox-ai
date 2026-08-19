const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
    res.send("Roblox AI is online!");
});

app.post("/roblox-ai", async (req, res) => {
    try {
        const message = String(req.body.message || "").slice(0, 300);

        if (!message.trim()) {
            return res.status(400).json({
                reply: "Bir şey söylemedin."
            });
        }

        const response = await client.responses.create({
            model: "gpt-5-mini",
            instructions:
                "Sen Roblox'taki korku oyununda yaşayan gizemli bir NPC'sin. " +
                "Kısa, doğal ve biraz ürkütücü cevaplar ver. " +
                "Oyuncuya yardım edebilirsin ama karakterden çıkma.",
            input: message
        });

        res.json({
            reply: response.output_text
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            reply: "Bir şeyler ters gitti..."
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`AI server running on port ${PORT}`);
});
