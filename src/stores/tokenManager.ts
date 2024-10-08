import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', () => {
  const token = ref('');
  const emissionId = ref('');

  function getToken() {
    return token.value;
  }
  function hasToken(){
    return !!token.value;
  }
  function setToken(value: string){
    token.value = value;
  }
  return { getToken, hasToken, setToken, token, emissionId}
}, { 
  persist: {
    storage: sessionStorage,
    pick: ['token', 'emissionId']
  }})
