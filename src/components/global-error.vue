<template>
  <v-snackbar v-model="error.hasError" top left multi-line>
    {{ error.message }}
    <template v-slot:action="{ attrs }">
      <v-btn dark text v-bind="attrs" @click="clearError">
        Закрыть
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters(["error"])
  },
  methods: {
    ...mapMutations(["clearError"])
  }
};
</script>
