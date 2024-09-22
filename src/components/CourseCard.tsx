import { ICourseFormProp, ICourseFormWithIdProp } from "@/types";
import {
  Card,
  CardBody,
  FormControl,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";

const CourseCardLocal = ({
  onChosen,
  courses,
}: {
  onChosen: (course?: ICourseFormWithIdProp) => void;
  courses: ICourseFormWithIdProp[];
}) => {
  const [checked, setChecked] = useState(1);
  const handleSetCourse = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const id = event.target.value;

      const course = courses.find((crs) => crs.id === Number(id));
      setChecked(Number(id));
      onChosen(course);
    },
    [onChosen, courses]
  );

  return (
    <Card style={{ marginBottom: 4 }}>
      <CardBody>
        <FormControl display="flex" alignItems="center">
          <RadioGroup defaultValue={courses[0].id.toString()}>
            <Stack>
              {courses?.map((x) => (
                <Radio
                  key={x.id}
                  size="md"
                  name="1"
                  colorScheme="green"
                  value={x.id.toString()}
                  checked={x.id === checked}
                  onChange={handleSetCourse}
                >
                  {x?.title ?? ""}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>
      </CardBody>
    </Card>
  );
};

export const CourseCard = React.memo(CourseCardLocal);
