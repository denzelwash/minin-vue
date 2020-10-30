<template>
  <div class="card orange darken-3 bill-card">
    <div class="card-content white-text">
      <div class="card-header">
        <span class="card-title">Курс валют</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Валюта</th>
            <th>Курс</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(cur, index) in myCurrency"
            :key="index"
          >
            <td>{{ cur }}</td>
            <td>{{ currency.rates[cur].toFixed(2) }}</td>
            <td>{{ new Date(currency.date) | formatDate('date') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['currency'],
  data: () => ({
    myCurrency: ['RUB', 'USD', 'EUR']
  })
};
</script>

<style>
</style>
