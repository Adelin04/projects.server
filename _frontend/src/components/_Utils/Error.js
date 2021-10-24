export const SetError = (projectsList,event_ID,setDynamicMsg,setError_project_Id,error) => {
    projectsList.map((project) => {
    if (Number(project.id) === event_ID) {
      setDynamicMsg(error.toString());
      setError_project_Id(event_ID);
    }
  });
};
