<template>
  <v-app>
    <default-layout />
  </v-app>
</template>

<script>
import defaultLayout from "./layouts/default";

export default {
  name: "App",
  components: {
    defaultLayout
  }
};
</script>
