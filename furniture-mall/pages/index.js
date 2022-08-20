
import styles from '../styles/Home.module.css'
import Layout from "../components/layout/layout";

export default function Home() {
  return (
    <div>
      <section className={`${styles.jumbotron} text-center indexPageHeader`}>
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
Home.Layout = Layout;
