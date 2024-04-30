import Container from "../../components/Container/Container";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

const BuyPage = () => {
    return (
        <div>
            <Breadcrumb title={"Buy"} />
            <Container>
                <div className="flex justify-between gap-5 py-10">
                    <div className="bg-white rounded-md px-6 py-5 w-1/3">s</div>
                    <div className="bg-white rounded-md px-6 py-5 w-3/4">s</div>
                </div>
            </Container>
        </div>
    );
};

export default BuyPage;
