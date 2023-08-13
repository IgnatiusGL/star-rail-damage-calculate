<script setup>
import { ref, watch, reactive } from 'vue'
import { DAMAGE_PROPERTIES, EQUIPMENT_PROPERTIES } from '../constants/equipment'

const props = defineProps(['type', 'properties', 'visible'])
const emits = defineEmits(['close', 'click-confirm'])

const clickClose = () => {
  emits('close')
}

const primaryProperties = ref('')
const primaryValue = ref(0)
watch(primaryProperties, newVal => primaryValue.value = EQUIPMENT_PROPERTIES[props.type][newVal])
watch(() => props.visible, newVal => {
  if (newVal) {
    const key = Object.keys(EQUIPMENT_PROPERTIES[props.type])[0]
    primaryProperties.value = key
    primaryValue.value = EQUIPMENT_PROPERTIES[props.type][key]
  } else {
    const effects = {}
    effects.attackPercentUp = oneProperties.value
    effects.speedUp = twoProperties.value
    effects.criticalChanceUp = oneProperties.value
    effects.criticalDamageUp = oneProperties.value
    if (primaryProperties.value) {
      effects[primaryProperties.value] = (effects[primaryProperties.value] || 0) + primaryValue.value
    }
    emits('click-confirm', props.type, effects)
  }
})

const oneProperties = ref(0)
const twoProperties = ref(0)
const threeProperties = ref(0)
const fourProperties = ref(0)
</script>

<template>
  <div v-if="visible" class="edit-equip-properties-root" tabindex="-1" v-focus>
    <div class="title">遗器属性</div>
    <div class="properties">
      主属性: 
      <select v-model="primaryProperties" v-if="Object.keys(EQUIPMENT_PROPERTIES[type]).length > 1">
          <option v-for="(item, index) in Object.keys(EQUIPMENT_PROPERTIES[type])" :value="item" :key="index">
            {{ DAMAGE_PROPERTIES[item].name }}
          </option>
      </select>
      <div v-else>{{ DAMAGE_PROPERTIES[primaryProperties]?.name }}</div>
      <input type="number" v-model="primaryValue" @click.stop>
      <div>
        攻击力:
        <input type="number" v-model="oneProperties" @click.stop>
      </div>
      <div>
        速度:
        <input type="number" v-model="twoProperties" @click.stop>
      </div>
      <div>
        暴击率:
        <input type="number" v-model="threeProperties" @click.stop>
      </div>
      <div>
        暴击伤害:
        <input type="number" v-model="fourProperties" @click.stop>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.edit-equip-properties-root {
  position: absolute;
  top: 128px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 128px;
  height: 300px;
  padding: 10%;
  background: #292d34;
  z-index: 10;

  .title {
    align-self: center;
    font-size: 20px;
    color: white;
    text-shadow: 1px 1px 2px black;
  }

  .properties {
    font-size: 16px;
    color: white;
    text-shadow: 1px 1px 2px black;
    margin-top: 10px;

    input {
      width: 100%;
    }
  }
}
</style>
