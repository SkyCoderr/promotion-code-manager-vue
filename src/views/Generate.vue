<template>
  <div class="generate">
    <BButton @click="showModal=true">Create New Promotion Code</BButton>

    <BModal v-model="showModal" title="Code Information">
      <template slot="modal-header">
        <h3 v-if="!modalError">Code Information</h3>
        <h3 v-else id="modal-error">Discount has to be between 0 and 100</h3>
      </template>
      <template slot="default">
        <div id="modal-discount">
          <div>Discount</div>
          <div>
            <BFormInput id="modal-text-input" v-model="discount" size="sm" :number="true" />
            <div id="modal-select">
              <select v-model="selectedUnit">
                <option v-for="unitOption in unitOptions" :key="unitOption.value" :value="unitOption.value">{{ unitOption.text }}</option>
              </select>
            </div>
          </div>
        </div>
        <div id="modal-expiry-date">
          <div>Expiry Date</div>
          <input id="calendar" type="date" v-model="selectedDate" :min="minDate">
        </div>
      </template>
      <template slot="modal-footer">
        <BButton @click="confirmCreation()">Confirm Creation</BButton>
        <BButton @click="cancel()">Cancel</BButton>
      </template>
    </BModal>

    <BTable :items="items" hover striped id="table">

    </BTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BTable, BButton, BModal, BFormInput, BFormSelect } from 'bootstrap-vue';
import Unit from '../contracts/Unit';
import { Action } from 'vuex-class';
import IModalContexts from '@/contracts/IModalContext';
import IPromotionCode from '@/contracts/IPromotionCode';
import { Axios, AxiosResponse } from 'axios';

@Component({
  components: {
    BTable,
    BButton,
    BModal,
    BFormInput,
    BFormSelect,
  },
})
export default class Generate extends Vue {
  showModal = false;
  modalError = false;
  discount = 0;
  selectedUnit = 'pounds';
  selectedDate: string = this.minDate;
  items: IPromotionCode[] = [];

  @Action 
  generateCode!: (modalContexts: IModalContexts) => Promise<AxiosResponse>;

  @Action 
  getCodes!: () => Promise<AxiosResponse>;
  
  get unitOptions() {
    return Object.keys(Unit).map(key => ({ text: key, value: (Unit as any)[key] }));
  }

  get minDate() {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    return today;
  }

  mounted() {
    this.getCodes().then((result: AxiosResponse) => this.items = result.data);
  }

  async confirmCreation() {
    this.modalError = false;
    if (this.selectedUnit === Unit.Percents && (this.discount <= 0 || this.discount > 100)) {
      this.modalError = true;
      return;
    }
    // compose the generateCode payload
    const modalContexts: IModalContexts = {
      discount: this.discount,
      unit: this.selectedUnit as Unit,
      expiryDate: new Date(this.selectedDate),
    };
    // send network request to generate code and get the result
    const result = await this.generateCode(modalContexts);
    if (result.status === 200) {
      const item: IPromotionCode = result.data;
      this.items.push(item);
    }
    this.resetModal();
  }

  cancel() {
    this.resetModal();
  }

  resetModal() {
    this.discount = 0;
    this.selectedUnit = 'pounds';
    this.selectedDate = this.minDate;
    this.showModal = false;
    this.modalError = false;
  }
}
</script>

<style lang="css" scoped>
#table {
  margin-top: 30px;
}
#modal-discount {
  margin-bottom: 60px;
}
#modal-expiry-date {
  margin-top: 60px;
}
#calendar {
  width: 100%;
}
#modal-text-input {
  float: left;
  height: 20px;
  width: 80%;
}
#modal-select {
  float: right;
  height: 30px;
  font-size: 14px;
}
#modal-error {
  color: rgb(255,0,0);
}
</style>