<template>
    <select class="form-select w-50" :value="value" @change="$emit('update:value', $event.target.value)">
      <option v-for="s in data" :key="s.id" :value="s.id">{{ s.descricao }}</option>
    </select>
  </template>
  
  <script>
  export default {
    name: "SelectVue",
    props: {
      data: Array,
      value: {
        type: [String, Number], 
        required: true
      }
    },
    emits: ['update:value']
  }
  </script>
  