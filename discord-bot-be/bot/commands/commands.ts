export interface ICommands {
    name: string;
    description: string;
}

export const COMMANDS: ICommands[] = [
    { name: 'start', description: 'Start interacting with the bot' },
    { name: 'help', description: 'Show help text' },
    { name: 'cancel', description: 'Cancel converstaion' },
    { name: 'ping', description: 'Replies with Pong!' },
    { name: 'pay', description: 'Users pay' },
];
