import React , { useState }from 'react';
import { TextField } from '@material-ui/core';

 const InitialValues ={
     FamilyName:'',
     Name:'',
     Class:'',
     Notes:{
         NameOfSubject:'',
         Exam:null,
         TD:null,
         TP:null,
     },

     MoyenneSe1:0,
     MoyenneSe2:0,
     MoyenneGe:0,
}

const StudentsForm = () => {
    const [value , setValue] = useState(InitialValues)

    return ( 
     <form>
          <TextField
            variant="outlined"
            label='FamilyName'
            name='FamilyName'
            value={value.FamilyName}
     
        />
          <TextField
            variant="outlined"
            label='Name'
            name='Name'
            value={value.Name}
     
        />
          <TextField
            variant="outlined"
            label='Class'
            name='Class'
            value={value.Class}
     
        />
          <TextField
            variant="outlined"
            label='Exam'
            name='Exam'
            value={value.Notes.Exam}
     
        />
          <TextField
            variant="outlined"
            label='TD'
            name='TD'
            value={value.Notes.TD}
     
        />
          <TextField
            variant="outlined"
            label='TP'
            name='TP'
            value={value.Notes.TP}
     
        />

     </form>
     );
}
 
export default StudentsForm;