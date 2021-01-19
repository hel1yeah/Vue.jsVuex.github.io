import Vue from 'vue'
import VueRouter from 'vue-router'
import GlobalFeed from '@/views/GlobalFeed.vue'
import YourFeed from '@/views/YourFeed.vue'
import TagFeed from '@/views/TagFeed.vue'
import Register from '@/views/Register.vue'
import SignIn from '@/views/SignIn.vue'
import Article from '@/views/Article.vue'
 
Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: SignIn,
  },
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed,
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: YourFeed,
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: TagFeed,
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: GlobalFeed,
  },
  {
    path: '/article/:slug',
    name: 'article',
    component: Article,
  },
  {
    path: '/article/:slug/edit',
    name: 'editArticle',
    component: GlobalFeed,
  },
  {
    path: '/settings',
    name: 'settings',
    component: GlobalFeed,
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: GlobalFeed,
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: GlobalFeed,
  },
]

const router = new VueRouter({
  routes,
})

export default router
