<template>
  <div>
    <navbar />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import navbar from "../components/navbar";
export default {
  components: { navbar }
};
</script>

<style></style>
