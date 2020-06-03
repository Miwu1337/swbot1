const Discord = require("discord.js");
var fs = require("fs");
const config = require("./config.json");

const client = new Discord.Client();

client.commands = new Discord.Collection();

fs.readdir("./komendy", (err, files) =>{
    if(err) console.log(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");

    if(jsfiles.length <= 0){
        console.log("Wystąpił błąd bota :c Folder ./komendy/ jest pusty...");
    }

    jsfiles.forEach((f) =>{
        let props = require(`./komendy/${f}`);
        client.commands.set(props.help.name,props)
    })
})


client.on("ready",() => {
    console.log("Bot is ready!")
    client.user.setActivity("Ciebie ( ͡° ͜ʖ ͡°)",{type: 'WATCHING'});
})

client.on("message", async message =>{

    if(message.isMentioned(client.user)) return message.channel.send(mentioned);

    if(message.content === "ping")return message.channel.send("Pong!")

    let prefix = config.prefix;
    if (!message.content.startsWith(prefix)) reutrn;    
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(client,message,args);
});


client.login(config.token);

const mentioned = new Discord.MessageEmbed()
.setColor('#e60e0e')
.setAuthor(client.tag, client.avatarURL)
.setTitle(`Wykryto wzmiankę bota.`)
.setDescription(`Prefix \`sw!\`\nAuthor: \`Miwu#2137\` `)
.setTimestamp();
