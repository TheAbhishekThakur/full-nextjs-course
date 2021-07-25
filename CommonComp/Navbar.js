import Link from 'next/link';
import Classes from '../styles/Header.module.css';
import Image from 'next/image';

const Navbar = () => {
    return (
        <nav className={Classes.container}>
            <div>
                <Image src="/vercel.svg" width={120} height={50} />
            </div>
            <Link href="/"><span>Home</span></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link href="/about"><span>About</span></Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <Link href="/ninjas"><span>Ninjas List</span></Link>
        </nav>

    );
}

export default Navbar;