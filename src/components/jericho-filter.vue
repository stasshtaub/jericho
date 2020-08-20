<template>
  <v-card class="jericho-filter pa-4">
    <p class="text-h6">
      Фильтр
    </p>

    <v-form @submit.prevent="onSubmit">
      <v-row cols="12">
        <!-- Точки продажи -->
        <v-col>
          <p>Точка продажи</p>
          <v-list-item-group v-model="selected.outlets" multiple>
            <v-list-item v-for="outlet in settings.outlets" :key="outlet.id">
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox :input-value="active"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title v-text="outlet.name" />
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-list-item-group>
          <v-btn class="mt-4">Добавить канал продаж</v-btn>
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
                    v-model="selected.dateRange.start.date"
                    @input="selected.dateRange.start.menu = false"
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
                      label="От"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="selected.dateRange.end.date"
                    @input="selected.dateRange.end.menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </div>
          <!-- Выборка стаитистики -->
          <div>
            <p>Выборка статистики</p>
            <v-radio-group v-model="selected.target">
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
              @change="clearSelectedBrands"
              item-text="name"
              item-value="id"
              label="Категория товара"
            ></v-select>
          </div>
          <!-- Бренды -->
          <div class="mt-3">
            <p>Бренд</p>
            <v-list-item-group
              class="jericho-filter__brands"
              v-model="selected.brands"
              multiple
            >
              <v-list-item v-for="brand in filteredBrands" :key="brand.id">
                <template v-slot:default="{ active }">
                  <v-list-item-action>
                    <v-checkbox :input-value="active"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ brand.name }}</v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-item-group>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn color="primary" type="submit">Получить статистику</v-btn>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "jericho-filter",
  data: () => ({
    selected: {
      category: null,
      target: null,
      outlets: [],
      brands: [],
      dateRange: {
        start: { date: new Date().toISOString().substr(0, 10), menu: false },
        end: { date: new Date().toISOString().substr(0, 10), menu: false }
      }
    }
  }),
  computed: {
    ...mapGetters(["settings", "stats"]),
    filteredBrands() {
      if (this.selected.category) {
        return this.settings.brands.filter(brand =>
          brand.categories.includes(this.selected.category)
        );
      }
      return this.settings.brands;
    }
  },
  methods: {
    ...mapActions(["getSettings", "getStats"]),
    clearSelectedBrands() {
      this.selected.brands = [];
    },
    onSubmit() {
      const { category, outlets, brands, target } = this.selected;
      const data = {
        category,
        outlets,
        brands,
        target,
        dateStart: this.selected.dateRange.start.date.replace(/-/g, ""),
        dateEnd: this.selected.dateRange.end.date.replace(/-/g, "")
      };
      console.log(data);

      this.getStats(data);
    }
  },
  mounted() {
    this.getSettings();
  }
};
</script>

<style lang="scss">
.jericho-filter {
  &__brands {
    max-height: 288px;
    overflow-y: auto;
  }
}
</style>
