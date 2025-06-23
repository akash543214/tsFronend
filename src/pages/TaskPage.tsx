import DataTable from "@/components/DataTable/DataTable";
import { useState } from "react";
import { getColumns } from "../components/DataTable/columns";
import { ViewType } from "@/types/common";
import { useParams } from "react-router-dom";
import KanbanBoard from "@/components/KanbanBoard/KanbanBoard";

export default function TaskPage()
{
        const {id} = useParams();

    const [view, setView] = useState<ViewType>('table');

    const columns = getColumns(Number(id)); // pass refresh function here

    return (
      view === 'kanban' ?
      <KanbanBoard 
       setView={setView}/> :
        <DataTable 
         columns={columns}  
          setView={setView}
         />  
    );
}