import { makeAutoObservable } from "mobx";

class LoaderStore {
    loading = false;
    constructor() {
        makeAutoObservable(this);

    }
    setLoader = (state: boolean) => {
        this.loading = state;
    };
}
export const loaderStore = new LoaderStore();