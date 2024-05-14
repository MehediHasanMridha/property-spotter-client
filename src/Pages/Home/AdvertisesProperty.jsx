import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";

const AdvertisesProperty = () => {
    return (
        <Container>
            <section className="bg-primary text-white rounded-2xl px-5 md:px-28 py-20 my-20 mx-6 md:mx-0">
                <div className="flex justify-between items-center gap-5">
                    <div className="md:w-1/2">
                        <h3 className="text-2xl md:text-4xl font-bold">
                            let us know of any properties for sale and get paid
                        </h3>
                        <h4></h4>
                    </div>
                   <Link to="/spotter-reg"> <button className="bg-white border border-primary px-5 md:px-16 py-5 text-center text-nowrap text-sm md:text-xl inline-block text-primary cursor-pointer transition duration-200 ease-in-out rounded-md  focus-visible:outline-none ring-4 ring-blue-300/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95">Sign up</button></Link>
                </div>
            </section>
        </Container>
    );
};

export default AdvertisesProperty;
