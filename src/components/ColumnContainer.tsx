import { Trash2 } from "lucide-react";
import { Column } from "../types"

interface Props {
  column: Column;
}

const ColumnContainer = (props: Props) => {
  const {column} = props;

  return (
    <div className="h-[500px] w-[350px] max-h-[500px] rounded-md flex flex-col bg-[#161C22]">
      
      <div className="bg-[#0D1117] text-md p-3 font-bold border-4 border-[#161C22] 
        h-[60px] rounded-lg cursor-grab rounded-b-none flex items-center justify-between">

        <div className="flex gap-2">
          <div className="flex bg-[#161C22] justify-center items-center px-2 
            py-1 text-sm rounded-full">
            0
          </div>
          {column.title}
        </div>
        <button><Trash2/></button>
      </div>

      <div className="flex flex-grow">Content</div>
      <div className="">Footer</div>

    </div>
  )
}

export default ColumnContainer