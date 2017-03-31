# Start coding your bot: Recast.AI + Smooch

* This is a small Tutorial to show you how to integrate Smooch to a Recast.AI bot
* If you have no idea of how to use Recast.AI I advise you to check this SDK first:  [Recast.AI-nodejs-SDK](https://github.com/RecastAI/SDK-NodeJs)

## Requirements
* Create an account on [Recast.AI](https://recast.ai/signup)
* Create an account on [Smooch](https://smooch.io)

## Get your Recast.AI bot token

* Log in to your [Recast.AI](https://recast.ai/) account
* Create your Bot
* Create intents and fill them with some expressions
* Build your conversation flow on bot builder in the 'Build' tab
* In the tab menu, click on the the little screw
* Here is the `request access token` you will need to configure your bot!

## Set up your Smooch account

* Log in to your Smooch account
* Connect a channel: the messenger channel for exemple as it's the easiest to connect.
* Go to you settings, click on 'Create a new secret key' and get your key Id and secret. We'll need them later.

  ![keyid](https://github.com/RecastAI/bot-smooch/raw/master/img/recast-ai-secret-smooch.png)

## Put your local server online with Ngrok

Whenever the bot receives a message on Smooch, We'll have to catch it.
Problem: the server will be running locally (no url) That’s why you will use ngrok which make a local server run online.

* Download [ngrok](https://ngrok.com/) and put it at the root of your folder
* run it with `./ngrok http 8080`
* Keep the secured url (https). We need it later.

	![Ngrok](https://github.com/RecastAI/Pokebot/raw/master/pictures/recast-ai-ngrok-console.png)

## Launch the bot

#### Complete the config.js file

* Clone this repository

```
git clone https://github.com/RecastAI/bot-smooch.git
```

* Fill the config.js with your tokens from smooch.io and from recast.ai

```javascript
const config =
{
	recast: {
		token: 'Recast request token',
		language: 'en',
	},
	smooch: {
  	keyId: 'Smooch keyId',
  	secret: 'Smooch secret',
  },
  port: 8080,
}
```

#### Run

* install the dependencies

```
cd bot-smooch
```
```
npm install
```

* run your bot

```
npm run start
```

## Set your webhook

* Select the webhook integration on Smooch
* In the Webhook URL field, put the url from ngrok
* Keep App User messages.
* click on 'Create a webhook'.
* From now, Every message received from channels you connected will trigger your server and your bot will reply on the same channel ;)

  ![webhook](https://github.com/RecastAI/bot-smooch/raw/master/img/recast-ai-webhook-smooch.png)

## Go further

Here is the heart of your bot. The following function is called every time your bot receives a message.
'res' is full of precious information:

* use **res.memory('notion')** to access a notion you just got in the input like a email address, a datetime etc...
* use **res.action** to get the current action according to your bot builder flow
* in **action**, you can find a done boolean to know if this action is complete according to the requirements (ex: booking need to signin, signin needs a login)
* use **res.reply()** to get the reply you've set for this action
* use **res.replies** to get an array containing the reply set for the action && the following one if the next action is complete
* use **res.nextActions** to get an array of all the following actions

For more information, please read the [SDK NodeJS documentation](https://github.com/RecastAI/SDK-NodeJS)

```javascript
const handleMessage = (message) => {
  const sender = message.messages[0].authorId
  const text = message.messages[0].text

  // CALL TO RECAST.AI: 'sender' is a unique ID of your conversation with the user
  // The conversationToken is what lets Recast.AI identify your conversation.
  // As 'sender' is what identifies your conversation with the channel used, you can use it as conversationToken.
  client.request.converseText(text, { conversationToken: sender })
  .then((res) => {
    const replies = res.replies
    const action = res.action
    console.log(replies)
    if (!replies.length) {
      sendMessage('I didn\'t understand... Sorry :(', sender)
      return
    }

    if (action && action.done) {
      // Use external services: use res.memory('notion') if you got a notion from this action
    }

    replies.forEach(reply => sendMessage(reply, sender))
  })
  .catch(() => {
    sendMessage('I need some sleep right now... Talk to me later!', sender)
  })
}
```

## Authors

Hugo Cherchi, hugo.cherchi@recast.ai

Marian André, marian.andre@recast.ai

You can follow us on Twitter at [@recastai](https://twitter.com/recastai) for updates and releases.

## License

Copyright (c) [2016] [Recast.AI](https://recast.ai)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
