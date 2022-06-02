<template>
  <div class="tab-bar">
    <span v-for="tab in source" :key="tab.id" class="tab" @click="changeTab(tab.value)">
      {{ tab.label }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, ModelSync } from "vue-property-decorator";

interface ITab {
  id: string | number,
  value: string,
  label: string,
}

@Component({
  components: {},
})
export default class Scan extends Vue {

  @Prop({
    required: true,
    type: Array,
  })
  source!: ITab[];

  @ModelSync('currentTab', 'tabChange', {type: String})
  selectedTab!: string;

  changeTab(tab: string) {
    this.selectedTab = tab;
  }
}
</script>

<style lang="css" scoped>
.tab-bar {
  height: 40px;
  width: 100%;
  background-color: rgba(212, 238, 253, 0.808);
  display: flex;
  justify-content: center;
  align-items: center;
}

.tab {
  margin: 10px;
  cursor: pointer;
  font-size: 15px;
}

.tab:hover {
  font-size: 20px;
  background-color: rgb(255, 181, 141);
  padding: 10px;
}
</style>