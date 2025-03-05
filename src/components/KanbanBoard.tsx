import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Column } from "../types";
import { v4 as uuidv4 } from 'uuid';
import ColumnContainer from "./ColumnContainer";

const KanbanBoard = () => {
    const [columns, setColumns] = useState<Column[]>([]);
    console.log(columns);

    const createNewColumn = () => {
        const columnToAdd: Column = {
            id: generateId(),
            title: `Column ${columns.length + 1}`,
        }

        setColumns([...columns, columnToAdd]);
    }

    const generateId = () => {
        return uuidv4();
    }

  return (
    <div className="m-auto flex min-h-screen items-center w-full 
    overscroll-x-auto overflow-y-hidden px-[40px]">

      <div className="m-auto flex gap-2">
        <div className="flex gap-4">
            {columns.map((col)=> (
                <ColumnContainer column={col} key={col.id}/>
            ))}
        </div>

        <button className="h-[60px] w-[350px] min-w-[350px] cursor-pointer bg-[#0D1117] 
            rounded-lg border-2 border-[#0D1117] p-4 ring-rose-500 hover:ring-2 flex gap-2"
            onClick={()=> {createNewColumn();}}
        >
          <PlusCircle/> Add Column
        </button>

      </div>

    </div>
  );
};

export default KanbanBoard;