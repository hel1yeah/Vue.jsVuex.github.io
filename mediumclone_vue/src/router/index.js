import Vue from 'vue'
import VueRouter from 'vue-router'
import GlobalFeed from '@/views/GlobalFeed.vue'
import YourFeed from '@/views/YourFeed.vue'
import TagFeed from '@/views/TagFeed.vue'
import Register from '@/views/Register.vue'
import SignIn from '@/views/SignIn.vue'
import Article from '@/views/Article.vue'
import CreateArticle from '@/views/CreateArticle.vue'
import EditArticle from '@/views/EditArticle.vue'
import Settings from '@/views/Settings.vue'
import UserProfile from '@/views/UserProfile.vue'
 
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
    component: CreateArticle,
  },
  {
    path: '/article/:slug',
    name: 'article',
    component: Article,
  },
  {
    path: '/article/:slug/edit',
    name: 'editArticle',
    component: EditArticle,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: UserProfile,
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: UserProfile,
  },
]

const router = new VueRouter({
  routes,
})

export default router
