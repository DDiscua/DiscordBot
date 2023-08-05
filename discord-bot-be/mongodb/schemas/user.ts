import mongoose, { Document, Schema } from 'mongoose';

export interface UserDoc extends Document {
    discordUserName: string;
    discordId: string;
    discordRole: string;
    paymentSubscriptionStatus: string;
    lastName?: string;

}

export const userSchema: Schema = new mongoose.Schema(
    {
        discordUserName: { type: String, required: false },
        discordId: { type: String, unique: true, required: true },
        paymentSubscriptionStatus: { type: String, required: true, default: 'inactive' },
        discordRole: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model<UserDoc>('User', userSchema);
