import { GanttComponent,TaskFieldsModel, ColumnsDirective,ColumnDirective, Inject, 
        PdfExport,Edit, Selection, Sort,Filter,Toolbar,ExcelExport} from '@syncfusion/ej2-react-gantt';
import { useState,useMemo,useRef} from 'react'
import UseCallApi from '../Hooks/UseCallApi';
import DataRaw from '../DataRaw';

const projectResources = [
    { resourceId: 2, resourceName: 'Patrice Simard' },
    // { resourceId: 2, resourceName: 'Rose Fuller' },
    // { resourceId: 3, resourceName: 'Margaret Buchanan' },
    // { resourceId: 4, resourceName: 'Fuller King' }
];



const GanttView =()=>{
    const ganttChart : any = useRef();
    const param = { action: '', ganttDataSources:[],newTaskData:{},deleteData:{eraseData:[{}],modifyData:[{}]}}
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

        const toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll','ZoomIn','ZoomOut','ZoomToFit','ExcelExport'];

         const labelSettings = {
             rightLabel: 'notes'
         };        

         const resourceFields = {
             id: 'resourceId',
             name: 'resourceName',
         };

        const queryTaskbarInfo = (args:any) =>{
            
            if (args.data.progress <= 50) {
                args.progressBarBgColor = "red";
            } else if (args.data.progress > 50 && args.data.progress < 80) {
                args.progressBarBgColor = "yellow";
            } else if (args.data.progress >= 80) {
                args.progressBarBgColor = "lightgreen";
            }

            //console.log(args.progressBarBgColor)
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
                console.log("on efface")
                //console.log(arg)

                const eraseDate : any=[]

                arg.data.map((v:any,i:any)=>{
                    return(
                        //console.log(v.taskData),
                        eraseDate.push(v.taskData)
                    )
                })
                
                param.action = 'deleteProjets'
                param.deleteData.eraseData = eraseDate
                param.deleteData.modifyData = arg.modifiedTaskData
                setData(await UseCallApi(param))
                
            }

            if (arg.requestType === 'refresh') {
                //console.log("on refresh")
                //param.action = 'GetAllProjets'
                //setData(await UseCallApi(param))
            }
        
        };

        const updateValue = async(arg:any) =>{
            param.action = 'setProjets'
            param.ganttDataSources = arg.modifiedTaskData
            setData(await UseCallApi(param))

        }

        const pdfExpComplete= (args:any) => {
            //This event will be triggered when pdf exporting.
                args.promise.then((e:any) => {
                //In this `then` function, we can get blob data through the arguments after promise resolved.
                exportBlob(e.blobData);
            });
            };

            const exportBlob = (blob:any) => {
                let a = document.createElement('a');
                document.body.appendChild(a);
                a.style.display = 'none';
                let url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = 'Export';
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
    }
        
        const toolbarClick = (args: any) =>{ 
            const rep = args.item.id
		    const sub = 'pdfexport'           
            if (rep.includes(sub)) {
                ganttChart.current.pdfExport(null,null,null,true);
             }
             
             const sub1 = 'excelexport'           
             if (rep.includes(sub1)) {
                 ganttChart.current.excelExport();
              }
        }
        
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
            allowPdfExport={true}
            pdfExportComplete={pdfExpComplete}
            allowExcelExport={true}
            toolbar = {toolbar}
            toolbarClick={toolbarClick}
            rowHeight={45}
            queryTaskbarInfo={queryTaskbarInfo}
            actionComplete={actionComplete}
            ref={ganttChart}
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
                
                <Inject services={[Edit, Selection, Sort,Filter,Toolbar,PdfExport,ExcelExport]}/>
            </GanttComponent>
        </div>
)}

export default GanttView



