<template>
  <div class="scan">
    <BButton @click="videoOn=!videoOn">
      <span v-if="!videoOn">Start Scanning</span>
      <span v-else>Stop Scanning</span>
    </BButton>
    <Video :videoOn="videoOn" @videoOnChanged="updateVideoOn($event)"></Video>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BButton } from 'bootstrap-vue';
import Video from '../components/Video.vue'

@Component({
  components: {
    BButton,
    Video,
  },
})
export default class Scan extends Vue {
  videoOn = false;

  updateVideoOn(newStatus: boolean) {
    this.videoOn = newStatus;
  }
}
</script>