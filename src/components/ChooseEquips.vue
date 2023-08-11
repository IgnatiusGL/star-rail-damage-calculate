<script setup>
import { EQUIPMENT_PROPERTIES } from '../constants/equipment'

const props = defineProps(['equips', 'visible'])
const emits = defineEmits(['close', 'click-choose-equip'])

const clickClose = () => {
  emits('close')
}

const clickChooseEquip = (item) => {
  emits('click-choose-equip', item)
}
</script>

<template>
  <div v-if="visible" class="choose-equips-root" @click="clickClose">
    <div v-for="(item, index) in equips" :key="index" class="equip" @click.stop="clickChooseEquip(item)">
      <div class="icons">
        <img class="icon" :src="item.icon">
        <img
          class="mini-icon"
          v-for="(e, i) in Object.keys(item.equips)"
          :src="item.equips[e]"
          :key="i"
        >
      </div>
      <div class="name">{{ item.name }}</div>
      <div v-for="(e, i) in Object.keys(item.effects)" class="property" :key="i">
        {{ EQUIPMENT_PROPERTIES[e].name }}
        {{ EQUIPMENT_PROPERTIES[e].isPercent ? `${(item.effects[e] * 100).toFixed(1)}%` : item.effects[e] }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.choose-equips-root {
  position: fixed;
  inset: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  padding: 10%;
  background: rgba(0, 0, 0, 0.3);

  .equip {
    width: 350px;
    height: 230px;
    cursor: pointer;
    background: rgb(41, 45, 52);
    border-radius: 8px;

    .icons {
      width: fit-content;
      margin-inline: auto;

      .icon {
        width: 100px;
        height: 100px;
      }

      .mini-icon {
        width: 50px;
        height: 50px;
      }
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
