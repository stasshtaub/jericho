<template>
  <v-app>
    <default-layout />
  </v-app>
</template>

<script>
import defaultLayout from "./layouts/default";

export default {
  name: "app",
  components: {
    defaultLayout
  }
};
</script>
