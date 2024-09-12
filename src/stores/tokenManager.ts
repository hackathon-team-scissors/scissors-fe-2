import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', () => {
  const token = ref('')
  function getToken() {
    return token.value;
  }
  function hasToken(){
    return !!token.value;
  }
  function setToken(value){
    token.value = value;
  }

  return { getToken, hasToken, setToken }
})
