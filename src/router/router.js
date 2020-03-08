import Vue from 'vue'
import VueRouter from 'vue-router'
import chatbot from '../components/chatbot'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: chatbot
    },
    {
        path: '*',
        component: chatbot
    }
];

const router = new VueRouter({
    mode: 'history', //enlève le # dans les liens
    routes
});

export default router
