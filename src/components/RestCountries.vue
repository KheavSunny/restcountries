<script setup lang="ts">
import { computed, reactive, ref } from "@vue/runtime-core";
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

let start = ref(0);
let end = ref(25);

function clickPage(st, en) {
  start.value = st;
  end.value = en;
  console.log(start.value);
  
}

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
  function compare(a, b) {
    if (a.name.official < b.name.official) {
      return -1;
    }
    if (a.name.official > b.name.official) {
      return 1;
    }
    return 0;
  }

  return state.countries.sort(compare);
}
function sortDesc() {
  function compare(a, b) {
    if (a.name.official < b.name.official) {
      return 1;
    }
    if (a.name.official > b.name.official) {
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
        <tr
          v-for="(country, index) in filterCountries.slice(start, end)"
          :key="index"
        >
          <td>{{ index + 1 }}</td>
          <td>
            <img :src="country.flags.png" alt="" />
          </td>
          <td>
            <a :href="'#my-modal' + index">{{ country.name.official }}</a>
          </td>
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

          <!-- Modal Popup -->

          <div class="modal" :id="'my-modal' + index">
            <div class="modal-box">
              <h3 class="font-bold text-lg">
                Capital Name and Region Of The Country
                {{ country.name.official }}
              </h3>
              <p
                class="py-4"
                v-for="(capital, index) in country.capital"
                :key="index"
              >
                Capital: {{ index + 1 }}. {{ capital }}
              </p>
              <p class="py-4">Region: {{ country.region }}</p>
              <div class="modal-action">
                <a href="#" class="btn">Close</a>
              </div>
            </div>
          </div>
        </tr>
      </tbody>
    </table>
    <div class="btn-group mt-5 mb-5 flex justify-center">
      <button type="button" class="btn" :class="start==0 ? 'btn-active' : ''" @click="clickPage(0,25)">1</button>
      <button type="button" class="btn" :class="start==25 ? 'btn-active' : ''" @click="clickPage(25,50)">2</button>
      <button type="button" class="btn" :class="start==50 ? 'btn-active' : ''" @click="clickPage(50,75)">3</button>
      <button type="button" class="btn" :class="start==75 ? 'btn-active' : ''" @click="clickPage(75,100)">4</button>
      <button type="button" class="btn" :class="start==100 ? 'btn-active' : ''" @click="clickPage(100,125)">5</button>
      <button type="button" class="btn" :class="start==125 ? 'btn-active' : ''" @click="clickPage(125,150)">6</button>
      <button type="button" class="btn" :class="start==150 ? 'btn-active' : ''" @click="clickPage(150,175)">7</button>
      <button type="button" class="btn" :class="start==175 ? 'btn-active' : ''" @click="clickPage(175,200)">8</button>
      <button type="button" class="btn" :class="start==200 ? 'btn-active' : ''" @click="clickPage(200,225)">9</button>
      <button type="button" class="btn" :class="start==225 ? 'btn-active' : ''" @click="clickPage(225,250)">10</button>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 100px;
}
</style>
