    import React from "react";
    import HeroBanner from "../components/HeroBanner";
    import CategoryShowcase from "../components/CategoryShowcase";
    import FeaturedProducts from "../components/FeaturedProducts";
    import PromotionalBanner from "../components/PromotionalBanner";
    import Testimonials from "../components/Testimonials";

    export default function HomePage() {
    return (
        <>
        <HeroBanner />
        <CategoryShowcase />
        <FeaturedProducts />
        <PromotionalBanner />
        <Testimonials />
        </>
    );
    }
