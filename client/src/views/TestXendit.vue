<script>
import { mapActions } from 'pinia';
import { useStockStore } from '../stores/stocks';

export default{
    data(){
        return{
            dataXendit:{
                ticker: '',
                amount: ''
            }
        }
    },
    methods: {
        ...mapActions(useStockStore, ['createInvoice'])
    }

}
</script>

<template>
    <form action="" @submit.prevent="createInvoice(dataXendit)">
        <input v-model="dataXendit.ticker" type="text" placeholder="ticker">
        <input v-model="dataXendit.amount" type="number" placeholder="amount">
        <button type="submit">BUY</button>
    </form>
</template>

<style></style>