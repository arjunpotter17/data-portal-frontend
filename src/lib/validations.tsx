import * as Yup from "yup";

export const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Work email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters long").required("Password is required"),
    companyName: Yup.string().required("Company name is required"),
    companyWebsite: Yup.string()
      .matches(/^https:\/\/www\./, "Website must start with https://www")
      .required("Company website is required"),
    interestedIn: Yup.string().required("Please select an interest"),
  });