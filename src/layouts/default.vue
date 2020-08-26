<template>
  <div>
    <navbar />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <global-error />
  </div>
</template>

<script>
import navbar from "../components/navbar";
export default {
  components: {
    navbar,
    globalError: () => import("../components/global-error")
  }
};
</script>

<style></style>
