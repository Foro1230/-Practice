
const CLASSES = [
    { id: 1, name: "Кібер-Самурай", hp: 120, maxHp: 120, attack: 18, defense: 5 },
    { id: 2, name: "Нетраннер", hp: 90, maxHp: 90, attack: 25, defense: 2 },
    { id: 3, name: "Тек-Корпо", hp: 150, maxHp: 150, attack: 14, defense: 7 }
];

const ENEMIES = [
    { name: "Зламаний Дрон", hp: 40, attack: 8, defense: 1, tier: "safe", rewardXp: 40, rewardGold: 20 },
    { name: "Сміттяр-Мародер", hp: 55, attack: 11, defense: 2, tier: "safe", rewardXp: 55, rewardGold: 30 },
    { name: "Кібер-Щур Мутант", hp: 35, attack: 10, defense: 0, tier: "safe", rewardXp: 35, rewardGold: 15 },

    { name: "Синдикат Найманець", hp: 90, attack: 18, defense: 4, tier: "danger", rewardXp: 100, rewardGold: 60 },
    { name: "Бойовий Андроїд Арес", hp: 110, attack: 15, defense: 6, tier: "danger", rewardXp: 120, rewardGold: 80 },
    { name: "Якудза-Кіборг", hp: 80, attack: 22, defense: 3, tier: "danger", rewardXp: 110, rewardGold: 70 }
];

const BOSS = {
    name: "ШІ МЕЙНФРЕЙМ",
    hp: 300,
    maxHp: 300,
    attack: 28,
    defense: 10
};

const MARKET_ITEMS = [
    {
        id: 1,
        name: "Мед-Пак Нейро",
        price: 25,
        type: "heal",
        value: 40,
        desc: "Відновлює 40 HP"
    },
    {
        id: 2,
        name: "Стимулятор Овердрайв",
        price: 50,
        type: "buff",
        value: 5,
        desc: "+5 до атаки назавжди"
    },
    {
        id: 3,
        name: "Чіп Захисту",
        price: 45,
        type: "other",
        value: 2,
        desc: "+2 до захисту назавжди"
    }
];



let player = {
    name: "",
    classTitle: "",
    hp: 0,
    maxHp: 0,
    attack: 0,
    defense: 0,
    level: 1,
    xp: 0,
    gold: 50,
    inventory: []
};

let isGameRunning = true;



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function askNumber(message, min, max) {
    while (true) {
        let input = prompt(
            message +
            "\nВведіть число від " +
            min +
            " до " +
            max +
            ":"
        );

        if (input === null || input.trim() === "") {
            alert("Ввід не може бути порожнім.");
            continue;
        }

        let number = Number(input);

        if (
            Number.isInteger(number) &&
            number >= min &&
            number <= max
        ) {
            return number;
        }

        alert("Введіть правильне число.");
    }
}


function isAlive(character) {
    return character.hp > 0;
}


function createHero() {
    console.log("Завантаження системи...");

    let name = "";

    while (name.trim() === "") {
        name = prompt("Введіть ім'я вашого Кібер-Агента:");

        if (name === null) {
            name = "";
        }

        if (name.trim() === "") {
            alert("Ім'я не може бути порожнім.");
        }
    }

    player.name = name.trim();

    let classMessage =
        "Оберіть клас:\n" +
        "1. Кібер-Самурай - HP 120, ATK 18, DEF 5\n" +
        "2. Нетраннер - HP 90, ATK 25, DEF 2\n" +
        "3. Тек-Корпо - HP 150, ATK 14, DEF 7";

    let classId = askNumber(classMessage, 1, 3);

    let chosenClass = CLASSES.find(
        characterClass => characterClass.id === classId
    );

    player.classTitle = chosenClass.name;
    player.hp = chosenClass.hp;
    player.maxHp = chosenClass.maxHp;
    player.attack = chosenClass.attack;
    player.defense = chosenClass.defense;

    player.inventory = [
        { ...MARKET_ITEMS[0] },
        { ...MARKET_ITEMS[0] }
    ];

    console.clear();

    console.log(
        "Ласкаво просимо до Нео-Детройту, " +
        player.name +
        "!"
    );

    console.log(
        "Ваш клас: " +
        player.classTitle
    );
}



