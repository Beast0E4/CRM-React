import { FaPencilAlt } from "react-icons/fa";

import Card from "../../components/card";
import HomeLayout from "../../layouts/homelayout";

function Home() {
    return (
        <HomeLayout>
            <Card>
                <FaPencilAlt className="inline mr-2"/>
            </Card>
        </HomeLayout>
    );
}

export default Home;