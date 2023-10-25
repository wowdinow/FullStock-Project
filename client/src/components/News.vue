<script>
export default{
    props: ['article']
}
</script>

<template>
<a :href="article.url">
          <h5 class="card-title mt-4 d-flex justify-content-start">{{ article.title }}</h5>
          <p class="card-text d-flex justify-content-start">{{ article.description }}</p>
          <hr /></a>
</template>

<style>
</style>