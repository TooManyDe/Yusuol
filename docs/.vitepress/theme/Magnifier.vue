<!-- Magnifier.vue -->
<template>
  <div
    class="fixed top-0 left-0 z-90 select-none"
    :style="{ width: width + 'px', height: height + 'px' }"
    @mousedown="scaleDown"
    @mouseup="scaleUp"
  >
    <!-- SVG FILTER -->
    <svg color-interpolation-filters="sRGB" style="display:none">
      <defs>
        <filter id="magnifying-glass-filter">
          <feImage
            :href="displacement1"
            x="0" y="0"
            :width="width"
            :height="height"
            result="magnifying_displacement_map"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="magnifying_displacement_map"
            scale="24"
            xChannelSelector="R"
            yChannelSelector="G"
            result="magnified_source"
          />
          <feGaussianBlur in="magnified_source" stdDeviation="0" result="blurred_source" />
          <feImage :href="displacement2" x="0" y="0" :width="width" :height="height" result="displacement_map" />
          <feDisplacementMap
            in="blurred_source"
            in2="displacement_map"
            scale="80"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />

          <feColorMatrix in="displaced" type="saturate" values="9" result="displaced_saturated" />
          <feImage :href="borderImg" x="0" y="0" :width="width" :height="height" result="specular_layer" />
          <feComposite in="displaced_saturated" in2="specular_layer" operator="in" result="specular_saturated"/>
          <feComponentTransfer in="specular_layer" result="specular_faded">
            <feFuncA type="linear" slope="0.5" />
          </feComponentTransfer>

          <feBlend in="specular_saturated" in2="displaced" mode="normal" result="withSaturation"/>
          <feBlend in="specular_faded" in2="withSaturation" mode="normal"/>
        </filter>
      </defs>
    </svg>

    <!-- MAGNIFIER -->
    <div
      class="absolute inset-0 rounded-full"
      @click="isTouched = true"
      :style="{
        transform: 'scale(' + scale + ')',
        transition: 'transform 0.1s ease-out',
        backdropFilter: 'url(#magnifying-glass-filter)',
        boxShadow:
          'rgba(0, 0, 0, 0.05) 0px 4px 9px,' +
          'rgba(0, 0, 0, 0.05) 0px 2px 24px inset,' +
          'rgba(255, 255, 255, 0.2) 0px -2px 24px inset'
      }"
    ></div>

  </div>
</template>

<script setup>
import { ref } from "vue"

// props 可自动传参
const width = 210
const height = 150

// 图像资源：放在 public 目录
const displacement1 = "/images/displacement1.png"
const displacement2 = "/images/displacement2.png"
const borderImg      = "/images/border.png"

const scale = ref(1)
const isTouched = ref(false)

const scaleDown = () => { scale.value = 1.1 }
const scaleUp   = () => { scale.value = 1 }
</script>