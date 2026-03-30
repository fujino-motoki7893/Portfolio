<template>
  <canvas
    ref="canvasRef"
    class="absolute inset-0 w-full h-full pointer-events-none z-10"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  isDarkMode: boolean
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number | null = null

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  opacityDirection: number
}

const PARTICLE_COUNT = 60
const CONNECTION_DISTANCE = 150
const PARTICLE_SPEED = 0.4

const createParticles = (width: number, height: number): Particle[] => {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * PARTICLE_SPEED * 2,
    vy: (Math.random() - 0.5) * PARTICLE_SPEED * 2,
    radius: Math.random() * 2.5 + 1.5,
    opacity: Math.random() * 0.4 + 0.5,
    opacityDirection: Math.random() > 0.5 ? 1 : -1,
  }))
}

const getColors = (isDark: boolean) => {
  if (isDark) {
    return {
      particle: (opacity: number) => `rgba(200, 220, 255, ${opacity})`,
      line: (opacity: number) => `rgba(200, 220, 255, ${opacity})`,
    }
  }
  return {
    particle: (opacity: number) => `rgba(59, 130, 246, ${opacity})`,
    line: (opacity: number) => `rgba(59, 130, 246, ${opacity})`,
  }
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let particles: Particle[] = []

  const resize = () => {
    const rect = canvas.parentElement?.getBoundingClientRect()
    if (!rect) return
    canvas.width = rect.width
    canvas.height = rect.height
    particles = createParticles(canvas.width, canvas.height)
  }

  resize()

  const resizeObserver = new ResizeObserver(resize)
  if (canvas.parentElement) {
    resizeObserver.observe(canvas.parentElement)
  }

  const animate = () => {
    if (!ctx || !canvas) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const colors = getColors(props.isDarkMode)

    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1

      p.opacity += p.opacityDirection * 0.003
      if (p.opacity >= 0.8) p.opacityDirection = -1
      if (p.opacity <= 0.2) p.opacityDirection = 1

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = colors.particle(p.opacity)
      ctx.fill()
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < CONNECTION_DISTANCE) {
          const lineOpacity = (1 - distance / CONNECTION_DISTANCE) * 0.3
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = colors.line(lineOpacity)
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }
    }

    animationId = requestAnimationFrame(animate)
  }

  animate()

  onUnmounted(() => {
    if (animationId) cancelAnimationFrame(animationId)
    resizeObserver.disconnect()
  })
})
</script>
