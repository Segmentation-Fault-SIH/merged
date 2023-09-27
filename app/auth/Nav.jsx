import Login from './Login'
import Link from 'next/link'
import { getServerSession } from "next-auth/next"
import {authOptions} from "../../pages/api/auth/[...nextauth]"
import Logged from './Logged';
export default async function Nav() {
    const session = await getServerSession( authOptions)
    console.log(session)
    return(
        <nav className="flex justify-between items-center py-8 ">
        <Link href={"/"}>
            <h1 className="font-bold text-lg">RescueHub Forum </h1>
            <br></br>
            <h2 className="">This forum is open for any volunteers or rescue agency admin </h2>
            <h2>Keep in mind </h2>
            <br></br>
            <ul>
                <li>
                    1. Open discussions and stick to conversations related to disaster rescue only.
                </li>
                <li>
                  2. Request only necessary resources.
                </li>
                <li>
                  3. Be nice to the operators and admins.
                </li>
            </ul>
        </Link>
        <ul className="flex items-center gap-6">
     
        {session?.user? (<Logged image={session.user?.image || " "}/>) : <Login/>}
         

        </ul>
    </nav>
    )
   
}