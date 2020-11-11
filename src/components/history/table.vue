<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Сумма</th>
          <th>Дата</th>
          <th>Категория</th>
          <th>Тип</th>
          <th>Открыть</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(record, i) in records" :key="record.id">
          <td>{{ ++i }}</td>
          <td>{{ record.summ | currencyFilter}}</td>
          <td>{{ new Date(record.date) | formatDate("date") }}</td>
          <td>{{ record.categoryName }}</td>
          <td>
            <span class="white-text badge" :class="record.recordClass">{{ record.recordText }}</span>
          </td>
          <td>
            <button class="btn-small btn" @click="$router.push('/detail/' + record.id)" v-tooltip="'Подробнее'">
              <i class="material-icons">open_in_new</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <paginate
      :page-count="20"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'className'">
    </paginate>
  </div>
</template>

<script>
export default {
  props: ['records', 'categories']
};
</script>

<style>
</style>
