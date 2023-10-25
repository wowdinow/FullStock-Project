<script>
import { mapActions, mapState } from 'pinia';
import MyStockCard from '../components/MyStockCard.vue';
import { useStockStore } from '../stores/stocks';

export default { 
    components: { MyStockCard },
    computed: {
        ...mapState(useStockStore, ['mystocks'])
    },
    methods: {
        ...mapActions(useStockStore, ['getMyStock'])
    },
    created(){
        this.getMyStock()
    }
    }
</script>

<template>
  <div class="container text-center">
    <div class="row">
      <div class="mt-5 mb-3"><h1>My Stock Lists</h1></div>
      <div class="d-flex justify-content-center gap-3">
        <MyStockCard v-for="mystock in mystocks" :key="mystock.id" :mystock="mystock" />
      </div>
    </div>
  </div>
</template>

<style></style>
