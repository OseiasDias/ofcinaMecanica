import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar.jsx";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin.jsx";
import { IoIosAdd } from "react-icons/io";
import TabelaVizualizarBlog from "../../components/compenentesAdmin/TabelaVizualizarBlog.jsx";

const Blog = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Blogs" icone={<IoIosAdd />} direccao="/addBlogs" />

            <div className="vh-100">
            <TabelaVizualizarBlog />
            </div>
            <p className="text-center np pt-5 mt-5 ppAr">
              <hr />
              Copyright © 2024 <b>Bi-tubo Moters</b>, Ltd. Todos os direitos
              reservados.
              <br />
              Desenvolvido por: <b>Oseias Dias</b>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
