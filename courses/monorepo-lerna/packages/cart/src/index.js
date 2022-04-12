import { Button } from "@monorepo-lerna/components";

export const CartPage = () => {
    const container = document.createElement('div');

    const toCheckout = Button('To Checkout');
    container.appendChild(toCheckout);
}