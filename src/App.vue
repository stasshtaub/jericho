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
        <jericho-filter />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import jerichoFilter from "./components/jericho-filter";

export default {
  name: "App",
  components: {
    jerichoFilter
  }
};
</script>
