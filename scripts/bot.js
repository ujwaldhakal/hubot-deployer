require('dotenv').config()
const axios = require('axios')
const validServices = ['api','app']
const validEnvironments = ['dev','production']

const token  = process.env.GITHUB_TOKEN;

module.exports = async (robot) => {
  robot.hear (`@${process.env.BOT_ID}`,async (bot) => {
 //   @deploy api master to staging
    const payload = bot.message.text.split(" ")
    console.log('got text',payload);
    const service = payload[2];
    const branch = payload[3];
    const environment = payload[5];
    const username = bot.message.user.name;
    bot.send(`Roger that! Please wait.`);

    if(!validateCommand(bot,username,service,branch,environment)) {
      return;
    }

    await triggerWorkflow(bot,username,service,environment,branch)

    bot.send(`Github Action has been triggered successfully`);

  })




  const validateCommand = (bot,username,service,branch,environment) => {

    if(!validServices.includes(service)) {
       bot.send(`${service} is not availble, Only ${validServices.join(', ')} are available`);
      return false;
      }

      if(!validEnvironments.includes(environment)) {
        bot.send(`${environment} is not availble. Only ${validEnvironments.join(', ')} are available`);
        return false;
      }

      return true;
  }


  const  triggerWorkflow = async (bot,username,service,environment, branch) => {
    try {
      const data = await axios.post(`https://api.github.com/repos/ujwaldhakal/hubot-deployer/dispatches`,{
        'event_type': 'deploy-service',
        'client_payload': {'environment': environment, 'ref': branch}
      },{headers:{
      Authorization: `token ${token}`,
      }})
    }
      catch(e) {
        bot.send(`Sorry @${username} could not trigger github action. Please check my logs ${e.message}`);
      }
  }
}