<script>
import { mapActions } from 'pinia'
import { useStockStore } from '../stores/stocks'

export default {
  data() {
    return {
      dataInput: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(useStockStore, ['loginHandler', 'googleLogin']),
    callback(response) {
      this.googleLogin(response)
    }
  }
}
</script>

<template>
  <div class="container col-4 card mt-5">
    <div class="container d-flex justify-content-center mt-4" style="color: rgb(13, 138, 79)">
      <h3>Login</h3>
    </div>
    <div class="d-flex justify-content-center">
      <img src="../assets/fullstock.png" height="100" width="100" alt="" />
    </div>
    <form class="container mt-2 mb-4" @submit.prevent="loginHandler(dataInput)">
      <div class="mb-3">
        <label for="register-email" class="form-label" style="color: rgb(13, 138, 79)"
          >Email address</label
        >
        <input
          v-model="dataInput.email"
          type="email"
          class="form-control"
          id="register-email"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="register-password" class="form-label" style="color: rgb(13, 138, 79)"
          >Password</label
        >
        <input
          v-model="dataInput.password"
          type="password"
          class="form-control"
          id="register-password"
        />
      </div>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-success">Submit</button>
      </div>
      <div class="d-flex justify-content-center my-2">
        <GoogleLogin :callback="callback" promt />
      </div>
      <div class="d-flex justify-content-center">
      <router-link to="/register" class="text-center" style="color: black"
        >Don't Have an Account? <span style="color: blue">Register</span></router-link
      >
    </div>
    </form>
  </div>
</template>

<style></style>
