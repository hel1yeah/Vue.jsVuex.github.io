<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{name : 'home'}">Домашняя страница</router-link> |
      <router-link :to="{name : 'register'}">Страница регистрации</router-link> |
      <router-link :to="{name : 'signIn'}">Страница входа</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#nav{
  margin: 0 auto;
  max-width: 500px;
}
</style>
