
import Link from "next/link";

import UserTable from "../app/Components/UserTable";



export default function Home() {



  return (
    <div className="bg-slate-200 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans overflow-x-hidden">
        <div className="heading-area">
              <h1 className="text-4xl text-black relative right-10 xl:right-0">Admin Dashboard</h1>

                <div className="buttons-area relative left-10 top-10 xl:left-[500px] xl:top-0">

                    <Link href={"/User"} className="bg-green-500 border rounded-3xl h-10 py-3 px-6 text-white hover:bg-green-700 transition-all ease-in duration-200">Add User</Link>

                </div>
        </div>


            <div className="table-area">

               <UserTable /> 


            </div>
        
    </div>
  );
}
