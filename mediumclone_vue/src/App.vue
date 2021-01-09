<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/register">register</router-link> |
      <router-link to="/test">test</router-link>
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
