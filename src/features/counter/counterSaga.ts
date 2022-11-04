import { PayloadAction } from "@reduxjs/toolkit";
import { delay, put, takeEvery} from 'redux-saga/effects'
import { incrementSaga, incrementSagaSuccess } from "./counterSlice";
// export function* log(action: PayloadAction){
//     console.log('log', action)
// }

export function* handleIncrementSaga(action:PayloadAction<number>){
    console.log('handle')
    //wait
    yield delay(1000)

    yield put(incrementSagaSuccess(action.payload))
}
export default function* counterSaga(){ 
    console.log('coute saga')

    //yield takeEvery(increment.type,log) // action increment là 1 object. .type sẽ lấy được action của nó
    // yield takeEvery('*',log) //*: lắng nghe khi thấy action được dispatch thì chạy, dấu * là chạy với tất cả các action
    // yield takeLatest(incrementSaga.type,handleIncrementSaga) //trong 1 khoản thời gian, nếu có 2 action được dispatch thì sẽ hủy action dầu và chạy cái sau,
    yield takeEvery(incrementSaga.type,handleIncrementSaga) //Chạy tất cả
}