function drawHpBar(name, hp, maxHp) {
    let barLength = 10;
    let filled = Math.round(
        (hp / maxHp) * barLength
    );

    if (filled < 0) {
        filled = 0;
    }

    if (filled > barLength) {
        filled = barLength;
    }

    let bar = "";

    

    console.log(
        name +
        ": " +
        hp +
        "/" +
        maxHp +
        " HP [" +
        bar +
        "]"
    );
}



function showStats() {
    console.log("\n========== СТАТИСТИКА ==========");

    console.log("Ім'я: " + player.name);
    console.log("Клас: " + player.classTitle);
    console.log("Рівень: " + player.level);
    console.log(
        "XP: " +
        player.xp +
        "/" +
        player.level * 100
    );
    console.log("Кредити: " + player.gold);
    console.log("Атака: " + player.attack);
    console.log("Захист: " + player.defense);

    drawHpBar(
        "HP",
        player.hp,
        player.maxHp
    );

    console.log("===============================\n");
}



function checkLevelUp() {
    let xpNeeded = player.level * 100;

    while (player.xp >= xpNeeded) {
        player.xp -= xpNeeded;
        player.level++;

        player.maxHp += 15;
        player.attack += 3;
        player.defense += 1;

        player.hp = player.maxHp;

        console.log(
            "\nВи отримали новий рівень!"
        );

        console.log(
            "Тепер ваш рівень: " +
            player.level
        );

        console.log(
            "HP, атака та захист збільшені."
        );

        alert(
            "Рівень підвищено до " +
            player.level +
            "!"
        );

        xpNeeded = player.level * 100;
    }
}



function openInventory() {
    console.log("\n========== ІНВЕНТАР ==========");

    if (player.inventory.length === 0) {
        console.log("Інвентар порожній.");
        return;
    }

    let itemGroups = player.inventory.reduce(
        (result, item) => {
            if (!result[item.name]) {
                result[item.name] = 0;
            }

            result[item.name]++;
            return result;
        },
        {}
    );

    console.log("Кількість предметів:", itemGroups);

    player.inventory.forEach((item, index) => {
        console.log(
            (index + 1) +
            ". " +
            item.name +
            " - " +
            item.desc
        );
    });

    let hasHeal = player.inventory.some(
        item => item.type === "heal"
    );

    console.log(
        "Є лікування: " +
        (hasHeal ? "Так" : "Ні")
    );

    if (confirm("Використати предмет?")) {
        let choice = askNumber(
            "Виберіть номер предмета:",
            1,
            player.inventory.length
        );

        useItem(choice - 1);
    }
}


function useItem(index) {
    let item = player.inventory[index];

    if (!item) {
        console.log("Предмет не знайдено.");
        return;
    }

    if (item.type === "heal") {
        let oldHp = player.hp;

        player.hp = Math.min(
            player.maxHp,
            player.hp + item.value
        );

        console.log(
            "Відновлено " +
            (player.hp - oldHp) +
            " HP."
        );

    } else if (item.type === "buff") {
        player.attack += item.value;

        console.log(
            "Атака збільшена на " +
            item.value
        );

    } else {
        player.defense += item.value;

        console.log(
            "Захист збільшений на " +
            item.value
        );
    }

    player.inventory.splice(index, 1);
}



function openBazaar() {
    console.log("\n========== МАГАЗИН ==========");

    console.log(
        "Ваші кредити: " +
        player.gold
    );

    console.log(
        "0. Повністю відновити HP - 20 кредитів"
    );

    MARKET_ITEMS.forEach(item => {
        console.log(
            item.id +
            ". " +
            item.name +
            " - " +
            item.price +
            " кредитів"
        );

        console.log(
            "   " +
            item.desc
        );
    });

    let choice = askNumber(
        "Виберіть товар:",
        0,
        MARKET_ITEMS.length
    );

    if (choice === 0) {
        if (player.gold >= 20) {
            player.gold -= 20;
            player.hp = player.maxHp;

            console.log(
                "HP повністю відновлено."
            );
        } else {
            console.log(
                "Недостатньо кредитів."
            );
        }

        return;
    }

    let product = MARKET_ITEMS.find(
        item => item.id === choice
    );

    if (player.gold < product.price) {
        console.log(
            "Недостатньо кредитів."
        );
        return;
    }

    player.gold -= product.price;

    player.inventory.push({
        ...product
    });

    console.log(
        "Ви купили: " +
        product.name
    );
}



