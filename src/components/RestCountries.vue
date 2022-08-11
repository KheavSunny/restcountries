<script setup lang="ts">
import { computed, reactive } from "@vue/runtime-core";
import store from "../store";

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

store.dispatch("getCountries");

// const search = "";

// const countries = computed(() => store.state.countries);

const state = reactive({
  search: "",
  countries: computed(() => store.state.countries),
});

let filterCountries = computed(() => {
  return state.countries.filter((country) =>
    country.name.official.toLowerCase().includes(state.search.toLowerCase())
  );
});

function sortAsc() {
  function compare(a,b) {
    if(a.name.official < b.name.official){
      return -1;
    }
    if(a.name.official > b.name.official){
      return 1;
    }
      return 0;
  }

  return state.countries.sort(compare);
}
function sortDesc() {
  function compare(a,b) {
    if(a.name.official < b.name.official){
      return 1;
    }
    if(a.name.official > b.name.official){
      return -1;
    }
      return 0;
  }

  return state.countries.sort(compare);
}
</script>

<template>
  <div class="overflow-x-auto">
    <div>
      <input
        type="text"
        placeholder="Search By Country Name"
        class="input w-full max-w-xs"
        v-model="state.search"
      />
    </div>
    <div class="mt-2 flex justify-start">
      <button class="btn mr-2" @click="sortAsc()">
        Sorting Country By Name Asc
      </button>
      <button class="btn" @click="sortDesc()">
        Sorting Country By Name Desc
      </button>
    </div>
    <table class="table table-compact w-auto mt-5">
      <thead>
        <tr>
          <th v-for="thead in theads" :key="thead">{{ thead }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(country, index) in filterCountries" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <img :src="country.flags.png" alt="" />
          </td>
          <td>{{ country.name.official }}</td>
          <td>{{ country.cca2 }}</td>
          <td>{{ country.cca3 }}</td>
          <td>{{ country.name.nativeName?.zho?.official }}</td>
          <td>
            <p v-for="(value, index) in country.altSpellings" :key="index">
              {{ index }}. {{ value }}
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
