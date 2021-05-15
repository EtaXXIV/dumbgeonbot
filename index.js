const Discord = require("discord.js");
const client = new Discord.Client();
const { Client, Intents, MessageEmbed } = require('discord.js');
client.on("ready", () => {
  console.log("Initialized!");
  client.user.setActivity('the universe', { type: 'PLAYING' })
});
const Database = require("@replit/database")
const db = new Database()
// Set the prefix


class Weapon {
  constructor(dmg, rarity, type, name) {
    this.dmg = dmg;
    this.rarity = rarity;
    this.type = type;
    this.name = name;
  }

}
class Armor {
  constructor(health, rarity, type, name) {
    this.health = health;
    this.rarity = rarity;
    this.type = type;
    this.name = name;
  }
}
class Enemy{
  constructor(health, dmg, type, name){
    this.health = health;
    this.dmg = dmg;
    this.type = type;
    this.name = name;
  }
}


const weapons = 
[
new Weapon(60, "Rare", "Bow", "Spider Bow"),
new Weapon(60, "Rare", "Bow", "Spider Bow"),
new Weapon(140, "Legendary", "Bow", "Laser Bow"),
new Weapon(30, "Common", "Bow", "Dead Bow"),
new Weapon(30, "Common", "Bow", "Dead Bow"),
new Weapon(30, "Common", "Bow", "Dead Bow"),
new Weapon(30, "Common", "Bow", "Dead Bow"),
new Weapon(20, "Common", "Sword", "Rusty Sword"),
new Weapon(20, "Common", "Sword", "Rusty Sword"),
new Weapon(20, "Common", "Sword", "Rusty Sword"),
new Weapon(1, "Common", "Sword", "Broken Blade"),
new Weapon(1, "Common", "Sword", "Broken Blade"),
new Weapon(30, "Uncommon", "Hammer", "Steel Hammer"),
new Weapon(30, "Uncommon", "Hammer", "Steel Hammer"),
new Weapon(40, "Uncommon", "Axe", "Gilded Axe"),
new Weapon(45, "Rare", "Axe", "Molten Axe"),
new Weapon(45, "Rare", "Axe", "Molten Axe"),
new Weapon(170, "Legendary", "Sword", "Legionnaire's Mithril Claymore"),
new Weapon(120, "Legendarty", "Sword", "Winterthorn Axe"),
new Weapon(45, "Uncommon", "Sword", "Gilded Sword"),
new Weapon(45, "Uncommon", "Sword", "Gilded Sword"),
new Weapon(200, "Mythic", "Axe", "Cursed Reaver"),
new Weapon(30, "Uncommon", "Sword", "Cresent Blade"),
new Weapon(45, "Rare", "Hammer", "Gladiator Hammer"),
]

const commonWeapons = [
new Weapon(25, "Common", "Sword", "Rusty Sword"),
new Weapon(50, "Common", "Bow", "Short Bow"),
]
const armor =
[
new Armor(3000, "Legendary", "Eldritch", "Two-Piece Red Suit"),
new Armor(200, "Uncommon", "Magic", "Hat of Blades"),
new Armor(600, "Rare", "Normal", "Iron Arm"),
new Armor(600, "Rare", "Normal", "Steel Shoulder"),
new Armor(600, "Rare", "Normal", "Bronze Guard"),
new Armor(1000, "Legendary", "Eldritch", "Obsidian Blight"),
new Armor(100, "Common", "Normal", "Old Tunic"),
new Armor(100, "Common", "Normal", "Old Tunic"),
new Armor(800, "Rare", "Magic", "Prison's Limbo"),
new Armor(150, "Common", "Normal", "Metal Guard"),
new Armor(150, "Common", "Normal", "Metal Guard"),
new Armor(150, "Common", "Normal", "Warrior Helm"),
]
const enemies =
[
  new Enemy(800, 10, "normal", "Smol Slime"),
  new Enemy(1500, 20, "normal", "Bog Slime"),
  new Enemy(900, 15, 'normal', "Skeleton Warrior"),
  new Enemy(600, 20, 'normal', "Skeleton Archer")

]

const healevents = [
  "You step in some magical goo. +", "A small flask of flintstone gummies is behind a rock. +"
]
//function Damaged(username, message){
    //console.log(username);
    //let name = username + "playerdata";
    //console.log("damaged" + username + "for 10")
    //db.get(name).then(function(result){
      ///let decodedvalues = result;
     // console.log(decodedvalues);
      //health = decodedvalues[0];
     // weaponID = decodedvalues[1];
     // armorID = decodedvalues[2];
     // maxhealth = decodedvalues[3];
     // health -= 10;
     // newvalues = [health, weaponID, armorID, maxhealth];
      //db.set(name, newvalues);
   // });
    //const embed = new MessageEmbed()
      // Set the title of the field
     // .setTitle('Encounter')
      // Set the color of the embed
      //.setColor(0xff0000)
      // Set the main content of the embed
     // .setDescription("For some reason, a small lizard bites " + username + ". -10 Health");
    // Send the embed to the same channel as the message
   // message.channel.send(embed);
    
  //}
