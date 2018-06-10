import { cent2yuan } from '@/common/helpers';

const KS = ['s1', 's2', 's3'];

export const formatSku = (skus, specs) => {
  let minPrice = Infinity;
  let maxPrice = 0;
  let totalStock = 0;

  const tree = specs.map((spec, index) => {
    const { key, values } = spec;
    return {
      k: key.keyName,
      k_id: key.keyId,
      k_s: KS[index],
      v: values.map((value) => ({
        id: value.valueId,
        name: value.valueName
      }))
    };
  });

  const list = skus.map((sku, index) => {
    const { id, sellPriceYuan, sellPriceRule, specs, stock, diamondYuan } = sku;
    const treeSearch = KS.reduce((obj, sKey, index) => {
      const spec = specs[index];
      obj[sKey] = spec ? spec.value.valueId : 0;
      return obj;
    }, {});
    // 计算库存
    totalStock += stock;
    minPrice = Math.min(minPrice, sku.sellPrice);
    maxPrice = Math.max(maxPrice, sku.sellPrice);

    return {
      id,
      sellPriceRule,
      price: sellPriceYuan,
      ...treeSearch,
      stock_num: stock,
      diamondYuan
    };
  });

  const price = minPrice === maxPrice
    ? cent2yuan(minPrice)
    : `${cent2yuan(minPrice)} - ${cent2yuan(maxPrice)}`;

  return {
    list,
    tree,
    price,
    stock_num: totalStock
  };
};
