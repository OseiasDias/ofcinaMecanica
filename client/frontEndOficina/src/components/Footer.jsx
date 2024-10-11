import { IoCall } from "react-icons/io5";
import "../css/footer.css";
import { MdEmail } from "react-icons/md";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";
import { GiRoad } from "react-icons/gi";
import { TbMap2 } from "react-icons/tb";
import { RiMapPinLine } from "react-icons/ri";

import { IoLogInOutline } from "react-icons/io5";
import { MdOutlinePersonAdd } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="seccao-footer h-100">
      <div className="container">
        <div className="row text-white py-5">
          <div className="col-12 col-md-6 col-lg-3 alinharDiv">
            <h4 className="mb-4">Contactos</h4>
            <p>
              <IoCall fontSize={22} color=" #0070fa" /> &nbsp;933-884-003
            </p>
            <p>
              <MdEmail fontSize={22} color=" #0070fa" />
              &nbsp; motor12@gmail.com
            </p>
            <p>
              <FaWhatsapp fontSize={22} color=" #0070fa" />
              &nbsp; 923-544-232
            </p>
          </div>
          <div className="col-12 col-md-6 col-lg-3 alinharDiv">
            <h4 className="mb-4">Localização</h4>
            <p>
              <GiRoad fontSize={22} color=" #0070fa" /> &nbsp;Rua 12 - Lado A
            </p>
            <p>
              <RiMapPinLine fontSize={22} color=" #0070fa" />
              &nbsp; Benfica
            </p>
            <p>
              <TbMap2 fontSize={22} color=" #0070fa" />
              &nbsp; Luanda-Angola
            </p>
          </div>
          <div className="col-12 col-md-6 col-lg-3 alinharDiv">
            <h4 className="mb-4">Redes</h4>
            <p>
              <a href="https://www.facebook.com/" target="_blank">
                <FaFacebook fontSize={22} color=" #0070fa" /> &nbsp;Facebook
              </a>
            </p>
            <p>
              <a href="https://youtube.com/" target="_blank">
                <FaYoutube fontSize={22} color=" #0070fa" />
                &nbsp; Youtube
              </a>
            </p>
            <p>
              <a href="https://www.instagram.com/" target="_blank">
                <FaInstagram fontSize={22} color=" #0070fa" />
                &nbsp; Instagram
              </a>
            </p>
          </div>
          <div className="col-12 col-md-6 col-lg-3 alinharDiv">
            <h4 className="mb-4">Menu</h4>

            <p className="recuar">
              <a className=" px-3 d-block">
                <IoLogInOutline fontSize={22} color=" #0070fa" /> Entrar{" "}
              </a>
            </p>
            <p className="recuar">
              {" "}
              <a className="  px-3">
                <MdOutlinePersonAdd fontSize={22} color=" #0070fa" /> Cadastrar-se{" "}
              </a>
            </p>
          </div>
        </div>
      </div>

      <p className="text-center text-white retirarTrasition">
        Copyright © <strong>2024</strong> <em>NomeMotor</em>, Ltd. Todos os
        direitos reservados.
        <br />
        Desenvolvido por: <strong>Oseias Dias</strong>
      </p>
    </footer>
  );
}
