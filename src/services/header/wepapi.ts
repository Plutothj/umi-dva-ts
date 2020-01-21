import request from '../../untils/request'


export function Loginout(data:any):Promise<any> {
    return request.post(
        '/api/login',
        {
            data:data
        }
        
    )
}


