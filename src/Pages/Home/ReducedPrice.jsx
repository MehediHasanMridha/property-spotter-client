import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import PropertyCard from "../../components/cards/PropertyCard/PropertyCard";
import SectionTitle from "../../components/sectionTitle/SectionTitle";

const ReducedPrice = ({ mainData, filterData }) => {
    console.log(mainData);
    return (
        <section className="bg-white py-10 px-6 md:px-0" id="reduceprice">
            <SectionTitle
                heading={"Reduced Price"}
                subheading={"Exploring Reduced Property Lists"}
            />
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
                    {mainData && mainData?.filter(filterData).slice(0, 6).map((item) => (
                        <PropertyCard key={item._id} item={item} />
                    ))}
                </div>

                <Link to="/buy">
                    <div className="flex justify-center mt-10">
                        <button className="btn-primary text-white py-2 px-5 rounded mt-4">
                            See All
                        </button>
                    </div>
                </Link>
            </Container>
        </section>
    );
};

export default ReducedPrice;
