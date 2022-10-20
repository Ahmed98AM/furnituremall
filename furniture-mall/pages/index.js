
import styles from '../styles/Home.module.css'
import Layout from "../components/layout/layout";
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <section className={`${styles.jumbotron} text-center indexPageHeader`}>
        <div className="mt-[12em]">
          <h1 className="flux text-6xl ">The Furniture Store</h1>
          <p className='mt-[2em]'>
            <Link href= "/products"><a className='m-[2em]'>Products</a></Link>
            <Link href= "/bills"><a className='m-[2em]'>Bills</a></Link>
          </p>
        </div>
      </section>
    </div>
  )
}
Home.Layout = Layout;
