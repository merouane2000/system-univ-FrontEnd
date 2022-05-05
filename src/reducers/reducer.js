const initState = {
    students: [],
    selectedStudent:{},
    selectedClass:{},
    listedSubjects: []
   
}
const reducer = (state = initState, action) => {
    switch (action.type) {
        case "UPDATE_STUDENTS":
            return { ...state,
                students: action.payload
            };
        case "UPDATE_STUDENT":
            return { ...state,
                selectedStudent: action.payload
            };
        case "UPDATE_CLASS":
            return { ...state,
                selectedClass: action.payload
            };
        case "UPDATE_LISTED_SUBJECTS":
            return { ...state,
                listedSubjects: action.payload
            };
        default:
            return state
    }
}
export default reducer