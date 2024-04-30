import Container from "../../components/Container/Container";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import PropertyCard from "../../components/cards/PropertyCard/PropertyCard";

const ResidentialPage = () => {
    return (
        <div>
            <Breadcrumb title={"Commercial"} />
            <Container>
                <div className="px-6 py-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
                        {Array.from({ length: 6 }, (_, idx) => (
                            <PropertyCard key={idx} />
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ResidentialPage;