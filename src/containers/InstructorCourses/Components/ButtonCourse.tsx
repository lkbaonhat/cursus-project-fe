import { Button } from "@/containers/Feedback/components/Button";
import { INSTRUCTOR, ROLE } from "@/routes";

function ButtonCourse() {
  return (
    <>
      <Button
        width="180px"
        border_radius="3px"
        fontSize="16px"
        height="40px"
        padding="0 20px"
        margin="none"
        onClick={() =>
          (window.location.href = `/${ROLE.INSTRUCTOR}/${INSTRUCTOR.CREATE_COURSE}`)
        }
      >
        Create Your Course
      </Button>
    </>
  );
}

export default ButtonCourse;
