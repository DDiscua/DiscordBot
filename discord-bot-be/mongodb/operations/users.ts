import mongoose, { ObjectId } from 'mongoose';
import { UserDoc, User } from '../schemas/user';
import { LOGGER } from '../../logger';

export const addUser = async ({
    discordUserName,
    discordId,
    firstName,
    lastName,
}: Pick<
    UserDoc,
    'discordUserName' | 'discordId' | 'firstName' | 'lastName'
>): Promise<UserDoc | null> => {
    try {
        const user = await getUserByDiscordId(discordId);
        if (user) {
            return null;
        }

        const newUser = new User({
            discordUserName,
            discordId,
            firstName,
            lastName,
        });

        const saveduser = await newUser.save();

        if (saveduser?.id) {
            LOGGER.info('[addUser][success]', { metadata: {} });
        } else {
            LOGGER.error('[addUser][error]', {
                metadata: { error: 'User not saved' },
            });
        }

        return saveduser;
    } catch (error: any) {
        LOGGER.error('[addUser][error]', {
            metadata: { error: error, stack: error.stack?.toString() },
        });
        return null;
    }
};

export const getUserById = async (
    id: mongoose.Types.ObjectId
): Promise<UserDoc | null> => {
    try {
        const user = await User.findOne({ id });
        return user;
    } catch (error: any) {
        LOGGER.error('[getUserById][error]', {
            metadata: { error: error, stack: error.stack.toString() },
        });
        return null;
    }
};

export const getUserByDiscordId = async (
    id: number
): Promise<UserDoc | null> => {
    try {
        const user = await User.findOne({ discordId: id });
        return user;
    } catch (error: any) {
        LOGGER.error('[getUserByDiscordId][error]', {
            metadata: { error: error, stack: error.stack.toString() },
        });
        return null;
    }
};

export const getUserByDiscordUser = async (
    discordUserName: string
): Promise<UserDoc | null> => {
    const regexUser = new RegExp(`^${discordUserName}$`, 'i');

    try {
        const user: UserDoc | null = await User.findOne({
            discordUser: { $regex: regexUser },
        })
            .then((result) => {
                return result;
            })
            .catch((err) => {
                LOGGER.error(`[getUserByDiscordUser][${err.message}]`, {
                    metadata: { error: err, stack: err.stack.toString() },
                });
                return null;
            });

        return user;
    } catch (error: any) {
        LOGGER.error('[getUserByDiscordUser][error]', {
            metadata: { error: error, stack: error.stack.toString() },
        });
        return null;
    }
};

export const updateUserById = async (
    id: mongoose.Types.ObjectId,
    update: Partial<UserDoc>
): Promise<UserDoc | null> => {
    try {
        const user = await getUserById(id);
        if (user) {
            Object.assign(user, update);
            await user.save();
            return user;
        }
        return null;
    } catch (error: any) {
        LOGGER.error('[updateUserById][error]', {
            metadata: { error: error, stack: error.stack.toString() },
        });
        return null;
    }
};

export const updateUserByDiscordId = async (
    discordId: number,
    update: Partial<UserDoc>
): Promise<UserDoc | null> => {
    try {
        const user = await getUserByDiscordId(discordId);
        if (user) {
            Object.assign(user, update);
            await user.save();
            return user;
        }
        return null;
    } catch (error: any) {
        LOGGER.error('[updateUserByDiscordId][error]', {
            metadata: { error: error, stack: error.stack.toString() },
        });
        return null;
    }
};
