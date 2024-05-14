import { LuArrowRight } from "react-icons/lu";
import { Link } from "react-router-dom";

const PlacesCard = ({ item }) => {
    return (
        <Link  to="/buy" className="block border rounded-xl px-2.5 py-2.5 my-2">
          <div className="rounded-2xl h-44 object-center object-cover overflow-hidden">
            <img
              className="rounded-2xl hover:scale-150 transition-transform duration-300"
              src={`http://localhost:5000/image/areas/${item.image}`}
              alt="area"
            />
          </div>
          <h2 className="text-2xl text-secondary font-semibold py-1 my-2">
            {item.city}
          </h2>
            <div className="flex justify-between">
                <h3> Total Property {item.length}</h3>
                <button className="bg-primary/20 rounded-md text-primary px-2 py-1.5"><LuArrowRight/></button>
            </div>
        </Link>
    );
};

export default PlacesCard;
