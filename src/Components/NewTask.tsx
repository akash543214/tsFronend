import { useState } from "react";
import Modal from "./Assets/Modal";
import Form from "./Assets/Form";
import Button from "./Assets/Button";
import { addTask } from "../BackendApi/apiService";


export default function NewTask(_props: { getTasksData: () => void; })
{

    // modal to enter form data  
    const [modal, setModal] = useState(false);

    //form object to input task data
    const [formData, setFormData] = useState({ content: "", priority: "Medium", deadline: "", isComplete:"Incomplete" }); // Form Data object
    

    // function to handle submit task button
    const handleAddTask = async () => {

      
        if(!formData.content || !formData.priority || !formData.deadline)
        return;

        try {
          await addTask({content:formData.content,
            priority:formData.priority,
            deadline:formData.deadline,
            isComplete:formData.isComplete});
         
        } catch (error) {
          console.error("Error adding task:", error);
        } finally {
          setModal(false);
          resetForm();
          _props.getTasksData();
        }
      }


      // function to update form object in accordance with form input
    const handleFormChange = (e:{ target: 
      { name: string, value: string } }) => 
        {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };

      
      // function to reset form object
      // to default values
      const resetForm = () => {
       
          setFormData({ content: "",
             priority: "Medium", 
             deadline: "", 
             isComplete:"Incomplete" });
      }
       
    
    return(
        <>
  {modal && <Modal title="Add New Task" onClick={() => setModal(false)}>
                <Form  
                  formData={formData}
                 setContent={(val: string) => handleFormChange({ target: { name: 'content', value: val } })}
                 setPriority={(val:string) => handleFormChange({ target: { name: 'priority', value: val } })}
                 setDeadline={(val:string) => handleFormChange({ target: { name: 'deadline', value: val } })}
                 setIsComplete={(val:string) => handleFormChange({ target: { name: 'isComplete', value: val } })}
                 handleClick={handleAddTask} />           
                </Modal>}
                   <Button onClick={()=> setModal(true)} variant='secondary'>
                          Add New Task
                        </Button>
                        </>
    );
}