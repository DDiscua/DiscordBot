import { stripeClient } from "../../stripe";
import { saveUser } from "../user";

const processPayment = async (interaction: any) => {
    console.log("interaction", interaction);
    const { user, guild } = interaction;

    console.log("user", user);
    const roles = interaction.member.roles.cache;
    const userRoles = roles.map((role: any) => {
        console.log("role", role.name);
        return role.name;
    });

    console.log("roles", userRoles);

    const newUser = {
        discordUserName: user.username,
        discordId: user.id,
        discordRoles: userRoles,
    }

    const savedUser = await saveUser(newUser);

    const paymentResponse = await simulateNewPayment();
    console.log("paymentResponse", paymentResponse);


    return "Success";
};

const simulateNewPayment = async () => {
    try {
        const charge = await stripeClient.charges.create({
            amount: 2000,
            currency: 'usd',
            source: 'tok_visa', // token obtained with Stripe.js
            description: 'Charge for test@example.com',
        });

        return charge;
    } catch (err) {
        console.error("error trying to do payment", err);
        return null;
    }
}

export { processPayment };