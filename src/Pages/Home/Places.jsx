import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import PlacesCard from "../../components/cards/PlacesCard/PlacesCard";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import axios from "axios";

const Places = () => {

    const [area, setArea] = useState([])

    
  useEffect(() => {
    fetchArea();
  }, []);

  const fetchArea = async () => {
    try {
      const response = await axios.get("http://localhost:5000/area/AreasData");
      setArea(response.data);
    } catch (error) {
      console.error( error);
      
    }
  }
    const places = [
        {
            id: 0,
            cityName: "Dhaka",
            image: "https://i.ibb.co/z4zXFjH/c-3.webp",
            totalProperty: 20,
        },
        {
            id: 1,
            cityName: "Delhi",
            image: "https://i.ibb.co/VvW6y2R/c-4.webp",
            totalProperty: 20,
        },
        {
            id: 2,
            cityName: "Khulna",
            image: "https://i.ibb.co/1Z0ZpvC/c-6.webp",
            totalProperty: 20,
        },
        {
            id: 3,
            cityName: "Pabna",
            image: "https://i.ibb.co/0jD7V98/c-7.webp",
            totalProperty: 20,
        },
        {
            id: 4,
            cityName: "Dhaka",
            image: "https://i.ibb.co/z4zXFjH/c-3.webp",
            totalProperty: 20,
        },
        {
            id: 5,
            cityName: "Khulna",
            image: "https://i.ibb.co/1Z0ZpvC/c-6.webp",
            totalProperty: 20,
        },
        {
            id: 6,
            cityName: "Delhi",
            image: "https://i.ibb.co/VvW6y2R/c-4.webp",
            totalProperty: 20,
        },
        {
            id: 7,
            cityName: "Pabna",
            image: "https://i.ibb.co/0jD7V98/c-7.webp",
            totalProperty: 20,
        },
    ];
    return (
        <section className="bg-white py-10 px-6 md:px-0">
            <SectionTitle
                heading={"Provinces and Cities"}
                subheading={"Exploring Provinces and Cities near by you"}
            />
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {area.map((item) => (
                        <PlacesCard key={item.id} item={item} />
                    ))}
                </div>
                <div className="text-center py-4">
                    <button className="bg-primary px-5 py-3.5 text-center text-sm inline-block text-white cursor-pointer transition duration-200 ease-in-out rounded-md hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95">
                        {" "}
                        See All Provinces{" "}
                    </button>
                </div>
            </Container>
        </section>
    );
};

export default Places;
