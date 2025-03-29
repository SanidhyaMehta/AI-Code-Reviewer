const { generateContent } = require("../services/aiservicer.js");

module.exports.getReview = async (req, res) => {
    const code = req.body.code;

    // Validate the prompt
    if (!code) {
        return res.status(400).json({ error: "CODE IS REQUIRED" });
    }

    try {
        // Call the AI service
        const response = await generateContent({ contents: code });

        // Send a structured JSON response
        res.status(200).json({ response });
    } catch (error) {
        // Log the error for debugging
        console.error("Error generating response:", error);

        // Send a detailed error response
        res.status(500).json({ error: "Error generating response", details: error.message });
    }
};