function calculateDamage(attackerAttack, defenderDefense) {
    let randomDamage = getRandomInt(-3, 3);

    let damage =
        attackerAttack +
        randomDamage -
        defenderDefense;

    damage = Math.max(1, damage);

    let critical = Math.random() < 0.15;

    if (critical) {
        damage *= 2;
        console.log("КРИТИЧНИЙ УДАР!");
    }

    return damage;
}



function startBattle(tier) {
    let enemies = ENEMIES.filter(
        enemy => enemy.tier === tier
    );

    let enemyTemplate =
        enemies[
            getRandomInt(0, enemies.length - 1)
        ];

    let enemy = {
        ...enemyTemplate,
        maxHp: enemyTemplate.hp
    };

    console.log(
        "\nВи зустріли ворога: " +
        enemy.name
    );

    while (
        isAlive(player) &&
        isAlive(enemy)
    ) {
        console.log("\n----------------------");

        drawHpBar(
            player.name,
            player.hp,
            player.maxHp
        );

        drawHpBar(
            enemy.name,
            enemy.hp,
            enemy.maxHp
        );

        let action = askNumber(
            "Ваш хід:\n" +
            "1. Атакувати\n" +
            "2. Захищатися\n" +
            "3. Використати ліки\n" +
            "4. Втекти",
            1,
            4
        );

        let defending = false;
        let escaped = false;

        switch (action) {
            case 1:
                let damage = calculateDamage(
                    player.attack,
                    enemy.defense
                );

                enemy.hp -= damage;

                console.log(
                    "Ви завдали " +
                    damage +
                    " урону."
                );
                break;

            case 2:
                defending = true;

                console.log(
                    "Ви стали в захисну стійку."
                );
                break;

            case 3:
                let healIndex =
                    player.inventory.findIndex(
                        item => item.type === "heal"
                    );

                if (healIndex !== -1) {
                    useItem(healIndex);
                } else {
                    console.log(
                        "У вас немає ліків."
                    );
                }
                break;

            case 4:
                if (Math.random() < 0.5) {
                    escaped = true;
                    console.log(
                        "Ви успішно втекли."
                    );
                } else {
                    console.log(
                        "Втекти не вдалося."
                    );
                }
                break;
        }

        if (escaped) {
            return;
        }

        if (isAlive(enemy)) {
            let defense = player.defense;

            if (defending) {
                defense = player.defense * 2;
            }

            let enemyDamage = calculateDamage(
                enemy.attack,
                defense
            );

            if (defending) {
                enemyDamage = Math.floor(
                    enemyDamage / 2
                );

                if (enemyDamage < 1) {
                    enemyDamage = 1;
                }
            }

            player.hp -= enemyDamage;

            console.log(
                enemy.name +
                " завдав вам " +
                enemyDamage +
                " урону."
            );
        }
    }

    handleBattleResult(enemy);
}


function handleBattleResult(enemy) {
    if (!isAlive(player)) {
        alert(
            "GAME OVER!\n" +
            "Ваш персонаж загинув."
        );

        isGameRunning = false;
        return;
    }

    console.log(
        "\nВи перемогли " +
        enemy.name +
        "!"
    );

    player.xp += enemy.rewardXp;
    player.gold += enemy.rewardGold;

    console.log(
        "+" +
        enemy.rewardXp +
        " XP"
    );

    console.log(
        "+" +
        enemy.rewardGold +
        " кредитів"
    );

    if (Math.random() < 0.4) {
        player.inventory.push({
            ...MARKET_ITEMS[0]
        });

        console.log(
            "Ви знайшли Мед-Пак Нейро!"
        );
    }

    checkLevelUp();
}



