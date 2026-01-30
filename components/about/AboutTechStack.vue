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
        class="col-span-12 lg:col-span-9 text-base sm:text-lg lg:text-xl
        tracking-[1px] lg:tracking-[2px] opacity-0 transition-all
        duration-1000 ease-out transform"
        :class="{ 'opacity-100 translate-x-0': isContentVisible }"
      >
        <div class="grid grid-cols-12 gap-4 mb-6 lg:mb-8">
          <span class="col-span-12 lg:col-span-3 font-bold text-lg sm:text-xl lg:text-2xl mb-2 lg:mb-0">
            フロントエンド...
          </span>
          <p class="col-span-12 lg:col-span-9">
            TypeScript, JavaScript, HTML/CSS, Nuxt.js, Vue.js, pnpm, codegen, Tailwind.css, Figma, 単一責任の原則、
            アトミックデザイン（縛られ過ぎない程度に）, DRY原則
          </p>
        </div>
        <div class="grid grid-cols-12 gap-4 mb-6 lg:mb-8">
          <span class="col-span-12 lg:col-span-3 font-bold text-lg sm:text-xl lg:text-2xl mb-2 lg:mb-0">
            バックエンド...
          </span>
          <p class="col-span-12 lg:col-span-9">
            C#, ASP.NET  Core, GraphQL, REST, Swagger, Nitro, クリーンアーキテクチャ, Repository pattern, Jet Brains Rider, Node
          </p>
        </div>
        <div class="grid grid-cols-12 gap-4 mb-6 lg:mb-8">
          <span class="col-span-12 lg:col-span-3 font-bold text-lg sm:text-xl lg:text-2xl mb-2 lg:mb-0">
            データベース・<br class="hidden lg:block">インフラ...
          </span>
          <p class="col-span-12 lg:col-span-9">
            GraphQL, PostgreSQL, SQL Server, A5:SQL Mk-2, DBeaver, Azure（DevOps Services, Front Door, SQL Database,
            Virtual Machines, Container Registry, Kubernetes Services, Functions）, AWS（Lambda, Cloud Watch,
            S3, Cloudfront, API Gateway, RDS, DynamoDB, ECS, EC2）, GitOps, GitHub, Grafana, Google Analytics,
            GPT-Image-1
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '~/composables/useIntersectionObserver'

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
