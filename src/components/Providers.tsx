import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "@/store";
import { hydrateFromStorage } from "@/store/slices/auth-slice";


export default function  Providers({ children } : {children:React.ReactNode}){
    const queryClient = new QueryClient();
    useEffect(() =>{
        store.dispatch(hydrateFromStorage());
    }, []);
    return(
        <Provider store={store}>
         <QueryClientProvider client={queryClient}>
                {children}
         </QueryClientProvider>
        </Provider>
    )
}