import { call, put, takeLatest } from "redux-saga/effects";
import {
  getCategories,
  setSections,
  addSection,
  addLecture,
  addQuiz,
  addAssignment,
  getQuizzes,
  setLecture,
  deleteSection,
  setQuizResult,
  setCourse,
  deleteLecture,
  setMyCourse,
} from "./slice";
import { toast } from "react-toastify";
import { cursusAPI } from "@/services";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* getAllCategories(): Generator<any, void, any> {
  try {
    const res = yield call(cursusAPI.categoryService.getCategory);
    if (res.data.statusCode === 200) {
      yield put(getCategories(res.data.data));
      // toast.success("Get categories successfully");
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.error("Error setting categories", error);
  }
}

/*
 SECTION -----------------------------------------------------------------
*/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* getAllSectionsByCourseId(
  courseId: any
): Generator<any, void, any> {
  try {
    const res = yield call(
      cursusAPI.sectionService.getSectionByCourseId,
      courseId.payload
    );
    if (res.data.statusCode === 200) {
      yield put(setSections(res.data.data));
      // toast.success("Get categories successfully");
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.error("Error setting categories", error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* addSectionsByCourseId(action: any): Generator<any, void, any> {
  const { courseId, name } = action.payload;
  try {
    const res = yield call(cursusAPI.sectionService.createSection, {
      name: name,
      courseId: courseId,
    });
    if (res.data.statusCode === 201) {
      yield put(addSection(res.data.data));
      toast.success("Section created successfully");
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.error("Error create section", error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* updateSectionbySectionId(
  action: any
): Generator<any, void, any> {
  const { sectionId, name } = action.payload;
  try {
    const res = yield call(cursusAPI.sectionService.updateSection, {
      sectionId: sectionId,
      name: name,
    });
    if (res.data.statusCode === 201) {
      toast.success("Update section successfully");
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.error("Error update section", error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* deleteSectionBySectionId(
  sectionId: any
): Generator<any, void, any> {
  try {
    const res = yield call(
      cursusAPI.sectionService.deleteSectionBySectionId,
      sectionId.payload
    );
    if (res.data.statusCode === 201) {
      yield put(deleteSection(sectionId));
      toast.success("Delete section successfully");
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.error("Error delete section", error);
  }
}
//----------------------------------------------------------------------

/*
 LECTURE -----------------------------------------------------------------
*/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* addLectureBySectionId(action: any): Generator<any, void, any> {
  const {
    sectionId,
    title,
    description,
    freePreview,
    duration,
    videoUrl,
    videoPosterUrl,
    uploadedFiles,
  } = action.payload;
  try {
    const res = yield call(cursusAPI.lectureService.createLecture, {
      sectionId,
      title,
      description,
      freePreview,
      duration,
      videoUrl,
      videoPosterUrl,
      uploadedFiles,
    });

    if (res.data.statusCode === 201) {
      yield put(addLecture(res.data.data));
      toast.success("Lecture created successfully");
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.error("Error create lecture", error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* updateLectureByLectureId(
  action: any
): Generator<any, void, any> {
  const {
    lectureId,
    title,
    description,
    freePreview,
    duration,
    videoUrl,
    videoPosterUrl,
    uploadedFiles,
  } = action.payload;
  try {
    const res = yield call(cursusAPI.lectureService.updateLecture, {
      lectureId,
      title,
      description,
      freePreview,
      duration,
      videoUrl,
      videoPosterUrl,
      uploadedFiles,
    });
    if (res.data.statusCode === 201) {
      toast.success("Update lecture successfully");
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.error("Error update lecture", error);
  }
}
//----------------------------------------------------------------------
export function* deleteLectureByLectureId(
  lectureId: any
): Generator<any, void, any> {
  try {
    const res = yield call(
      cursusAPI.lectureService.deleteLectureByLectureId,
      lectureId.payload
    );
    if (res.data.statusCode === 201) {
      yield put(deleteLecture(lectureId));
      toast.success("Delete lecture successfully");
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.error("Error delete lecture", error);
  }
}

/*
 QUIZZ -----------------------------------------------------------------
*/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* addQuizBySectionId(action: any): Generator<any, void, any> {
  const {
    sectionId,
    title,
    description,
    questions,
    quizGradable,
    showTime,
    timeLimit,
    passingScore,
    questionLimit,
  } = action.payload;
  try {
    const res = yield call(cursusAPI.quizService.createQuiz, {
      sectionId,
      title,
      description,
      questions,
      quizGradable,
      showTime,
      timeLimit,
      passingScore,
      questionLimit,
    });

    if (res.data.statusCode === 201) {
      yield put(addQuiz(res.data.data));
      toast.success("Quizz created successfully");
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.error("Error create quizz", error);
  }
}

//----------------------------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* updateQuizByQuizId(action: any): Generator<any, void, any> {
  const {
    quizId,
    sectionId,
    title,
    description,
    questions,
    quizGradable,
    showTime,
    timeLimit,
    passingScore,
    questionLimit,
  } = action.payload;
  try {
    const res = yield call(cursusAPI.quizService.updateQuiz, {
      quizId,
      sectionId,
      title,
      description,
      questions,
      quizGradable,
      showTime,
      timeLimit,
      passingScore,
      questionLimit,
    });
    if (res.data.statusCode === 201) {
      toast.success("Update quizz successfully");
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.error("Error update quizz", error);
  }
}
//----------------------------------------------------------------------

/*
 ASSIGNMENT -----------------------------------------------------------------
*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* addAsignmentBySectionId(
  action: any
): Generator<any, void, any> {
  const {
    sectionId,
    title,
    description,
    timeDuration,
    totalNumber,
    minPassNumber,
    uploadLimit,
    maxAttachmentSize,
    uploadedFiles,
  } = action.payload;
  try {
    const res = yield call(cursusAPI.assignmentService.createAssignment, {
      sectionId,
      title,
      description,
      timeDuration,
      totalNumber,
      minPassNumber,
      uploadLimit,
      maxAttachmentSize,
      uploadedFiles,
    });

    if (res.data.statusCode === 201) {
      yield put(addAssignment(res.data.data));
      toast.success("Assignment created successfully");
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.error("Error create assignment", error);
  }
}
//----------------------------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* updateAssignmentByAssignmentId(
  action: any
): Generator<any, void, any> {
  const {
    assignmentId,
    sectionId,
    title,
    description,
    timeDuration,
    totalNumber,
    minPassNumber,
    uploadLimit,
    maxAttachmentSize,
    uploadedFiles,
  } = action.payload;
  try {
    const res = yield call(cursusAPI.assignmentService.updateAssignment, {
      assignmentId,
      sectionId,
      title,
      description,
      timeDuration,
      totalNumber,
      minPassNumber,
      uploadLimit,
      maxAttachmentSize,
      uploadedFiles,
    });
    if (res.data.statusCode === 201) {
      toast.success("Update assignment successfully");
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.error("Error update assignment", error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* getQuiz(action: any): Generator<any, void, any> {
  const { payload } = action;
  try {
    const res = yield call(
      cursusAPI.quizService.getListQuestionsByQuizId,
      payload
    );
    const data = res.data.data;
    if (res.data.statusCode === 200) {
      yield put(getQuizzes(data));
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* getLectureById(action: any): Generator<any, void, any> {
  try {
    const res = yield call(
      cursusAPI.lectureService.getLectureById,
      action.payload
    );
    if (res.data.statusCode === 200) {
      yield put(setLecture(res.data.data));
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.error("Error setting categories", error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* saveResultQuiz(action: any): Generator<any, void, any> {
  try {
    yield call(cursusAPI.quizService.saveResultQuiz, action.payload);
  } catch (error) {
    console.error("Error: ", error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* getQuizResult(action: any): Generator<any, void, any> {
  try {
    const res = yield call(
      cursusAPI.quizService.getQuizResultByUserIdAndQuizId,
      action.payload.userId,
      action.payload.quizId
    );

    if (res.data.statusCode === 200) {
      yield put(setQuizResult(res.data.data));
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* getCourse(action: any): Generator<any, void, any> {
  try {
    const res = yield call(
      cursusAPI.courseService.getCourseById,
      action.payload
    );

    if (res.data.statusCode === 200) {
      yield put(setCourse(res.data.data));
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.error("Error setting categories", error);
  }
}

export function* getMyCourse(action: any): Generator<any, void, any> {
  try {
    const res = yield call(cursusAPI.courseService.getMyCourse, action.payload);

    if (res.data.statusCode === 200) {
      yield put(setCourse(res.data.data));
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.error("Error setting categories", error);
  }
}

export function* getCourseByCategoryId(action: any): Generator<any, void, any> {
  try {
    const res = yield call(
      cursusAPI.courseService.getCourseByCategoryId,
      action.payload
    );
    if (res.data.statusCode === 200) {
      yield put(setMyCourse(res.data.data));
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.error("Error setting categories", error);
  }
}

export function* watchEditorCourseSaga() {
  yield takeLatest(`getAllCategories`, getAllCategories);

  yield takeLatest(`getAllSectionsByCourseId`, getAllSectionsByCourseId);
  yield takeLatest(`addSectionsByCourseId`, addSectionsByCourseId);
  yield takeLatest(`updateSectionbySectionId`, updateSectionbySectionId);
  yield takeLatest(`deleteSectionBySectionId`, deleteSectionBySectionId);

  yield takeLatest(`addLectureBySectionId`, addLectureBySectionId);
  yield takeLatest(`updateLectureByLectureId`, updateLectureByLectureId);

  yield takeLatest(`addQuizBySectionId`, addQuizBySectionId);
  yield takeLatest(`updateQuizByQuizId`, updateQuizByQuizId);

  yield takeLatest(`addAsignmentBySectionId`, addAsignmentBySectionId);
  yield takeLatest(
    `updateAssignmentByAssignmentId`,
    updateAssignmentByAssignmentId
  );

  yield takeLatest(`getQuiz`, getQuiz);
  yield takeLatest(`getLectureById`, getLectureById);
  yield takeLatest(`saveResultQuiz`, saveResultQuiz);
  yield takeLatest(`getQuizResult`, getQuizResult);

  yield takeLatest(`getCourse`, getCourse);
  yield takeLatest(`getCourseByCategoryId`, getCourseByCategoryId);
}
