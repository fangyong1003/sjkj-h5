export const SELL_TYPE = {
  CASH: 0, // "现金或余额或点石金"
  DIAMOND: 1, // "现金+点石金"
  TREASURE: 2, // "现金+九洲宝"
  REMAINDER: 3, // "现金+余额"
  DIAMOND_TREASURE: 4, // "现金+点石金+九洲宝"
  DIAMOND_TREASURE_REMAINDER: 5, // "现金+点石金+九洲宝+余额"
  DIAMOND_REMAINDER: 6, // "点石金+余额"
  CASH_ONLY: 7 // "仅限现金"
};

export const SELL_TYPE_RULE_MAP = {
  [SELL_TYPE.CASH]: ['cash'],
  [SELL_TYPE.DIAMOND]: ['cash', 'diamond'],
  [SELL_TYPE.TREASURE]: ['cash', 'treasure'],
  [SELL_TYPE.REMAINDER]: ['cash', 'remainder'],
  [SELL_TYPE.DIAMOND_TREASURE]: ['cash', 'diamond', 'treasure'],
  [SELL_TYPE.DIAMOND_TREASURE_REMAINDER]: ['cash', 'diamond', 'treasure', 'remainder'],
  [SELL_TYPE.DIAMOND_REMAINDER]: ['diamond', 'remainder'],
  [SELL_TYPE.CASH_ONLY]: ['cashonly']
};

export const SELL_RULE_TEXT = {
  [SELL_TYPE.CASH_ONLY]: {
    mainKey: 'cashYuan',
    text:'现金'
  },
  [SELL_TYPE.DIAMOND]: {
    mainKey: 'cashYuan',
    key: 'diamondYuan',
    text: '食间豆'
  },
  [SELL_TYPE.DIAMOND_REMAINDER]: {
    mainKey: 'remainderYuan',
    key: 'diamondYuan',
    text: '食间豆'
  }
};

export const SELL_RULE_VALUE_MAP = {
  [SELL_TYPE.CASH]: {
    main: [
      { key: 'cash', prefix: '¥', suffix: '' },
      { key: 'diamond', prefix: '食间豆价:', suffix: ''}
    ],
    sub: []
  },
  [SELL_TYPE.DIAMOND]: {
    main: [{ key: 'cash', prefix: '¥', suffix: '' }],
    sub: [
      { key: 'diamond', prefix: '', suffix: '食间豆' }
    ]
  },
  [SELL_TYPE.DIAMOND_REMAINDER]: {
    main: [{ key: 'remainder', prefix: '余额', suffix: '' }],
    sub: [
      { key: 'diamond', prefix: '', suffix: '食间豆' }
    ]
  },
  [SELL_TYPE.CASH_ONLY]: {
    main: [
      { key: 'cash', prefix: '¥', suffix: '' }
    ],
    sub: []
  },
};

export const PAYMENT_TYPE = {
  CASH: 'cash',
  CREDIT: 'credit',
  PROPERTY: 'property',
  CASH_CREDIT: 'cash_credit',
  BALANCE_CREDIT: 'balance_credit',
  BALANCE: 'balance',
  CASH_ONLY:'cashonly'
};
