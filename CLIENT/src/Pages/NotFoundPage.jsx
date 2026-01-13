import { Link } from 'react-router-dom'

function NotFoundPage(){
    return (
        <div>
            <p>Page not found</p>
            <Link to={"/"}>
                <button>Go to home</button>
            </Link>
        </div>
    )
}

export default NotFoundPage;