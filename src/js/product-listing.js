import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

const category = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);
productList.init();


//externalServices.getData().then(data => {
//  console.log(data);
//}).catch(error => {
//  console.error(error);
//});


// Here we load the header and the footer
loadHeaderFooter(
  "header",
  "footer",
  "/partials/header.html",
  "/partials/footer.html"
);
