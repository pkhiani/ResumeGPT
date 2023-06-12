import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const resume = req.body.resume || "";
  const description = req.body.description || "";

  if (resume.trim().length === 0) {
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

  try {
    // const response = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: generatePrompt(resume, description),
    //   temperature: 0.6,
    // });

    // const completion = response.data.choices[0].text.trim();

    // console.log(completion);
    // res.status(200).json({ result: completion });
    console.log(resume);
    res.status(200).json({ result: resume });
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
}

function generatePrompt(resume, description) {
  return `Tailor my resume: ${resume} to my job description: ${description}`;
}
