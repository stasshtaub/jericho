<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>"CBJ - Иерихон"</v-toolbar-title>
      <v-spacer></v-spacer>
      <nav>
        <v-btn text href="/">Статистика</v-btn>
      </nav>
    </v-app-bar>
    <v-main>
      <v-container>
        <filters />
        <stats v-if="stats" :stats="stats" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import filters from "./components/filters/index";
import stats from "./components/stats/index";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    filters,
    stats
  },
  computed: {
    ...mapGetters("stats", ["stats"])
  }
};
</script>
