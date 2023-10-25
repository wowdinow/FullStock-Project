<script>
import { mapActions } from 'pinia';
import { useStockStore } from '../stores/stocks';

export default{
   props: ['mystock'],
   methods: {
        ...mapActions(useStockStore, ['sellStock'])
   }
}
</script>

<template>
<div class="col-sm-4 mb-3 mb-sm-0">
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <h1 class="card-title">{{ mystock.ticker }}</h1>
        </div>
        <h5 class="card-title d-flex justify-content-start">{{ mystock.name }}</h5>
        <hr />
        <p class="card-text d-flex justify-content-start">Buy Price: {{ mystock.buyPrice }}</p>
        <p class="card-text d-flex justify-content-start">Current Price: {{ mystock.currentPrice }}</p>
        <p class="card-text d-flex justify-content-start">
          Share: {{ mystock.share }}
        </p>
        <p class="card-text d-flex justify-content-start">Amount: Rp. {{ mystock.amount }}</p>
        <p class="card-text d-flex justify-content-start">ROE: {{ mystock.roe }}</p>
        <button @click="sellStock(mystock.id)" class="btn btn-danger">SELL</button>
      </div>
    </div>
  </div>
  </template>

<style>
</style>