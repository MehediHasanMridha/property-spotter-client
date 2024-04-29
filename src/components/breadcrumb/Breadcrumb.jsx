import { Link } from "react-router-dom";
import BreadCrumbImage from "../../assets/images/banner.svg";

const Breadcrumb = ({ title }) => {
    return (
        <div
            className="bg-primary bg-bottom"
            style={{ backgroundImage: `url(${BreadCrumbImage})` }}
        >
            <div className="flex items-center max-w-6xl mx-auto h-72 px-6 lg:px-0">
                <div className="space-y-3">
                    <h3 className="text-white text-3xl font-bold">{title}</h3>
                    <h3 className="text-white text-lg font-semibold"> <Link to={'/'}>Home</Link> {">"} {title}</h3>
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;
