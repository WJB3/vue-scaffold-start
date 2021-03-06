import staffService from '@/services/staffService';
import Vuex from 'vuex';

export default  {
    namespaced:true,
    
    state:{
        data:[],
        pagination:{
            pageSize:10
        },
        no_audit_data:[],
        no_audit_pagination:{
            pageSize:10
        },
        wait_audit_data:[],
        wait_audit_pagination:{
            pageSize:10
        },
        detailDiscount:[]
    },
    getters:{

    },
    actions:{
        async getList({commit},payload){//已审核
            try{    
                const list=await staffService.list(payload);
        
                commit("updateState",{
                    list
                })
            }catch(e){
                console.error(e);
            }
        },
        async getNoAuditList({commit},payload){//审核未通过
            try{    
                const list=await staffService.no_audit_list(payload);
        
                commit("updateNoState",{
                    list
                })
            }catch(e){
                console.error(e);
            }
        },
        async getWaitAuditList({commit},payload){//待审核
            try{    
                const list=await staffService.wait_audit_list(payload);
        
                commit("updateWaitState",{
                    list
                })
            }catch(e){
                console.error(e);
            }
        },
        async viewDiscount({commit},payload){//审核未通过
            try{    
                const list=await staffService.viewDiscount(payload);
                commit("updateDiscount",{
                    list
                })
            }catch(e){
                console.error(e);
            }
        },
        async audit({commit,dispatch},payload){
            
            try{    
                const list=await staffService.audit(payload);
                dispatch("getList");
                dispatch("getNoAuditList");
                dispatch("getWaitAuditList");
                if(list){
                    
                    return true;
                }
                 
            }catch(e){
                console.log("我捕获到了错误")
                console.error(e);
                return false;
            }
        },
        async bindDiscount({commit,dispatch},payload){
            
            try{    
                const list=await staffService.bindDiscount(payload);
                dispatch("getList");
                dispatch("getNoAuditList");
                dispatch("getWaitAuditList");
                if(list){
                    return true;
                }
                 
            }catch(e){
                console.log("我捕获到了错误")
                console.error(e);
                return false;
            }
        },
        async unBindDiscount({commit,dispatch},payload){
            
            try{    
                const list=await staffService.unBindDiscount(payload);
                dispatch("getList");
                dispatch("getNoAuditList");
                dispatch("getWaitAuditList");
                if(list){
                    return true;
                }
                 
            }catch(e){
                console.log("我捕获到了错误")
                console.error(e);
                return false;
            }
        },
        async refuse_audit({commit,dispatch},payload){
            
            try{    
                const list=await staffService.refuse_audit(payload);
                dispatch("getList");
                dispatch("getNoAuditList");
                dispatch("getWaitAuditList");
                if(list){
                    
                    return true;
                }
                 
            }catch(e){
                console.log("我捕获到了错误")
                console.error(e);
                return false;
            }
        },
    },
    mutations:{
        updateState(state,payload){
           
            state.data=payload.list.rows;
            const pagination={
                ...state.pagination
            }
            state.pagination=payload.list.rows && payload.list.rows.length>0?{total:payload.list.rows[0].count,...pagination}:{}
            Object.assign(state,payload);
        },
        updateNoState(state,payload){
           
            state.no_audit_data=payload.list.rows;
            const pagination={
                ...state.no_audit_pagination
            }
            state.no_audit_pagination=payload.list.rows && payload.list.rows.length>0?{total:payload.list.rows[0].count,...pagination}:{}
            Object.assign(state,payload);
        },
        updateWaitState(state,payload){
           
            state.wait_audit_data=payload.list.rows;
            const pagination={
                ...state.wait_audit_pagination
            }
            state.wait_audit_pagination=payload.list.rows && payload.list.rows.length>0?{total:payload.list.rows[0].count,...pagination}:{}
            Object.assign(state,payload);
        },
        updateDiscount(state,payload){
            state.detailDiscount=payload.list.rows;
        }
    }
}