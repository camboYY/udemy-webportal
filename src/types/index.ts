export type IPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type ILoginFormProp = {
  username: string;
  password: string;
};

export type ICategoryFormProp = {
  name: string;
  parentId?: string;
  id?: number;
};

export type RegisterFormProp = {
  username: string;
  email?: string;
  phoneNumber: string;
  name?: string;
  password: string;
};

export type User = {
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  id: number;
};

export type ICourseFormProp = {
  title: string;
  price: number;
  courseBy: number;
  courseInclude: string;
  courseLearning: string;
  status: boolean;
  categoryId: number;
  createdBy: number;
  thumbnailUrl?: string;
};

export type ICourseFormWithIdProp = ICourseFormProp & {
  id: number;
};

export type CourseProps = ICourseFormProp & { id: number };

export type ICourseTag = {
  title: string;
  courseId: number;
};

export type ICourseLesson = {
  title: string;
  courseId: number;
  description: string;
  videoUrl: string;
  status: boolean;
  createdBy: number;
};

export type ICourseLessonForm = ICourseLesson & {
  id: number;
};

export type ICourseTagProps = ICourseTag & { id: number };

export type UpgradingNewRole = {
  [key: string]: any;
};
export type NewRoleProp = {
  upgradingRole: (props: {
    role: string;
    userId: number;
  }) => Promise<UpgradingNewRole[]>;
  list: UpgradingNewRole[];
};

export type IInvoice = {
  id: number;
  name: string;
  totalAmount: number;
  createdAt: string;
};
