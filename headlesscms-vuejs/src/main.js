import Vue from "vue";
import VueApollo from "vue-apollo";

import "./assets/styles.css";
import App from "./App.vue";
import apolloClient from "./apolloClient";

Vue.config.productionTip = false;

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
    defaultClient: apolloClient
});

new Vue({
    apolloProvider,
    render: h => h(App)
}).$mount("#app");
