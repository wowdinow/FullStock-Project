import axios from "axios"
import { defineStore } from "pinia"

const url = 'http://localhost:3000/'
// const url = 'https://wadinodev.com/'

export const useStockStore = defineStore('stock', {
    state: () => ({ 
        stocks: [],
        articles: [],
        stock: {},
        mystocks: []
    }),
    actions: {
      async registerHandler(dataInput){
          try {
              await axios ({
                  url: url + 'register',
                  method: "POST",
                  data: dataInput
                })

            // console.log(dataInput);
            this.router.push('/login')
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.response.data.msg}`
              })
        }
      },

      async loginHandler(dataInput){
        try {
            let {data} = await axios ({
                url: url + 'login',
                method: "POST",
                data: dataInput
              })
            
            localStorage.access_token = data.access_token
          // console.log(dataInput);
          this.router.push('/')
      } catch (err) {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.msg}`
          })
      }
    },

    async googleLogin(response) {
        try {
          const access_token = response.credential
  
          const account = await axios({
            url: url + `login/google`,
            method: 'POST',
            headers: {
              access_token
            }
          })
          console.log(account)
          localStorage.access_token = account.data.access_token
          this.router.push('/')
        } catch (err) {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.msg}`
          })
        }
      },

    logoutHandler(){
        localStorage.clear()
        this.router.push('/login')
    },

    async getData({ page = 1 } = { page: 1}){
        try {
            let {data} = await axios ({
                url: url + `stocks?page=${page}`,
                method: "GET",
                headers: {
                    access_token: localStorage.access_token
                }
              })
              console.log(data);
              this.stocks = data.stocks
              this.articles = data.news
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.response.data.msg}`
              })
        }
    },

    async getSingleData(ticker){
        try {
            console.log(ticker, "ini ticker");
            let {data} = await axios ({
                url: url + 'stocks/' + ticker,
                method: "GET",
                headers: {
                    access_token: localStorage.access_token
                }
              })
              console.log(data, "ini data");
              this.stock = data
              this.router.push('/stocks/' + ticker)
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.response.data.msg}`
              })
        }
    },

    async createInvoice(dataXendit, dataInput){
        try {
            console.log(dataXendit);
            let {data} = await axios ({
                url: url + 'payments',
                method: "POST",
                data: dataXendit,
                headers: {
                    access_token: localStorage.access_token
                }
              })

              console.log(data.status);
              if(data.invoice_url){
                window.open(data.invoice_url, '_blank')
              }

              if(data.status === 'PAID'){
                this.buyStock(dataInput)
              }

              this.buyStock(dataInput)
            } catch (err) {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.response.data.msg}`
              })
        }
    },

    async buyStock(dataInput){
        try {
            let {data} = await axios ({
                url: url + 'mystocks',
                method: "POST",
                data: dataInput,
                headers: {
                    access_token: localStorage.access_token
                }
              })

              Swal.fire({
                position: 'center',
                icon: 'success',
                title: `${data.message}`,
                showConfirmButton: false,
                timer: 1500
              })
              this.router.push('/mystocks')
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.response.data.msg}`
              })
        }
    },

    async getMyStock(){
        try {
            let {data} = await axios ({
                url: url + 'mystocks',
                method: "GET",
                headers: {
                    access_token: localStorage.access_token
                }
              })
              console.log(data);
              this.mystocks = data
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.response.data.msg}`
              })
        }
    },

    async sellStock(id){
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, sell it!'
              }).then((result) => {
                if (result.isConfirmed) {
            let {data} = axios ({
                url: url + 'mystocks/' + id,
                method: "DELETE",
                headers: {
                    access_token: localStorage.access_token
                }
              })
              Swal.fire('Deleted!', 'Your stock sold.', 'success')
              this.getMyStock()
              this.router.push('/mystocks')
            }
        })
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.response.data.msg}`
              })
        }
    }

    },
  })