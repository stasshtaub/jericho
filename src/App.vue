<template>
  <v-app>
    <v-main>
      <jericho-filter />
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
