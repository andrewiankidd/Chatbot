import 'dotenv/config'
import express from 'express';
import ejs from 'ejs';
import path from 'path';
import sassMiddleware from 'node-sass-middleware';
import { AIMessage } from 'langchain/schema';
import showdown from 'showdown';
import openaihelper from './lib/openaihelper';
import openaidummy from './lib/openaihelper.dummy';
import websockethelper from './lib/websockethelper';

// declarations
const app = express();
const oaihelper = new openaihelper();
const wshelper = new websockethelper();
const markdownConverter = new showdown.Converter();

// vars
const assetsDirectory = process.env.NODE_ENV === 'localhost' ? path.join(__dirname, '..', 'dist') : __dirname

// html
app.engine('html', ejs.renderFile);
app.set('views', __dirname + '/views');

// sass
app.use(
    '/static/css',
    sassMiddleware({
        src: path.join(__dirname, 'scss'),
        dest: path.join(assetsDirectory, 'static', 'css'),
        debug: process.env.NODE_ENV === 'localhost',
        outputStyle: process.env.NODE_ENV === 'localhost' ? 'expanded' : 'compressed'
    }),
    express.static(path.join(assetsDirectory, 'static', 'css')
));

// js
app.use(
    '/static/scripts',
    express.static(path.join(__dirname, 'scripts'))
)

// routes
app.get('/', (req, res) => {

    wshelper.on('onMessage', (messagePayload, metadata) => {
        if (messagePayload.message) {
            oaihelper.humanMessage(messagePayload.message).then((response: AIMessage) => {
                console.log('Response:', response);
                const parsed = markdownConverter.makeHtml(response.content.toString())
                const responsePayload = {
                    type: 'chatbot',
                    message: parsed
                }
                wshelper.sendMessage(JSON.stringify(responsePayload), metadata)
            });
        }
    })

	res.render('index.html');
});

// init
app.listen(process.env.EXPRESS_PORT, () => {
  	return console.log(`Express is listening at http://localhost:${process.env.EXPRESS_PORT}`);
});
