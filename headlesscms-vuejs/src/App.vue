<template>
  <div id="app" class="min-h-screen bg-gray-900 text-gray-100">
  <Nav />
   <div class="max-w-3xl mx-auto px-4">
      <!-- Headline -->
      <h1 class="mt-12 mb-16 text-4xl md:text-6xl text-center">Welcome to Coffee Shop</h1>
       <h2 class="mb-8 text-2xl text-center md:text-left">Created using Vue.js and Webiny Headless CMS</h2>
      <!-- Image -->
      <div class="mb-24 flex justify-around">
        <a href="https://vuejs.org/" target="_blank">
          <img class="w-20" alt="vue logo" src="./assets/logo.png">
        </a>
        <img class="w-10" alt="plus logo" src="./assets/plus.svg">
        <a href="https://www.webiny.com/" target="_blank">
          <img class="w-24" alt="webiny logo" src="./assets/orange-logo-with-icon-on-top.svg">
        </a>
      </div>
      <!-- Article list -->
      <div class="flex mt-16">
        <p v-if="$apollo.queries.listFacts.loading" class="text-green-600">Loading facts ...</p>
        <p v-if="$apollo.queries.listFacts.error" class="text-red-600">Oops! Something went wrong!!</p>

        <div class="flex flex-col">
          <div class="mb-16" v-for="article in listFacts && listFacts.data" v-bind:key="article.id">
               <h3 class="mb-4 text-lg text-gray-200 uppercase">
               {{ article.title }}
               </h3>
               <img :src="article.image" alt="" class="mb-4"/>
               <p class="mb-4 text-lg text-gray-300">
               {{ article.description }}
               </p>
            </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import gql from "graphql-tag";
import Nav from "./components/Nav";

export default {
  name: 'App',
  components: {
    Nav
  },
  data() {
    return {
      listFacts: []
    };
  },
  apollo: {
    listFacts: gql`
      query listFacts {
        listFacts {
          data {
            id
            title
            description
            image
          }
        }
      }
    `
  }
}
</script>
