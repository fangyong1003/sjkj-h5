import homeImage from './images/home.png';
import homeActiveImage from './images/home-active.png';
import categoryImage from './images/category.png';
import categoryActiveImage from './images/category-active.png';
import cartImage from './images/cart.png';
import cartActiveImage from './images/cart-active.png';
import usercenterImage from './images/usercenter.png';
import usercenterActiveImage from './images/usercenter-active.png';

const navs = [
  {
    type: 'home',
    text: '首页',
    image: homeImage,
    activeImage: homeActiveImage,
    url: '/pages/homepage.html'
  },
  {
    type: 'category',
    text: '分类',
    image: categoryImage,
    activeImage: categoryActiveImage,
    url: '/pages/category.html'
  },
  {
    type: 'cart',
    text: '购物车',
    image: cartImage,
    activeImage: cartActiveImage,
    url: '/pages/cart.html'
  },
  {
    type: 'usercenter',
    text: '我的',
    image: usercenterImage,
    activeImage: usercenterActiveImage,
    url: '/pages/user-center.html'
  }
];

export default navs;
