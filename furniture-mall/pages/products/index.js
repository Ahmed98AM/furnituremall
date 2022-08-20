import axios from "axios";
import Layout from "../../components/layout/layout";
import {useProductsQuery} from "../../framework/products/get-all-products";

export default function Home({products}) {
    const { data } = useProductsQuery();
    return (
        <div>
            <section className={` text-center indexPageHeader`}>
            <div className="container">
                <h1 className="indexTitle flux">The Furniture Store</h1>
                <p className="indexPageButtons">
                <a href="/products" className="btn btn-primary btn-style-one bproducts">Products</a>
                <a href="/bills" className="btn btn-secondary btn-style-one bbills">Bills</a>
                </p>
            </div>
            </section>
        </div>
  )
}

export const getStaticProps = async () => {
    const res = await axios.get("http://localhost:4000/api/products");
	return {
        props: {products: res.data},
	};
};

Home.Layout = Layout;
