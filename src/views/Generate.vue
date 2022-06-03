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
            <BFormSelect id="modal-select" v-model="selectedUnit" :options="unitOptions" />
          </div>
        </div>
        <div id="modal-expiry-date">
          <div>Expiry Date</div>
          <BCalendar v-model="selectedDate" :min="minDate" block hide-header locale="en" />
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
import { BTable, BButton, BModal, BFormInput, BFormSelect, BCalendar } from 'bootstrap-vue';
import Unit from '../contracts/Unit';

@Component({
  components: {
    BTable,
    BButton,
    BModal,
    BFormInput,
    BFormSelect,
    BCalendar,
  },
})
export default class Generate extends Vue {
  showModal = false;
  modalError = false;
  discount = 0;
  selectedUnit = 'pounds';
  selectedDate = this.minDate;
  
  get unitOptions() {
    return Object.keys(Unit).map(key => ({ text: key, value: (Unit as any)[key] }));
  }

  get minDate() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return today;
  }

  items = [
    {
      name: 'Kelly',
      age: 26,
      gender: 'Male',
    },
    {
      name: 'Fiona',
      age: 26,
      gender: 'Female',
    },
    {
      name: 'Jayon',
      age: 27,
      gender: 'Male',
    },
  ];

  confirmCreation() {
    this.modalError = false;
    if (this.selectedUnit === Unit.Percents && (this.discount <= 0 || this.discount > 100)) {
      this.modalError = true;
      return;
    }
    // generate code
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