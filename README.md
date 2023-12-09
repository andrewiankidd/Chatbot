# Chatbot

> :warning: **This readme was generated with GPT**

Chatbot is a simple GPT (Generative Pre-trained Transformer) frontend that allows users to interact with a language model. It is built using Node.js, LangChain, and WebSockets.

## Features

- Real-time chat interface
- Seamless integration with GPT language model
- Interactive and dynamic conversation experience
- Supports multi-turn conversations
- User-friendly interface for easy communication

## Prerequisites

Before running the Chatbot frontend, ensure that you have the following dependencies installed:

- Node.js (v20.0.0 or later)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/andrewiankidd/chatbot.git
   ```

2. Install the required packages:

   ```bash
   cd chatbot
   npm install
   ```

## Configuration

1. Create an `.env` file, use `.env.example` as a template

2. Set the appropriate values for the following configuration variables:

   - `langchainEndpoint`: The URL endpoint for the LangChain API.
   - `langchainApiKey`: The API key for accessing the LangChain service.
   - `gptModelName`: The name of the GPT language model to be used.

## Usage

1. Start the Chatbot server:

   ```bash
   npm run serve
   ```

2. Access the Chatbot frontend by opening `http://localhost:3000` in your web browser.

3. Enter your message in the chat interface and press Enter to send it.

   - To send a user message, simply type your text and press Enter.
   - To end a conversation, input `/end` and press Enter.

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).