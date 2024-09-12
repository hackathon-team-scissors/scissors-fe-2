<template>
  <div class="wrapper">
    <div>
      <h1> Your emissions </h1>
    </div>
    <div v-if="loading"> Loading your results! Hold on tiger...</div>
    <div class="item-list" v-else>
      <div class="item-wrapper">
        <div class="item category bold">Category</div>
        <div class="item title bold">Title</div>
        <div class="item co2 bold">Co2 in KG</div>
        <div class="expand"></div>
      </div>
      <div class="item-wrapper" v-for="emission of emissions" :key="emission.id">
        <div class="item category">
          {{  emission.category }}
        </div>
        <div class="item title">
          {{ emission.title }}
        </div>
        <div class="item co2">
          {{ emission.co2_kg }}kg
        </div>
        <div class="expand">
          +
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArrayOfEmissions } from '@/helpers/backend';
import { type emission } from '@/types/backend';
import { onMounted, ref } from 'vue';

const FALLBACK_EMISSIONS = [
      { category: 'shopping', title: "Coolblue", co2_kg: 24, id: "1"}
    ];

let emissions = ref([] as Array<emission>);
let loading = ref(true);

onMounted(async ()=>{
  const { co2_record } = await getArrayOfEmissions();
  emissions.value = co2_record ?? FALLBACK_EMISSIONS;
  loading.value = false;
})

async function addReceipt(emission: emission){
  
}
</script>

<style>
.bold {
font-size: 16px;
font-weight: bold;
}

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-items: start;
  height: 100vh;
  width: 100vw;
  margin-top: 16px;
}

.item-list {
  display: flex;
  flex-direction: column;
  background: rgb(227, 227, 227);
  border-radius: 10px;
}

.item-wrapper {
  display: flex;
  flex-direction: row;
  width: 95vw;
  justify-content: space-between;
  border: 1px solid black;
}

.item {
  color: black;
  font-size: 12px;
  padding: 6px;
}

.category {
  width: 10%;
  min-width: 10%;
}

.title, .co2 {
  width: 25%;
  min-width: 25%;
}

.expand {
  width: 10%;
  min-width: 10%;
  color: black;
}

</style>