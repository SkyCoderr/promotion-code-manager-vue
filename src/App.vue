<template>
  <div id="app">
    <div id="nav">
      <TabBar v-model="selectedTab" :source="tabs" />
    </div>
    <Scan v-if="selectedTab==='scan'" />
    <Generate v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TabBar from './components/TabBar.vue';
import Generate from './views/Generate.vue';
import Scan from './views/Scan.vue';

@Component({
  components: {
    TabBar,
    Generate,
    Scan
  },
})
export default class App extends Vue {
  tabs = [
    {
      id: 'scan',
      value: 'scan',
      label: 'Scan',
    },
    {
      id: 'generate',
      value: 'generate',
      label: 'Generate',
    },
  ];

  selectedTab = 'scan';
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
