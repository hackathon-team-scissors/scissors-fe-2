<template>
  <div class="profileView">
    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>
    <v-row style="position: absolute; top: 10%">
      <v-col cols="1" md="4">
        <div
          style="
            color: white;
            text-align: center;
            font-weight: bold;
            left: 20%;
            right: 20%;
          "
        >
          Your Profile
        </div>
      </v-col>

      <v-col cols="5" md="4">
        <div
          style="
            color: white;
            text-align: center;
            margin-left: 15%;
            margin-right: 15%;
          "
        >
          Welcome to Scissors! To optimise your carbon estimates we have a few
          questions for you:
        </div>
      </v-col>
    </v-row>
    <form>
      <div style="color: white">Do you own a car?:</div>

      <input type="radio" id="yes" :checked="!!picked" @click="picked = true" />
      <label for="one" style="color: white">Yes</label>

      <input
        type="radio"
        id="no"
        :checked="picked == false"
        @click="picked = false"
      />
      <label for="two" style="color: white">No</label>
      <div v-if="picked">
        <div style="color: white">What kind of car do you own?:</div>
        <div>
          <select v-model="selectedCar">
            <option
              v-for="car in carOptions"
              :key="car.value"
              :value="car.value"
            >
              {{ car.text }}
            </option>
          </select>
        </div>
      </div>
      <div style="color: white">What is the energy label of your house?:</div>

      <select v-model="selectedEnergy">
        <option
          v-for="energy in energyLabels"
          :key="energy.value"
          :value="energy.value"
        >
          {{ energy.text }}
        </option>
      </select>
      <div style="color: white">What is your diet?:</div>

      <select v-model="selectedDiet">
        <option
          v-for="diet in dietOptions"
          :key="diet.value"
          :value="diet.value"
        >
          {{ diet.text }}
        </option>
      </select>
      <div class="submit">
        <button @click="next">Next</button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

import router from "@/router";
const selectedEnergy = ref("A");
const selectedDiet = ref("Carnivor");
const selectedCar = ref("Petrol");

let errorMessage = ref("");
let picked = ref<null | boolean>(null);
let car = false;
const energyLabels = ref([
  { text: "A", value: "A" },
  { text: "B", value: "B" },
  { text: "C", value: "C" },
  { text: "D", value: "D" },
  { text: "E", value: "E" },
  { text: "F", value: "F" },
  { text: "G", value: "G" },
]);
const dietOptions = ref([
  { text: "Carnivore", value: "Carnivor" },
  { text: "Vegetarian", value: "Vegetarian" },
  { text: "Vegan", value: "Vegan" },
  { text: "Pescetarion", value: "Pescetarion" },
  { text: "Flexitariar", value: "Flexitariar" },
  { text: "Other", value: "Other" },
]);
const carOptions = ref([
  { text: "Petrol", value: "Petrol" },
  { text: "Diesel", value: "Diesel" },
  { text: "Hybrid", value: "Hybrid" },
  { text: "Electric", value: "Electric" },
]);
async function next() {
  router.push("/start");
}
</script>
<style scoped>
.profileView {
  min-height: 100vh;
  background-image: url("../assets/background.jpg");
  width: 100vw;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.entity-title {
  color: map-get($blue, "darken-2");
  text-align: center;
  letter-spacing: 2px;
}

.error-message {
  background-color: crimson;
  padding: 10px;
  border-radius: 10px;
  color: white;
}
.input-field {
  display: flex;
  flex-direction: column;
  margin: 10px;
}
.submit {
  display: flex;
  margin: 10px;
  align-items: center;
}
</style>
