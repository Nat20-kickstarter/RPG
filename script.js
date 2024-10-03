let storyText = "";
let choices = [];
let playerHealth = 100;
let playerMana = 50;
let questActive = false;

function startGame() {
    playerHealth = 100; // Reset health
    playerMana = 50; // Reset mana
    questActive = false; // Reset quest state
    storyText = "You are a nomadic knight wandering the enchanted realm of Eldoria. You can feel the magic in the air. What will you do?";
    choices = [
        { text: "Venture into the Mystic Forest", next: enterForest },
        { text: "Travel to the nearby village", next: visitVillage }
    ];
    updateGame();
}

function enterForest() {
    storyText = "As you step into the Mystic Forest, you hear rustling in the bushes. Do you want to investigate or continue deeper?";
    choices = [
        { text: "Investigate the rustling", next: investigateRustling },
        { text: "Continue deeper into the forest", next: deeperIntoForest }
    ];
    updateGame();
}

function visitVillage() {
    storyText = "You arrive at the quaint village of Elden. The villagers are friendly. Do you want to shop for supplies or talk to the village elder?";
    choices = [
        { text: "Shop for supplies", next: shopSupplies },
        { text: "Talk to the village elder", next: talkToElder }
    ];
    updateGame();
}

function investigateRustling() {
    storyText = "You find a mischievous sprite! It offers to show you hidden treasures if you help it with a task. Do you accept?";
    choices = [
        { text: "Accept the sprite's task", next: helpSprite },
        { text: "Decline and continue exploring", next: deeperIntoForest }
    ];
    updateGame();
}

function deeperIntoForest() {
    storyText = "You venture deeper into the forest and suddenly encounter a fierce wolf! Will you fight or try to escape?";
    choices = [
        { text: "Fight the wolf", next: fightWolf },
        { text: "Escape back to the entrance", next: startGame }
    ];
    updateGame();
}

function shopSupplies() {
    storyText = "You purchase a health potion and a mana potion. (Health +20, Mana +20)";
    playerHealth = Math.min(playerHealth + 20, 100);
    playerMana = Math.min(playerMana + 20, 50);
    choices = [
        { text: "Leave the village", next: startGame }
    ];
    updateGame();
}

function talkToElder() {
    storyText = "The elder tells you of a dangerous monster terrorizing the village. Do you accept the quest to defeat it?";
    choices = [
        { text: "Accept the quest", next: acceptQuest },
        { text: "Decline the quest", next: startGame }
    ];
    updateGame();
}

function acceptQuest() {
    questActive = true;
    storyText = "You set off to find the monster! Do you want to search the forest or the mountains?";
    choices = [
        { text: "Search the Mystic Forest", next: enterForest },
        { text: "Search the High Mountains", next: searchMountains }
    ];
    updateGame();
}

function searchMountains() {
    storyText = "You climb the mountains and find the monster! It's a terrifying dragon! Do you fight or use magic?";
    choices = [
        { text: "Fight the dragon", next: fightDragon },
        { text: "Use magic", next: useMagic }
    ];
    updateGame();
}

function fightWolf() {
    const wolfHealth = 40;
    battle(wolfHealth, "wolf");
}

function fightDragon() {
    const dragonHealth = 80;
    battle(dragonHealth, "dragon");
}

function helpSprite() {
    storyText = "The sprite asks you to gather magical herbs nearby. Do you want to help it?";
    choices = [
        { text: "Help the sprite", next: gatherHerbs },
        { text: "Refuse and leave", next: startGame }
    ];
    updateGame();
}

function gatherHerbs() {
    storyText = "You successfully gather the herbs! The sprite rewards you with a magical amulet. (Mana +30)";
    playerMana = Math.min(playerMana + 30, 50);
    choices = [
        { text: "Continue exploring the forest", next: deeperIntoForest },
        { text: "Return to the village", next: visitVillage }
    ];
    updateGame();
}

function useMagic() {
    if (playerMana >= 10) {
        playerMana -= 10; // Cost of magic
        storyText = "You cast a powerful spell, dealing 30 damage to the dragon!";
        const dragonHealth = 80 - 30; // Deal damage
        if (dragonHealth <= 0) {
            storyText += "\nYou defeated the dragon! The villagers will rejoice!";
            choices = [{ text: "Return to the village", next: visitVillage }];
        } else {
            storyText += "\nThe dragon is still alive and retaliates!";
            playerHealth -= 20; // Dragon's attack
            checkPlayerHealth();
        }
    } else {
        storyText = "You don't have enough mana to use magic!";
        choices = [
            { text: "Fight the dragon", next: fightDragon },
            { text: "Escape", next: startGame }
        ];
    }
    updateGame();
}

function battle(opponentHealth, opponent) {
    const attackDamage = Math.floor(Math.random() * 20) + 10; // Random player attack
    opponentHealth -= attackDamage;
    storyText = `You dealt ${attackDamage} damage to the ${opponent}!`;

    if (opponentHealth <= 0) {
        storyText += `\nYou defeated the ${opponent}!`;
        choices = [
            { text: "Continue your adventure", next: startGame },
            { text: "Return to the village", next: visitVillage }
        ];
    } else {
        const opponentAttack = Math.floor(Math.random() * 15) + 5; // Opponent's attack
        playerHealth -= opponentAttack;
        storyText += `\nThe ${opponent} hits you for ${opponentAttack} damage! Your health is now ${playerHealth}.`;
        checkPlayerHealth(opponent);
    }
    updateGame();
}

function checkPlayerHealth() {
    if (playerHealth <= 0) {
        storyText += "\nYou have been defeated! Game over.";
        choices = [
            { text: "Restart Game", next: startGame }
        ];
    } else {
        choices = [
            { text: "Attack again", next: () => battle(opponentHealth, opponent) },
            { text: "Flee", next: startGame }
        ];
    }
}

function updateGame() {
    document.getElementById("story").innerText = storyText + `\n\nHealth: ${playerHealth} | Mana: ${playerMana}`;
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = ""; // Clear previous choices
    choices.forEach(choice => {
        const button = document.createElement("button");
        button.innerText = choice.text;
        button.onclick = choice.next;
        choicesDiv.appendChild(button);
    });
    document.getElementById("restartButton").style.display = "none";
}

// Start the game when the page loads
window.onload = startGame;
