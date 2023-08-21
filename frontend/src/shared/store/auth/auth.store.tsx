import { makeAutoObservable } from "mobx";
import { activateToken } from "src/shared/ilbs/useToken";
import { SignInType } from "./auth.interface";
import { AuthService } from "./auth.service";
import { useAction } from "src/shared/hooks/useAction";
const { saveToken, getToken } = activateToken();


class AuthStore {
    isAuth = !!getToken();

    constructor() {
        makeAutoObservable(this)
    }
    setIsAuth() {
        this.isAuth = !!getToken();
    }

    signIn = async (payload: SignInType) => {
        try {
            const { data } = await useAction(AuthService.signIn(payload), {
                show: true,
            })
            saveToken(data.access)
            this.setIsAuth();
        }
        catch (err) {

            throw new Error(err as string)
        }
    }
}

export const authStore = new AuthStore();