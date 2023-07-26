# ResumeGPT: Tailor your resume using AI

## About

A web application to tailor a resume to a given job description using [OpenAI's GPT-3.5 API](https://platform.openai.com/docs/quickstart). It uses the [Next.js](https://nextjs.org/) framework with [React](https://reactjs.org/) and [Tailwind CSS](https://tailwindcss.com/).

## Setup

1. If you don’t have Node.js installed, [install it from here](https://nodejs.org/en/) (Node.js version >= 14.6.0 required)

2. Clone this repository

3. Navigate into the project directory

   ```bash
   $ cd ResumeGPT
   ```

4. Install the requirements

   ```bash
   $ npm install
   ```

5. Make a copy of the example environment variables file

   On Linux systems: 
   ```bash
   $ cp .env.example .env
   ```
   On Windows:
   ```powershell
   $ copy .env.example .env
   ```
6. Add your [API key](https://platform.openai.com/account/api-keys) to the newly created `.env` file

7. Run the app

   ```bash
   $ npm run dev
   ```

You should now be able to access the app at [http://localhost:3000](http://localhost:3000)

## Contributors
* [Kirill Lazarev](https://github.com/k-laz)
* [Pavan Khiani](https://github.com/pkhiani)

## License
Distributed under the MIT License. See [LICENSE](https://github.com///blob/main/LICENSE.md) for more information.
