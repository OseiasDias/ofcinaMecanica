import { Children } from "react"
import { CgHome, CgMenu, CgMoreVertical } from "react-icons/cg"

export default function HomeAdministrador() {

    return (
        <>

          <aside className="h-screen">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">

                    <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">                    <CgMenu  className="w-25" fontSize={20} />
                    </button>                    

                </div>

                <ul className="flex-1 px-3">{Children}</ul>
               

               <div className="border-t flex p-3">
                    <CgHome />
                    <div className={`
                        flex justify-between items-center
                        w-252 ml-3
                        `}>

                            <div className="leading-4">
                                <h4 className="font-semibold">Oseias Dias</h4>
                                <span className="text-xs text-gray-600">oseias@gmail.com</span>
                           
                            </div>
                            <CgMoreVertical size={20} />

                    </div>
               </div>
            </nav>

          </aside>
        </>
    )
}

export function SiderbarItem({icon,text,active,alert}){

    return(
        <li>
            {icon}
            <span>{text}</span>
        </li>
    )
}