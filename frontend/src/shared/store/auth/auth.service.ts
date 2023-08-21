import { api } from "src/shared/configs/axios/axiosConfig";
import { SignInResponseType, SignInType } from "./auth.interface";
import { AxiosResponse } from "axios";
import { AUTH_SIGN_IN } from "src/shared/consts/endpoints";

export class AuthService {
    static async signIn(
        payload: SignInType
    ): Promise<AxiosResponse<SignInResponseType>> {
        const { username, password } = payload;
        return api.post(AUTH_SIGN_IN, { username, password });
    }
}