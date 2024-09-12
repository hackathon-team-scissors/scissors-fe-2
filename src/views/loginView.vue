<template>
    <div class="login">
        <div v-if="errorMessage" class="error-message">
            <p> {{ errorMessage }}</p>
        </div>
      <h1>Login to see your CO2 emission!</h1>
      <form>
        <div class="input-field">
        <label>Username</label>
        <input v-model="username" type="text"/>
        </div>
        <div class="input-field">
        <label>Password</label>
        <input v-model="password" type="password"/>
        </div>
        <div class="submit">
            <button @click="login">Login</button>
        </div>
    </form>
    </div>
  </template>
  <script setup lang="ts">
  import { getLoginToken } from '@/helpers/backend';
  import { ref } from 'vue';
  
  import { useTokenStore } from '@/stores/tokenManager';
import router from '@/router';

  let errorMessage = ref('');
  let password = ref('');
  let username = ref('');
  let tokenStore = useTokenStore();

  async function login(){
    event?.preventDefault();
    if (!username.value || !password.value){
        errorMessage.value = "Please fill in a username and password!";
        setTimeout(()=>{errorMessage.value = ""}, 3000);
        return;    
    }
    const { Login } = await getLoginToken();
    tokenStore.setToken(Login.token);
    router.push('/');
  }

  </script>
  <style>
  @media (min-width: 1024px) {
    .login {
      min-height: 100vh;
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
  }
  </style>
  