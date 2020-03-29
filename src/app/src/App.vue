<template>
  <div id="app">
    <nav class="navigation">
      <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
      <router-link :to="{ name: 'general' }">General</router-link>
      <router-link :to="{ name: 'network' }">Network</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navigation {
  display: flex;
  justify-content: center;

  a {
    display: block;
    padding: 30px;
    font-weight: bold;
    color: #2c3e50;
  }
}
</style>
