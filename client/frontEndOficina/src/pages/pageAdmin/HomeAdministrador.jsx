
/**import MenuLeft from "../../components/compenentesAdmin/MenuLeft";
 */
import Logo from "../../components/compenentesAdmin/Logo";
import MenuLeft from "../../components/compenentesAdmin/MenuLeft";
import "../../css/StylesAdmin/homeAdministrador.css";
import {Layout} from 'antd';

const {Header,Sider} = Layout;



const HomeAdministrador = () => {
  

  return (
    <Layout>
        <Sider className="sidebar">
            <Logo />
            <MenuLeft />
        </Sider>
    </Layout>
  );
};

export default HomeAdministrador;
