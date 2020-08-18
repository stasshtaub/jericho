<template>
  <v-card class="jericho-filter pa-4">
    <p class="text-body-1">
      Фильтр
    </p>

    <p>
      <v-form>
        <v-row cols="12">
          <!-- Точки продажи -->
          <v-col>
            <p>Точка продажи</p>
            <v-list-item-group v-model="outlets.selected" multiple>
              <v-list-item v-for="outlet in outlets.items" :key="outlet.id">
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
                    v-model="stats.range.start.menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="stats.range.start.date"
                        label="От"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="stats.range.start.date"
                      @input="stats.range.start.menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col>
                  <v-menu
                    v-model="stats.range.end.menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="stats.range.end.date"
                        label="От"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="stats.range.end.date"
                      @input="stats.range.end.menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </div>
            <!-- Выборка стаитистики -->
            <div>
              <p>Выборка статистики</p>
              <v-radio-group>
                <v-radio
                  v-for="target in stats.targets"
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
                v-model="categories.selected"
                :items="categories.items"
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
                v-model="brands.selected"
                multiple
              >
                <v-list-item v-for="brand in brands.items" :key="brand.id">
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
          <v-btn color="primary">Получить статистику</v-btn>
        </v-row>
      </v-form>
    </p></v-card
  >
</template>

<script>
export default {
  name: "jericho-filter",
  data: () => ({
    outlets: {
      selected: [],
      items: [
        {
          id: 1,
          name: "Телефон",
          isSelected: false
        },
        {
          id: 2,
          name: "e-mail",
          isSelected: false
        },
        {
          id: 3,
          name: "Сайт-визитка",
          isSelected: false
        },
        {
          id: 4,
          name: "Личное обращение",
          isSelected: false
        },
        {
          id: 5,
          name: "Обращение в точку продажи",
          isSelected: false
        },
        {
          id: 6,
          name: "Продажи с портала оборудования",
          isSelected: false
        }
      ]
    },
    stats: {
      range: {
        start: { date: new Date().toISOString().substr(0, 10), menu: false },
        end: { date: new Date().toISOString().substr(0, 10), menu: false }
      },
      targets: [
        {
          id: 1,
          name: "Физическое лицо"
        },
        {
          id: 2,
          name: "Юридическое лицо"
        }
      ]
    },

    categories: {
      selected: null,
      items: [
        {
          id: 1,
          name: "Утюги"
        },
        {
          id: 2,
          name: "Холодильники"
        },
        {
          id: 3,
          name: "Плиты"
        }
      ]
    },
    brands: {
      selected: [],
      items: [
        {
          id: 1,
          name: "LG",
          isSelected: false
        },
        {
          id: 2,
          name: "Tefal",
          isSelected: false
        },
        {
          id: 3,
          name: "Braun",
          isSelected: false
        },
        {
          id: 4,
          name: "Rowenta",
          isSelected: false
        },
        {
          id: 5,
          name: "Philips",
          isSelected: false
        },
        {
          id: 6,
          name: "VITEK",
          isSelected: false
        },
        {
          id: 7,
          name: "CANDY",
          isSelected: false
        }
      ]
    }
  })
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
