import { notification } from "antd";

export const notificationImportError = ()=> {
    console.log('erroweqer');
    notification.error({
        message:'Проверьте правильность полей в документе',
        duration:0
      })
}
export const notificationSuccess = ()=> {
    notification.success({
        message:'Документ успешно импортирован',
      })
}