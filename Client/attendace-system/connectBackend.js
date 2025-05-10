import axios from "axios";

const apiconnect = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 1000,
  withCredentials: true,
});

// Lecturer Section
export const registerLecturer = async (data) => {
  try {
    const response = await apiconnect.post("/lecturer/registerLecturer", data);
    return response.data;
  } catch (error) {
    console.error("Error registering lecturer:", error);
    throw error;
  }
};

export const loginLecturer = async (data) => {
  try {
    const response = await apiconnect.post("/lecturer/loginlecturer", data);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
export const logoutLecturer = async () => {
  try {
    const response = await apiconnect.post("/lecturer/logoutlecturer");
    return response.data;
  } catch (error) {
    console.error("Error logout admin:", error);
    throw error;
  }
};

export const profileLecturer = async () => {
  try {
    const response = await apiconnect.get("/lecturer/profileLecturer");
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const getAllLecturers = async (data) => {
  try {
    const response = await apiconnect.get("/lecturer/getAllLecturers",{params:data});
    return response.data;
  } catch (error) {
    console.error("Error fetching all students:", error);
    throw error;
  }
};

export const getSingleLecturer = async(id)=>{
  try {
    const response = await apiconnect.get(`/lecturer/getSingleLecturer/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error single students:", error);
    throw error;
  }
}
export const updateLecturerBYId =async(id,data)=>{
  try {
    const response = await apiconnect.put(`/lecturer/updateUserBYId/${id}`,data)
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error)
    throw error;
  }
}

export const deleteSingleLecturer = async(id)=>{
  try {
    const response = await apiconnect.delete(`/lecturer/deleteSingleLecturer/${id}`)
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error)
    throw error;
  }
}


//user Section 
export const register = async (data) => {
  try {
    const response = await apiconnect.post("/users/register", data);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const login = async (data) => {
  try {
    const response = await apiconnect.post("/users/login", data);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
export const logout = async () => {
  try {
    const response = await apiconnect.post("/users/logout");
    return response.data;
  } catch (error) {
    console.error("Error logout admin:", error);
    throw error;
  }
};

export const profile = async () => {
  try {
    const response = await apiconnect.get("/users/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const getAllStudent = async (data) => {
  try {
    const response = await apiconnect.get("/users/getAllStudent",{params: data});
    return response.data;
  } catch (error) {
    console.error("Error fetching all students:", error);
    throw error;
  }
};

export const getSingleUser = async(id)=>{
  try {
    const response = await apiconnect.get(`/users/getSingleUser${id}`);
    return response.data;
  } catch (error) {
    console.error("Error single students:", error);
    throw error;
  }
}
export const updateUserBYId =async(id)=>{
  try {
    const response = await apiconnect.put(`/users/updateUserBYId/${id}`)
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error)
    throw error;
  }
}

export const deleteSingleUser = async(id)=>{
  try {
    const response = await apiconnect.delete(`/users/deleteSingleUser/${id}`)
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error)
    throw error;
  }
}



// Admin Section

export const registerAdmin = async (data) => {
  try {
    const response = await apiconnect.post("/admin/registerAdmin", data);
    return response.data;
  } catch (error) {
    console.error("Error registering admin:", error);
    throw error;
  }
};

export const loginAdmin = async (data) => {
  try {
    const response = await apiconnect.post("/admin/loginAdmin", data);
    return response.data;
  } catch (error) {
    console.error("Error login admin:", error);
    throw error;
  }
};

export const logoutAdmin = async () => {
  try {
    const response = await apiconnect.post("/admin/logoutAdmin");
    return response.data;
  } catch (error) {
    console.error("Error logout admin:", error);
    throw error;
  }
};

export const adminProfile = async () => {
  try {
    const response = await apiconnect.get("/admin/adminProfile");
    return response.data;
  } catch (error) {
    console.error("Error in getting admin:", error);
    throw error;
  }
};

// courses (CRUD operation)

export const createCourse = async (data) => {
  try {
    const response = await apiconnect.post("/courses/createCourse", data);
    return response.data;
  } catch (error) {
    console.error("Error in creating a course", error);
    throw error;
  }
};

export const updateCourseBYId = async (id) => {
  try {
    const response = await apiconnect.put(
      `/courses/updateCourseBYId/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error in updating a course", error);
    throw error;
  }
};

export const getAllCourses = async () => {
  try {
    const response = await apiconnect.get("/courses/getAllCourses");
    return response.data;
  } catch (error) {
    console.error("Error in getting all courses", error);
    throw error;
  }
};

export const getSingleCourse = async (id) => {
  try {
    const response = await apiconnect.get(`/courses/getSingleCourse/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in updating a course", error);
    throw error;
  }
};

export const deleteSingleCourse = async (id) => {
  try {
    const response = await apiconnect.delete(`/courses/deleteSingleCourse/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in updating a course", error);
    throw error;
  }
};
