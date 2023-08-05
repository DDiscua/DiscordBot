import mongoose, { Document, Schema } from 'mongoose';

enum PaymentStatus {
    NEW = 'NEW',
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
}

enum PaymentMethod {
    PAYPAL = 'PAYPAL',
    STRIPE = 'STRIPE',
}

export interface PaymentDoc extends Document {
    paymentId: string;
    userId: string;
    status: PaymentStatus;
    method: string;
    rawTransactionData?: string;

}

export const paymentSchema: Schema = new mongoose.Schema(
    {
        paymentId: { type: String, required: true },
        userId: { type: String, required: true },
        status: { type: PaymentStatus, default: PaymentStatus.NEW },
        method: { type: PaymentMethod, required: true, default: PaymentMethod.STRIPE },
        rawTransactionData: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);

export const Payment = mongoose.model<PaymentDoc>('Payment', paymentSchema);
