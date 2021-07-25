import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import Navbar from '../CommonComp/Navbar';
// import Footer from '../CommonComp/Footer';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home Page</title>
        <meta name="keywords" content="Ninja" />
      </Head>
      {/* <Navbar /> */}
      <h1>Home</h1>
     <p>This is a Paragraph</p>
      {/* <Footer /> */}
    </div>
  )
}
