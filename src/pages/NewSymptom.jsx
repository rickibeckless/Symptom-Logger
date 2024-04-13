import { useState } from 'react';
import { supabase } from '../App';
import { useNavigate } from "react-router-dom";

export function NewSymptom() {

    const [Symptom, setSymptom] = useState('');
    const [Description, setDescription] = useState('');
    const [Severity, setSeverity] = useState('');
    const [Duration, setDuration] = useState('');
    const [Priority, setPriority] = useState('');
    const [Treated, setTreated] = useState(false);
    const [PastSymptom, setPastSymptom] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.from('Symptoms').insert([{ Symptom, Description, Severity, Duration, Priority, Treated }]);
            if (error) {
                throw error;
            }
            console.log('Symptom added successfully:', data);
            setSymptom('');
            setDescription('');
            setSeverity('');
            setDuration('');
            setPriority('');
            setTreated(false);
            navigate('/symptoms');
        } catch (error) {
            console.error('Error adding symptom:', error.message);
        }
    };

    const handleCheckboxChange = (e) => {
        setTreated(e.target.checked);
    };

    const handlePastSymptom = (e) => {
        setPastSymptom(e.target.checked);
        console.log("Past Symptom selected: ", e.target.checked);
    }

    return (
        <>
            <div className="new-symptom-header">
                <h1 className="page-title">Log New Symptom</h1>
                <p className="page-summary">Add new symptom, behavior, or concern.</p>                
            </div>
            <form className="symptom-form-holder" onSubmit={handleSubmit}>
                <div id="past-form" className="new-symptom-form">
                    <label className="symptom-form-label">Is this a past symptom?</label>
                    <input type="checkbox" onChange={handlePastSymptom} />
                </div>

                <div id="treated-form" className="new-symptom-form">
                    <label className="symptom-form-label">Treated:</label>
                    <input type="checkbox" checked={Treated} onChange={handleCheckboxChange} />
                </div>

                <div id="symptom-form" className="new-symptom-form">
                    <label className="symptom-form-label">Symptom:</label>

                    <div className="symptom-form-options">
                        <input className="form-options-text" type="text" value={Symptom} onChange={(e) => setSymptom(e.target.value)} required />
                    </div>
                </div>
                
                <div id="description-form" className="new-symptom-form">
                    <label className="symptom-form-label">Description:</label>

                    <div className="symptom-form-options">
                        <textarea className="form-options-text" value={Description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                </div>
                
                <div id="severity-form" className={`new-symptom-form ${PastSymptom ? 'disabled-symptom-option' : ''}`}>
                    <label className="symptom-form-label">Severity:</label>

                    <div className="symptom-form-options">
                        <div className="form-option">
                            <input type="radio" id="severe" name="severity" value="Severe" onChange={(e) => setSeverity(e.target.value)} />
                            <label htmlFor="severe">Severe</label>                            
                        </div>

                        <div className="form-option">
                            <input type="radio" id="moderate" name="severity" value="Moderate" onChange={(e) => setSeverity(e.target.value)} />
                            <label htmlFor="moderate">Moderate</label>                            
                        </div>

                        <div className="form-option">
                            <input type="radio" id="mild" name="severity" value="Mild" onChange={(e) => setSeverity(e.target.value)} />
                            <label htmlFor="mild">Mild</label>                            
                        </div>
                    </div>
                </div>

                <div id="duration-form" className={`new-symptom-form ${PastSymptom ? 'disabled-symptom-option' : ''}`}>
                    <label className="symptom-form-label">Duration:</label>

                    <div className="symptom-form-options">
                        <div className="form-option">
                            <input type="radio" id="acute" name="duration" value="Acute" onChange={(e) => setDuration(e.target.value)} />
                            <label htmlFor="acute">Acute</label>                            
                        </div>

                        <div className="form-option">
                            <input type="radio" id="chronic" name="duration" value="Chronic" onChange={(e) => setDuration(e.target.value)} />
                            <label htmlFor="chronic">Chronic</label>                            
                        </div>
                    </div>
                </div>

                <div id="priority-form" className={`new-symptom-form ${PastSymptom ? 'disabled-symptom-option' : ''}`}>
                    <label className="symptom-form-label">Priority:</label>

                    <div className="symptom-form-options">
                        <select id="priority" name="priority" onChange={(e) => setPriority(e.target.value)} {...(PastSymptom ? {} : { required: true })} >
                            <option value="" disabled selected>Select Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                </div>
                
                <button className="symptom-form-btn" type="submit">Submit</button>
            </form>
        </>
    )
};