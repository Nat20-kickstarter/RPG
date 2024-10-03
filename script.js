const gameOutput = document.getElementById("gameOutput");
const userInput = document.getElementById("userInput");

const startingText = "Welcome to the Realm of Rim, a land of magic and mystery. Type 'look' to explore your surroundings or 'help' for commands.";
let gameState = "start"; // Variable to keep track of the game state

// Scenarios, monsters, and locations
const locations = [
    "mystical forest", 
    "crumbling ruins", 
    "dark cave", 
    "peaceful village", 
    "ancient temple", 
    "shimmering lake", 
    "haunted graveyard", 
    "snowy mountains", 
    "fiery volcano", 
    "enchanted garden"
];

const monsters = [
    { name: "Goblin", description: "A small, green creature with a mischievous grin." },
    { name: "Orc", description: "A hulking brute with a thirst for battle." },
    { name: "Troll", description: "A large, slow creature that guards its territory." },
    { name: "Dragon", description: "A mighty beast with scales of iron and breath of fire." },
    { name: "Ghost", description: "The restless spirit of a long-lost soul." },
    { name: "Vampire", description: "A creature of the night, lurking in the shadows." },
    { name: "Witch", description: "A sorceress with a cauldron of dark magic." },
    { name: "Giant Spider", description: "A terrifying arachnid with venomous fangs." },
    { name: "Elemental", description: "A being of pure magic, embodying fire, water, or air." },
    { name: "Skeletal Warrior", description: "An animated skeleton, wielding a rusty sword." }
];

// Encounters
const encounters = [
    { description: "You encounter an Ancient Spirit who offers you knowledge about the realm.", actions: ["Listen", "Ignore"] },
    { description: "A treasure hunter has awakened a guardian spirit.", actions: ["Help", "Steal"] },
    { description: "A swirling portal appears, leading to an unknown realm.", actions: ["Enter", "Leave"] },
    { description: "You find a frightened child who has wandered away from home.", actions: ["Help", "Leave"] },
    { description: "You discover a glowing artifact that seems to pulse with energy.", actions: ["Touch it", "Leave it"] },
    { description: "You need to cross a turbulent river guarded by water spirits.", actions: ["Attempt to cross", "Search for a bridge"] },
    { description: "You are surrounded by bandits demanding your valuables.", actions: ["Fight", "Negotiate"] },
    { description: "You find a legendary knight's armor, abandoned and rusted.", actions: ["Take the armor", "Leave it"] },
    { description: "You enter a cave where your thoughts echo back at you.", actions: ["Speak your thoughts", "Leave quickly"] },
    { description: "A giant is crying over a lost friend; he needs help finding them.", actions: ["Assist him", "Run away"] },
    { description: "A bard offers to sing a song for a small fee.", actions: ["Pay for the song", "Decline"] },
    { description: "A mysterious merchant sells magical potions that may have unknown effects.", actions: ["Buy a potion", "Refuse"] },
    { description: "You stumble upon an ancient battlefield haunted by the spirits of fallen warriors.", actions: ["Investigate", "Leave"] },
    { description: "You discover ancient paintings that tell stories of great heroes.", actions: ["Study the paintings", "Ignore them"] },
    { description: "A group of fairies dances under the moonlight, inviting you to join.", actions: ["Join the dance", "Watch from afar"] },
    { description: "You explore the ruins of a once-great city, now overrun by nature.", actions: ["Search for treasures", "Rest"] },
    { description: "A fire elemental appears, challenging you to a duel.", actions: ["Fight", "Reason with it"] },
    { description: "A statue comes to life, guarding an entrance to a hidden treasure.", actions: ["Attempt to pass", "Engage it"] },
    { description: "A fae offers you a riddle to solve for a reward.", actions: ["Solve the riddle", "Walk away"] },
    { description: "You find an abandoned cart filled with supplies.", actions: ["Take what you need", "Leave it"] },
    { description: "You drink from a sparkling stream that enhances your abilities temporarily.", actions: ["Drink", "Avoid"] },
    { description: "You discover massive footprints leading into the forest.", actions: ["Follow the tracks", "Ignore them"] },
    { description: "A cauldron bubbles with a strange potion; you feel drawn to it.", actions: ["Taste the potion", "Leave it"] },
    { description: "A pack of wolves approaches, sensing your presence.", actions: ["Scare them away", "Prepare to fight"] },
    { description: "A cloaked figure offers you a choice between two paths.", actions: ["Choose a path", "Ask for more information"] },
    { description: "A rare celestial event occurs, granting you a temporary power boost.", actions: ["Harness the power", "Ignore it"] },
    { description: "You enter a part of the forest where time seems to stand still.", actions: ["Explore deeper", "Turn back"] },
    { description: "You gaze into a lake that reflects your deepest desires.", actions: ["Gaze into the lake", "Walk away"] },
    { description: "You stumble upon a market run by goblins selling unusual items.", actions: ["Browse their wares", "Leave"] },
    { description: "A mighty creature blocks your way, demanding a tribute.", actions: ["Offer something of value", "Attempt to pass without giving"] }
];

let currentEncounter = null;

// Initialize the game
gameOutput.value = startingText + "\n> ";
userInput.focus();

userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        const input = userInput.value.trim().toLowerCase();
        userInput.value = ""; // Clear input
        processInput(input);
    }
});

function processInput(input) {
    let output = "";

    switch (gameState) {
        case "start":
            if (input === "look") {
                output = "You stand at the edge of a mystical forest. Tall trees surround you, their leaves shimmering with an ethereal glow. What will you do?";
                gameState = "exploring";
            } else if (input === "help") {
                output = "Available commands: look, explore, rest, status, help.";
            } else {
                output = "Unknown command. Type 'help' for available commands.";
            }
            break;

        case "exploring":
            if (input === "look") {
                output = "The forest is alive with sounds. You can hear distant roars and the rustling of creatures. Type 'explore' to venture deeper.";
            } else if (input === "explore") {
                const randomEncounter = encounters[Math.floor(Math.random() * encounters.length)];
                output = randomEncounter.description + " What will you do? " + randomEncounter.actions.join(" or ") + ".";
                gameState = "encountered";
                currentEncounter = randomEncounter; // Save the current encounter for actions
            } else if (input === "rest") {
                output = "You take a moment to rest and recover your strength.";
            } else if (input === "status") {
                output = "You are healthy and ready for adventure.";
            } else {
                output = "Unknown command. Type 'help' for available commands.";
            }
            break;

        case "encountered":
            if (currentEncounter && input) {
                if (currentEncounter.actions.map(a => a.toLowerCase()).includes(input)) {
                    output = `You chose to ${input}.`;
                    // Here you can add further consequences based on the action
                    gameState = "exploring"; // Reset to exploring state
                } else {
                    output = "Invalid choice. " + currentEncounter.actions.join(" or ") + ".";
                }
            } else {
                output = "Unknown command.";
            }
            break;

        default:
            output = "An unexpected error occurred.";
            break;
    }

    gameOutput.value += "\n> " + input + "\n" + output + "\n> ";
    gameOutput.scrollTop = gameOutput.scrollHeight; // Scroll to bottom
    userInput.focus(); // Keep focus on input
}

// Start the game when the page loads
window.onload = () => {
    gameOutput.value = startingText + "\n> ";
};
