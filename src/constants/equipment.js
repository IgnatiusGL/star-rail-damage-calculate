export const DAMAGE_PROPERTIES = {
  baseAttack: { name: '攻击力', isPercent: false },
  attackPercentUp: { name: '攻击力提升', isPercent: true },
  damageUp: { name: '伤害增加', isPercent: true },
  defenseReduction: { name: '减防降低', isPercent: true },
  lightUp: { name: '雷电伤害提高', isPercent: true },
  attackUp: { name: '攻击力提高', isPercent: false },
  speedUp: { name: '速度提高', isPercent: false },
  speedPercentUp: { name: '速度百分比提高', isPercent: true },
  criticalChanceUp: { name: '暴击率提高', isPercent: false },
  criticalDamageUp: { name: '暴击伤害提高', isPercent: false },
  skillDamageUp: { name: '战技伤害提高', isPercent: true },
  attackDamageUp: { name: '普攻伤害提高', isPercent: true },
  ultimateSkillDamageUp: { name: '终结技伤害提高', isPercent: true },
  additionalSkillDamageUp: { name: '追加技伤害提高', isPercent: true },
  dotDamageUp: { name: '持续伤害提高', isPercent: true },
  dotRateUp: { name: '持续倍率提高', isPercent: true },
  damageRateUp: { name: '伤害倍率提高', isPercent: true },
}

export const EQUIPMENT = [
  {
    name: '激奏雷电的乐队',
    icon: 'https://uploadstatic.mihoyo.com/sr-wiki/2023/04/13/103492603/7753ab38edf15864767a4078f271f827_2172833270795127809.png?x-oss-process=image/quality,q_75/resize,s_120',
    isInner: false,
    equips: {
      head: 'https://uploadstatic.mihoyo.com/sr-wiki/2023/04/13/103492603/7753ab38edf15864767a4078f271f827_2172833270795127809.png?x-oss-process=image/quality,q_75/resize,s_60',
      hand: 'https://uploadstatic.mihoyo.com/sr-wiki/2023/04/13/103492603/f0d46d98f801fd528f421df3e3e1ef88_3518050520306381241.png?x-oss-process=image/quality,q_75/resize,s_60',
      body: 'https://uploadstatic.mihoyo.com/sr-wiki/2023/04/13/103492603/f044ebeb3f2aca400548026486963c4a_3154470988917807944.png?x-oss-process=image/quality,q_75/resize,s_60',
      foot: 'https://uploadstatic.mihoyo.com/sr-wiki/2023/04/13/103492603/f6ab9e571a0691277231fe3fa766901e_8018817870522957204.png?x-oss-process=image/quality,q_75/resize,s_60',
    },
    effects: {
      lightUp: 0.1,
      attackPercentUp: 0.2,
    }
  },
  {
    name: '太空封印站',
    icon: 'https://uploadstatic.mihoyo.com/sr-wiki/2023/04/13/288909604/65aecc65ed07d2fe403c52129a0b20d4_5177313017583275444.png?x-oss-process=image/quality,q_75/resize,s_120',
    isInner: true,
    equips: {
      ball: 'https://uploadstatic.mihoyo.com/sr-wiki/2023/04/13/288909604/65aecc65ed07d2fe403c52129a0b20d4_5177313017583275444.png?x-oss-process=image/quality,q_75/resize,s_60',
      rope: 'https://uploadstatic.mihoyo.com/sr-wiki/2023/04/13/288909604/10967d63374d45ec3d0f9be7aa7b98ad_2037981486264895784.png?x-oss-process=image/quality,q_75/resize,s_60',
    },
    effects: {
      attackPercentUp: 0.24,
    }
  },
  {
    name: '繁星竞技场',
    icon: 'https://act-upload.mihoyo.com/sr-wiki/2023/07/17/75216984/9511329e9c0fc39c8b2c3902330aad17_3372397597478780513.png?x-oss-process=image/quality,q_75/resize,s_120',
    isInner: true,
    equips: {
      ball: 'https://act-upload.mihoyo.com/sr-wiki/2023/07/17/75216984/9511329e9c0fc39c8b2c3902330aad17_3372397597478780513.png?x-oss-process=image/quality,q_75/resize,s_60',
      rope: 'https://act-upload.mihoyo.com/sr-wiki/2023/07/17/75216984/128c0a3f87d10053d865b3122acd7899_7163996813283761343.png?x-oss-process=image/quality,q_75/resize,s_60',
    },
    effects: {
      criticalChanceUp: 8,
      attackDamageUp: 0.2,
      skillDamageUp: 0.2,
    }
  },
  {
    name: '停转的萨尔索图',
    icon: 'https://uploadstatic.mihoyo.com/sr-wiki/2023/04/14/103492603/f1b3f0e9d2599f397ab84e016c294c11_4144558131228487229.png?x-oss-process=image/quality,q_75/resize,s_120',
    isInner: true,
    equips: {
      ball: 'https://uploadstatic.mihoyo.com/sr-wiki/2023/04/14/103492603/f1b3f0e9d2599f397ab84e016c294c11_4144558131228487229.png?x-oss-process=image/quality,q_75/resize,s_60',
      rope: 'https://uploadstatic.mihoyo.com/sr-wiki/2023/04/14/103492603/3906677d7dd455dbf6435dce768ea045_7929760093015860257.png?x-oss-process=image/quality,q_75/resize,s_60',
    },
    effects: {
      criticalChanceUp: 8,
      ultimateSkillDamageUp: 0.15,
      additionalSkillDamageUp: 0.15,
    }
  },
]

export const EQUIPMENT_PROPERTIES = {
  head: {},
  hand: {
    attackUp: 352,
  },
  body: {
    criticalChanceUp: 32.4,
    criticalDamageUp: 64.8,
    attackPercentUp: 43.2,
  },
  foot: {
    speedUp: 25,
    attackPercentUp: 43.2,
  },
  ball: {
    attackPercentUp: 43.2,
    lightUp: 38.8
  },
  rope: {
    attackPercentUp: 43.2,
  },
}
