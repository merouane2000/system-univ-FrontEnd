const initState = {
    students: [],
    selectedStudent:{},
    selectedClass:{},
    listedSubjects: [],
    rachatAVG:0
   
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
        case "UPDATE_RACHAT_AVG":
            return { ...state,
                rachatAVG: action.payload
            };
        default:
            return state
    }
}
export default reducer