import { useAuth } from '../context/auth';

export default function Home() {
    const [auth, setAuth] = useAuth();

    // console.log(JSON.parse(localStorage.getItem("zl-auth")));
    return (
        <div>
            <h1 className="display-1 bg-primary text-light p-5">Home</h1>
            <pre>{JSON.stringify(auth, null, 4)}</pre>
        </div>
    );
}