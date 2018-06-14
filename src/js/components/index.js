import Vue from "vue";

function importAll(r) {
    r.keys().forEach(name => {
        const component = 'uc' + (/\/([^\/]+).vue$/.exec(name)[1]).replace(/[A-Z]/g, (match) => '-' + match.toLowerCase());
        Vue.component(component, r(name).default);
    });
}
importAll(require.context('./', true, /\.vue$/));
