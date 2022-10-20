import axios from "axios";
import Layout from "../../components/layout/layout";
import {useProductsQuery} from "../../framework/products/get-all-products";
import Image from 'next/image'
export default function Products() {
    const { data } = useProductsQuery();
    console.log(data?.foundProducts)
    const products = data?.foundProducts;
    return (
        
        <div className="productsCards place-items-center grid lg:grid-cols-3 md:grid-cols-1">
            {
                products ?
                    products.map((product) => 
                        
                        <div className="card">
                            <figure>
                                <Image layout="fill" src={`${product.image}`} alt="t-shirt"/>
                            </figure>
                            <section className="details">
                                <div className="min-details">
                                    <h1>Price</h1>
                                </div>
                                <div className="min-details">
                                    <h1>Base</h1>
                                    <h1 className="price">{ `$${product.priceA}` }</h1>
                                </div>
                                <div className="min-details">
                                    <h1>Retail</h1>
                                    <h1 className="price">{ `$${product.priceB}` }</h1>
                                </div>
                                <div className="min-details">
                                    <h1>Discounted</h1>
                                    <h1 className="price">{ `$${product.priceC}` }</h1>
                                </div>
                                {/* <a href="#" className="btn">add to cart</a> */}
                            </section>
                        </div>
                    
                    ) :
                <div>Loading...</div>    
            }
            {
                products ?
                    products.map((product) => 
                        
                        <div className="card">
                            <figure>
                                <Image layout="fill" src={`${product.image}`} alt="t-shirt"/>
                            </figure>
                            <section className="details">
                                <div className="min-details">
                                    <h1>Price</h1>
                                </div>
                                <div className="min-details">
                                    <h1>Base</h1>
                                    <h1 className="price">{ `$${product.priceA}` }</h1>
                                </div>
                                <div className="min-details">
                                    <h1>Retail</h1>
                                    <h1 className="price">{ `$${product.priceB}` }</h1>
                                </div>
                                <div className="min-details">
                                    <h1>Discounted</h1>
                                    <h1 className="price">{ `$${product.priceC}` }</h1>
                                </div>
                                {/* <a href="#" className="btn">add to cart</a> */}
                            </section>
                        </div>
                    
                    ) :
                <div>Loading...</div>    
            }
        </div>
  )
}

// export const getStaticProps = async () => {
//     const res = await axios.get("http://localhost:4000/api/products");
// 	return {
//         props: {products: res.data},
// 	};
// };

Products.Layout = Layout;
