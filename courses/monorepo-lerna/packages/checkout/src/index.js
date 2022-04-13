import { Button } from "@monorepo-lerna/components";

export const CheckoutPage = () => {
    const container = document.createElement('div');

    console.log('test');

    const payButton = Button('Pay');
    container.appendChild(payButton);
}