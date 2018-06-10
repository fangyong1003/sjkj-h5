import each from 'lodash/each';
import Args from './utils/args';
import cookie from './utils/cookie';
import { SELL_RULE_TEXT, SELL_RULE_VALUE_MAP, PAYMENT_TYPE } from './constants';

export const goToPage = (page, query = {}) => {
  const url = Args.add(`/pages/${page}.html`, query);
  window.location.href = url;
};

export const cent2yuan = (value) => {
  return (value / 100).toFixed(2);
};

export const checkLogin = () => {
  if (!cookie('token')) {
    goToPage('login', {
      redirectUrl: window.location.href
    });
    return false;
  }

  return true;
};

export const getSellRule = (rule) => {
  const result = SELL_RULE_TEXT[rule.type];
  return result;
};

export const getSellRuleText = (rule) => {
  if (!rule) return '';
  const result = getSellRule(rule);
  if (!result) return '';

  return `+ ${rule[result.key]}${result.text}`;
};

export const getSellRuleMain = (rule) => {
  if (!rule) return '';
  const result = getSellRule(rule);
  if (!result || !result.mainKey) return '';

  return rule[result.mainKey];
};

export const getSkuMainValue = (sku) => {
  let value = sku.sellPriceYuan;
  const ruleMain = getSellRuleMain(sku.sellPriceRule);

  if (ruleMain) {
    value = ruleMain;
  }

  return value;
};

export const getSellRuleMainValues = (rule) => {
  let values = [];
  const result = SELL_RULE_VALUE_MAP[rule.type];
  if (result) {
    values = result.main.map(item => {
      return {
        ...item,
        value: rule[item.key]
      };
    });
  }

  return values;
}

export const getSellRuleSubValues = (rule) => {
  let values = [];
  const result = SELL_RULE_VALUE_MAP[rule.type];
  if (result) {
    values = result.sub.map(item => {
      return {
        ...item,
        value: rule[item.key]
      };
    });
  }
  return values;
};

export const getPaidString = (order) => {
  let price = '';
  switch (order.paymentType) {
    case PAYMENT_TYPE.CASH:
      price = `¥${order.paidCashString}`;
      break;
    case PAYMENT_TYPE.CREDIT:
      price = `点石金${order.paidCreditsString}`;
      break;
    case PAYMENT_TYPE.BALANCE:
      price = `余额${order.paidBalanceString}`;
      break;
    case PAYMENT_TYPE.CASH_CREDIT:
      price = `¥${order.paidCashString} +点石金${order.paidCreditsString}`;
      break;
    case PAYMENT_TYPE.BALANCE_CREDIT:
      price = `余额${order.paidBalanceString} +点石金${order.paidCreditsString}`;
      break;
  }
  return price;
};

export const getOrderPaidString = (order) => {
  let price = '';
  switch (order.paymentType) {
    case PAYMENT_TYPE.CASH:
      price = `¥${order.orderPaidCashString || order.paidCashString}`;
      break;
    case PAYMENT_TYPE.CREDIT:
      price = `点石金${order.orderPaidCreditsString || order.paidCreditsString}`;
      break;
    case PAYMENT_TYPE.BALANCE:
      price = `余额${order.orderPaidBalanceString || order.paidBalanceString}`;
      break;
    case PAYMENT_TYPE.CASH_CREDIT:
      price = `¥${order.orderPaidCashString || order.paidCashString} +点石金${order.orderPaidCreditsString || order.paidCreditsString}`;
      break;
    case PAYMENT_TYPE.BALANCE_CREDIT:
      price = `余额${order.orderPaidBalanceString || order.paidBalanceString} +点石金${order.orderPaidCreditsString || order.paidCreditsString}`;
      break;
  }
  return price;
};

export const getOrderTotal = (orderData) => {
  const result = {
    num: 0,
    // 总共点石金
    totalDiamond: 0,
    totalPrice: 0,
    mainValues: [],
    subValues: [],
    ruleType: 0,
    allChoose: false
  };

  each(orderData, shop => {
    each(shop, goods => {
      const quantity = goods.quantity || goods.goodsNumber;
      const sellPriceRule = goods.sku.sellPriceRule;

      result.num += 1;
      result.totalDiamond += goods.sku.diamondYuan * quantity;
      // result.totalPrice += getSkuMainValue(goods.sku) * quantity;
      result.ruleType = sellPriceRule.type;

      const mainValues = getSellRuleMainValues(sellPriceRule);
      if (mainValues.length) {
        mainValues.forEach((ruleValue, index) => {
          const currentValue = result.mainValues[index];
          if (currentValue) {
            currentValue.value += ruleValue.value * quantity;
          } else {
            result.mainValues[index] = {
              ...ruleValue,
              value: ruleValue.value * quantity,
            };
          }
        });
      }

      const values = getSellRuleSubValues(sellPriceRule);
      if (values.length) {
        values.forEach((ruleValue, index) => {
          const currentValue = result.subValues[index];
          if (currentValue) {
            currentValue.value += ruleValue.value * quantity;
          } else {
            result.subValues[index] = {
              ...ruleValue,
              value: ruleValue.value * quantity,
            };
          }
        });
      }
    });
  });

  const ruleText = result.subValues.reduce((text, item) => {
    return `${text} + ${item.prefix}${(item.value / 100).toFixed(2)}${item.suffix}`;
  }, '');
  result.ruleText = ruleText;
  // 只有type != 0的时候用到
  const mainValue = result.mainValues[0];
  if (mainValue && result.ruleType !== 0) {
    result.totalPrice = `${mainValue.prefix}${(mainValue.value / 100).toFixed(2)}${mainValue.suffix}${ruleText}`;
  } else {
    result.totalPrice = '¥0.00';
  }
  result.totalDiamond = result.totalDiamond.toFixed(2);

  return result;
}
