<template>
  <v-card class="filters pa-4">
    <p class="text-h6">
      Фильтр
    </p>

    <v-form
      v-if="!loading"
      ref="formFilters"
      v-model="valid"
      lazy-validation
      @submit.prevent="onSubmit"
    >
      <v-row cols="12">
        <!-- Точки продажи -->
        <v-col>
          <p>Точка продажи</p>
          <div>
            <v-checkbox
              v-for="(outlet, i) in settings.outlets"
              v-model="selected.outlets"
              :rules="outletsRules"
              :label="outlet.name"
              :value="outlet.id"
              :key="outlet.id"
              :hide-details="i !== settings.outlets.length - 1"
            ></v-checkbox>
          </div>
          <v-btn class="mt-4" @click.stop="dialog = true"
            >Добавить канал продаж</v-btn
          >
          <add-outlet :open="dialog" @add="addOutlet" @close="dialog = false" />
        </v-col>

        <!-- Период и выборка стаитистики -->
        <v-col>
          <!-- Период дат -->
          <div>
            <p>Выберите период статистики</p>
            <v-row>
              <v-col>
                <v-menu
                  v-model="selected.dateRange.start.menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="selected.dateRange.start.date"
                      label="От"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    kjrfkbpjdfk
                    @input="onInputStartDate"
                    locale="ru"
                    v-model="selected.dateRange.start.date"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-menu
                  v-model="selected.dateRange.end.menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="selected.dateRange.end.date"
                      label="До"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="ru"
                    v-model="selected.dateRange.end.date"
                    @input="selected.dateRange.end.menu = false"
                    :min="selected.dateRange.start.date"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </div>
          <!-- Выборка стаитистики -->
          <div>
            <p>Выборка статистики</p>
            <v-radio-group :rules="rules.targets" v-model="selected.target">
              <v-radio
                v-for="target in settings.targets"
                :key="target.id"
                :label="target.name"
                :value="target.id"
              ></v-radio>
            </v-radio-group>
          </div>
        </v-col>
        <!-- Категория и бренды -->
        <v-col>
          <!-- Категория товара -->
          <div>
            <p>Категория товара</p>
            <v-select
              v-model="selected.category"
              :items="settings.categories"
              :rules="rules.category"
              @change="clearSelectedBrands"
              item-text="name"
              item-value="id"
              label="Категория товара"
            ></v-select>
          </div>
          <!-- Бренды -->
          <div class="mt-3">
            <p class="mb-0">Бренд</p>
            <div class="filters__brands">
              <v-checkbox
                v-for="(brand, i) in filteredBrands"
                v-model="selected.brands"
                :rules="brandsRules"
                :label="brand.name"
                :value="brand.id"
                :key="brand.id"
                :hide-details="i !== filteredBrands.length - 1"
              ></v-checkbox>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn
          :disabled="!valid"
          color="primary"
          type="submit"
          :loading="loadingSubmit"
          >Получить статистику</v-btn
        >
      </v-row>
    </v-form>
    <div class="text-center pt-4 pb-4" v-else>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { prepareForOutput, prepareForRequest } from "../../utils/date-helper";

export default {
  name: "filters",
  components: {
    addOutlet: () => import("./partials/add-outlet")
  },
  data: () => ({
    loading: true,
    loadingSubmit: true,
    dialog: false,
    valid: true,
    rules: {
      targets: [v => !!v || "Выберите формат выборки"],
      category: [v => !!v || "Выберите категорию"],
      sales: [v => !!v || "Выберите категорию"]
    },
    selected: {
      category: null,
      target: null,
      outlets: [],
      brands: [],
      dateRange: {
        start: { date: prepareForOutput(new Date()), menu: false },
        end: { date: prepareForOutput(new Date()), menu: false }
      }
    }
  }),
  computed: {
    ...mapGetters("filters", ["settings"]),
    ...mapGetters("stats", ["stats"]),
    filteredBrands() {
      const { category } = this.selected;
      const { brands } = this.settings;
      if (category) {
        return brands.filter(({ categories }) => categories.includes(category));
      }
      return brands;
    },
    outletsRules() {
      return [
        this.selected.outlets.length > 0 ||
          "Выберите хотя бы одну точку продажи"
      ];
    },
    brandsRules() {
      return [this.selected.brands.length > 0 || "Выберите хотя бы один бренд"];
    }
  },
  methods: {
    ...mapActions("filters", ["getSettings", "addOutlet"]),
    ...mapActions("stats", ["getStats"]),
    clearSelectedBrands() {
      this.selected.brands = [];
    },
    async onSubmit() {
      if (this.validate()) {
        this.loadingSubmit = true;
        const { category, outlets, brands, target } = this.selected;
        const { start, end } = this.selected.dateRange;

        await this.getStats({
          category,
          outlets,
          brands,
          target,
          dateStart: prepareForRequest(start.date),
          dateEnd: prepareForRequest(end.date)
        });

        this.loadingSubmit = false;
      }
    },
    validate() {
      return this.$refs.formFilters.validate();
    },
    onInputStartDate(date) {
      if (date > this.selected.dateRange.end.date) {
        this.selected.dateRange.end.date = date;
      }
      this.selected.dateRange.start.menu = false;
    }
  },
  async mounted() {
    await this.getSettings();
    this.loading = false;
  }
};
</script>

<style lang="scss">
@import "../../assets/scss/partials/filters";
</style>
