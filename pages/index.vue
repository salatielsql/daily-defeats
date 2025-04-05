<script setup lang="ts"></script>

<template>
  <div>
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center space-y-8 pt-20">
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-md">
              Derrota diária
            </h1>
            <Sparkles class-name="absolute -top-8 -right-8 w-12 h-12 text-yellow-300" />
          </div>

          <p className="text-xl md:text-2xl text-white max-w-2xl">
            Acredite vc ainda pode perder hoje! 💪
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <NuxtLink to="/derrota/criar">
              <UiButton size="lg"> Compartilhar derrota </UiButton>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
