<template>
    <div class="profileView">
        <div v-if="errorMessage" class="error-message">
            <p> {{ errorMessage }}</p>
        </div>
      <h1 style="font-size: 20px; font-weight: bold; color: white;">Profile View</h1>
      <form>
        <div class="submit">
            <button @click="next">Next</button>
        </div>
    </form>
    </div>
  </template>
  <script setup lang="ts">
  import { ref } from 'vue';
  
  import router from '@/router';

  let errorMessage = ref('');

  async function next(){
    router.push('/start');
  }

  </script>
  <style scoped>
    .profileView {
      min-height: 100vh;
      background-image: url('../assets/background.jpg');
      width: 100vw;
      background-size: cover;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
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
  