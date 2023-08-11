<script setup>
import { reactive, ref } from 'vue'
import {
  ChooseEquips,
  ChooseLightCone,
} from '../components'
import { EQUIPMENT } from '../constants/equipment'
import { LIGHT_CONE } from '../constants/lightCone'

const characterData = reactive({
  name: '卡芙卡',
  bg: 'https://act-upload.mihoyo.com/sr-wiki/2023/07/17/75216984/ba3943a67def8904bb662a2cc7b24268_1280922544003074121.png',
  effects: {
    baseAttack: 679,
    attackPercentUp: 0.28,
  },
  skills: {
    skill: { rate: 1.6, dot: 0 },
    attack: { rate: 1, dot: 0.75 },
    ultimateSkill: { rate: 0.8, dot: 1 },
    additionalSkill: { rate: 1.4, dot: 0 },
    dot: { rate: 2.9, dot: 0 },
  }
})
// 遗器
const equip = reactive({
  head: { icon: '', effects: {} },
  hand: { icon: '', effects: {} },
  body: { icon: '', effects: {} },
  foot: { icon: '', effects: {} },
  ball: { icon: '', effects: {} },
  rope: { icon: '', effects: {} },
})
const lightCone = reactive({
  icon: '',
  effects: {}
})

// 装备相关
const chooseEquipsVisible = ref(false)
const isInner = ref(false)

const clickChooseEquip = (item) => {
  const equipObj = {}
  const effectObj = {}
  Object.entries(item.effects).forEach(e => effectObj[e[0]] = e[1] / Object.keys(item.equips).length)
  Object.entries(item.equips).forEach(e => {
    equipObj[e[0]] = {
      icon: e[1],
      effects: effectObj,
    }
  })
  Object.assign(equip, equipObj)
  chooseEquipsVisible.value = false
}

// 光锥相关
const chooseLightConeVisible = ref(false)
const clickChooseLightCone = (item) => {
  Object.assign(lightCone, item)
  chooseLightConeVisible.value = false
}

