<template>
  <div>
    <h1>{{content.header}}</h1>
    <p>{{content.copy}}</p>
  </div>
</template>


<script>
  export default {
    props: ['content']
  }
</script>
