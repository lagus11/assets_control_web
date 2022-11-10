import axiosJWT from "../../../intercept/WithAxios";
import { setAssetDetails, startLoadingAssetDetails, openModalAssetDetails } from "./assetDetailsSlice"


export const getAssetDetails = (id = 1) => {
    return async(dispatch, getState) => {
        dispatch(startLoadingAssetDetails());

        //realizar peticion http
        axiosJWT.get(`/equipos/ver_detalles_equipo/${id}`)
        .then(response => {
            dispatch( setAssetDetails({assetDetails: response.data}));
            dispatch( openModalAssetDetails() );
        }).catch(error => console.log(error));
        
    }
}