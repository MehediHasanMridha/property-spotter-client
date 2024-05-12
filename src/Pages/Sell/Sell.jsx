// import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

import { useEffect } from "react";
import Steper from "../../components/Steper/Steper";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

const SellPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Breadcrumb title={"Sell"} />
      <Steper />
    </div>
  );
};

export default SellPage;