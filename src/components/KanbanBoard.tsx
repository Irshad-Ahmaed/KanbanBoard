import { PlusCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { Column, Id } from "../types";
import { v4 as uuidv4 } from 'uuid';
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

const KanbanBoard = () => {
    const [columns, setColumns] = useState<Column[]>([]);
    const columnsId = useMemo(()=> columns.map(col=> col.id), [columns]);

    const [activeColumn, setActiveColumn] = useState< Column | null>(null);

    // Senors to distinguish between drag or normal click
    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          distance: 5, //5px
        }
      })
    );

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

    const deleteColumns = (id: Id)=> {
      const filteredColumns = columns.filter(col => col.id != id);
      setColumns(filteredColumns);
    }

    const updateColumn = (id: Id, title: string)=> {
      const newColumn = columns.map((col)=> {
        if(col.id !== id) return col;
        return {...col, title};
      });

      setColumns(newColumn);
    }

    const onDragStart = (event: DragStartEvent)=> {
      console.log("DRAG START: ", event);
      if(event.active.data.current?.type === 'Column'){
        setActiveColumn(event.active.data.current?.column);
        return;
      }
    }

    const onDragEnd = (event: DragEndEvent)=> {
      const {active, over} = event;
      if(!over) return;

      const activeColumnId = active.id;
      const overColumnId = over.id;

      if(activeColumnId === overColumnId) return;
      
      setColumns(columns => {
        const activeColumnIndex = columns.findIndex(col=> col.id === activeColumnId);

        const overColumnIndex = columns.findIndex(col => col.id === overColumnId);

        return arrayMove(columns, activeColumnIndex, overColumnIndex);
      })
      
    }

  return (
    <div className="m-auto flex min-h-screen items-center w-full 
    overscroll-x-auto overflow-y-hidden px-[40px]">

      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="m-auto flex gap-2">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col)=> (
                  <ColumnContainer column={col} deleteColumns={deleteColumns} updateColumn={updateColumn} key={col.id}/>
              ))}
            </SortableContext>
          </div>

          <button className="h-[60px] w-[350px] min-w-[350px] cursor-pointer bg-[#0D1117] 
              rounded-lg border-2 border-[#0D1117] p-4 ring-rose-500 hover:ring-2 flex gap-2"
              onClick={()=> {createNewColumn();}}
          >
            <PlusCircle/> Add Column
          </button>

        </div>

        {createPortal(
          <DragOverlay>
            {
              activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  deleteColumns={deleteColumns}
                  updateColumn={updateColumn}
                />
              )
            }
          </DragOverlay>,
          document.body
        )}

      </DndContext>
    </div>
  );
};

export default KanbanBoard;