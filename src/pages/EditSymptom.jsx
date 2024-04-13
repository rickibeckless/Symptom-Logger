import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { supabase } from '../App';

export function EditSymptom() {

    const { id } = useParams();

    const [symptom, setSymptom] = useState(null);
    const [editedSymptom, setEditedSymptom] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedSeverity, setEditedSeverity] = useState('');
    const [editedDuration, setEditedDuration] = useState('');
    const [editedPriority, setEditedPriority] = useState('');

    const fetchSymptom = async () => {
        try {
            const { data, error } = await supabase.from('Symptoms').select('*').eq('id', id).single();
            if (error) {
                throw error;
            }
            setSymptom(data);
            if (!editedSymptom) setEditedSymptom(data?.Symptom || '');
            if (!editedDescription) setEditedDescription(data?.Description || '');
            if (!editedSeverity) setEditedSeverity(data?.Severity || '');
            if (!editedDuration) setEditedDuration(data?.Duration || '');
            if (!editedPriority) setEditedPriority(data?.Priority || '');
        } catch (error) {
            console.error('Error fetching symptom:', error.message);
        }
    };

    useEffect(() => {
        fetchSymptom();
    }, [supabase, id]);

    const navigate = useNavigate();

    const handleUpdate = async () => {
        try {
            const { error } = await supabase.from('Symptoms').update({ Symptom: editedSymptom, Description: editedDescription, Severity: editedSeverity, Duration: editedDuration, Priority: editedPriority }).eq('id', id);
            if (error) {
                throw error;
            }
            await fetchSymptom();
            console.log('Symptom updated successfully');
            navigate('/symptoms');
        } catch (error) {
            console.error('Error updating symptom:', error.message);
        }
    };

    const handleDelete = async () => {
        try {
            const { error } = await supabase.from('Symptoms').delete().eq('id', id);
            if (error) {
                throw error;
            }
            console.log('Symptom deleted successfully');
            navigate('/symptoms');
        } catch (error) {
            console.error('Error deleting symptom:', error.message);
        }
    };

    return (
        <>
            <div className="new-symptom-header">
                <h1 className="page-title">Edit "{symptom?.Symptom}"</h1>
                <h3 className="page-summary">Current Description:</h3>
                <p className="page-summary">{symptom?.Description}</p>                
            </div>

            <div className="symptom-form-holder">
                <div id="symptom-form" className="new-symptom-form">
                    <label className="symptom-form-label">Symptom:</label>
                    
                    <div className="symptom-form-options">
                        <input className="form-options-text" type="text" onChange={(e) => setEditedSymptom(e.target.value)} />
                    </div>
                </div>

                <div id="description-form" className="new-symptom-form">
                    <label className="symptom-form-label">Description:</label>
                    
                    <div className="symptom-form-options">
                        <textarea className="form-options-text" onChange={(e) => setEditedDescription(e.target.value)} />
                    </div>
                </div>
                    
                <div id="severity-form" className="new-symptom-form">
                    <label className="symptom-form-label">Severity:</label>

                    <div className="symptom-form-options">
                        <div className="form-option">
                            <input type="radio" id="severe" name="severity" value="Severe" onChange={(e) => setEditedSeverity(e.target.value)} />
                            <label htmlFor="severe">Severe</label>                            
                        </div>
 
                        <div className="form-option">
                            <input type="radio" id="moderate" name="severity" value="Moderate" onChange={(e) => setEditedSeverity(e.target.value)} />
                            <label htmlFor="moderate">Moderate</label>                            
                        </div>

                        <div className="form-option">
                            <input type="radio" id="mild" name="severity" value="Mild" onChange={(e) => setEditedSeverity(e.target.value)} />
                            <label htmlFor="mild">Mild</label>                             
                        </div>
                    </div>
                </div>

                <div id="duration-form" className="new-symptom-form">
                    <label className="symptom-form-label">Duration:</label>

                    <div className="symptom-form-options">
                        <div className="form-option">
                            <input type="radio" id="acute" name="duration" value="Acute" onChange={(e) => setEditedDuration(e.target.value)} />
                            <label htmlFor="acute">Acute</label>                            
                        </div>

                        <div className="form-option">
                            <input type="radio" id="chronic" name="duration" value="Chronic" onChange={(e) => setEditedDuration(e.target.value)} />
                            <label htmlFor="chronic">Chronic</label>                             
                        </div>
                    </div>
                </div>

                <div id="priority-form" className="new-symptom-form">
                    <label className="symptom-form-label">Priority:</label>

                    <div className="symptom-form-options">
                        <select id="priority" name="priority" onChange={(e) => setEditedPriority(e.target.value)} required >
                            <option value="" disabled selected>Select Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>                        
                    </div>
                </div>

                <div className="edit-symptom-btns">
                    <button className="symptom-form-btn" onClick={handleUpdate}>Update</button>
                    <button className="symptom-form-btn" onClick={handleDelete}>Delete</button>
                </div>

            </div>
        </>
    )
};

