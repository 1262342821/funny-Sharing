
export default {
    "namespace" : "counter" , 
    "state" : {
        "v" : 100
    },
    "reducers" : {
        add(state , action){
            if(action.payload == undefined) action.payload = {"number" : 1};
            return {
                ...state , 
                "v": state.v + action.payload.number
            }
        }
    },
    "effects" : {
        *add_async({ payload }, { call, put }){
            const {result} = yield fetch("/api").then(data=>data.json());
            yield put({"type" : "add" , "payload" : {number : result}})
        }
    }
}