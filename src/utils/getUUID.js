// 引入uuid
import { v4 as uuidv4 } from 'uuid';

export function getUUID() {
    // 先获取本地的id
    let id = localStorage.getItem('UUIDTOKEN');
    // 判断本地是否有id
    if (!id) {
        // 如果为空则重新生成一个id，然后将其存储在localStorage中
        id = uuidv4();
        localStorage.setItem('UUIDTOKEN', id);
    }
    // 返回id的值
    return id
}