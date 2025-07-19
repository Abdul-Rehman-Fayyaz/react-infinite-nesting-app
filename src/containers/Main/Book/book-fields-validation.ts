export const getSubmissionData = (formFields: Record<string, string>) => {
  const required: Record<string, string> = {};

  const { title, description } = formFields;

  if (!title) {
    required["title"] = "Required!";
  }

  if (!description) {
    required["description"] = "Required!";
  }

  return {
    required,
    fieldsData: formFields,
  };
};
