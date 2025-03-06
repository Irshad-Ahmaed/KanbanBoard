import { Trash2 } from "lucide-react";
import { Column, Id } from "../types"
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import { useState } from "react";

interface Props {
  column: Column;
  deleteColumns: (id: Id)=> void;
  updateColumn: (id: Id, title: string)=> void;
}

const ColumnContainer = (props: Props) => {
  const {column, deleteColumns, updateColumn} = props;

  const [editMode, setEditMode] = useState<boolean>(false);

  const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if(isDragging){
    return <div 
      ref={setNodeRef}
      style={style} 
      className="h-[500px] w-[350px] max-h-[500px] border-2 border-rose-500 opacity-40 rounded-md flex flex-col bg-[#161C22]"
    >

    </div>
  }

  return (
    <div
      ref={setNodeRef}
      style={style} 
      className="h-[500px] w-[350px] max-h-[500px] rounded-md flex flex-col bg-[#161C22]">
      
      <div
        {...attributes}
        {...listeners} 
        onClick={()=> setEditMode(true)}
        className="bg-[#0D1117] text-md p-3 font-bold border-4 border-[#161C22] 
        h-[60px] rounded-lg cursor-grab rounded-b-none flex items-center justify-between">

        <div className="flex gap-2">
          <div className="flex bg-[#161C22] justify-center items-center px-2 
            py-1 text-sm rounded-full">
            0
          </div>
          {!editMode ? 
            column.title 
            : 
            <input className="bg-white text-gray-500 px-2 focus:border-rose-500 border rounded outline-none" 
              value={column.title}
              onChange={(e)=> updateColumn(column.id, e.target.value)}
              autoFocus 
              onBlur={()=> setEditMode(false)} 
              onKeyDown={(e)=> {
                if(e.key !== "Enter") return;
                setEditMode(false);
              }}
            />}
        </div>
        <button 
          className="stroke-gray-500 cursor-pointer rounded hover:bg-[#161C22] p-2 px-1"
          onClick={()=>deleteColumns(column.id)}
        >
          <Trash2 className="stroke-gray-500 hover:stroke-white" />
        </button>
      </div>

      <div className="flex flex-grow">Content</div>
      <div className="">Footer</div>

    </div>
  )
}

export default ColumnContainer