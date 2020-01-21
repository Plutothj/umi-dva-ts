import request from '../../untils/request'

const key = '1631131B254DE57F3F60F4C307DF8D2D'
export function UploadData(data:any):Promise<any> {
    return request.post(
        '/api/?s=App.MongoDB.DataMultiCreateData',
        {
            data:{
                app_key:key,
                collection:'one',
                documents:data 
            }
        }
        
    )
    
}

export function getData():Promise<any> {
    return request.post(
        '/api/?s=App.MongoDB.DataFreeGetDataList',
        {
            data:{
                app_key:key,
                collection:'one',
                filter:{},
                num:100
            }
        }
        
    )
    
}

export function delAllData():Promise<any> {
    return request.post(
        '/api/?s=App.MongoDB.DataMultiDeleteData',
        {
            data:{
                app_key:key,
                collection:'one',
                
            }
        }
        
    )
    
}

export function delOnlyData(data:any):Promise<any> {
    return request.post(
        '/api/?s=App.MongoDB.DataDeleteOneData',
        {
            data:{
                app_key:key,
                collection:'one',
                filter:{"goodsName":{$eq:data}}
            }
        }
        
    )
    
}

export function UpdateOnlyData(data:any,id:any):Promise<any> {
    
    return request.post(
        '/api/?s=App.MongoDB.DataUpdateOneData',
        {
            data:{
                app_key:key,
                collection:'one',
                filter:{"id":{$eq:id}},
                update:data
            }
        }
        
    )
    
}
