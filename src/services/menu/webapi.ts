import request from '../../untils/request'


export function getMenu(data?:any):Promise<any> {
    return request.post(
        '/api/account/queryMenu',
    )
}


