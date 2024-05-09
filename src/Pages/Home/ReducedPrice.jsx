import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import PropertyCard from "../../components/cards/PropertyCard/PropertyCard";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import axios from "axios";
import { Link } from "react-router-dom";

const ReducedPrice = () => {
    const [listings, setListings] = useState([]);
    useEffect(() => {
      fetchListingData();
  }, []);

    const fetchListingData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/house/houseData"
            );
            setListings(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

 
    // console.log(listings);
    return (
        <section className="bg-white py-10 px-6 md:px-0">
            <SectionTitle
                heading={"Reduced Price"}
                subheading={"Exploring Reduced Property Lists"}
            />
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
                 {
                   listings.slice(0, 6).map((item)=>
                        <PropertyCard key={item._id} item={item}/>
                    )
                    }
                </div>
               
                <Link to="/buy">
                <div className="flex justify-center mt-10">
                   <button
                        className="btn-primary text-white py-2 px-5 rounded mt-4"
                       
                    >
                        See All
                    </button>
              
                   </div>
                </Link>
            </Container>
        </section>
    );
};

export default ReducedPrice;
