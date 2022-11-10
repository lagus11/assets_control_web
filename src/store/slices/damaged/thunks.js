import axiosJWT from "../../../intercept/WithAxios";
import { setAssetSelectStatus } from "../modalSelectStatus/modalSelectStatusSlice";

import { OpenModalStatusDetails, setAssetStatusDetails } from "../modalStatusDetails/modalStatusDetailsSlice";
import { setDamaged, startLoadingDamaged } from "./damagedSlice";




export const getDamaged = (id = 1) => {
    return async(dispatch, getState) => {
        dispatch(startLoadingDamaged());

        //realizar peticion http
        axiosJWT.get("/status_damaged/detalles_danado/" + id)
        .then(response => {
            dispatch( setDamaged({damaged: response.data}));
            dispatch( setAssetStatusDetails({assetStatusDetails: response.data.idAsset}));
            dispatch( setAssetSelectStatus({assetSelectStatus: response.data.idAsset}))
            dispatch( OpenModalStatusDetails() );
        }).catch(error => console.log(error));
        
    }
}