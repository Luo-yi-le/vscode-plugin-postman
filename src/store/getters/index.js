import { GET_METHOD, GET_METHOD_URL, GET_TABS_ACTIVE } from '../mutation-types'


const getters = {
    [GET_METHOD]: state => state.method,
    [GET_METHOD_URL]: state => state.url,
    [GET_TABS_ACTIVE]: state => state.active,
}
export default getters