<template>
  <div class="splash-container">
    <transition-group name="fade" tag="div">
      <p
        v-for="(word, index) in visibleWords"
        :key="word + '-' + index"
        class="animated-word"
        :style="positions[index]"
      >
        {{ word }}
      </p>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const words = ['Légendes', 'Mythes', 'Phénomènes étranges', 'Créatures bizarres', 'Réalité ?']
const visibleWords = ref([])
const positions = ref([])
const router = useRouter()

function getRandomPosition() {
  const top = Math.random() * 60 + 10 // 10% à 70%
  const left = Math.random() * 60 + 20 // 20% à 80%
  return {
    position: 'absolute',
    top: `${top}%`,
    left: `${left}%`,
    transform: 'translate(-50%, -50%)',
  }
}

function playSound() {
  const audio = new Audio('/sounds/pop.mp3') // place ce fichier dans /public/sounds/
  audio.volume = 0.3
  audio.play()
}

onMounted(() => {
  let i = 0
  const interval = setInterval(() => {
    if (i < words.length) {
      visibleWords.value.push(words[i])
      positions.value.push(getRandomPosition())
      playSound()
      i++
    } else {
      clearInterval(interval)
      setTimeout(() => {
        document.body.style.overflow = 'auto' // réactive le scroll
        router.push('/home')
      }, 2000)
    }
  }, 1000)
})
</script>

<style scoped>
.splash-container {
  position: fixed;
  inset: 0;
  background: #0d0d0d;
  overflow: hidden;
  z-index: 9999;
}

.animated-word {
  font-size: 2.5rem;
  color: #ff9800;
  font-family: 'Inter', sans-serif;
  animation: popIn 1s ease-in-out;
  white-space: nowrap;
  pointer-events: none;
}

@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.8) translate(-50%, -50%);
  }
  100% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
