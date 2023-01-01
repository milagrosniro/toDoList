import axios from "axios"
import { useCallback, useState } from "react"

export interface IPropsUseFetch{
    loading: boolean,
    error: any,
    data: any[],
    headers: any
}
export const useFetch = () => {
    const [state, setState] = useState<IPropsUseFetch>({loading: false, error: undefined, data: [], headers:undefined})

    const fetch = useCallback(async (url: string, config: any = {}) => {
        let responseErr : any = undefined;
        let responseData : any[];
        let responseHeaders : any

        try{
            setState(prevState => (
                {
                    ...prevState,
                    error: undefined,
                    loading: true
                }
            ) )

            const response = await axios({url,method : config.method ?? 'GET', ...config})
            responseData = response.data
            responseHeaders = response.headers
        }catch(err : any){
            responseErr = err
            throw err
        }finally{
            setState((prevState) => ({
                ...prevState,
                loading: false,
                error: responseErr,
                data: responseData,
                headers: responseHeaders,
              }));
        }

    },[])
    return {
        loading: state.loading,
        error:  state.error,
        data:  state.data,
        headers:  state.headers,
        fetch,
      };
}