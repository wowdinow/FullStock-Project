<script>
import { mapActions } from 'pinia';
import {useStockStore} from '../stores/stocks'

export default {
    methods: {
        ...mapActions(useStockStore, ['logoutHandler']) 
    }
}
</script>

<template>
  <!-- <div class="container"> -->
    <nav class="navbar navbar-expand-lg" style="background-color: rgb(25, 194, 67);">
      <div class="container">
        <a class="navbar-brand" href="/"
          ><img src="../assets/fullstock.png" height="50" alt=""
        /></a>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link active" aria-current="page">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/mystocks" class="nav-link active">My Stock</router-link>
            </li>
          </ul>
          <button class="btn btn-danger" @click="logoutHandler">Logout</button>
        </div>
      </div>
    </nav>
  <!-- </div> -->
</template>

<style></style>
