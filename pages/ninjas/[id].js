const NinjaDetails = ({ ninja }) => {
    return (
        <div>
            <h1>Ninja Details</h1>
            <h2>{ninja.name}</h2>
            <p>{ninja.email}</p>
            <p>{ninja.website}</p>
            <p>{ninja.address.city}</p>
        </div>
    );
}

export default NinjaDetails;

export const getStaticPaths = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();

    const paths = data.map(item => {
        return {
            params: { id: item.id.toString() }
        }
    })
    return {
        paths: paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
    const data = await res.json();

    return {
        props: { ninja: data }
    }
}