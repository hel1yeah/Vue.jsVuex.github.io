<template>
  <nav class="navbar navbar-light">
    <router-link :to="{ name: 'home' }" class="navbar-brand">
      Vue Medium Clone
    </router-link>
    <ul class="nav navbar-nav pull-xs-right">
      <li class="nav-item">
        <router-link class="nav-link" active-class="active" :to="{ name: 'home' }" exact>Home</router-link>
      </li>
      <template v-if="isLoggedIn">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'createArticle' }" active-class="active"
            ><i class="ion-compose"></i> &nbsp; Новая статья
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'settings' }" active-class="active"
            ><i class="ion-gear-a"></i> &nbsp; Настройки
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{ name: 'userProfile', params: { slug: currentUser } }" active-class="active"
          >
            <img :src="currentUser.image" alt="a" class="user-pic" />
            &nbsp;
            {{ currentUser.username }}
          </router-link>
        </li>
      </template>
      <template v-if="!isLoggedIn">
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{ name: 'signIn' }"
            active-class="active"
          >
            Вход
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{ name: 'register' }"
            active-class="active"
            >Регистрация
          </router-link>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'McvTopbar',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser,
      isLoggedIn: (state) => state.auth.isLoggedIn,
    }),
  },
}
</script>

<style lang="scss">
</style>