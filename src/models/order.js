import orderService from '@/services/orderService';
import Vuex from 'vuex';

export default  {
    namespaced:true,
    
    state:{
        data:[],
        pagination:{
            pageSize:10,
            total:0
        },
        type:"ADD",
        current:{},
        visible:false,
        loading:false,
        searchText:"",
        detail:{goods:'[]'}
    },
    getters:{
        data: state => state.data
    },
    actions:{
        async change({commit,dispatch},payload){
            
            try{    
                const list=await orderService.changeStatus(payload);
                dispatch("getList");
                if(list){
                    
                    return true;
                }
                 
            }catch(e){
                console.log("我捕获到了错误")
                console.error(e);
                return false;
            }
        },
         
        async getList({commit},payload){//用户登录
            commit("updateState",{
                loading:true
            })
            try{    
                const list=await orderService.list(payload);
                commit("updateState",{
                    loading:false
                })
                commit("updateState",{
                    list
                })
            }catch(e){
                console.error(e);
            }
        },
        async detail({commit},payload){//用户详情
           
            try{    
                const list=await orderService.detail(payload);
                console.log(list)
                commit("updateState",{
                    detail:list&&list.rows&&Array.isArray(list.rows)&&list.rows.length>0?list.rows[0]:{}
                })
            }catch(e){
                console.error(e);
            }
        }
    },
    mutations:{
        updateState(state,payload){
            if(payload.list){
                state.data=payload.list.rows;
                const pagination={
                    ...state.pagination
                }
                 
                state.pagination=payload.list.rows && payload.list.rows.length>0?{...pagination,total:payload.list.rows[0].count}:{}
            }
       
 
            Object.assign(state,payload);

      
        }
    }
}