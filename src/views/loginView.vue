<template>
    <div class="login">
        <div v-if="errorMessage" class="error-message">
            <p> {{ errorMessage }}</p>
        </div>
      <h1 style="font-size: 20px; font-weight: bold; color: white;">Login to see your CO2 emission</h1>
      <form>
        <div class="input-field">
        <input v-model="username" placeholder="Username" type="text"/>
        </div>
        <div class="input-field">
        <input v-model="password" placeholder="Password" type="password"/>
        </div>
        <div class="submit">
            <button @click="login">Login</button>
        </div>
    </form>


    <button @click="forceLogin" type="button" class="google-sign-in-button" >
        Sign in with Google
    </button>

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

    forceLogin();
  }

  async function forceLogin() {
    const { Login } = await getLoginToken();
    tokenStore.setToken(Login.token);
    router.push('/profile');
  }

  </script>
  <style scoped>
    .login {
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


    .google-sign-in-button {
        cursor: pointer;
        transition: background-color .3s, box-shadow .3s;
            
        padding: 12px 16px 12px 42px;
        border: none;
        border-radius: 3px;
        box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25);
        
        color: #757575;
        font-size: 14px;
        font-weight: 500;
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
        
        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
        background-color: white;
        background-repeat: no-repeat;
        background-position: 12px 11px;
    }

    .google-sign-in-button:hover {
        box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 2px 4px rgba(0, 0, 0, .25);
    }

    .google-sign-in-button:active {
        background-color: #eeeeee;
    }

    .google-sign-in-button:active {
        outline: none;
            box-shadow: 
            0 -1px 0 rgba(0, 0, 0, .04),
            0 2px 4px rgba(0, 0, 0, .25),
            0 0 0 3px #c8dafc;
    }

    .google-sign-in-button:disabled {
        filter: grayscale(100%);
        background-color: #ebebeb;
        box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25);
        cursor: not-allowed;
    }

  </style>
  