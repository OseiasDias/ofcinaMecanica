import logoBiTurbo  from '../../assets/img/logo- turbo fundo branco.png';

export default function Logo(){

    return(

        <div className="logo">
            <div className="logo-icon">
                <img src={logoBiTurbo} width={200} className='mx-auto d-block'  alt="Logotipo da Bi-Turbo" />
            </div>
        </div>
    )
}