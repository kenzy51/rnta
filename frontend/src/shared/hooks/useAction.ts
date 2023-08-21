import { AxiosError, AxiosPromise, AxiosResponse } from "axios";
import { loaderStore } from "../store/loader/loader.store";


export interface OptionsType<T> {
    show?: boolean;
    successCallback?: (response: AxiosResponse<T>) => void;
    errorCallback?: (error: AxiosError<T>) => void;
}



export const useAction = async <T>(
    promiseFunction: AxiosPromise<T>,
    options: OptionsType<T>
): Promise<AxiosResponse<T>> => {
    const { setLoader } = loaderStore;
    const { show, successCallback, errorCallback } = options;

    if (show) {
        setLoader(true);
    }

    const response = await promiseFunction;
    if (response && successCallback) {
        successCallback(response);
    }

    if (!response && errorCallback) {
        errorCallback(response);
    }

    setLoader(false);

    return response;
};
