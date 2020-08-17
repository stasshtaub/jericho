<template>
  <v-card>
    <v-card-title primary-title>
      Фильтр
    </v-card-title>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-checkbox
              v-for="outlet in outlets"
              :v-model="outlet.isSelected"
              :key="outlet.key"
              :label="outlet.name"
              :value="outlet.key"
            ></v-checkbox>
          </v-col>

          <v-col cols="12" md="4">
            <v-row>
              <v-radio-group>
                <v-radio
                  v-for="target in stats.targets"
                  :key="target.key"
                  :label="target.name"
                  :value="target.key"
                ></v-radio>
              </v-radio-group>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "jericho-filter",
  data: () => ({
    outlets: [
      {
        key: "phone",
        name: "Телефон",
        isSelected: false
      },
      {
        key: "email",
        name: "e-mail",
        isSelected: false
      },
      {
        key: "site",
        name: "Сайт-визитка",
        isSelected: false
      }
    ],
    stats: {
      range: {
        start: null,
        end: null
      },
      targets: [
        {
          key: "natural-person",
          name: "Физическое лицо"
        },
        {
          key: "оuridical-person",
          name: "Юридическое лицо"
        }
      ]
    }
  })
};
</script>

<style></style>
