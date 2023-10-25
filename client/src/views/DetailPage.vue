<script>
import { mapActions, mapState } from 'pinia'
import { useStockStore } from '../stores/stocks'

export default {
    data(){
        return{
            dataInput : {
                ticker: '',
                name: '',
                buyPrice: '',
                currentPrice: '',
                amount: 0,
            },
            dataXendit: {
                ticker: '',
                amount: 0
            }
        }
    },
  computed: {
    ...mapState(useStockStore, ['stock'])
  },
  methods: {
    ...mapActions(useStockStore, ['getSingleData', 'createInvoice'])
  },
  created() {
    this.getSingleData(this.$route.params.ticker)
    this.dataInput.ticker = this.stock[0].ticker
    this.dataInput.name = this.stock[0].name
    this.dataInput.buyPrice = this.stock[0].price
    this.dataInput.currentPrice = this.stock[0].price
    this.dataInput.amount = this.dataXendit.amount
    this.dataXendit.ticker = this.stock[0].price
  }
}
</script>

<template>
  <div class="container text-center mb-5">
    <div class="row">
      <div class="mt-5 mb-3"><h1>Stock Details</h1></div>
      <div class="d-flex justify-content-center gap-3">
        <div class="col-sm-4 mb-3 mb-sm-0">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h1 class="card-title">{{ stock[0].ticker }}</h1>
                <h1 v-if="stock[0].day_change > 0" class="card-title" style="color: green">
                  {{ stock[0].day_change }}
                </h1>
                <h1 v-else class="card-title" style="color: red">{{ stock[0].day_change }}</h1>
              </div>
              <h5 class="card-title d-flex justify-content-start">{{ stock[0].name }}</h5>
              <hr />
              <p class="card-text d-flex justify-content-start">Price: {{ stock[0].price }}</p>
              <p class="card-text d-flex justify-content-start">Day High: {{ stock[0].day_high }}</p>
              <p class="card-text d-flex justify-content-start">Day Low: {{ stock[0].day_low }}</p>
              <p class="card-text d-flex justify-content-start">Day Open: {{ stock[0].day_open }}</p>
              <p class="card-text d-flex justify-content-start">
                Close: {{ stock[0].previous_close_price }}
              </p>
              <p class="card-text d-flex justify-content-start">Volume: {{ stock[0].volume }}</p>
              <!-- <button @click="getSingleData(stock.ticker)" class="btn btn-primary">Details</button> -->
              <div>
                <form action="" @submit.prevent="createInvoice(dataXendit, dataInput)">
                    <!-- <input type="text" :value="stock[0].ticker" disabled hidden> -->
                    <input v-model="dataXendit.amount" type="number" placeholder="amount">
                    <button type="submit" class="btn btn-success btn-sm ms-3">BUY</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
