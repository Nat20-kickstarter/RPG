let storyText = "";
let choices = [];
let playerHealth = 100;

function startGame() {
    playerHealth = 100; // Reset health
    storyText = "You awaken in a mystical forest, where magic and danger lurk at every corner. What will you do?";
    choices = [
        { text: "Explore the forest", next: exploreForest },
        { text: "Look for a village", next: findVillage }
    ];
    updateGame();
}

function exploreForest() {
    storyText = "As you wander deeper into the forest, you encounter a wild goblin! Do you fight or flee?";
    choices = [
        { text: "Fight the goblin", next: fightGoblin },
        { text: "Flee into the trees", next: flee }
    ];
    updateGame();
}

function findVillage() {
    storyText = "You find a small village. The villagers seem friendly. Do you want to rest or buy supplies?";
    choices = [
        { text: "Rest at the inn", next: restAtInn },
        { text: "Buy supplies", next: buySupplies }
    ];
    updateGame();
}

function fightGoblin() {
    const goblinHealth = 50;
    storyText = "You engage the goblin in battle!";
    battle(goblinHealth);
}

function flee() {
    storyText = "You successfully escape into the trees, but lose your way. You wander until nightfall.";
    choices = [
        { text: "Start a fire", next: startFire },
        { text: "Try to find a way back", next: findWayBack }
    ];
    updateGame();
}

function restAtInn() {
    storyText = "You rest at the inn and recover some health. (Health restored to 100)";
    playerHealth = 100;
    choices = [
        { text: "Leave the village", next: startGame }
    ];
    updateGame();
}

function buySupplies() {
    storyText = "You buy a health potion! (Health +20)";
    playerHealth += 20;
    choices = [
        { text: "Leave the village", next: startGame }
    ];
    updateGame();
}

function startFire() {
    storyText = "You start a fire and feel safer. Morning comes, and you decide to search for a way out.";
    choices = [
        { text: "Search for an exit", next: startGame }
    ];
    updateGame();
}

function findWayBack() {
    storyText = "You wander around aimlessly until morning.";
    choices = [
        { text: "Try again", next: startGame }
    ];
    updateGame();
}

function battle(opponentHealth) {
    const attackDamage = Math.floor(Math.random() * 30) + 10; // Random damage
    opponentHealth -= attackDamage;
    storyText += `\nYou dealt ${attackDamage} damage! Goblin's health is now ${opponentHealth}.`;
    
    if (opponentHealth <= 0) {
        storyText += "\nYou defeated the goblin! You are victorious!";
        choices = [
            { text: "Continue exploring", next: exploreForest },
            { text: "Return to the village", next: findVillage }
        ];
    } else {
        const goblinAttack = Math.floor(Math.random() * 20) + 5; // Goblin's attack
        playerHealth -= goblinAttack;
        storyText += `\nThe goblin hits you for ${goblinAttack} damage! Your health is now ${playerHealth}.`;
        
        if (playerHealth <= 0) {
            storyText += "\nYou have been defeated! Game over.";
            choices = [
                { text: "Restart Game", next: startGame }
            ];
        } else {
            choices = [
                { text: "Attack again", next: () => battle(opponentHealth) },
                { text: "Flee", next: flee }
            ];
        }
    }
    updateGame();
}

function updateGame() {
    document.getElementById("story").innerText = storyText + `\n\nHealth: ${playerHealth}`;
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
