<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "@vue/runtime-core";
import store from '../store';

let theads = [
  "Flags",
  "Country Name",
  "CCA2",
  "CCA3",
  "Native Country Name",
  "Alternative Country Name",
  "Country Calling Code",
];

onMounted(async () => {
  await store.dispatch("getCountries");
});

const paginationData = reactive({
  start: 0,
  end: 25,
});

function clickPage(st: number, en: number) {
  paginationData.start = st;
  paginationData.end = en;
}

const state = reactive({
  search: "",
  countries: computed(() => store.state.countries),
});

let filterCountries = computed(() => {
  return state.countries.filter((country: any) =>
    country.name.official.toLowerCase().includes(state.search.toLowerCase())
  );
});

const paginatedCountries = computed(() =>
  filterCountries.value.slice(paginationData.start, paginationData.end)
);

const totalPageCount = computed(() =>
  paginatedCountries.value.length > 0
    ? Math.ceil(filterCountries.value.length / 25)
    : 0
);

watch(
  () => state.search,
  () => {
    paginationData.start = 0;
    paginationData.end = 25;
  }
);

function sortAsc() {
  function compare(a: any, b: any) {
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
  function compare(a: any, b: any) {
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
    <table class="table table-fixed mt-5">
      <thead>
        <tr>
          <th class=" w-1/2 px-4 py-2" v-for="thead in theads" :key="thead">{{ thead }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(country, index) in paginatedCountries" :key="index">
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
      <button
        type="button"
        class="btn"
        :class="
          paginationData.start == (c === 1 ? 0 : (c - 1) * 25)
            ? 'btn-active'
            : ''
        "
        v-for="c in totalPageCount" :key="c"
        @click="clickPage(c === 1 ? 0 : (c - 1) * 25, c * 25)"
      >
        {{ c }}
      </button>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 100px;
}
</style>
