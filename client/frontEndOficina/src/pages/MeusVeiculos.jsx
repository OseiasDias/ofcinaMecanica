import BarraMenuCliente from "../components/BarraMenuCliente";
import VeiculosCliente from "../components/VeiculosCliente";


/**gera um formulario para marcar agendamento de manutencao com  os senguintes dados: descricao do ojectivo de manutencao, 

data, 

id_veiculo.  */


export default function MeusVeiculos(){

    return(
        <>
          <BarraMenuCliente />
         
         <VeiculosCliente />
         
        </>
    )
}