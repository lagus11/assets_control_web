import axiosJWT from "../../../intercept/WithAxios";
import { setAssetSelectStatus } from "../modalSelectStatus/modalSelectStatusSlice";

import { OpenModalStatusDetails, setAssetStatusDetails } from "../modalStatusDetails/modalStatusDetailsSlice";
import { setLost, startLoadingLost } from "./lostSlice";

export const getLost = (id = 1) => {
    return async(dispatch, getState) => {
        dispatch(startLoadingLost());

        //realizar peticion http
        axiosJWT.get("/status_lost/detalles_extraviado/" + id)
        .then(response => {
            dispatch( setLost({lost: response.data}));
            dispatch( setAssetStatusDetails({assetStatusDetails: response.data.idAsset}));
            dispatch( setAssetSelectStatus({assetSelectStatus: response.data.idAsset}))
            dispatch( OpenModalStatusDetails() );
        }).catch(error => console.log(error));
        
    }
}