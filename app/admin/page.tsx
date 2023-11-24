import { db } from "@/lib/db"
import { FormationThresholdField } from "./_components/parameters/formation-threshold-field"




const AdminPage = async () => {

    const formationParameters = await db.formationParameters.findFirst()


  return (
    <div className="w-full">
         <div className="flex flex-col gap-y-2 mt-2">
            <h1 className="text-2xl font-medium">Parametros generales</h1>
            {/* <span className="text-sm text-slate-700">
              Complete all fields 
            </span> */}
          </div>
        <FormationThresholdField formationParameters={formationParameters} />
    </div>
  )
}

export default AdminPage