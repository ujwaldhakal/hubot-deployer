# Trigger Github Action With Slack Bot

This repo uses Hubot with Slack to trigger Github Action. In this repo a basic deployment is taken out via SSH where the branch and environment name is passed via slack bot in the form of commands like
`@bot deploy api master to production`. Where api is the name of service that, master is the branch & production is environment

## Installation
- Clone this repo `git clone git@github.com:ujwaldhakal/hubot-deployer.git`
- Install NPM with `npm install`
- 
- Copy env.example to .env with `cp .env.example .env` replace env value with your actual ones

## Usage
- `HUBOT_SLACK_TOKEN=$token ./bin/hubot --adapter slack` run this to start the bot where $token is the token you get from the installing hubot on your slack 


## Project Structure
Almost everything consists on this project is default boilerplate from installing [Hubot](https://github.com/hubotio/hubot#readme). Most of the time we will only modif the file `bot.js` which is located inside `scripts` folder.




