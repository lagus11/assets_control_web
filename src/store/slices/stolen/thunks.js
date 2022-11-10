import axiosJWT from "../../../intercept/WithAxios";
import { setAssetSelectStatus } from "../modalSelectStatus/modalSelectStatusSlice";

import { OpenModalStatusDetails, setAssetStatusDetails } from "../modalStatusDetails/modalStatusDetailsSlice";
import { setStolen, startLoadingStolen } from "./stolenSlice";



export const getStolen = (id = 1) => {
    return async(dispatch, getState) => {
        dispatch(startLoadingStolen());

        //realizar peticion http
        axiosJWT.get("/status_stolen/detalles_robado/" + id)
        .then(response => {
            dispatch( setStolen({stolen: response.data}));
            dispatch( setAssetStatusDetails({assetStatusDetails: response.data.idAsset}));
            dispatch( setAssetSelectStatus({assetSelectStatus: response.data.idAsset}))
            dispatch( OpenModalStatusDetails() );
        }).catch(error => console.log(error));
        
    }
}