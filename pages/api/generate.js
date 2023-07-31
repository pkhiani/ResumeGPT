import { Configuration, OpenAIApi } from "openai";
import parsePdf from "../../parsePdf";
const multer = require("multer");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const upload = multer({ dest: "uploads/" });

export const config = {
  api: {
    bodyParser: false,
  },
};

const apiRoute = async (req, res) => {
  upload.single("resume")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    if (!configuration.apiKey) {
      res.status(500).json({
        error: {
          message:
            "OpenAI API key not configured, please follow instructions in README.md",
        },
      });
      return;
    }

    const description = "some generic description";
    // const description = req.body.description || "";
    const resumeFile = req.file;

    if (!resumeFile) {
      res.status(400).json({
        error: {
          message: "Please provide a valid resume",
        },
      });
      return;
    }

    if (description.trim().length === 0) {
      res.status(400).json({
        error: {
          message: "Please provide a valid job description",
        },
      });
      return;
    }

    const parsedResume = await parsePdf(resumeFile.path);

    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: generatePrompt(parsedResume, description),
          },
        ],
        temperature: 0.5,
      });

      return res
        .status(200)
        .json({ result: response.data.choices[0].message.content });
    } catch (error) {
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);
        res.status(error.response.status).json(error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        res.status(500).json({
          error: {
            message: "An error occurred during your request.",
          },
        });
      }
    }
  });
};

function generatePrompt(resume, description) {
  return `You work in the following way: A user can upload a pdf file of their resume, and paste a job description of a job they want to apply for. 
  You will then incorporate keywords from the job description the user provided into the user's resume, and also reword it so it is more likely to be picked up by resume screening systems.
  Here is the user's resume: ${resume}
  
  Here is the job description the user wants to apply for: ${description}.
  
  As the final output from you, provide only the tailored 'Work Experience' section of the resume, and give comparisons of the original to the tailored one.`;
}

export default apiRoute;
