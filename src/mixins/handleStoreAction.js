import { mapState, mapMutations } from "vuex";
import { SET_METHOD, SET_METHOD_URL, SET_TABS_ACTIVE } from '@/store/mutation-types'
export const HandleStoreAction = {
    data() {
        return {}
    },
    computed: {
        ...mapState(['method', 'url', 'active']),
    },
    mounted() {
        this.init();
    },
    methods: {
        ...mapMutations([SET_METHOD, SET_METHOD_URL, SET_TABS_ACTIVE]),
        init() {
            this.getMethod = this.method;
            this.getUrl = this.url;
            this.activeValue = this.active
        }
    },
    
}