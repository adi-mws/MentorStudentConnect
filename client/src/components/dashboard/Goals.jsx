import {React, useState} from 'react'

export default function Goals() {
    const [studentGoals, setStudentGoals] = useState([
        {
          goal: "Improve Time Management",
          description: "Create a daily schedule to balance studies, assignments, and extracurricular activities effectively.",
          tasks: [
            "Create a weekly schedule",
            "Use a planner app",
            "Set daily priorities",
            "Review schedule each morning"
          ]
        },
        {
          goal: "Enhance Programming Skills",
          description: "Practice coding daily on platforms like LeetCode, CodeChef, or HackerRank to improve problem-solving skills.",
          tasks: [
            "Solve 1 coding problem daily",
            "Learn a new algorithm weekly",
            "Participate in coding contests",
            "Review previous solutions"
          ]
        }
    ]);

    const [selectedGoal, setSelectedGoal] = useState(null);
    const [completedTasks, setCompletedTasks] = useState({});
    const [showAddForm, setShowAddForm] = useState(false);
    const [newGoal, setNewGoal] = useState({
        goal: '',
        description: '',
        tasks: ['']
    });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    const toggleTask = (goalIndex, taskIndex) => {
        const key = `${goalIndex}-${taskIndex}`;
        setCompletedTasks(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const allTasksCompleted = (goalIndex) => {
        if (!studentGoals[goalIndex]?.tasks) return false;
        return studentGoals[goalIndex].tasks.every((_, taskIndex) => {
            const key = `${goalIndex}-${taskIndex}`;
            return completedTasks[key];
        });
    };

    const handleAddTaskField = () => {
        setNewGoal(prev => ({
            ...prev,
            tasks: [...prev.tasks, '']
        }));
    };

    const handleTaskChange = (index, value) => {
        const updatedTasks = [...newGoal.tasks];
        updatedTasks[index] = value;
        setNewGoal(prev => ({
            ...prev,
            tasks: updatedTasks
        }));
    };

    const handleRemoveTask = (index) => {
        const updatedTasks = [...newGoal.tasks];
        updatedTasks.splice(index, 1);
        setNewGoal(prev => ({
            ...prev,
            tasks: updatedTasks
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const filteredTasks = newGoal.tasks.filter(task => task.trim() !== '');
        if (newGoal.goal.trim() === '' || newGoal.description.trim() === '' || filteredTasks.length === 0) {
            alert('Please fill in all required fields');
            return;
        }

        setStudentGoals(prev => [
            ...prev,
            {
                goal: newGoal.goal,
                description: newGoal.description,
                tasks: filteredTasks
            }
        ]);

        setNewGoal({
            goal: '',
            description: '',
            tasks: ['']
        });
        setShowAddForm(false);
    };

    const handleDeleteGoal = (index) => {
        const updatedGoals = [...studentGoals];
        updatedGoals.splice(index, 1);
        setStudentGoals(updatedGoals);
        setShowDeleteConfirm(null);
        
        // Clean up completed tasks for the deleted goal
        const newCompletedTasks = {...completedTasks};
        Object.keys(newCompletedTasks).forEach(key => {
            if (key.startsWith(`${index}-`)) {
                delete newCompletedTasks[key];
            } else {
                // Adjust keys for goals after the deleted one
                const [goalIdx, taskIdx] = key.split('-').map(Number);
                if (goalIdx > index) {
                    newCompletedTasks[`${goalIdx-1}-${taskIdx}`] = newCompletedTasks[key];
                    delete newCompletedTasks[key];
                }
            }
        });
        setCompletedTasks(newCompletedTasks);
    };

    return (
        <div style={{display:"flex",flexDirection:"column",gap:"1rem",padding:"1rem"}} className='GoalsPage'>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1 style={{margin:"1rem"}}>Your Goals</h1>
                <button 
                    onClick={() => setShowAddForm(true)} 
                    className="btn btn-success"
                >
                    Add New Goal
                </button>
            </div>

            {showAddForm && (
                <div className="card mb-4">
                    <div className="card-header">Add New Goal</div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="goalTitle" className="form-label">Goal Title*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="goalTitle"
                                    value={newGoal.goal}
                                    onChange={(e) => setNewGoal({...newGoal, goal: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="goalDescription" className="form-label">Description*</label>
                                <textarea
                                    className="form-control"
                                    id="goalDescription"
                                    rows="3"
                                    value={newGoal.description}
                                    onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Action Items*</label>
                                {newGoal.tasks.map((task, index) => (
                                    <div key={index} className="input-group mb-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={task}
                                            onChange={(e) => handleTaskChange(index, e.target.value)}
                                        />
                                        {newGoal.tasks.length > 1 && (
                                            <button 
                                                type="button" 
                                                className="btn btn-outline-danger"
                                                onClick={() => handleRemoveTask(index)}
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary mt-2"
                                    onClick={handleAddTaskField}
                                >
                                    Add Another Task
                                </button>
                            </div>
                            <div className="d-flex justify-content-end gap-2">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary"
                                    onClick={() => setShowAddForm(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">Save Goal</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="GoalsSection">
                {studentGoals.map((goal, goalIndex) => {
                    const isCompleted = allTasksCompleted(goalIndex);
                    const showChecklist = selectedGoal === goalIndex;
                    
                    return (
                        <div key={goalIndex} className="card mb-3">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5>Goal {goalIndex+1}</h5>
                                <button 
                                    onClick={() => setShowDeleteConfirm(showDeleteConfirm === goalIndex ? null : goalIndex)}
                                    className="btn btn-sm btn-outline-danger"
                                >
                                    Delete
                                </button>
                            </div>
                            <div className="card-body">
                                {showDeleteConfirm === goalIndex && (
                                    <div className="alert alert-warning d-flex justify-content-between align-items-center mb-3">
                                        <span>Are you sure you want to delete this goal?</span>
                                        <div>
                                            <button 
                                                onClick={() => setShowDeleteConfirm(null)}
                                                className="btn btn-sm btn-outline-secondary me-2"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteGoal(goalIndex)}
                                                className="btn btn-sm btn-danger"
                                            >
                                                Confirm Delete
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <h5 className="card-title">{goal.goal}</h5>
                                <p className="card-text">{goal.description}</p>
                                
                                {showChecklist ? (
                                    <div className="d-flex align-items-center gap-2">
                                        {isCompleted && (
                                            <span className="text-success fw-bold">Completed!</span>
                                        )}
                                        <button 
                                            onClick={() => setSelectedGoal(null)} 
                                            className="btn btn-secondary"
                                        >
                                            Collapse Checklist
                                        </button>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => setSelectedGoal(goalIndex)} 
                                        className="btn btn-primary"
                                    >
                                        Show Checklist
                                    </button>
                                )}
                                
                                {showChecklist && goal.tasks && (
                                    <div className="mt-3">
                                        <h6>Action Items:</h6>
                                        <ul className="list-group">
                                            {goal.tasks.map((task, taskIndex) => {
                                                const key = `${goalIndex}-${taskIndex}`;
                                                return (
                                                    <li key={key} className="list-group-item d-flex align-items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={completedTasks[key] || false}
                                                            onChange={() => toggleTask(goalIndex, taskIndex)}
                                                            className="form-check-input me-2"
                                                            id={`task-${key}`}
                                                        />
                                                        <label 
                                                            htmlFor={`task-${key}`}
                                                            style={{
                                                                textDecoration: completedTasks[key] ? 'line-through' : 'none',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            {task}
                                                        </label>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}