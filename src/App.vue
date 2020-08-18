<template>
  <v-app>
    <v-app-bar app>
      <v-row>
        <v-col cols="6">
          <v-toolbar-title>"CBJ - Иерихон"</v-toolbar-title></v-col
        >
        <v-col cols="6"> Статистика</v-col>
      </v-row>
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