function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function updateHealth(username){
}

function Fight(username, message){
  updateHealth(username);
  enemy = enemies[getRandomInt(enemies.length)];
  let name = username + "playerdata";
  const embed = new MessageEmbed()
      .setTitle('Enemy Encounter')
      .setColor(0xff0000)
      .setDescription(username + " encounters a " + enemy.name + ".");
    message.channel.send(embed);
    
    db.get(name).then(function(result){
     while (enemy.health > 0 || result[0] > 0) {
      let enemycritdamage = enemy.dmg * Math.random();
      let fullenemydamage = enemy.dmg + Math.round(enemycritdamage);
      result[0]-= fullenemydamage;
      encoded = [result[0], result[1],result[2],result[3]];
      db.set(name, encoded);
      let critdamage = weapons[result[1]].dmg * Math.random();
      
      fulldamage = weapons[result[1]].dmg + Math.round(critdamage);
      enemy.health -= fulldamage;
      
      if(Math.random() > 0.6){
      message.channel.send(username + " attacks " + enemy.name + " for " + fulldamage  + ". The " + enemy.name + " counter attacks for " + fullenemydamage);
      }

      if(enemy.health < 1){
      goldgained = Math.round(enemy.dmg * Math.abs(Math.random())*4);
      addMoney(username, goldgained);
      const embed2 = new MessageEmbed()
      .setTitle('Victory!')
      .setColor(0xff0000)
      .setDescription(username + " defeated the " + enemy.name + ". You gained " + goldgained + " gold!");
      message.channel.send(embed2);
      return;
      }
      else if(result[0] < 1){
      goldname = username+"g"
      db.get(goldname).then(function(gold){
       totalremoved = Math.round(gold * 0.25);
      db.set(goldname, gold-totalremoved);
      const embed3 = new MessageEmbed()
      .setTitle('Death')
      .setColor(0xff0000)
      .setDescription(username + " was defeated by the " + enemy.name + ". You lost " + totalremoved +" Gold");
      message.channel.send(embed3);
  });
      return;

      }

      
    }
  })

}


function weaponEncounter(username, message){
  let name = username + "playerdata";
  db.get(name).then(function(data){
  data[1]=getRandomInt(weapons.length);
  db.set(name, data);
  const embed3 = new MessageEmbed()
      .setTitle('Find!')
      .setColor(0xff0000)
      .setDescription("You found a " + weapons[data[1]].rarity + " " + weapons[data[1]].name);
      message.channel.send(embed3);
});
}
function weaponBuy(username, message){
  let name = username + "playerdata";
  db.get(name).then(function(data){
    db.get(goldname).then(function(data2){
    if(data2<= 100){
        const notenough = new MessageEmbed()
      .setTitle('You poor!')
      .setColor(0xff0000)
      .setDescription("You don't have enough. Git rich.");
      message.channel.send(notenough);
      return;
      }
  data[1]=getRandomInt(weapons.length);
  db.set(name, data);
  db.set(goldname, data2-=100);
  const embed3 = new MessageEmbed()
      .setTitle('Buy!')
      .setColor(0xff0000)
      .setDescription("You bought a " + weapons[data[1]].rarity + " " + weapons[data[1]].name + " for -100 gold.");
      message.channel.send(embed3);
});
});
}

function armorEncounter(username, message){
  let name = username + "playerdata";
  db.get(name).then(function(data){
  data[2]=getRandomInt(armor.length);
  db.set(name, data);
  const embed3 = new MessageEmbed()
      .setTitle('Find!')
      .setColor(0xff0000)
      .setDescription("You found a " + armor[data[2]].rarity + " " + armor[data[2]].name);
      message.channel.send(embed3);
});
}
function armorBuy(username, message){
  let name = username + "playerdata";
  db.get(name).then(function(data){
  data[2]=getRandomInt(armor.length);
  db.set(name, data);
  const embed3 = new MessageEmbed()
      .setTitle('Buy!')
      .setColor(0xff0000)
      .setDescription("You bought a " + armor[data[2]].rarity + " " + armor[data[2]].name);
      message.channel.send(embed3);
});
}
function healEncounter(username, message){
  let name = username + "playerdata";
  db.get(name).then(function(data){
  data[0] = clamp(data[0] + getRandomInt(data[3]*0.8), 0, data[3]);
  db.set(name, data);
  const embed3 = new MessageEmbed()
      .setTitle('Find!')
      .setColor(0xff0000)
      .setDescription(healevents[getRandomInt(healevents.length)] + data[0]);
      message.channel.send(embed3);
});
}

