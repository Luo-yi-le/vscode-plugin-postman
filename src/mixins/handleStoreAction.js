import { mapState, mapMutations } from "vuex";
import { SET_METHOD, SET_METHOD_URL } from '@/store/mutation-types'
export const HandleStoreAction = {
    data() {
        return {}
    },
    computed: {
        ...mapState(['method', 'url']),
    },
    mounted() {
        this.init();
    },
    methods: {
        ...mapMutations([SET_METHOD, SET_METHOD_URL]),
        init() {
            this.getMethod = this.method;
            this.getUrl = this.url
        }
    },
    
}