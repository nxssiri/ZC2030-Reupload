
import {useEffect} from "react";
import {useRouter} from "next/router";


const NotFound = () => {

    const router= useRouter();

    // redirects to home page
    useEffect (()=>{
            setTimeout(()=>{
                router.push('/')
            },2000)
        }

    )

    return(
        <div className="not-found">
            <h1>Oops...</h1>
            <h2>That page cannot be found</h2>
        </div>
    )

}

export default NotFound;