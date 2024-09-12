<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useTokenStore } from './stores/tokenManager';
import router from './router';

const tokenStore = useTokenStore();

onMounted(()=>{
  if (!tokenStore.hasToken()){
    router.push('/login');
  } else {
    router.push('/emissions');
  }
})

</script>

<style scoped>
</style>