function startBossBattle() {
    let enemy = {
        ...BOSS
    };

    let turn = 0;

    console.log(
        "\n========== ФІНАЛ =========="
    );

    console.log(
        "Ви потрапили до центрального ядра."
    );

    console.log(
        "Перед вами ШІ МЕЙНФРЕЙМ."
    );

    while (
        isAlive(player) &&
        isAlive(enemy)
    ) {
        turn++;

        console.log("\n----------------------");

        drawHpBar(
            player.name,
            player.hp,
            player.maxHp
        );

        drawHpBar(
            enemy.name,
            enemy.hp,
            enemy.maxHp
        );

        let action = askNumber(
            "1. Атакувати\n" +
            "2. Захищатися\n" +
            "3. Використати ліки",
            1,
            3
        );

        let defending = false;

        if (action === 1) {
            let damage = calculateDamage(
                player.attack,
                enemy.defense
            );

            enemy.hp -= damage;

            console.log(
                "Ви завдали босу " +
                damage +
                " урону."
            );

        } else if (action === 2) {
            defending = true;

            console.log(
                "Ви захищаєтесь."
            );

        } else {
            let healIndex =
                player.inventory.findIndex(
                    item => item.type === "heal"
                );

            if (healIndex !== -1) {
                useItem(healIndex);
            } else {
                console.log(
                    "У вас немає ліків."
                );
            }
        }

        if (isAlive(enemy)) {
            let bossAttack = enemy.attack;

            if (turn % 3 === 0) {
                bossAttack *= 2;

                console.log(
                    "ОСОБЛИВА ЗДАТНІСТЬ БОСА!"
                );

                console.log(
                    "Мейнфрейм подвоює свою атаку!"
                );
            }

            let defense = player.defense;

            if (defending) {
                defense = player.defense * 2;
            }

            let damage = calculateDamage(
                bossAttack,
                defense
            );

            if (defending) {
                damage = Math.floor(damage / 2);

                if (damage < 1) {
                    damage = 1;
                }
            }

            player.hp -= damage;

            console.log(
                "Мейнфрейм завдав вам " +
                damage +
                " урону."
            );
        }
    }

    if (!isAlive(player)) {
        alert(
            "Ви програли фінальну битву.\n" +
            "Нео-Детройт залишився під контролем ШІ."
        );

        isGameRunning = false;

    } else {
        alert(
            "ВИ ПЕРЕМОГЛИ!\n\n" +
            "Мейнфрейм знищено.\n" +
            "Нео-Детройт звільнено!"
        );

        console.log(
            "\n========== КІНЕЦЬ ГРИ =========="
        );

        console.log(
            "Ви стали героєм Нео-Детройта!"
        );

        isGameRunning = false;
    }
}



function mainMenu() {
    console.log(
        "\n========== ГОЛОВНЕ МЕНЮ =========="
    );

    console.log(
        "1. Безпечний сектор"
    );

    console.log(
        "2. Небезпечний сектор"
    );

    console.log(
        "3. Магазин"
    );

    console.log(
        "4. Статистика"
    );

    console.log(
        "5. Інвентар"
    );

    if (player.level >= 5) {
        console.log(
            "6. Центральне ядро - БОС"
        );

        console.log(
            "7. Вийти"
        );

        return askNumber(
            "Оберіть дію:",
            1,
            7
        );
    }

    console.log(
        "6. Вийти"
    );

    return askNumber(
        "Оберіть дію:",
        1,
        6
    );
}



function startGame() {
    console.clear();

    isGameRunning = true;

    player = {
        name: "",
        classTitle: "",
        hp: 0,
        maxHp: 0,
        attack: 0,
        defense: 0,
        level: 1,
        xp: 0,
        gold: 50,
        inventory: []
    };

    console.log(
        "=========================================="
    );

    console.log(
        "       НЕО-ДЕТРОЙТ: НІЧНИЙ СЕКТОР"
    );

    console.log(
        "=========================================="
    );

    console.log(
        "Нео-Детройт контролюють корпорації."
    );

    console.log(
        "Ваше завдання - дістатися центрального ядра"
    );

    console.log(
        "та знищити систему Мейнфрейм."
    );

    createHero();

    showStats();

    while (
        isGameRunning &&
        isAlive(player)
    ) {
        let choice = mainMenu();

        switch (choice) {
            case 1:
                startBattle("safe");
                break;

            case 2:
                startBattle("danger");
                break;

            case 3:
                openBazaar();
                break;

            case 4:
                showStats();
                break;

            case 5:
                openInventory();
                break;

            case 6:
                if (player.level >= 5) {
                    startBossBattle();
                } else {
                    isGameRunning = false;
                    console.log("Гру завершено.");
                }
                break;

            case 7:
                isGameRunning = false;
                console.log("Гру завершено.");
                break;
        }
    }
}