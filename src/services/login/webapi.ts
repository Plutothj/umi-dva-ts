import request from '../../untils/request'


export function Login(data:any):Promise<any> {
    return request.post(
        '/api/login',
        {
            data:data
        }
        
    )
}


