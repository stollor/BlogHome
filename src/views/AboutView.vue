<template>
  <div style="width: 100%;height: 100%;">
    <iframe :src='src' style="width: 100%;height: 100%;"> </iframe>
  </div>
</template>

<script>

export default{
  data(){
    return{
      src:'',
    }
  },
  mounted(){
    this.src = '/static/hell/index.html'
  }
}
</script>


<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}


</style>
