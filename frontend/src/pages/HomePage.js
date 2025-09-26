    import React from "react";
    import HeroBanner from "../components/HeroBanner";
    import CategoryShowcase from "../components/CategoryShowcase";
    import AboutUsPage from "../pages/AboutUsPage";
    import WhyChooseUs from "../components/WhyChooseUs";
    import FollowUs from "../components/FollowUs";
    import ContactUs from "../components/ContactUs";
    import OurService from "../components/OurService";
    import Testimonials from "../components/Testimonials";
    import Footer from "../components/Footer";

    export default function HomePage() {
    return (
        <>
        <HeroBanner />
        <CategoryShowcase />
        <AboutUsPage /> 
        <WhyChooseUs />
        <FollowUs />
        <ContactUs />
        <OurService />
        <Testimonials />
        <Footer />
        </>
    );
    }