// 最终伤害
const damageConstitute = reactive({
  attack: 0,
  skill: 3,
  ultimateSkill: 1,
  additionalSkill: 3,
  dot: 2,
})
const calcData = reactive({
  damage: 0,
  attack: 0,
  damageUp: 0,
  defenseReduction: 0,
  criticalChance: 0,
  criticalDamage: 0,
})
const clickCalcDamage = () => {
  const {
    baseAttack: charBaseAttack = 0,
    attackPercentUp: charAttackPercentUp = 0,
    damageUp: charDamageUp = 0,
    defenseReduction: charDefenseReduction = 0,
    attackDamageUp: charAttackDamageUp = 0,
    SkillDamageUp: charSkillDamageUp = 0,
    UltimateSkillDamageUp: charUltimateSkillDamageUp = 0,
    additionalSkillDamageUp: charAdditionalSkillDamageUp = 0,
    dotDamageUp: charDotDamageUp = 0,
  } = characterData.effects
  const { skill, attack, ultimateSkill, additionalSkill, dot } = characterData.skills
  const {
    baseAttack: lcBaseAttack = 0,
    speedPercentUp: lcSpeedPercentUp = 0,
    damageUp: lcDamageUp = 0,
    dotRateUp: lcDotRateUp = 0,
    attackPercentUp: lcAttackPercentUp = 0,
    defenseReduction: lcDefenseReduction = 0,
    attackDamageUp: lcAttackDamageUp = 0,
    SkillDamageUp: lcSkillDamageUp = 0,
    UltimateSkillDamageUp: lcUltimateSkillDamageUp = 0,
    additionalSkillDamageUp: lcAdditionalSkillDamageUp = 0,
    attackDamageUp: lcDotDamageUp = 0,
  } = lightCone.effects
  const totalBaseAttack = charBaseAttack +  lcBaseAttack
  const totalAttackRate = charAttackPercentUp + lcAttackPercentUp + Object.values(equip).map(e => e.effects.attackPercentUp || 0).reduce((r, v) => r += v)
  const totalAttack = totalBaseAttack * (1 + totalAttackRate)
  const totalDotRate = lcDotRateUp + dot.rate
  // 增伤、减防
  const totalDamageUp = charDamageUp + lcDamageUp + Object.values(equip).map(e => e.effects.damageUp || 0).reduce((r, v) => r += v)
  const totalDefenseReduction = charDefenseReduction + lcDefenseReduction + Object.values(equip).map(e => e.effects.defenseReduction || 0).reduce((r, v) => r += v)
  // 暴击
  const totalCritical = 5 + Object.values(equip).map(e => e.effects.criticalChanceUp || 0).reduce((r, v) => r += v)
  const totalCriticalDamage = 50 + Object.values(equip).map(e => e.effects.criticalDamageUp || 0).reduce((r, v) => r += v)
  // 暴击期望伤害
  const expectCriticalDamage = Math.min(totalCritical, 100) * (1 + totalCriticalDamage / 100) + Math.max(1 - totalCritical, 0) * 1
  // 技能增伤
  const totalAttackDamageUp = charAttackDamageUp + lcAttackDamageUp + Object.values(equip).map(e => e.effects.attackDamageUp || 0).reduce((r, v) => r += v)
  const totalSkillDamageUp = charSkillDamageUp + lcSkillDamageUp + Object.values(equip).map(e => e.effects.skillDamageUp || 0).reduce((r, v) => r += v)
  const totalUltimateSkillDamageUp = charUltimateSkillDamageUp + lcUltimateSkillDamageUp + Object.values(equip).map(e => e.effects.ultimateSkillDamageUp || 0).reduce((r, v) => r += v)
  const totalAdditionalSkillDamageUp = charAdditionalSkillDamageUp + lcAdditionalSkillDamageUp + Object.values(equip).map(e => e.effects.additionalSkillDamageUp || 0).reduce((r, v) => r += v)
  const totalDotDamageUp = charDotDamageUp + lcDotDamageUp + Object.values(equip).map(e => e.effects.dotDamageUp || 0).reduce((r, v) => r += v)
  // 总直伤倍率
  const totalDirectDamage = attack.rate * damageConstitute.attack * (1 + totalAttackDamageUp)
    + skill.rate * damageConstitute.skill * (1 + totalSkillDamageUp)
    + ultimateSkill.rate * damageConstitute.ultimateSkill * (1 + totalUltimateSkillDamageUp)
    + additionalSkill.rate * damageConstitute.additionalSkill * (1 + totalAdditionalSkillDamageUp)
  // 总dot倍率
  const totalDotDamage = (attack.dot * damageConstitute.attack
   + skill.dot * damageConstitute.skill
   + ultimateSkill.dot * damageConstitute.ultimateSkill
   + additionalSkill.dot * damageConstitute.additionalSkill) * totalDotRate + totalDotRate * damageConstitute.dot
  // 总数据
  calcData.damage = (totalDirectDamage * expectCriticalDamage + totalDotDamage * (1 + totalDotDamageUp)) * totalAttack * (1 + totalDamageUp) * (1 - totalDefenseReduction)
  calcData.attack = totalAttack
  calcData.criticalChance = totalCritical
  calcData.criticalDamage = totalCriticalDamage
  calcData.damageUp = totalDamageUp
  calcData.defenseReduction = totalDefenseReduction
}
</script>

