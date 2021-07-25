import { useEffect } from "react";
import { useRouter } from "next/router";

const NotFound = () => {
    const router = useRouter();

    useEffect(()=>{
        console.log("useEffect Run");
        setTimeout(() => {
            // router.go(-1)
            router.push("/")
        }, 3000);
    },[]);

    return (
        <div>
            <h1>Abhishek Thakur</h1>
            <h2>Custom 404 Page</h2>
            <h3>Page Not Found</h3>
        </div>
    );
}

export default NotFound;