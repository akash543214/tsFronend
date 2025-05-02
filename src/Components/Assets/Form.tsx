import Button from "./Button";

interface FormProps 
  { formData: 
    { 
      content: string;  
      priority: string;
      deadline: string; 
    }; 
    setContent: (arg0: string) => void; 
    setPriority: (arg0: string) => void; 
    setDeadline: (arg0: string) => void; 
    setIsComplete: (arg0: string) => void; 
    handleClick: unknown; 
  };


// Form component to handle task creation and editing
export default function Form(_props: FormProps)
{

    return(
      
      <div className="max-w-md mx-auto p-6 shadow-lg rounded-2xl bg-white space-y-4">
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Task Content</label>
        <input type="text" value={_props.formData.content} 
        onChange={(e)=>_props.setContent(e.target.value)} 
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        placeholder="Enter task content" />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Priority</label>
        <select value={_props.formData.priority} 
        onChange={(e)=>_props.setPriority(e.target.value)}
         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Medium</option>
          <option>Low</option>
          <option>High</option>
        </select>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Deadline</label>
        <input value={_props.formData.deadline} 
        onChange={(e)=>_props.setDeadline(e.target.value)} 
        type="date"
         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      
      <Button onClick={_props.handleClick} 
      className="w-full py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition">Submit</Button>
    </div>
    );
}