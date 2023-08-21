import { ComponentType } from "react";

interface WithVisibleProps {
  visible?: boolean;
}

export function WithVisible<T extends object>(
    WrappedComponent: ComponentType<T>
){
    type Props = T & WithVisibleProps;
    function Visible({visible = true, ...props}:Props){
        if(!visible){
            return null;
        }
        // @ts-ignore
        return <WrappedComponent {...props}/>
    }
    return Visible
}