function healBuy(username, message){
  let name = username + "playerdata";
  goldname = username+"g"
  db.get(name).then(function(data){
    db.get(goldname).then(function(data2){
      if(data2<= 20){
        const notenough = new MessageEmbed()
      .setTitle('You poor!')
      .setColor(0xff0000)
      .setDescription("You don't have enough. Git rich.");
      message.channel.send(notenough);
      return;
      }
      db.set(goldname, data2-=20);
  data[0] = clamp(data[0] + getRandomInt(data[3]*0.8), 0, data[3]);
  db.set(name, data);
  const embed3 = new MessageEmbed()
      .setTitle('Buy!')
      .setColor(0xff0000)
      .setDescription("You healed for +" + data[0]+ ". -20 gold.");
      message.channel.send(embed3);
});
});
}

var encounters = [
  weaponEncounter, healEncounter, Fight, Fight, armorEncounter, Fight,Fight,Fight,Fight,
]

function setMoney(username, value){
  goldname = username+"g"
  db.set(goldname, value);
}
function addMoney(username, value){
  goldname = username+"g"
  db.get(goldname).then(function(gold){
    db.set(goldname, gold+value);
  });
}




const prefix = "!";
client.on("message", message => {
  if (message.author.bot) return;
  // This is where we'll put our code.
  if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let unbogled = message.author.username.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
 
  if(command === 'register') {
    updateHealth(message.author.username);
    message.reply(`Registering ${message.author.username}!`);  
    message.reply(db.list());
    let health = 100;
    let maxhealth = 100
    let weaponID = 1;
    let armorID = 1;
    const values = [health, weaponID, armorID, maxhealth];
    db.set(message.author.username + "playerdata", values);
    setMoney(message.author.username, 100);
  }
  if(command === 'stats'){
    let name = message.author.username + "playerdata";
    let goldname = message.author.username+"g"
    let extractedvalues = null;
    db.get(name).then(function(results){
    db.get(goldname).then(function(gold){
      fullhealth = 100 + armor[results[2]].health;
      results[3]=fullhealth;
      db.set(name, results)
      fancyvalues = [results[0] + " Health", fullhealth + " Max Health",weapons[results[1]].name, armor[results[2]].name, gold + " Gold"];
    const embed = new MessageEmbed()
      .setTitle('Stats')
      .setColor(0xff0000)
      .setDescription(fancyvalues)
    message.channel.send(embed);
    });
  });
    
    
  }
  if(command === "consolelog"){
    let name = message.author.username + "playerdata";
    db.list().then(function(list){
      for(x in list){
        console.log(list[x]);
        db.get(list[x]).then(function(list){
          console.log(list[0])
        })
      }
    });
  }
  if(command === 'deleteallusers'){
    
    for(key in db){
      db.empty();
       message.reply(`Done!`);  
    }
  }

  if(command === 'encounter'){
    encounters[getRandomInt(encounters.length)](message.author.username, message);
  }
  if(command === 'healadmin'){
    let name = message.author.username + "playerdata";
    if (!message.member.hasPermission("ADMINISTRATOR")){
      const notadmin = new MessageEmbed()
      .setTitle('No')
      .setColor(0xff0000)
      .setDescription('Ehh you not admin ' + message.author.username);
      message.channel.send(notadmin);
      return;
    }
      db.get(name, { raw: false }).then(function(result) {
      result[0]=result[3];
      db.set(name, result);
      });
  
};
if(command === 'shop'){
    const shopembed = new MessageEmbed()
      .setTitle('Shop')
      .setColor(0xff0000)
      .setDescription(":heart: is healing for 20 gold\n:crossed_swords: is rerolling weapon for 100 gold")
    message.channel.send(shopembed).then(sentEmbed => {
    sentEmbed.react('❤️');
    sentEmbed.react('⚔️');
   //message.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '️️️❤️' || reaction.emoji.name == '️️️⚔️'),
  //{ max: 1, time: 5000 }).then(collected => {
    //if(reaction.emoji.name == '️️️❤️'){
    //healBuy(message.author.username, message);
    //return;
    //}
    //if(reaction.emoji.name == '️️️⚔️'){
    //  console.log("boughtweapon");
     // weaponBuy(message.author.username, message);
     // return;
   // }
   // }).catch(() => {
   // message.reply('Shop Closed');
   // })
   sentEmbed.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '❤️' || reaction.emoji.name == '⚔️' || reaction.emoji.name == '️️🛡️'),
  { max: 1, time: 5000 }).then(collected => { 
    if(reaction.emoji.name == '️️️❤️'){
    healBuy(message.author.username, message);
    return;
    }
    if(reaction.emoji.name == '️️️⚔️'){
      console.log("boughtweapon");
      weaponBuy(message.author.username, message);
      return;
    }
  }).catch(() => {
    message.reply('Shop Closed');
});
});
}});
client.login(process.env.TOKEN);