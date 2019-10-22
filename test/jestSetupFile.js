import sinon from "sinon";

/**
 * Mocking legacy code global objects/functions required for our
 * Jest tests to run. This also applies to browser API.
 */

const fakeServer = sinon.fakeServer.create();

fakeServer.respondWith("GET", /\/game\.json/, [
  200,
  { "Content-Type": "application/json" },
  JSON.stringify({
    data: [
      { id: "1", display: "the last stand" },
      { id: "5", display: "portal" },
      { id: "8", display: "shift 4" },
      { id: "9", display: "storm the house 3" },
      { id: "10", display: "palisade guardian" },
      { id: "11", display: "super mafia land" },
      { id: "12", display: "rage 3" },
      { id: "14", display: "snowboard slope" },
      { id: "16", display: "last touchdown" },
      { id: "17", display: "tuberacer" },
      { id: "18", display: "canyon shooter" },
      { id: "19", display: "pyro" },
      { id: "22", display: "bubble tanks 2" },
      { id: "24", display: "protector III" },
      { id: "25", display: "crush the castle" },
      { id: "27", display: "power tank" },
      { id: "28", display: "amateur surgeon" },
      { id: "29", display: "medieval golf" },
      { id: "31", display: "break the wall" },
      { id: "33", display: "rihanna's revenge" },
      { id: "34", display: "aero acrobat" },
      { id: "35", display: "bar b que" },
      { id: "36", display: "bombardment" },
      { id: "38", display: "gaps solitaire" },
      { id: "39", display: "gold panic" },
      { id: "40", display: "golf solitaire" },
      { id: "41", display: "hex mines" },
      { id: "42", display: "jet fighter" },
      { id: "45", display: "pizza pronto" },
      { id: "46", display: "the primitive" },
      { id: "47", display: "sea of fire" },
      { id: "48", display: "sea of fire 2" },
      { id: "49", display: "the curve ball" },
      { id: "50", display: "multitask" },
      { id: "51", display: "retro rally" },
      { id: "52", display: "helicopter" },
      { id: "53", display: "dogfight" },
      { id: "54", display: "presidential paintball" },
      { id: "56", display: "deluxe pool" },
      { id: "57", display: "bubble trouble" },
      { id: "58", display: "black knight" },
      { id: "59", display: "bloxorz" },
      { id: "60", display: "age of war" },
      { id: "62", display: "warzone tower defense" },
      { id: "63", display: "doom hexen heretic" },
      { id: "64", display: "epic war 2" },
      { id: "65", display: "warfare 1917" },
      { id: "66", display: "paladin" },
      { id: "67", display: "sinmark" },
      { id: "68", display: "battleships" },
      { id: "69", display: "governor of poker" },
      { id: "70", display: "juggerdome" },
      { id: "71", display: "gemcraft chapter 0" },
      { id: "72", display: "free rider 2" },
      { id: "73", display: "sandstorm racing" },
      { id: "74", display: "goal in one" },
      { id: "75", display: "heat rush" },
      { id: "76", display: "deal or no deal" },
      { id: "77", display: "sift heads 5" },
      { id: "78", display: "zombie baseball 2" },
      { id: "79", display: "crow in hell 3" },
      { id: "80", display: "extreme pamplona" },
      { id: "81", display: "laserworx" },
      { id: "83", display: "canyon defense" },
      { id: "84", display: "boxhead 2" },
      { id: "85", display: "war machine" },
      { id: "86", display: "icycle" },
      { id: "87", display: "diesel and death" },
      { id: "88", display: "jungle truck" },
      { id: "89", display: "ragdoll avalanche 2" },
      { id: "90", display: "ragdoll master" },
      { id: "91", display: "field command 2" },
      { id: "92", display: "invasion 3" },
      { id: "93", display: "kanye vs taylor" },
      { id: "94", display: "the last stand 2" },
      { id: "95", display: "epsilon" },
      { id: "96", display: "race to kill" },
      { id: "97", display: "arsenal 2" }
    ]
  })
]);

