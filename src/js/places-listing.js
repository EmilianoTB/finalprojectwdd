import ExternalServices from "./ExternalServices.mjs";
import PlacesList from "./PlacesList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

const category = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const placesList = new PlacesList(category, dataSource, element);
placesList.init();


loadHeaderFooter(
  "header",
  "footer",
  "/partials/header.html",
  "/partials/footer.html"
);
