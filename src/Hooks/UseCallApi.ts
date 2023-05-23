import axios, { AxiosResponse } from 'axios';
const querystring = require('querystring');

const UseCallApi=async(param:any) =>{

    if(param.action=='GetAllProjets') {
        try {
			const listAllProjets = await axios.get('http://itvxscada:5001/api/GanttProject/GetAllProjets');		
			return listAllProjets.data;            
		} catch (err) {
			// Handle Error Here
			console.error(err);
			return [];
		}        
    }
	
	 if(param.action=='setProjets') {

	 	const config = { headers: { 'Content-Type': 'application/json' } };
	 			
	 	const ganttDataSources =param.ganttDataSources
	 		
        //console.log(ganttDataSources)

         try {
	 		const modifProject =axios.put('http://itvxscada:5001/api/GanttProject/setProjets',ganttDataSources,config);		
	 		return (await modifProject).data;
	 	} catch (err) {
	 		// Handle Error Here
	 		console.error(err);
	 		return [];
	 	}        
     }
     
     if(param.action=='addProjets') {

        const config = { headers: { 'Content-Type': 'application/json' } };
               
        const ganttDataSource = param.newTaskData           


        //console.log(ganttDataSource)

        try {
            const addProject =axios.post('http://itvxscada:5001/api/GanttProject/addProjets',ganttDataSource,config);		
            return (await addProject).data;
        } catch (err) {
            // Handle Error Here
            console.error(err);
            return [];
        }        
    }
    
    if(param.action=='deleteProjets') {

        const config = { headers: { 'Content-Type': 'application/json' } };
               
        const deleteData = param.deleteData           

        //console.log(ganttDataSource)

        try {
            const deleteProject =axios.put('http://itvxscada:5001/api/GanttProject/deleteProjets',deleteData,config);
            return (await deleteProject).data;		
            
        } catch (err) {
            // Handle Error Here
            console.error(err);
            return [];
        }        
    }

}

export default UseCallApi;