import { addUser, getUserByDiscordId } from "../../mongodb/operations";

const saveUser = async (user: any) => {

    try {
        const findUser = await getUserById(user.discordId);
        if (findUser) {
            return;
        }

        await addUser(user);

    } catch (err) {
        console.log("err", err);
    }


}

const getUserById = async (discordId: string) => {
    try {
        return await getUserByDiscordId(discordId);
    } catch (err) {
        console.log("err", err);
    }
}

export { saveUser, getUserById }