<script>
import {mapActions} from 'pinia'
import {useStockStore} from '../stores/stocks'

export default {
    data(){
        return{
            dataInput: {
                email: '',
                password: ''
            }
        }
    },
    methods:{
        ...mapActions(useStockStore, ['registerHandler'])
    }
}
</script>

<template>
  <div class="container col-4 card mt-5">
    <div class="container d-flex justify-content-center mt-4" style="color: rgb(13, 138, 79);">
      <h3>Register</h3>
    </div>
    <form class="container mt-2 mb-4" @submit.prevent="registerHandler(dataInput)">
      <div class="mb-3">
        <label for="register-email" class="form-label" style="color: rgb(13, 138, 79);">Email address</label>
        <input
        v-model="dataInput.email"
          type="email"
          class="form-control"
          id="register-email"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="register-password" class="form-label" style="color: rgb(13, 138, 79);">Password</label>
        <input v-model="dataInput.password" type="password" class="form-control" id="register-password" />
      </div>
      <div class="d-flex flex-column justify-content-center">
      <button type="submit" class="btn btn-success mb-2">Submit</button>
      <router-link to="/login" class="text-center" style="color: black"
              >Have an Account? <span style="color: blue">Login</span></router-link
            >
    </div>
    </form>
  </div>
</template>

<style>
</style>
