// Define GROQ API key
const CONSOLEGROQ_API_KEY = "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";

// Define interfaces for GROQ API
export interface GroqRequest {
  prompt: string;
  systemMessage?: string;
}

// Function to call the GROQ API for roadmap generation
export const callConsoleGroqApi = async (prompt: string, systemMessage?: string, temperature = 1): Promise<string> => {
  try {
    const headers = {
      "Authorization": `Bearer ${CONSOLEGROQ_API_KEY}`,
      "Content-Type": "application/json",
    };
    
    const payload = {
      "model": "llama-3.3-70b-versatile",
      "temperature": temperature,
      "max_tokens": 2048,
      "messages": [
        {"role": "system", "content": systemMessage || "Generate a personalized learning roadmap."},
        {"role": "user", "content": prompt},
      ],
    };

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling GROQ API:', error);
    throw new Error('Failed to generate content with GROQ API');
  }
};
