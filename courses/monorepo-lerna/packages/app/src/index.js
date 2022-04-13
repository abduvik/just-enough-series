import { CartPage } from "@monorepo-lerna/cart";
import { CheckoutPage } from "@monorepo-lerna/checkout";
import { Header } from "@monorepo-lerna/components";

const app = document.createElement('div');

console.log('testing')

app.appendChild(Header());
app.appendChild(CheckoutPage());
app.appendChild(CartPage());

document.getElementById('root').appendChild(app);

