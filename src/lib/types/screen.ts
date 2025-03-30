import { Product } from "./product";
import { Member } from "./member";
import { Order } from "./order";


/** REACT APP STATE **/
export interface AppRootState {
    homePage: HomePageState,
    productPage: ProductPageState,
    ordersPage: OrdersPageState
}


/** HOMEPAGE **/
export interface HomePageState {
    freshArrivals: Product[];
    newDishes: Product[];
    topUsers: Member[];
}

/** PRODUCTPAGE **/
export interface ProductPageState {
    restaurant: Member | null;
    chosenProduct: Product | null;
    products: Product[] 
}

/** ORDERSPAGE **/
export interface OrdersPageState {
    pausedOrders: Order[]
    processOrders: Order[]
    finishedOrders: Order[]
}
