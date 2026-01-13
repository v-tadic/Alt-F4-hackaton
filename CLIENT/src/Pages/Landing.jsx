import NavBar from "../Components/NavBar/Navbar.jsx";
import Hero from "../Components/Hero/Hero.jsx";
import Services from "../Components/Services/Services.jsx"
import Testimonials from "../Components/Testimonials/Testimonials.jsx"
import Footer from "../Components/Footer/Footer.jsx"
import FinalCta from "../Components/FinalCta/FinalCta.jsx"

function LandingPage(){
    return (
        <div>
            <NavBar/>
            <Hero/>
            <Services/>
            <Testimonials/>
            <FinalCta/>
            <Footer/>
        </div>
    )
}

export default LandingPage;