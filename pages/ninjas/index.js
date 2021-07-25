import Head from "next/head";
import Classes from '../../styles/Ninjas.module.css';
import Link from 'next/link';

const Ninjas = ({ ninjas }) => {
    console.log("ninjas", ninjas)
    return (
        <div>
            <Head>
                <title>Ninjas Page</title>
                <meta name="keywords" content="Ninja" />
            </Head>
            <h1>
                All Ninjas
            </h1>
            <div>
                {ninjas.map((item, index) =>
                    <Link href={'/ninjas/' + item.id} key={item.id}>
                        <div key={item.id} className={Classes.sec}>
                            <span>{item.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>{item.email}</span>
                        </div>
                    </Link>
                )}
            </div>

        </div>
    );
}

export default Ninjas;


export const getStaticProps = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    console.log("data a", data)
    return {
        props: { ninjas: data }
    }

}