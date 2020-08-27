<template>
  <div>
    <p class="text-h6">{{ title }}</p>
    <div>
      <p>Форма представления данных:</p>
      <v-radio-group v-model="formats.selected" row>
        <v-radio
          v-for="format in formats.values"
          :key="format.id"
          :label="format.name"
          :value="format.id"
        ></v-radio>
      </v-radio-group>
    </div>
    <keep-alive>
      <div style="max-width: 800px">
        <v-data-table
          no-data-text="Нет продаж"
          v-if="formats.selected == 0"
          :headers="tableHeaders"
          :items="tableItems"
          hide-default-footer
          class="elevation-1"
        >
        </v-data-table>
        <slot v-else name="chart"></slot>
      </div>
    </keep-alive>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "" },
    tableHeaders: { type: Array, default: () => [] },
    tableItems: { type: Array, default: () => [] }
  },
  data: () => ({
    formats: {
      selected: 0,
      values: [
        { id: 0, name: "Табличная" },
        { id: 1, name: "Схематичная" }
      ]
    }
  })
};
</script>
