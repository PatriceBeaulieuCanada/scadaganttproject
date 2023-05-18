var DataRaw = [    
        {
            TaskID: 1,
            TaskName: 'Project Initiation',
            StartDate: new Date('04/02/2019'),
            EndDate: new Date('04/21/2019'),
            Duration: null,
            Progress: null,
            Work: null,
            ParentID: null,
            Predeceesor:null,
            Resources: null                                      
        },
        {
            TaskID: 2,
            TaskName: 'Project1',
            StartDate: new Date('04/02/2019'),
            EndDate: null,   
            Duration: 4,
            Progress: 90,
            Work: 30,
            ParentID: 1,
            Predeceesor:'',
            Resources: [2, 3, 4]     
        },    
        {
            TaskID: 3,
            TaskName: 'Project2',
            StartDate: new Date('04/02/2019'),
            EndDate: null,  
            Duration: 4,
            Progress: 90,
            Work: 30,
            ParentID: 1,
            Predeceesor:'2FS',
            Resources: [2, 3, 4]     
        },
        {
            TaskID: 4,
            TaskName: 'Project Initiation',
            StartDate: new Date('04/02/2019'),
            EndDate: new Date('04/21/2019'),
            Duration: null,
            Progress: null,
            Work: null,
            ParentID: null,
            Predeceesor:null,
            Resources: null                      
        },
        {
            TaskID: 5,
            TaskName: 'Project2',
            StartDate: new Date('04/02/2019'),
            EndDate: null,
            Duration: 4,
            Progress: 90,
            Work: 30,
            ParentID: 4,
            Predeceesor:'',
            Resources: null       
        },
        
]

export default DataRaw