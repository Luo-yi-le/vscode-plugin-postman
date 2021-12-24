import { SET_METHOD, SET_METHOD_URL, SET_TABS_ACTIVE } from '../mutation-types'
const mutations = {
    [SET_METHOD](state, METHOD){
        state.method = METHOD;
    },
    [SET_METHOD_URL](state, url){
        state.url = url;
    },
    [SET_TABS_ACTIVE](state, active){
        state.active = active;
    }
}
export default mutations