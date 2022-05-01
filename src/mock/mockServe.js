import Mock from 'mockjs'
// 引入banner和floor的json文件，在webpack中图片和json是默认暴露的
import banner from './banner.json';
import floor from './floor.json';
// 提供轮播图接口
Mock.mock('/mock/banner', {
    code: 200,
    data: banner
})
// 提供楼层接口
Mock.mock('/mock/floor', {
    code: 200,
    data: floor
})