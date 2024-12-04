import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FileUploader from "./components/FileUploader";
import ConfirmDialog from "./components/ConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import { selectedSections } from "@/modules/course/selector";
import { useParams } from "react-router-dom";
import { style } from "@/theme";
import { decodeJWT } from "@/utils/hooks/useUser";

import { selectProgressCourseOfUser } from "@/modules/global/selector";

const AssignmentContainer = styled.div`
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 50px auto;
    max-width: 900px;
    position: relative;
`;

const Timer = styled.div`
    margin-bottom: 20px;
    padding: 20px;
    background-color: #ffffff; /* Nền trắng */
    border-radius: 4px;
    border: 1px solid ${style.colors.gray.bg_card_under};
    font-size: large;
    font-weight: bold;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FileList = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
`;

const FileItem = styled.div`
    display: flex;
    justify-content: center;
`;

const FileImage = styled.img`
    width: 100%;
    max-width: 300px;
    height: auto;
    border-radius: 8px;
    object-fit: cover;
`;

const SubmitButton = styled.button` 
padding: 10px 20px; 
font-size: 1rem; 
border: none; 
border-radius: 5px; 
cursor: pointer; 
background-color: #ff0000; /* Nền đỏ */ 
color: #ffffff; /* Văn bản trắng */ 
transition: background-color 0.3s; 
&:hover { background-color: #cc0000; /* Nền đỏ đậm khi hover */ } 
`;

const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
};

const AssignmentCourse = () => {
    const listSection = useSelector(selectedSections);
    const param = useParams();

    const Assignment = listSection
        .map((section) => section.listAssignment)
        .flat()
        .find((assignment) => assignment._id === param.assignmentId);

    const [timeLeft, setTimeLeft] = useState(Assignment?.timeDuration || 0);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleUpdateProgress();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [param.assignmentId]);

    const handleFileSelect = (file: File | null) => {
        setFile(file);
    };

    const [flag, setFlag] = useState(false);
    useEffect(() => {
        if (param.courseSlug) {
            dispatch({
                type: "getProcessCourseOfUser",
                payload: { userId: user?.sub, courseId: param.courseSlug },
            });
        }
        if (timeLeft === 0) {
            setFlag(true);
        }

    }, [param.courseSlug, flag, param.assignmentId]);
    const courseProgress = useSelector(selectProgressCourseOfUser);


    /**
 * Update status progress course
 **/
    const dispatch = useDispatch();
    const user = decodeJWT();
    const handleUpdateProgress = () => {
        dispatch({
            type: "updateStatusProgressCourse",
            payload: {
                userId: user?.sub,
                courseId: param.courseSlug,
                assignmentId: Assignment?._id ? Assignment?._id : null,
            },
        });
        setTimeLeft(0);
        setShowConfirmDialog(false);
    };

    useEffect(() => {
        if (Assignment?.timeDuration) {
            setTimeLeft(Assignment.timeDuration);
        }
    }, [showConfirmDialog]);


    const findAssignment = (data: any, assignmentId: string) => {
        // Duyệt qua tất cả các sections
        for (const section of data.sections) {
            // Duyệt qua tất cả các assignments trong section
            const assignment = section.assignments.find(
                (item: any) => item.assignmentId === assignmentId
            );
            if (assignment) {
                return assignment; // Trả về assignment nếu tìm thấy
            }
        }
        return null; // Trả về null nếu không tìm thấy
    };

    return (
        <AssignmentContainer>
            {findAssignment(courseProgress, Assignment?._id)?.status === "not-learn" ? <div>
                <div className="row">
                    <h2 className="col-9">{Assignment?.title}</h2>
                    <Timer className="col-3">{formatTime(timeLeft)}</Timer>
                </div>
                <div dangerouslySetInnerHTML={{ __html: Assignment?.description }} />

                {Assignment?.uploadedFiles && (
                    <FileList >
                        {Assignment.uploadedFiles.map((file) => (
                            <FileItem key={file.id}>
                                <FileImage src={file.url} alt={file.name} />
                            </FileItem>
                        ))}
                    </FileList>
                )}
                <FileUploader
                    onFileSelect={handleFileSelect}
                    uploadLimit={Assignment?.uploadLimit}
                    maxAttachmentSize={Assignment?.maxAttachmentSize}
                />

                <div className="d-flex justify-content-end mt-4">
                    {findAssignment(courseProgress, Assignment?._id)?.status === "not-learn" ?
                        <SubmitButton onClick={() => setShowConfirmDialog(true)}>Submit</SubmitButton> : ''
                    }

                </div>
            </div> :
                <p className="text-success text-center">
                    The assignment has been completed. Wishing you all happy studying. Wishing you all a happy day.
                </p>}

            {showConfirmDialog && (
                <ConfirmDialog
                    message="Are you sure you want to submit?"
                    onConfirm={handleUpdateProgress}
                    onCancel={() => setShowConfirmDialog(false)}
                />
            )}
        </AssignmentContainer>
    );
};

export default AssignmentCourse;
