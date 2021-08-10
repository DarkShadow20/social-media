import {toast} from "react-toastify";

export const toastDark=(message)=>{
    return toast.dark(message,{
        position:toast.POSITION.BOTTOM_CENTER,
        autoClose:1000,
        draggablePercent:50,
    })
};


export const toastSuccess=(message)=>{
    return toast.success(message,{
        position:toast.POSITION.BOTTOM_CENTER,
        autoClose:1000,
        draggablePercent:50,
    })
};


export const toastError=(message)=>{
    return toast.error(message,{
        position:toast.POSITION.TOP_CENTER,
        autoClose:1000,
        draggablePercent:50,
    })
};

export const toastWarning=(message)=>{
    return toast.warning(message,{
        position:toast.POSITION.TOP_CENTER,
        autoClose:1000,
        draggablePercent:50,
    })
};