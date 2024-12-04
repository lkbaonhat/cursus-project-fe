import { all } from 'redux-saga/effects'
import { watchEditorSaga } from '@/modules/auth/saga';
import { watchEditorGlobalSaga } from '@/modules/global/saga';
import { watchEditorCourseSaga } from '@/modules/course/saga';
// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchEditorSaga(),
    watchEditorGlobalSaga(),
    watchEditorCourseSaga(),
  ])
}