<script>
import StockCard from '../components/StockCard.vue'
import { mapActions, mapState } from 'pinia'
import { useStockStore } from '../stores/stocks'
import News from '../components/News.vue'

export default {
  data() {
    return {
      totalPage: 10
    }
  },
  components: {
    StockCard,
    News
  },
  computed: {
    ...mapState(useStockStore, ['stocks', 'articles'])
  },
  methods: {
    ...mapActions(useStockStore, ['getData', 'getSingleData'])
  },
  watch: {
    '$route.query': {
      handler() {
        this.getData(this.$route.query)
      },
      deep: true
    }
  },
  created() {
    this.getData()
  }
}
</script>

<template>
  <div class="container text-center">
    <div class="row">
      <div class="mt-5 mb-3"><h1>Stock Lists</h1></div>
      <div class="d-flex justify-content-center gap-3">
        <StockCard v-for="stock in stocks" :key="stock.ticker" :stock="stock" />
      </div>
    </div>
    <div class="d-flex justify-content-center col">
      <p>Page :</p>
      <router-link
        v-for="i in totalPage"
        :to="{ path: '/', query: { ...$route.query, page: i } }"
        class="ms-2"
        >{{ i }}</router-link
      >
    </div>
    <div class="row mb-5">
      <div class="mt-5 mb-3"><h1>News</h1></div>
      <div class="card col-sm-12 mb-3 mb-sm-0">
        <div class="">
          <News v-for="article in articles" :key="article.title" :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
