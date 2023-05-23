var DataRaw = [    
        {
            taskId: 1,
            taskName: 'Project Initiation',
            startDate: new Date('04/02/2019'),
            endDate: new Date('04/21/2019'),
            duration: null,
            progress: null,
            work: null,
            parentID: null,
            predeceesor:null,
            resources: null                                      
        },
        {
            taskId: 2,
            taskName: 'Project1',
            startDate: new Date('04/02/2019'),
            endDate: null,   
            duration: 4,
            progress: 90,
            work: 30,
            parentID: 1,
            predeceesor:'',
            resources: [2, 3, 4]     
        },    
        {
            taskId: 3,
            taskName: 'Project2',
            startDate: new Date('04/02/2019'),
            endDate: null,  
            duration: 4,
            progress: 90,
            work: 30,
            parentID: 1,
            predeceesor:'2FS',
            resources: [2, 3, 4]     
        },
        {
            taskId: 4,
            taskName: 'Project Initiation',
            startDate: new Date('04/02/2019'),
            endDate: new Date('04/21/2019'),
            duration: null,
            progress: null,
            work: null,
            parentID: null,
            predeceesor:null,
            resources: null                      
        },
        {
            taskId: 5,
            taskName: 'Project2',
            startDate: new Date('04/02/2019'),
            endDate: null,
            duration: 4,
            progress: 90,
            work: 30,
            parentID: 4,
            predeceesor:'',
            resources: null       
        },
        
]

export default DataRaw