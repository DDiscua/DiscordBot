import mongoose, { Document, Schema } from 'mongoose';

export interface UserDoc extends Document {
    discordUserName: string;
    discordId: string;
    discordRoles: string[];
    paymentSubscriptionStatus: string;

}

export const userSchema: Schema = new mongoose.Schema(
    {
        discordUserName: { type: String, required: false },
        discordId: { type: String, unique: true, required: true },
        paymentSubscriptionStatus: { type: String, required: true, default: 'inactive' },
        discordRoles: { type: Array<String>, required: true },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model<UserDoc>('User', userSchema);