fakeServer.respondWith("GET", /\/category\.json/, [
  200,
  { "Content-Type": "application/json" },
  JSON.stringify({
    data: [
      { id: "1", display: "sport" },
      { id: "2", display: "puzzle" },
      { id: "3", display: "shooting" },
      { id: "4", display: "racing" },
      { id: "5", display: "dress up" },
      { id: "6", display: "classic" },
      { id: "7", display: "action" },
      { id: "8", display: "kid" },
      { id: "9", display: "funny" },
      { id: "10", display: "NSFW" },
      { id: "11", display: "card" },
      { id: "12", display: "strategy" },
      { id: "13", display: "skill" },
      { id: "14", display: "tower defense" },
      { id: "15", display: "nintendo" },
      { id: "16", display: "girl" },
      { id: "17", display: "video" },
      { id: "18", display: "multiplayer" },
      { id: "19", display: "terrorism" },
      { id: "21", display: "halloween" }
    ]
  })
]);

fakeServer.respondWith("GET", /\/tag\.json/, [
  200,
  { "Content-Type": "application/json" },
  JSON.stringify({
    data: [
      { id: "1", display: "zombie" },
      { id: "2", display: "classic" },
      { id: "3", display: "motorcycle" },
      { id: "4", display: "war" },
      { id: "5", display: "castle" },
      { id: "6", display: "hitman" },
      { id: "7", display: "stickman" },
      { id: "8", display: "celebrity" },
      { id: "9", display: "tv show" },
      { id: "10", display: "bicycle" },
      { id: "11", display: "ice" },
      { id: "12", display: "restaurant" },
      { id: "13", display: "bomb" },
      { id: "14", display: "platform" },
      { id: "15", display: "bow" },
      { id: "16", display: "parachute" },
      { id: "17", display: "soccer" },
      { id: "18", display: "winter" },
      { id: "19", display: "space" },
      { id: "20", display: "pool" },
      { id: "21", display: "american football" },
      { id: "22", display: "snowboard" },
      { id: "23", display: "arena" },
      { id: "24", display: "laser" },
      { id: "25", display: "ship" },
      { id: "26", display: "tank" },
      { id: "27", display: "bridge" },
      { id: "28", display: "desert" },
      { id: "29", display: "battlefield" },
      { id: "30", display: "gem" },
      { id: "31", display: "turret" },
      { id: "32", display: "fire" },
      { id: "33", display: "mage" },
      { id: "34", display: "futuristic" },
      { id: "35", display: "obstacle course" },
      { id: "36", display: "plane" },
      { id: "37", display: "helicopter" },
      { id: "38", display: "ball" },
      { id: "39", display: "hockey" },
      { id: "40", display: "surgery" },
      { id: "42", display: "balloon" },
      { id: "43", display: "catapult" },
      { id: "44", display: "monster" },
      { id: "45", display: "car" },
      { id: "46", display: "army" },
      { id: "47", display: "jungle" },
      { id: "48", display: "water" },
      { id: "49", display: "box" },
      { id: "50", display: "politics" },
      { id: "51", display: "poker" },
      { id: "52", display: "penguin" },
      { id: "53", display: "sniper" },
      { id: "54", display: "death" },
      { id: "55", display: "role playing game (RPG)" },
      { id: "56", display: "paintball" },
      { id: "57", display: "snow" },
      { id: "58", display: "jet" },
      { id: "59", display: "golf" },
      { id: "60", display: "swordman" },
      { id: "61", display: "medieval" },
      { id: "62", display: "monkey" },
      { id: "63", display: "dart" },
      { id: "64", display: "drawing" },
      { id: "65", display: "dragon" },
      { id: "66", display: "robot" },
      { id: "67", display: "clothes" },
      { id: "68", display: "cartoon" },
      { id: "69", display: "japanese" },
      { id: "70", display: "hotel" },
      { id: "71", display: "escape" },
      { id: "72", display: "cannon" },
      { id: "73", display: "pirate" },
      { id: "74", display: "word" },
      { id: "75", display: "beach" },
      { id: "76", display: "terrorism" },
      { id: "77", display: "babes" },
      { id: "78", display: "hunting" },
      { id: "79", display: "super hero" }
    ]
  })
]);

fakeServer.respondWith("GET", /\/null\.json/, [
  200,
  { "Content-Type": "application/json" },
  JSON.stringify(null)
]);

fakeServer.respondWith("GET", /\/empty\.json/, [
  200,
  { "Content-Type": "application/json" },
  JSON.stringify([])
]);

fakeServer.respondWith("GET", /\/groups\.json/, [
  200,
  { "Content-Type": "application/json" },
  JSON.stringify({
    group1: ["group1-item1", "group1-item2", "group1-item3"],
    group2: ["group2-item1", "group2-item2", "group2-item3"],
    group3: ["group3-item1", "group3-item2", "group3-item3"]
  })
]);

fakeServer.autoRespond = true;
