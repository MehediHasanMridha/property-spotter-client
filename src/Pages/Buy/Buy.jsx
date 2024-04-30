import { BiBuildingHouse } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import Container from "../../components/Container/Container";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import PropertyCard from "../../components/cards/PropertyCard/PropertyCard";

const BuyPage = () => {
    return (
        <div>
            <Breadcrumb title={"Buy"} />
            <Container>
                <div className="flex flex-col md:flex-row justify-between gap-5 py-10 px-6 md:px-0">
                    <div className="bg-white rounded-md px-6 py-5 md:w-1/3 space-y-2.5 h-fit">
                        <div className="relative">
                            <input
                                className="bg-primary/10 text-sm outline-none rounded-lg px-10 py-2.5 w-full"
                                type="search"
                                name="search"
                                id="search"
                                placeholder="Search Here ..."
                            />
                            <IoSearch
                                className="absolute top-3 left-2 text-primary"
                                size={20}
                            />
                        </div>
                        <div className="relative">
                            <input
                                className="bg-primary/10 text-sm outline-none rounded-lg px-10 py-2.5 w-full"
                                type="text"
                                name="location"
                                id="location"
                                placeholder="Enter Location.."
                            />
                            <CiLocationOn
                                className="absolute top-3 left-2 text-primary"
                                size={20}
                            />
                        </div>
                        <div className="relative">
                            <select
                                className="bg-primary/10 text-sm outline-none rounded-lg px-10 py-2.5 w-full"
                                type="text"
                                name="location"
                                id="location"
                                defaultValue={"default"}
                            >
                                <option value="default">Select Type</option>
                                <option value="commercial">Commercial</option>
                                <option value="residential">Residential</option>
                            </select>
                            <BiBuildingHouse
                                className="absolute top-3 left-2 text-primary"
                                size={20}
                            />
                        </div>
                        <div className="py-2">
                            <button className="bg-primary px-5 py-3.5 text-center text-sm inline-block text-white cursor-pointer transition duration-200 ease-in-out rounded-md hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 w-full">
                                Show Results
                            </button>
                        </div>
                    </div>
                    <div className="px-6 py-5 md:w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                            {Array.from({ length: 6 }, (_, idx) => (
                                <PropertyCard key={idx} />
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default BuyPage;