<template>
  <div class="home-root" :style="`background-image: url(${characterData.bg})`">
    <div class="title">{{ characterData.name }}数据计算</div>
    <div class="equips-title">遗器</div>
    <!-- 选遗器 -->
    <div class="choose-equips-container">
      <div class="choose-equips-outer" @click="chooseEquipsVisible = true;isInner = false">选择外圈遗器</div>
      <div class="choose-equips-inner" @click="chooseEquipsVisible = true;isInner = true">选择内圈遗器</div>
      <choose-equips
        :visible="chooseEquipsVisible"
        :equips="EQUIPMENT.filter(e => e.isInner === isInner)"
        @close="chooseEquipsVisible = false"
        @click-choose-equip="clickChooseEquip"
      ></choose-equips>
    </div>
    <!-- 遗器 -->
    <div class="equips">
      <div class="equip" v-for="item in Object.keys(equip)">
        <img v-if="equip[item].icon" :src="equip[item].icon">
      </div>
    </div>
    <div class="bottom-area">
      <!-- 光锥 -->
      <div class="light-cone" @click="chooseLightConeVisible = true">
        <img v-if="lightCone.icon" :src="lightCone.icon">
      </div>
      <choose-light-cone
        :visible="chooseLightConeVisible"
        :light-cone="LIGHT_CONE"
        @close="chooseLightConeVisible = false"
        @click-choose-light-cone="clickChooseLightCone"
      >
      </choose-light-cone>

      <!-- 计算伤害 -->
      <div class="final-damage">
        <div>普通攻击 × <input type="number" v-model="damageConstitute.attack"></div>
        <div>战技 × <input type="number" v-model="damageConstitute.skill"></div>
        <div>终结技 × <input type="number" v-model="damageConstitute.ultimateSkill"></div>
        <div>追加攻击 × <input type="number" v-model="damageConstitute.additionalSkill"></div>
        <div>持续伤害 × <input type="number" v-model="damageConstitute.dot"></div>
        <div class="calc-damage" @click="clickCalcDamage">计算伤害</div>
      </div>
      <div v-if="calcData.damage" class="final-damage-value">
        <div>总攻击力: {{ Math.round(calcData.attack) }}</div>
        <div>总增伤: {{ Math.round(calcData.damageUp * 100) }}</div>
        <div>总减防: {{ Math.round(calcData.defenseReduction * 100) }}</div>
        <div>总暴击率: {{ Math.round(calcData.criticalChance) }}</div>
        <div>总暴击伤害: {{ Math.round(calcData.criticalDamage) }}</div>
        <div>总伤害: {{ Math.round(calcData.damage) }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home-root {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  min-height: 700px;
  max-height: 100vh;
  padding-top: 50px;
  background-repeat: no-repeat;
  background-size: cover;

  .title {
    font-size: 32px;
    color: white;
    text-shadow: 1px 1px 2px black;
  }

  .equips-title {
    margin-top: 50px;
    font-size: 28px;
    color: white;
    text-shadow: 1px 1px 2px black;
  }

  .choose-equips-container {
    display: flex;
    margin-top: 10px;

    .choose-equips-inner,
    .choose-equips-outer {
      padding: 2px 8px;
      font-size: 24px;
      color: white;
      text-shadow: 1px 1px 2px black;
      cursor: pointer;
      user-select: none;
      border: 2px solid #fff;
      border-radius: 8px;
      box-shadow: 1px 1px 2px black;
    }

    .choose-equips-inner {
      margin-left: 15px;
    }
  }

  .equips {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0 100px;
    margin-top: 20px;
    cursor: pointer;

    .equip {
      flex-shrink: 0;
      width: 128px;
      height: 128px;
      border: 2px solid #fff;
      border-radius: 8px;
      box-shadow: 1px 1px 2px black;

      img {
        width: 100%;
        height: 100%;
        padding: 20px;
        background: rgb(41, 45, 52);
      }
    }

    .equip:not(:first-child) {
      margin-left: 20px;
    }
  }

  .bottom-area {
    display: flex;
    justify-content: space-between;
    width: 60%;
    margin-top: 50px;

    .light-cone {
      flex-shrink: 0;
      width: 212.24px;
      height: 300px;
      overflow: hidden;
      cursor: pointer;
      border: 2px solid #fff;
      border-radius: 8px;
      box-shadow: 1px 1px 2px black;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .final-damage {
      font-size: 24px;
      line-height: 30px;
      color: white;
      text-shadow: 1px 1px 2px black;

      input {
        width: 50px;
        height: 30px;
        font-size: 24px;
      }

      & > div:not(:first-child) {
        margin-top: 10px;
      }

      .calc-damage {
        width: 150px;
        height: 50px;
        margin-top: 25px !important;
        font-size: 24px;
        line-height: 50px;
        color: white;
        text-align: center;
        text-shadow: 1px 1px 2px black;
        cursor: pointer;
        background: rgb(41, 45, 52);
        border-radius: 8px;
      }
    }

    .final-damage-value {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      font-size: 32px;
      color: white;
      text-shadow: 1px 1px 2px black;
    }
  }
}
</style>
