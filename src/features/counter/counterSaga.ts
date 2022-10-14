import { PayloadAction } from "@reduxjs/toolkit";
import { takeEvery} from 'redux-saga/effects'
import { increment } from "./counterSlice";
export function* log(action: PayloadAction){
    console.log('log', action)
}

export default function* counterSaga(){ 
    console.log('coute saga')

    //yield takeEvery(increment.type,log) // action increment là 1 object. .type sẽ lấy được action của nó
    yield takeEvery('*',log) //*: lắng nghe khi thấy action được dispatch thì chạy, dấu * là chạy với tất cả các action
}