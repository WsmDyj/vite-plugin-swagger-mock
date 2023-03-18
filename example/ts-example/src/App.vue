<template>
  <h1>vite-plugin-swagger-mock 测试</h1>
  <Button @click="onClick">发送请求</Button>
  <p>{{ data }}</p>
</template>
<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
let data = ref('')
const onClick = () => {
  axios.get('/api/api-docs/usecase').then(res => {
    data.value = JSON.stringify(res.data)
  })
}
</script>
