<script setup lang="ts">
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'
import colors from '~/assets/colors'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const props = defineProps<{
  quizTitle: string
  exercises: readonly QuizExercise[]
}>()

const { getStat } = useExerciseStats()

const canvas = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

const chartData = computed(() => {
  const labels: string[] = []
  const successes: number[] = []
  const fails: number[] = []

  for (const exercise of props.exercises) {
    const key = getExerciseKey(exercise)
    const stat = getStat({ quizTitle: props.quizTitle, exerciseKey: key })
    labels.push(String(exercise.prepend ?? exercise.append ?? exercise.expectedAnswer))
    successes.push(stat.successes)
    fails.push(stat.fails)
  }

  return { labels, successes, fails }
})

const renderChart = () => {
  if (!canvas.value) {
    return
  }

  const { labels, successes, fails } = chartData.value

  if (chart) {
    chart.data.labels = labels
    chart.data.datasets[0]!.data = successes
    chart.data.datasets[1]!.data = fails
    chart.update()
    return
  }

  chart = new Chart(canvas.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'Successes', data: successes, backgroundColor: colors.success.base },
        { label: 'Fails', data: fails, backgroundColor: colors.fail.base },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { stacked: true },
        y: { stacked: true, beginAtZero: true, ticks: { precision: 0 } },
      },
      plugins: {
        legend: { position: 'top' },
      },
    },
  })
}

onMounted(renderChart)

watch(chartData, renderChart)

onBeforeUnmount(() => {
  chart?.destroy()
  chart = null
})
</script>

<template>
  <div style="position: relative; height: 320px;">
    <canvas ref="canvas" />
  </div>
</template>
