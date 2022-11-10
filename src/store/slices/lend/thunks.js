import axiosJWT from "../../../intercept/WithAxios";
import { setAssetSelectStatus } from "../modalSelectStatus/modalSelectStatusSlice";

import { OpenModalStatusDetails, setAssetStatusDetails } from "../modalStatusDetails/modalStatusDetailsSlice";
import { setLend, startLoadingLend } from "./lendSlice";



export const getLend = (id = 1) => {
    return async(dispatch, getState) => {
        dispatch(startLoadingLend());

        //realizar peticion http
        axiosJWT.get("/status_lend/detalles_prestamo/" + id)
        .then(response => {
            dispatch( setLend({lend: response.data}));
            dispatch( setAssetStatusDetails({assetStatusDetails: response.data.idAsset}));
            dispatch( setAssetSelectStatus({assetSelectStatus: response.data.idAsset}))
            dispatch( OpenModalStatusDetails() );
        }).catch(error => console.log(error));
        
    }
}