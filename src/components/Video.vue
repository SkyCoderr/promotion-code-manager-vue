<template>
  <div class="video-class">
    <QrcodeStream v-if="videoOn" id="video" @decode="onDecode($event)"></QrcodeStream>
    <BModal v-model="showModal" title="Invalid QR Code">
      <template slot="modal-header">
        <h1>Invalid QR Code</h1>
      </template>
      <template slot="default">
        <p>Please use a valid QR code.</p>
      </template>
      <template slot="modal-footer">
        <BButton @click="showModal=false">OK</BButton>
      </template>
    </BModal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from "vue-property-decorator";
import {QrcodeStream} from 'vue-qrcode-reader';
import PromotionCode from '../contracts/IPromotionCode';
import {BModal, BButton} from 'bootstrap-vue';

@Component({
  components: {
    QrcodeStream,
    BModal,
    BButton,
  },
})
export default class Video extends Vue {

@Prop({
  default: false,
  required: true,
  type: Boolean,
})
videoOn!: boolean;

showModal = false;

onDecode(result: string) {
  try {
    const scanResult = JSON.parse(result);
    
    if (this.validateScanResult(scanResult)) {
      this.$emit('videoOnChanged', false)
    } else {
      this.showModal = true;
    }
  } catch(e) {
    this.showModal = true;
  }
}

validateScanResult(scanResult: PromotionCode) {
  // validate if it's the correct instance or if it's a usable code
  return 'key' in scanResult && 'discount' in scanResult && 'unit' in scanResult && 'expiry_date' in scanResult? true : false;
}

}
</script>

<style lang="css" scoped>
#video {
    padding-top: 20px;
}
</style>
