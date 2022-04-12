import { CartPage } from "@monorepo-tutorial/cart";
import { CheckoutPage } from "@monorepo-tutorial/checkout";
import { Header } from "@monorepo-tutorial/components";

const app = document.createElement('div');

app.appendChild(Header());
app.appendChild(CheckoutPage());
app.appendChild(CartPage());

document.getElementById('root').appendChild(app);

