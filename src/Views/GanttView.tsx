import { GanttComponent,TaskFieldsModel, ColumnsDirective,ColumnDirective, Inject, Edit, Selection, Sort,Filter,Toolbar} from '@syncfusion/ej2-react-gantt';
import { useState,useMemo,useEffect} from 'react'
import UseCallApi from '../Hooks/UseCallApi';


const projectResources = [
    { resourceId: 2, resourceName: 'Patrice Simard' },
    // { resourceId: 2, resourceName: 'Rose Fuller' },
    // { resourceId: 3, resourceName: 'Margaret Buchanan' },
    // { resourceId: 4, resourceName: 'Fuller King' }
];


const GanttView =()=>{

    const param = { action: '', ganttDataSources:[],newTaskData:{}}

    const [data,setData] = useState([])

    useMemo(() =>{
        UseCallApi({action:'GetAllProjets'}).then((data)=>setData(data))
    },[])

        const taskFields: TaskFieldsModel = {
            id: 'taskId',
            name: 'taskName',
            startDate: 'startDate',
            duration: 'duration',
            progress: 'progress',
            dependency:'predeceesor',
            work:'work',
            parentID:'parentID',
            resourceInfo: 'resources',
            notes:'notes'
        };

        const workUnit = 'Hour';

        const editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            mode: 'Manuel',
            allowTaskbarEditing: true,            
        };

        const toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll','ZoomIn','ZoomOut','ZoomToFit'];

         const labelSettings = {
             rightLabel: 'notes'
         };        

         const resourceFields = {
             id: 'resourceId',
             name: 'resourceName',
         };

        const queryTaskbarInfo = (args:any) =>{
            
            if (args.data.progress == 50) {
                args.progressBarBgColor = "red";
            } else if (args.data.progress == 70) {
                args.progressBarBgColor = "yellow";
            } else if (args.data.progress == 80) {
                args.progressBarBgColor = "lightgreen";
            }

            console.log(args.progressBarBgColor)
        }

        const actionComplete = async (arg:any) => {
		
            //console.log(arg)
            if (arg.requestType === 'save') {
                //console.log("on edit")
                param.action = 'setProjets'
                param.ganttDataSources = arg.modifiedTaskData

                setData(await UseCallApi(param))

            }
    
            if (arg.requestType === 'add') {
                //console.log("on addition")
                param.action = 'addProjets'
                param.newTaskData = arg.newTaskData

                setData(await UseCallApi(param))
            }
    
            if (arg.requestType === 'delete') {
                //console.log("on efface")
            }

            if (arg.requestType === 'refresh') {
                //console.log("on refresh")
                //param.action = 'GetAllProjets'
                //setData(await UseCallApi(param))
            }
        
        };        
        
    return(
        <div>
            
            <GanttComponent dataSource={data} 
            height="650px" 
            taskFields={taskFields}
            allowSelection={true}
            editSettings={editSettings as any}
            resourceFields={resourceFields}
            resources={projectResources}
            labelSettings={labelSettings}
            allowSorting={true}
            allowFiltering={true}
            toolbar = {toolbar }
            rowHeight={45}
            queryTaskbarInfo={queryTaskbarInfo}
            actionComplete={actionComplete}
            >
                <ColumnsDirective>
                    <ColumnDirective field='taskId' headerText='Id'/>
                    <ColumnDirective field='taskName' headerText='Nom'/>
                    <ColumnDirective field='startDate' headerText='Début' format='yyyy-MM-dd'/>
                    <ColumnDirective field= 'work'  width= '110' > </ColumnDirective>
                    <ColumnDirective field='duration' headerText='Durée'/>
                    <ColumnDirective field='progress' headerText='Progrès'/>
                    <ColumnDirective field='resources' headerText='Resource'/>
                    <ColumnDirective field='parentID' headerText='Parent'/>
                    <ColumnDirective field='notes' headerText='Notes'/>
                </ColumnsDirective>
                
                <Inject services={[Edit, Selection, Sort,Filter,Toolbar]}/>
            </GanttComponent>
        </div>

)}

export default GanttView



