import request from '@/utils/httpInvoker';
import { api } from '@/utils/helperUtils';
import { stringify } from 'qs';

//列表
async function list(params){
    //return request(`/api/hi/main?${encodeURIComponent(`hi=24AXRBU571BH?${stringify(params)}`)}`)
    return request(`${api}/hi/main?hi=24B6OD8OMKL9&${stringify(params)}`)
}

async function search(params){
    return request(`${api}/hi/main?hi=24B6OD8OMLA1&${stringify(params)}`)
}
 
 

export default {
    list,search
}