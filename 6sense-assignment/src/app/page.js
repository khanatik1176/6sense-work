
import Link from "next/link";

import UserTable from "../app/Components/UserTable";



export default function Home() {



  return (
    <div className=" bg-white grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
        <div className="heading-area">
              <h1 className="text-4xl text-black">Admin Dashboard</h1>

                <div className="buttons-area relative left-[500px]">

                    <Link href={"/User"} className="bg-green-500 border rounded-3xl h-10 py-3 px-6 text-white hover:bg-green-700 transition-all ease-in duration-200">Add User</Link>

                </div>
        </div>

        <div className="body"> 

            <div className="table-area">

               <UserTable /> 


            </div>

        </div>
        
    </div>
  );
}
