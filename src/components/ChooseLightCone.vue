<script setup>
import { EQUIPMENT_PROPERTIES } from '../constants/equipment'

const props = defineProps(['lightCone', 'visible'])
const emits = defineEmits(['close', 'click-choose-light-cone'])

const clickClose = () => {
  emits('close')
}

const clickChooseLightCone = (item) => {
  emits('click-choose-light-cone', item)
}
</script>

<template>
  <div v-if="visible" class="choose-light-cone-root" @click="clickClose">
    <div v-for="(item, index) in lightCone" :key="index" class="light-cone" @click.stop="clickChooseLightCone(item)">
      <img class="icon" :src="item.icon">
      <div class="name">{{ item.name }}</div>
      <div v-for="(e, i) in Object.keys(item.effects)" class="property" :key="i">
        {{ EQUIPMENT_PROPERTIES[e].name }}
        {{ EQUIPMENT_PROPERTIES[e].isPercent ? `${(item.effects[e] * 100).toFixed(1)}%` : item.effects[e] }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.choose-light-cone-root {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
  padding: 10%;
  overflow-x: auto;
  overflow-y: hidden;
  background: rgba(0, 0, 0, 0.3);

  .light-cone {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    justify-content: flex-end;
    width: 212.24px;
    height: 300px;
    padding-bottom: 20px;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid #fff;
    border-radius: 8px;
    box-shadow: 1px 1px 2px black;

    .icon {
      position: absolute;
      inset: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
    }

    .name {
      padding-inline: 20px;
      margin-top: 10px;
      font-size: 24px;
      color: white;
      text-shadow: 1px 1px 2px black;
    }

    .property {
      padding-inline: 20px;
      margin-top: 5px;
      font-size: 18px;
      line-height: 14px;
      color: white;
      text-shadow: 1px 1px 2px black;
    }
  }
}
</style>
