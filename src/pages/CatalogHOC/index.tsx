import { CatalogHOCBase } from "../../components/HOC/CatalogHOCBase";
import { WithProducts } from "../../components/HOC/WithProducts";
import { WithWishlist } from "../../components/HOC/WithWishlist";

export const CatalogHOC = WithWishlist(WithProducts(CatalogHOCBase));
