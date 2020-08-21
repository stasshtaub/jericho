<template>
  <v-dialog v-model="open" width="500" @click:outside="close">
    <v-card>
      <v-card-title>
        <span class="headline">Добавить канал продаж</span>
      </v-card-title>
      <v-form ref="form" v-model="valid" @submit.prevent="add">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Название"
                  v-model="name"
                  :rules="[v => !!v || 'Введите название']"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="close">Отмена</v-btn>
          <v-btn :disabled="!valid" color="primary" type="submit"
            >Добавить</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "add-outlet",
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    valid: false,
    name: ""
  }),
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    close() {
      this.$emit("close");
    },
    add() {
      if (this.validate()) {
        this.$emit("add", this.name);
        this.close();
      }
    }
  }
};
</script>
