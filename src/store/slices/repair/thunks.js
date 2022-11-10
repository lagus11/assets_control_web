import axiosJWT from "../../../intercept/WithAxios";
import { setAssetSelectStatus } from "../modalSelectStatus/modalSelectStatusSlice";

import { OpenModalStatusDetails, setAssetStatusDetails } from "../modalStatusDetails/modalStatusDetailsSlice";
import { setRepair, startLoadingRepair } from "./repairSlice";



export const getRepair = (id = 1) => {
    return async(dispatch, getState) => {
        dispatch(startLoadingRepair());

        //realizar peticion http
        axiosJWT.get("/status_repair/detalles_reparacion/" + id)
        .then(response => {
            dispatch( setRepair({repair: response.data}));
            dispatch( setAssetStatusDetails({assetStatusDetails: response.data.idAsset}));
            dispatch( setAssetSelectStatus({assetSelectStatus: response.data.idAsset}))
            dispatch( OpenModalStatusDetails() );
        }).catch(error => console.log(error));
        
    }
}