import axiosJWT from "../../../intercept/WithAxios";
import { setAssetSelectStatus } from "../modalSelectStatus/modalSelectStatusSlice";
import { OpenModalStatusDetails, setAssetStatusDetails } from "../modalStatusDetails/modalStatusDetailsSlice";
import { setAssignation, startLoadingAssignation } from "./assignationSlice"


export const getAssignation = (id = 1) => {
    return async(dispatch, getState) => {
        dispatch(startLoadingAssignation());

        //realizar peticion http
        axiosJWT.get("/status_assignation/detalles_asignar/" + id)
        .then(response => {
            dispatch( setAssignation({assignation: response.data}));
            dispatch( setAssetStatusDetails({assetStatusDetails: response.data.idAsset}));
            dispatch( setAssetSelectStatus({assetSelectStatus: response.data.idAsset}))
            dispatch( OpenModalStatusDetails() );
        }).catch(error => console.log(error));
        
    }
}