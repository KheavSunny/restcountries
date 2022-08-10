<script setup lang="ts">
import { computed } from "@vue/runtime-core";
import store from '../store';

const theads = [
  "ID",
  "Flags",
  "Country Name",
  "CCA2",
  "CCA3",
  "Native Country Name",
  "Alternative Country Name",
  "Country Calling Code",
];

store.dispatch('getCountries');

const countries = computed(() => store.state.countries);

</script>

<template>
  <div class="overflow-x-auto">
    <table class="table w-full">
      <thead>
        <tr>
          <th v-for="thead in theads" :key="thead">{{ thead }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(country, index) in countries" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <img :src="country.flags.png" alt="">
          </td>
          <td>{{ country.name.official }}</td>
          <td>{{ country.cca2 }}</td>
          <td>{{ country.cca3 }}</td>
          <td></td>
          <td>
            <p v-for="(value,index) in country.altSpellings">
              {{index}}. {{ value }}
            </p>
          </td>
          <td>
            {{ country.idd.root }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
  img {
    width: 100px;
  }
</style>
