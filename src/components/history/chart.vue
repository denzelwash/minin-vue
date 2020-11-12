<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: ['records', 'categories'],
  mounted() {
    const options = {
      labels: this.categories.map(item => item.title),
      datasets: [
        {
          label: 'Расходы по категориям',
          data: this.categories.map((cat, i) => {
            const id = cat.id
            return this.records.filter(rec => rec.category === id && rec.type === 'outcome')
              .map(rec => rec.summ)
              .reduce((a, b) => a + b, 0)
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }
    this.renderChart(options, {})
  }
}
</script>
