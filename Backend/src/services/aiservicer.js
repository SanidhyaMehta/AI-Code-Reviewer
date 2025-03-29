const { GoogleGenerativeAI } = require("@google/generative-ai");

// Check if API_KEY is set
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is missing.");
}

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    systemInstruction: `
    You are a Skilled Developer WIth Mastery in Debugging and Reviewing skills 
    You look for the code and find the problems and Suggest the solution to the developer.
    
    You always try to find the problems in the code and suggest the solution to the developer. 
    and also try to make the code more efficient and clean.

    please Give the response in a line by line structure.
    `
});

async function generateContent(prompt) {
    // Validate the prompt object
    if (!prompt || !prompt.contents) {
        throw new Error("The 'contents' property is required in the prompt object.");
    }

    // Format the contents according to the API's requirements
    const contents = [
        {
            role: "user",
            parts: [
                {
                    text: prompt.contents // Use the correct format for 'parts'
                }
            ]
        }
    ];

    try {
        // Generate content using the model
        const result = await model.generateContent({ contents });

        // Validate and return the response
        if (result.response && result.response.text) {
            return result.response.text();
        } else {
            throw new Error("Invalid response format from the model.");
        }
    } catch (error) {
        // Log the full error for debugging
        console.error("Error generating content:", error);
        throw new Error(`Failed to generate content. Reason: ${error.message}`);
    }
}

module.exports = {
    generateContent,
}