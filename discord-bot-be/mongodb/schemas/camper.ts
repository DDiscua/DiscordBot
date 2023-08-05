import mongoose, { Document, Schema } from 'mongoose';

export interface ICamper extends Document {
    discordId: String,
    round: Number,
    day: Number,
    timestamp: Number,
}

export const camperSchema: Schema = new mongoose.Schema(
    {
        discordId: { type: String, unique: true, required: false },
        round: { type: Number, required: true },
        day: { type: Number, required: true },
        timestamp: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

export const Camper = mongoose.model<ICamper>('Camper', camperSchema);
