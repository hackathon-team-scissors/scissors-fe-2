<template>
    <div class="startView">
        <div v-if="errorMessage" class="error-message">
            <p> {{ errorMessage }}</p>
        </div>
        <div class="flex improvements" style="height: 100vh; flex-direction: row;" v-if="loading">
          <v-icon animation="spin" style="color: white; margin-right: 12px" name="fa-spinner" scale="2" />
          <p style="color: white; font-size: 24px;"> Loading results...</p>
        </div>
      <h1 style="font-size: 20px; font-weight: bold; color: white;">Import you data</h1>
      <form>
        <p>Gmail account: Connected ✅</p>
        <br/>

        <label for="statement">Select your bank statement:</label>
        <input ref="fileInput" id="statement" type="file" @change="readFile" />


        <br/>
        <br/>
        <br/>
        <br/>

        <div class="submit">
            <button style="width: 50px; margin: 0 auto; text: align-center;" @click="next">Skip</button>
        </div>

    </form>
    </div>
  </template>
  <script setup lang="ts">
  import { ref } from 'vue';
  
  import router from '@/router';
import { ProcessData } from '@/helpers/backend';

  let errorMessage = ref('');
  let loading = ref(false);

  async function readFile(event: any) {
    const textData = await event.target.files[0].text()

    console.log(textData);

    loading.value = true;
    await ProcessData(textData);
    setTimeout(() => {
      router.push('/emissions');
    }, 2000);

  }

  async function next(){
    router.push('/emissions');
  }

  </script>
  <style scoped>
    .startView {
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

    form {
      text-align: center;
    }
    .submit {
        display: flex;
        margin: 10px;
        align-items: center;
    }
  </style>
  