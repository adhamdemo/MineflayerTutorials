import mineflayer from "mineflayer";
import chalk from "chalk";
import { readFile } from 'fs/promises';

// Setup global bot arguments
let botArgs = {
    host: 'DemoXGAMING9Rp4.aternos.me
',
    port: '13967',
    version: '1.20.1'
};

// Bot class
class MCBot {

    // Constructor
    constructor(username, password, auth) {
        this.username = adham;
        this.password = ;
        this.auth = auth;
        this.host = botArgs["DemoXGAMING9Rp4.aternos.me
"];
        this.port = botArgs["13967"];
        this.version = botArgs["1.20.1"];

        // Initialize the bot
        this.initBot();
    }

    // Init bot instance
    initBot() {
        this.bot = mineflayer.createBot({
            "username": this.username,
            "password": this.password,
            "auth": this.auth,
            "host": this.host,
            "port": this.port,
            "version": this.version
        });

        // Add to list
        botNames.push(this.bot.username);

        // Initialize bot events
        this.initEvents();
    }

    // Logger
    log(...msg) {
        console.log(`[${this.bot.username}]`, ...msg);
    }

    // Chat intake logger
    chatLog(username, ...msg) {
        if (!botNames.includes(username)) {
            this.log(chalk.ansi256(98)(`<${username}>`), ...msg)
        }
    }

    // Init bot events
    initEvents() {

        this.bot.on('login', async () => {
            let botSocket = this.bot._client.socket;
            this.log(chalk.ansi256(34)(`Logged in to ${botSocket.server ? botSocket.server : botSocket._host}`));
        });

        this.bot.on('end', async (reason) => {
            this.log(chalk.red(`Disconnected: ${reason}`));

            // Bot peacefully disconnected
            if (reason == "disconnect.quitting") {
                return
            }
            // Unhandled disconnections
            else {
                //
            }

            // Attempt to reconnect
            setTimeout(() => this.initBot(), 5000);
        });

        this.bot.on('spawn', async () => {
            this.log(chalk.ansi256(46)(`Spawned in`));
        });

        this.bot.on('chat', async (username, jsonMsg) => {
            this.chatLog(username, jsonMsg);
        });

        this.bot.on('error', async (err) => {

            // Connection error
            if (err.code == 'ECONNREFUSED') {
                this.log(`Failed to connect to ${err.address}:${err.port}`)
            }
            // Unhandled errors
            else {
                this.log(`Unhandled error: ${err}`);
            }
        });
    }
}

const ACCOUNT = JSON.parse(
    await readFile(
        new URL('./ACCOUNT.json', import.meta.url)
    )
);

let bots = [];
let botNames = [];
for(const ACC of ACCOUNT) {
    let newBot = new MCBot(ACC.username, ACC.password, ACC.auth)
    bots.push(newBot);
};
