import {enqueueSnackbar} from 'notistack';


export const SuccessAlert =(msg)=>{
    enqueueSnackbar(msg, { autoHideDuration: 3000,variant:"success" });
}

export const ErrorAlert =(msg)=>{
    enqueueSnackbar(msg, { autoHideDuration: 3000,variant:"error" });
}


export const InfoAlert =(msg)=>{
    enqueueSnackbar(msg, { autoHideDuration: 3000,variant:"info" });
}

export const WarningAlert =(msg)=>{
    enqueueSnackbar(msg, { autoHideDuration: 3000,variant:"warning" });
}