<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-12 gap-4 lg:gap-8 items-start py-8 lg:py-16">
      <div
        ref="titleSection"
        class="col-span-12 lg:col-span-3 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold
        text-center lg:text-left mb-6 lg:mb-0 opacity-0 transition-all
        duration-1000 ease-out transform translate-x-[-30px]"
        :class="{ 'opacity-100 translate-x-0': isTitleVisible }"
      >
        技術スタック
      </div>

      <div
        ref="contentSection"
        class="col-span-12 lg:col-span-9 opacity-0 transition-all
        duration-1000 ease-out transform"
        :class="{ 'opacity-100 translate-x-0': isContentVisible }"
      >
        <div class="grid gap-6">
          <!-- フロントエンド -->
          <div class="group">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Monitor :size="20" class="text-white" />
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">
                フロントエンド
              </h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in frontendTechs"
                :key="tech"
                class="px-3 py-1.5 text-sm rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300
                border border-cyan-200 dark:border-cyan-800 hover:scale-105 transition-transform cursor-default"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- バックエンド -->
          <div class="group">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <Server :size="20" class="text-white" />
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">
                バックエンド
              </h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in backendTechs"
                :key="tech"
                class="px-3 py-1.5 text-sm rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300
                border border-green-200 dark:border-green-800 hover:scale-105 transition-transform cursor-default"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- データベース・インフラ -->
          <div class="group">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                <Cloud :size="20" class="text-white" />
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">
                データベース・インフラ
              </h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in infraTechs"
                :key="tech"
                class="px-3 py-1.5 text-sm rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300
                border border-purple-200 dark:border-purple-800 hover:scale-105 transition-transform cursor-default"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Monitor, Server, Cloud } from 'lucide-vue-next'
import { useIntersectionObserver } from '~/composables/useIntersectionObserver'

const frontendTechs = [
  'TypeScript',
  'JavaScript',
  'HTML/CSS',
  'Nuxt.js',
  'Vue.js',
  'pnpm',
  'codegen',
  'Tailwind CSS',
  'Figma',
  '単一責任の原則',
  'アトミックデザイン',
  'DRY原則',
]

const backendTechs = [
  'C#',
  'ASP.NET Core',
  'GraphQL',
  'REST',
  'Swagger',
  'Nitro',
  'クリーンアーキテクチャ',
  'Repository pattern',
  'JetBrains Rider',
  'Node.js',
]

const infraTechs = [
  'PostgreSQL',
  'SQL Server',
  'A5:SQL Mk-2',
  'DBeaver',
  'Azure DevOps',
  'Azure Front Door',
  'Azure SQL Database',
  'Azure VMs',
  'Azure Container Registry',
  'Azure Kubernetes',
  'Azure Functions',
  'AWS Lambda',
  'CloudWatch',
  'S3',
  'CloudFront',
  'API Gateway',
  'RDS',
  'DynamoDB',
  'ECS',
  'EC2',
  'GitOps',
  'GitHub',
  'Render',
  'Grafana',
  'Google Analytics',
]

const titleSection = ref<HTMLElement | null>(null)
const contentSection = ref<HTMLElement | null>(null)

const isTitleVisible = ref(false)
const isContentVisible = ref(false)

useIntersectionObserver(
  [
    { element: titleSection, isVisible: isTitleVisible },
    { element: contentSection, isVisible: isContentVisible },
  ],
  {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px',
    once: true,
  },
)
</script>
