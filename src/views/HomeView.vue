<template>
  <div class="wrapper">
    <div>
      <h1 class="header"> Your emissions </h1>
    </div>
    <div v-if="loading"> Loading your results! Hold on tiger...</div>
    <div class="item-list" v-else>
      <div class="item-wrapper">
        <div class="item category"></div>
        <div class="item title bold">Title</div>
        <div class="item co2 bold">Co2 (kg)</div>
        <div class="expand"></div>
      </div>
      <div v-for="emission of emissions" :key="emission.id">
        <div class="item-wrapper">
          <div class="item category">
            <v-icon scale="1.5" :name="`fa-${emission.categoryDetails.iconCss}`"/>
          </div>
          <div class="item title">
            {{ emission.title }}
          </div>
          <div class="item co2">
            {{ emission.co2_kg }}kg
          </div>
          <div class="expand" @click="()=>{emission.expanded = !emission.expanded}">
            {{ emission.expanded ? '-' : '+'  }}
          </div>
        </div>
        <div class="more-information" v-if="emission.expanded">
          <div class="insight">
            <h3 style="font-weight: bold">Calculation Details</h3>
            <p style="padding: 6px"> {{ emission.calculation_description ?? "No calculation details yet" }} </p>

            <span  v-if="emission.insight">
              <h3 style="font-weight: bold">Improvement Insight</h3>
              <p style="padding: 6px"> {{ emission.insight }} </p>
            </span>

          </div>
          <button style="height: 40px; width: 80px; align-self: center;" @click="addReceipt(emission)">
            Add receipt
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArrayOfEmissions } from '@/helpers/backend';
import router from '@/router';
import { useTokenStore } from '@/stores/tokenManager';
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

    // const res = await GetAdvices();
    // console.log(res.getGroupInsight.advices)
    // advices.value = res.getGroupInsight.advices;


  loading.value = false;
})

async function addReceipt(emission: emission){
    useTokenStore().emissionId = emission.id;
    router.push('/camera')
}

</script>

<style>

.insight {
  color: black;
  width: 80%;
}

.more-information {
  display: flex;
  width: 95vw;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
}

.header {
  color: whitesmoke;
  margin: 10px;
}

.bold {
font-size: 16px;
font-weight: bold;
}

.wrapper {
  background-image: url('../assets/background.jpg');
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-items: start;
  height: 100%;
  width: 100vw;
  padding-top: 16px;
}

.item-list {
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  height: 100vh;
  background: rgb(227, 227, 227);
  border-radius: 10px;
}

.item-wrapper {
  display: flex;
  flex-direction: row;
  width: 95vw;
  min-height: 90px;
  padding-left: 5%;
  padding-right: 5%;
  justify-content: space-between;
  border: 1px solid black;
}

.item {
  color: black;
  display: flex;
  font-size: 12px;
  padding: 6px;
}

.category {
  width: 10%;
  min-width: 10%;
  align-items: center;
  justify-content: center;
}

.title {
  width: 40%;
  min-width: 40%;
  align-items: center;
  justify-content: center;
}

.co2 {
  width: 10%;
  min-width: 10%;
  align-items: center;
  justify-content: center;
}

.expand {
  display:flex;
  width: 10%;
  font-size: 20px;
  min-width: 10%;
  color: black;
  align-items: center;
  justify-content: center;
}

</style>