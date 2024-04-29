import Container from "../../components/Container/Container";
import PropertyCard from "../../components/cards/PropertyCard/PropertyCard";
import SectionTitle from "../../components/sectionTitle/SectionTitle";

const ReducedPrice = () => {
    return (
        <section className="bg-white py-10 px-6 md:px-0">
            <SectionTitle
                heading={"Reduced Price"}
                subheading={"Exploring Reduced Property Lists"}
            />
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
                    {Array.from({ length: 6 }, (_, idx) => (
                        <PropertyCard key={idx} />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default ReducedPrice;
