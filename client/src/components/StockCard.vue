<script>
import { mapActions } from 'pinia';
import {useStockStore} from '../stores/stocks'

export default {
  props: ['stock'],
  methods: {
    ...mapActions(useStockStore, ['getSingleData'])
  }
}
</script>

<template>
  <div class="col-sm-4 mb-3 mb-sm-0">
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <h1 class="card-title">{{ stock.ticker }}</h1>
          <h1 v-if="stock.day_change > 0" class="card-title" style="color: green;">{{ stock.day_change }}</h1>
          <h1 v-else class="card-title" style="color: red;">{{ stock.day_change }}</h1>
        </div>
        <h5 class="card-title d-flex justify-content-start">{{ stock.name }}</h5>
        <hr />
        <p class="card-text d-flex justify-content-start">Price: {{ stock.price }}</p>
        <p class="card-text d-flex justify-content-start">Open: {{ stock.day_open }}</p>
        <p class="card-text d-flex justify-content-start">
          Close: {{ stock.previous_close_price }}
        </p>
        <button @click="getSingleData(stock.ticker)" class="btn btn-primary">Details</button>
      </div>
    </div>
  </div>
</template>

<style></style>
