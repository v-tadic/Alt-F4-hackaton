import NavBar from "../Components/NavBar/Navbar.jsx";
import Hero from "../Components/Hero/Hero.jsx";
import Services from "../Components/Services/Services.jsx"
import Testimonials from "../Components/Testimonials/Testimonials.jsx"

function LandingPage(){
    return (
        <div>
            <NavBar/>
            <Hero/>
            <Services/>
            <Testimonials/>
        </div>
    )
}

export default LandingPage;