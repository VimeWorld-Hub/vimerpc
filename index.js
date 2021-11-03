const fs = require("fs")
const readline = require("readline")
const RPC = require("discord-rpc")
var colors = require("colors")

process.stdout.write(
    String.fromCharCode(27) + "]0;" + 'VimeTops' + String.fromCharCode(7)
);

const rpc = new RPC.Client({
    transport: "ipc",
})

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const q = (str) => {
    return new Promise((resolve, reject) =>
        rl.question(str, (answer) => resolve(answer))
    )
}

console.log(`############################################`.green)
console.log(` _   _ _               ____________  _____ `.green)
console.log(`| | | (_)              | ___ \\ ___ \\/  __ \\`.green)
console.log(`| | | |_ _ __ ___   ___| |_/ / |_/ /| /  \\/`.green)
console.log(`| | | | | '_ \` _ \\ / _ \\    /|  __/ | |    `.green)
console.log(`\\ \\_/ / | | | | | |  __/ |\\ \\| |    | \\__/\\`.green)
console.log(` \\___/|_|_| |_| |_|\\___\\_| \\_\\_|     \\____/`.green)
console.log(``)
console.log("        ~ Coded by CharkosOff <3 ~\n".brightGreen)
console.log(`############################################`.green)

async function start() {
    const config_file = "./config.txt";

    let username
    let status
    let level

    if (fs.existsSync(config_file)) {
        fs.readFile(config_file, "utf8", (err, data) => {
            let delim = data.split("\n");
            let d;
            for (let i = 0; i != delim.length; i++) {
                d = delim[i].split("=");
                if (d[0] == "username") {
                    username = d[1];
                }
                if (d[0] == "status") {
                    status = d[1];
                }
                if (d[0] == "level") {
                    level = d[1];
                }
            }

            if (username && status) {
                console.log(
                    "\n</> ".green.bold + "Загружены данные из конфига!".dim.brightGreen
                );
                create_rpc(username, status, level);
            } else {
                console.log(
                    "\n</> ".green.bold +
                    "Привет! Эта программа позволяет создавать фейковый статус в Discord, но для этого нужны некоторые данные."
                        .dim.brightGreen
                );
                main();
            }
        });
    } else {
        console.log(
            "\n</> ".green.bold +
            "Привет! Эта программа позволяет создавать фейковый статус в Discord, но для этого нужны некоторые данные."
                .dim.brightGreen
        );
        main();
    }
}

//Функция, объединяющая работу с readline
const main = async (err) => {
    let username = await q(
        "\n</> ".green.bold +
        "Отправь мне, пожалуйста, желаемый никнейм.\n".dim.brightGreen
    );

    console.log(
        "\n</> ".green.bold +
        "Отлично, ".dim.brightGreen +
        username.yellow +
        "! Теперь - активность.".dim.brightGreen
    );

    let status = await q(
        "</> ".green.bold +
        "Доступно: ann, bw, bwq, bwh, bb, ann, arc, sw, swt, mw, cp, bp, dr, kpvp, build, os, gg, prison, hg, hgl, lobby\n"
            .dim.brightGreen
    );

    let level = await q(
        "</> ".green.bold +
        "И также, мне необходим твой уровень\n"
            .dim.brightGreen
    );

    fs.open("config.txt", "w", (err) => {
        fs.appendFile(
            "config.txt",
            `username=${username}\nstatus=${status}\nlevel=${level}`,
            (err) => {
                if (err) throw err;
            }
        );
    });

    console.log("\n</> ".green.bold + "Статус успешно создан!".dim.brightGreen);
    await create_rpc(username, status, level);
};

function create_rpc(username, status, level) {
    try{
        let status_image = "";
        let largeStatus = null;

        switch (status.toLowerCase()) {
            case "bw":
                status = "BedWars";
                status_image = "game_bw";
                break;
            case "bwh":
                status = "BedWars Hard";
                status_image = "game_bw";
                break;
            case "bwq":
                status = "BedWars Quick";
                status_image = "game_bw";
                break;
            case "sw":
                status = "SkyWars";
                status_image = "game_sw";
                break;
            case "swt":
                status = "SkyWars Team";
                status_image = "game_sw";
                break;
            case "mw":
                status = "MobWars";
                status_image = "game_mw";
                break;
            case "cp":
                status = "ClashPoint";
                status_image = "game_cp";
                break;
            case "ann":
            case "annihilation":
            case "ан":
            case "аник":
            case "анник":
            case "анн":
                status = "Annihilation";
                status_image = "game_ann";
                break;
            case "bb":
            case "билдбатл":
            case "buildbatle":
            case "бб":
                status = "BuildBattle";
                status_image = "game_bb";
                break;
            case "bp":
                status = "BlockParty";
                status_image = "game_bp";
                break;
            case "dr":
                status = "DeathRun";
                status_image = "game_dr";
                break;
            case "gg":
                status = "GunGame";
                status_image = "game_gg";
                break;
            case "kpvp":
                status = "KitPvP";
                status_image = "game_kpvp";
                break;
            case "hg":
                status = "HungerGames";
                status_image = "game_hg";
                break;
            case "hgl":
                status = "HungerGames Lucky";
                status_image = "game_hg";
                break;
            case "duels":
                status = "Дуэли";
                status_image = "game_duels";
                break;
            case "prison":
                status = "Prison";
                status_image = "game_prison";
                break;
            case "arc":
                status = "Аркады";
                status_image = "game_arc";
                break;
            case "os":
                status = "Приватный сервер";
                status_image = "generic_explode";
                largeStatus = "Сам себе хозяин";
                break;
            case "lobby":
                status = "Лобби";
                break;
            case "build":
                status = "Строит новые карты";
                status_image = "game_bb";
                largeStatus = "Строитель от бога";
                break;
            default:
                console.log(
                    "</> Неизвестный статус, попробуйте ещё раз!\n\n\n".brightRed
                );
                main();
                return;
        }

        rl.close();

        if (status == "Лобби") {
            rpc.on("ready", () => {
                rpc.setActivity({
                    state: `${username}, ур. ${level}`,
                    details: status,
                    startTimestamp: Date.now(),
                    largeImageKey: `logo`,
                    largeImageText: `VimeWorld.ru`,
                });
            });
            rpc.login({
                clientId: "423155716178706433",
            });
            return;
        } else if (status == "Меню") {
            rpc.on("ready", () => {
                rpc.setActivity({
                    state: username,
                    details: status,
                    startTimestamp: Date.now(),
                    largeImageKey: `logo`,
                });
            });
            rpc.login({
                clientId: "423155716178706433",
            });
            return;
        }

        if (largeStatus) {
            rpc.on("ready", () => {
                rpc.setActivity({
                    state: `${username}, ур. ${level}`,
                    details: status,
                    startTimestamp: Date.now(),
                    largeImageKey: status_image,
                    largeImageText: largeStatus,
                    smallImageKey: `logo`,
                    smallImageText: `VimeWorld.ru`,
                });
            });
            rpc.login({
                clientId: "423155716178706433",
            })
        } else {
            rpc.on("ready", () => {
                rpc.setActivity({
                    state: `${username}, ур. ${level}`,
                    details: status,
                    startTimestamp: Date.now(),
                    largeImageKey: status_image,
                    largeImageText: status,
                    smallImageKey: `logo`,
                    smallImageText: `VimeWorld.ru`,
                });
            });
            rpc.login({
                clientId: "423155716178706433",
            });
        }
    }
    catch (e) {
        console.log('</> Что-то не так. Может быть, Discord не запущен?'.red)
    }
}

start();
